import { supabase } from '@/integrations/supabase/client';

export interface PaymentLinkRequest {
  amount: number;
  currency: string;
  description: string;
  customer_email: string;
  customer_name: string;
  course_id: string;
  user_id: string;
}

export interface PaymentLinkResponse {
  success: boolean;
  payment_link_url?: string;
  payment_link_id?: string;
  transaction_reference?: string;
  message?: string;
  error?: string;
}

/**
 * Create an iKhokha payment link via Supabase Edge Function
 */
export async function createPaymentLink(
  paymentRequest: PaymentLinkRequest
): Promise<PaymentLinkResponse> {
  try {
    // 1) Prefer Netlify Function if available (works on production and netlify dev)
    const tryCallNetlify = async (base: string) => {
      const url = `${base}/.netlify/functions/ikhokha-create-link`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(paymentRequest),
      });
      // Some dev servers return HTML/404 → guard JSON parsing
      if (!res.ok) throw new Error(`Netlify functions responded ${res.status}`);
      let data: any = null;
      try { data = await res.json(); }
      catch { throw new Error('Netlify functions returned non‑JSON response'); }
      if (!data) throw new Error('Empty response from Netlify function');
      return data as PaymentLinkResponse;
    };

    // Try local (netlify dev) first
    try {
      const localBase = '';
      const d = await tryCallNetlify(localBase);
      if (d?.success) return d;
    } catch (e) {
      console.warn('Netlify function (local) not reachable:', e);
      // Try absolute Netlify site URL if provided
      const rawSiteUrl = (import.meta as any).env?.VITE_NETLIFY_SITE_URL || (import.meta as any).env?.VITE_BASE_URL;
      const siteUrl: string = typeof rawSiteUrl === 'string' ? rawSiteUrl : '';
      if (siteUrl) {
        try {
          const d = await tryCallNetlify(siteUrl.replace(/\/$/, ''));
          if (d?.success) return d;
          console.warn('Netlify function (site URL) returned error:', d);
        } catch (e2) {
          console.warn('Netlify function (site URL) not reachable:', e2);
        }
      } else {
        console.warn('VITE_NETLIFY_SITE_URL not set; skipping absolute Netlify call.');
      }
    }

    console.log('Falling back to Supabase process-payment function...');
    // 2) Supabase Edge Function fallback
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout after 30 seconds')), 30000)
    );

    const invokePromise = supabase.functions.invoke('process-payment', { body: paymentRequest });
    const { data, error } = await Promise.race([invokePromise, timeoutPromise]) as any;
    if (error) throw new Error(error.message || 'Failed to create payment link');
    if (!data) throw new Error('No response from Edge Function');
    return data as PaymentLinkResponse;
  } catch (error: any) {
    console.error('Payment link creation error:', error);
    return {
      success: false,
      error: 'PAYMENT_LINK_ERROR',
      message: error.message || 'Unable to create payment link. Please try again.',
    };
  }
}

/**
 * Verify payment status using transaction reference
 */
export async function verifyPaymentStatus(
  transactionReference: string
): Promise<{ status: string; payment: any }> {
  try {
    // Note: payments table may not be in the TypeScript types yet
    const { data, error } = await (supabase as any)
      .from('payments')
      .select('*')
      .eq('transaction_reference', transactionReference)
      .single();

    if (error) {
      console.error('Payment verification error:', error);
      return { status: 'unknown', payment: null };
    }

    return { status: data?.status || 'unknown', payment: data };
  } catch (error) {
    console.error('Payment verification error:', error);
    return { status: 'error', payment: null };
  }
}

/**
 * Validate card number using Luhn algorithm (kept for reference, not used in payment link flow)
 */
export function validateCardNumber(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, '');
  
  if (digits.length < 13 || digits.length > 19) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Get card brand from card number (kept for reference)
 */
export function getCardBrand(cardNumber: string): string {
  const digits = cardNumber.replace(/\D/g, '');
  
  if (/^4/.test(digits)) return 'Visa';
  if (/^5[1-5]/.test(digits)) return 'Mastercard';
  if (/^3[47]/.test(digits)) return 'American Express';
  if (/^6(?:011|5)/.test(digits)) return 'Discover';
  
  return 'Unknown';
}
