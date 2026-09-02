import { SimplePage } from '@/components/simple-page';

export const metadata = { title: 'Terms — Amazon Deals', description: 'Amazon Deals terms and affiliate disclosure.' };

export default function TermsPage() {
  return <SimplePage eyebrow="Affiliate disclosure" title="Terms and shopping information"><p>Amazon Deals is a discovery service and does not sell products directly. Product purchases, payments, shipping, returns, and customer support are handled by Amazon or the seller shown on Amazon.</p><h2>Prices and availability</h2><p>Prices, discounts, ratings, Prime eligibility, and availability can change at any time. Verify the final price and terms on Amazon before purchasing.</p><h2>Affiliate relationship</h2><p>As an Amazon Associate, this site may earn from qualifying purchases. Affiliate compensation does not change the price you pay.</p><h2>Trademarks</h2><p>Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates. Amazon Deals is not Amazon and does not claim endorsement by Amazon.</p></SimplePage>;
}

