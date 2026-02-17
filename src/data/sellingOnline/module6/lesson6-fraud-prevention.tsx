import type { Lesson } from '@/types/course';

export const lesson6FraudPrevention: Lesson = {
  id: 6,
  title: 'Fraud Prevention',
  duration: '45 min',
  type: 'video',
  content: {
    videoUrl: 'https://youtu.be/wMjTbTS7Ybc',
    textContent: `
# Fraud Prevention

Strong fraud prevention measures protect your revenue in rands, reduce chargeback ratios, and maintain healthy relationships with payment providers. By layering multiple checks that work together intelligently, you minimize fraudulent transactions while keeping the shopping experience fast and convenient for honest customers, ultimately supporting sustainable growth and trust.

Fraud prevention is essential for protecting your business and legitimate customers.

https://youtu.be/wMjTbTS7Ybc

## 3D Secure Authentication

Implement 3D Secure (often branded as Verified by Visa or Mastercard SecureCode) for card transactions, which adds an extra layer of verification by redirecting customers to their bank for a one-time password or biometric confirmation.

This shifts liability for chargebacks to the issuing bank in most cases and significantly reduces fraudulent card-not-present transactions. It is particularly effective for local card payments and provides peace of mind without overly complicating the checkout for legitimate buyers.

### How 3D Secure Works

1. Customer enters card details at checkout

2. System detects 3D Secure enrollment

3. Customer redirected to bank authentication page

4. Customer enters OTP, password, or biometric verification

5. Bank confirms identity

6. Customer returned to complete purchase

### 3D Secure Benefits
- Shifts chargeback liability to bank
- Reduces fraudulent transactions significantly
- Required by many payment processors
- Familiar to customers in South Africa
- Protects high-value transactions
- Builds customer confidence

### Implementation Considerations
- Ensure smooth redirect experience
- Provide clear instructions
- Handle authentication failures gracefully
- Test across different banks
- Monitor abandonment rates
- Offer support for authentication issues

## Address Verification System (AVS)

Enable AVS checks that compare the billing address provided by the customer with the address on file at their card issuer. Partial or full mismatches can flag potentially fraudulent orders for review.

While not foolproof on its own, combining AVS with other checks creates a stronger barrier against stolen card details being used with fabricated addresses.

### AVS Check Levels

Full Match: Address and postal code match exactly

Partial Match: Some elements match, others don't

No Match: Address doesn't match card issuer records

Not Supported: Card issuer doesn't support AVS

### AVS Response Actions

Full Match: Process order normally

Partial Match: Flag for manual review or additional verification

No Match: Decline automatically or require additional verification

Not Supported: Use other fraud indicators

### AVS Limitations
- Not all banks support AVS
- Address format differences cause false positives
- Customers may use different addresses legitimately
- International cards often fail AVS
- Should be combined with other checks

## CVV/CVC Mandatory Requirement

Always require the three- or four-digit security code on the back of the card, as fraudsters who obtain card numbers through data breaches often lack this detail.

Rejecting transactions without a valid CVV prevents many basic fraud attempts and is a simple, effective first line of defense that does not inconvenience genuine customers.

### CVV Security Benefits

Not Stored: Merchants cannot store CVV, limiting breach exposure

Physical Card Required: Proves possession of actual card

Simple Implementation: Easy to add to checkout forms

Industry Standard: Expected by customers

Reduces Fraud: Blocks many stolen card number attempts

### CVV Best Practices
- Make CVV field mandatory
- Show card diagram indicating CVV location
- Explain why it's required
- Never store CVV after transaction
- Validate format (3 or 4 digits)
- Decline transactions without valid CVV

## Velocity and Pattern Monitoring

Use rules to detect unusual purchasing behavior, such as multiple orders from the same IP address in a short time, repeated failed attempts, or sudden large orders from new accounts.

Automated systems can flag or block these patterns, stopping organized fraud rings that test stolen cards rapidly before they are reported.

### Suspicious Patterns to Monitor

Multiple Orders: Same IP, email, or card in short timeframe

Failed Attempts: Repeated declined transactions

Large Orders: Unusually high value from new customer

Rapid Succession: Multiple orders within minutes

Mismatched Information: Billing and shipping details don't align

High-Risk Products: Orders for easily resold items

### Velocity Rules Examples

IP Address: Maximum 3 orders per hour from same IP

Email Address: Maximum 5 orders per day from same email

Card Number: Maximum 2 attempts with same card if declined

New Account: Flag orders over R2,000 from accounts less than 24 hours old

### Automated Responses
- Flag for manual review
- Require additional verification
- Temporarily block IP or email
- Decline transaction automatically
- Contact customer for confirmation
- Increase fraud score

## IP Geolocation and Proxy Detection

Cross-check the customer's IP address location against the billing and shipping addresses. Significant mismatches—such as an order billed locally but placed from overseas—or the use of known VPNs and proxies can trigger additional scrutiny.

This helps identify fraudsters attempting to mask their true location while allowing legitimate travelers to proceed with manual overrides if needed.

### Geolocation Checks

IP Location: Identify country and city of IP address

Billing Address: Compare to billing address provided

Shipping Address: Compare to shipping destination

Proxy Detection: Identify VPN, proxy, or anonymizer use

### Risk Indicators

High Risk:
- IP in different country than billing address
- Known proxy or VPN detected
- IP from high-fraud region
- Anonymous browsing tools used

Medium Risk:
- IP in different city than billing address
- Mobile IP (less precise location)
- Public WiFi or shared IP

Low Risk:
- IP matches billing address location
- Residential IP address
- Consistent with previous orders

### Handling Mismatches
- Flag for manual review
- Request additional verification
- Contact customer to confirm
- Allow legitimate explanations (traveling, VPN for work)
- Document decision process

## Fraud Scoring Tools and AI Detection

Integrate third-party fraud prevention services that assign real-time risk scores to each transaction based on hundreds of data points, including device fingerprinting, behavioral analysis, and historical fraud patterns.

Low-risk orders process automatically, while high-risk ones route for manual review or additional verification, striking a balance between security and smooth checkout.

### Fraud Detection Services

Riskified: Machine learning fraud prevention

Signifyd: Guaranteed fraud protection

Kount: AI-powered fraud detection

Sift: Digital trust and safety platform

Forter: Real-time fraud prevention

### Fraud Score Factors

Device Fingerprinting: Unique device identification

Behavioral Analysis: Mouse movements, typing patterns

Purchase History: Previous transactions and patterns

Account Age: New vs established accounts

Email Reputation: Email address history and validity

Social Signals: Social media presence verification

### Score-Based Actions

Low Risk (0-30): Auto-approve and process

Medium Risk (31-70): Manual review or additional checks

High Risk (71-100): Decline or require strong verification

## Manual Review for High-Risk Orders

Establish a process where flagged orders are held for quick human review—checking details like email domain age, phone number validity, or contacting the customer directly for confirmation.

This catches sophisticated fraud that automated tools might miss and prevents legitimate orders from being wrongly declined, preserving customer satisfaction.

### Manual Review Process

1. Order flagged by automated system

2. Reviewer examines order details

3. Check email, phone, address validity

4. Review customer history if available

5. Contact customer if needed

6. Make approve/decline decision

7. Document reasoning

### Review Checklist

Email Address: Valid domain, not disposable email service

Phone Number: Valid format, matches location

Address: Real address, not freight forwarder

Order Details: Reasonable items and quantities

Customer Response: Answers verification questions appropriately

Social Presence: Legitimate social media profiles (if checked)

### Review Best Practices
- Respond within 2-4 hours during business hours
- Be polite and professional when contacting customers
- Explain verification is for their protection
- Document all decisions and reasoning
- Learn from false positives and negatives
- Refine rules based on review outcomes

## Blacklists and Whitelists

Maintain internal lists of known fraudulent emails, IP addresses, card BINs, or shipping addresses, and automatically block or flag matches. Conversely, whitelist trusted repeat customers for frictionless checkout.

Regularly update these lists from chargeback data and industry-shared intelligence to stay ahead of evolving threats.

### Blacklist Management

Email Addresses: Known fraudulent emails

IP Addresses: Sources of previous fraud

Card BINs: Compromised card ranges

Shipping Addresses: Freight forwarders, known fraud addresses

Phone Numbers: Fake or VoIP numbers used in fraud

### Whitelist Management

Trusted Customers: Verified repeat buyers

Corporate Accounts: Established business customers

VIP Customers: High-value loyal customers

Verified Addresses: Confirmed safe delivery locations

### List Maintenance
- Update after each chargeback
- Remove outdated entries periodically
- Share data with fraud prevention networks
- Document reasons for additions
- Review whitelist for continued validity
- Balance security with customer experience

## Post-Order Verification Calls or Emails

For very high-value orders in rands or those with any risk flags, follow up with a quick verification call or secure email requesting basic confirmation.

This extra step deters fraudsters who cannot respond convincingly and reassures genuine customers that you take security seriously.

### Verification Methods

Phone Call: Quick call to confirm order details

Email Verification: Request confirmation via email

SMS Verification: Send code to provided phone number

Document Request: Ask for ID or card photo (last 4 digits visible)

### Verification Questions

Order Confirmation: "Did you place an order for [items] on [date]?"

Delivery Address: "Can you confirm the delivery address?"

Payment Method: "Can you confirm the last 4 digits of the card used?"

Order Purpose: "What's the occasion for this purchase?"

### Verification Best Practices
- Contact within 1-2 hours of order
- Be professional and courteous
- Explain it's standard security procedure
- Keep verification brief
- Document responses
- Process approved orders quickly
- Offer alternative verification if customer unavailable

## Chargeback Management

When chargebacks occur despite prevention efforts, respond promptly with evidence to dispute illegitimate claims. Track chargeback rates and reasons to identify patterns and improve prevention strategies.

Maintaining low chargeback ratios (typically under 1%) is essential for keeping payment processor relationships healthy and avoiding penalties or account termination.

### Chargeback Response Process

1. Receive chargeback notification

2. Gather evidence (order details, delivery confirmation, communication)

3. Submit dispute within deadline

4. Provide compelling evidence

5. Await decision

6. Learn from outcome

### Evidence to Provide

Order Details: Complete transaction information

Delivery Confirmation: Proof of delivery with signature

Customer Communication: Emails, messages confirming order

IP and Device Data: Geolocation and device information

AVS/CVV Results: Verification check results

Terms Acceptance: Proof customer agreed to terms

### Chargeback Prevention
- Clear product descriptions
- Accurate delivery estimates
- Responsive customer service
- Easy refund process
- Delivery confirmation
- Clear billing descriptor
- Proactive communication

Strong fraud prevention protects your business, legitimate customers, and payment relationships. By implementing layered security measures that balance protection with user experience, you minimize losses while maintaining smooth operations that support sustainable growth in rands.
    `
  }
};
