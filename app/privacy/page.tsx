import { SimplePage } from '@/components/simple-page';

export const metadata = { title: 'Privacy — Amazon Deals', description: 'Amazon Deals privacy information.' };

export default function PrivacyPage() {
  return <SimplePage eyebrow="Last updated September 1, 2026" title="Privacy"><p>Amazon Deals collects only the information needed to operate saved deals, profiles, and alerts. Anonymous visitors can browse without creating an account.</p><h2>Account and alert information</h2><p>If you sign in or create an alert, the service may store your account identifier, email address, saved product identifiers, keywords, categories, and discount thresholds.</p><h2>Outbound links</h2><p>Opening a deal sends you to Amazon. Amazon&apos;s privacy practices apply once you leave this site. Affiliate parameters may be included so qualifying purchases can be attributed.</p><h2>Your choices</h2><p>You can remove saved products, disable alerts, or request deletion of profile information from the profile area once production account services are connected.</p></SimplePage>;
}

