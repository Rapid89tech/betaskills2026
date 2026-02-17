import type { Module } from '@/types/course';
import { lesson1PaymentCheckout } from './lesson1-payment-checkout';
import { lesson2TaxesLegal } from './lesson2-taxes-legal';
import { lesson3ShippingFulfillment } from './lesson3-shipping-fulfillment';
import { lesson4InventoryManagement } from './lesson4-inventory-management';
import { lesson5ReturnsRefunds } from './lesson5-returns-refunds';
import { lesson6FraudPrevention } from './lesson6-fraud-prevention';
import { quiz6 } from './quiz6';

export const module6: Module = {
  id: 6,
  title: 'Payments, Legal, and Operations',
  description: 'Learn how to set up secure payment processing, understand tax and legal requirements, manage shipping and inventory, create fair return policies, and prevent fraud to run a compliant, efficient online business.',
  lessons: [
    lesson1PaymentCheckout,
    lesson2TaxesLegal,
    lesson3ShippingFulfillment,
    lesson4InventoryManagement,
    lesson5ReturnsRefunds,
    lesson6FraudPrevention
  ],
  quiz: quiz6
};
