import type { Lesson } from '@/types/course';

export const lesson2ProjectOverviewPredictingCustomerChurn: Lesson = {
  id: 2,
  title: 'Project Overview: Predicting Customer Churn',
  duration: '25 minutes',
  type: 'video',
  content: {
    videoUrl: 'https://www.youtube.com/watch?v=MSBY28IJ47U',
    textContent: `<div class="lesson-content">

<h1>Project Overview: Predicting Customer Churn</h1>

<h2>Problem Statement</h2>

<p><strong>You are tasked with helping a telecom company predict which customers are likely to leave ("churn"). Using historical customer data — including demographics, contract types, payment history, and service usage patterns — your goal is to build a classification model that can make accurate churn predictions.</strong></p>

<h2>Business Context</h2>

<ul>
  <li><strong>Retention over acquisition: It's often 5x cheaper to keep a customer than to find a new one.</strong></li>
  <li><strong>Targeted marketing: Predictive models can help companies identify at-risk customers and take action (discounts, personalized offers).</strong></li>
  <li><strong>Revenue protection: Reducing churn directly increases profitability.</strong></li>
</ul>

</div>`
  }
};
