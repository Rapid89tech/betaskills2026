import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import WebhookLogger from '@/utils/webhookLogger';

export interface Invoice {
  id: string;
  user_id: string;
  amount: number;
  currency: string;
  description: string;
  status: string;
  invoice_number: string;
  issued_date: string;
  due_date: string;
  sent_date?: string;
  paid_date?: string;
  created_at: string;
  updated_at: string;
}

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchInvoices = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInvoices(data || []);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createInvoice = useCallback(async (invoiceData: {
    user_id: string;
    amount: number;
    description?: string;
    due_date?: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .insert({
          user_id: invoiceData.user_id,
          amount: invoiceData.amount,
          description: invoiceData.description || 'Admin Fee',
          due_date: invoiceData.due_date || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          invoice_number: `INV-${Date.now()}`,
        })
        .select()
        .single();

      if (error) throw error;
      await fetchInvoices();
      return data;
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw error;
    }
  }, [fetchInvoices]);

  const sendInvoice = useCallback(async (invoiceId: string) => {
    try {
      const { error } = await supabase
        .from('invoices')
        .update({ 
          sent_date: new Date().toISOString(),
          status: 'sent'
        })
        .eq('id', invoiceId);

      if (error) throw error;
      await fetchInvoices();
    } catch (error) {
      console.error('Error sending invoice:', error);
      throw error;
    }
  }, [fetchInvoices]);

  return {
    invoices,
    loading,
    fetchInvoices,
    createInvoice,
    sendInvoice
  };
};