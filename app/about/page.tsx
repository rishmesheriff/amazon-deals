import { SimplePage } from '@/components/simple-page';

export const metadata = { title: 'About — Amazon Deals', description: 'How Amazon Deals helps shoppers compare meaningful discounts.' };

export default function AboutPage() {
  return <SimplePage eyebrow="Our approach" title="Less searching. More worthwhile deals."><p>Amazon Deals is designed to organize meaningful Amazon discounts into a clean, easy-to-filter experience. The catalog focuses on products discounted by at least 15% and makes larger 25% and 50% price drops easy to spot.</p><h2>How listings are selected</h2><p>The production service is designed to use Amazon-approved product data, calculate discounts from the current and original prices, and remove products that no longer meet the selected threshold.</p><h2>Independent and transparent</h2><p>This is an independent affiliate site. When affiliate links are activated, qualifying purchases may earn the site a commission at no additional cost to the shopper.</p></SimplePage>;
}

