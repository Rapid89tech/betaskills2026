# Test Card Usage Guide

## Overview
The payment system is currently in test mode, which means you can use test card numbers to simulate payments without being charged real money.

## Test Card Numbers

### Successful Test Cards
These cards will simulate successful payments:

- **Visa**: `4111 1111 1111 1111`
- **Mastercard**: `5555 5555 5555 4444`
- **American Express**: `3782 8224 6310 005`

### Declined Test Cards
These cards will simulate declined payments:

- **Visa (Declined)**: `4000 0000 0000 0002`
- **Mastercard (Declined)**: `5200 0000 0000 0007`

## Additional Details

### Expiry Date
- Use any future date (e.g., `12/25`, `06/26`)
- The system will validate that the date is in the future

### CVV
- Use any 3-digit number (e.g., `123`, `456`)
- For American Express, use any 4-digit number

### Cardholder Name
- Use any name (e.g., `John Doe`, `Test User`)

## How to Test

1. **Go to any course** and click "Enroll Now"
2. **Select card payment** option
3. **Use one of the test card numbers** listed above
4. **Fill in the other fields** with any valid information
5. **Submit the payment** to see the test result

## Expected Results

### Successful Payment
- You'll see a success message
- You'll be redirected to a success page
- Your enrollment will be processed
- You'll gain access to the course

### Declined Payment
- You'll see a "Card Declined" message
- You can try again with a different test card
- Or use the EFT payment option instead

## Alternative Payment Method

If you prefer not to use test cards, you can always use the **EFT / Bank Transfer** option:

1. Click "Pay via EFT / Bank Transfer"
2. View the banking details
3. Make a real bank transfer
4. Upload proof of payment
5. Wait for manual approval

## Production Mode

When the system is switched to production mode:
- Real card numbers will be required
- Real payments will be processed
- Test card numbers will be rejected
- All transactions will be live

## Troubleshooting

### "Payment system unavailable" error
- This means the payment integration isn't properly configured
- Use the EFT payment option instead
- Contact support if the issue persists

### "Invalid card number" error
- Make sure you're using one of the test card numbers exactly as shown
- Check that you've entered all digits correctly
- Try copying and pasting the card number

### "Card expired" error
- Make sure you're using a future expiry date
- Use format MM/YY (e.g., 12/25)

## Support

If you encounter any issues with test payments:
1. Try the EFT payment option
2. Check the browser console for error messages
3. Contact technical support with details of the error