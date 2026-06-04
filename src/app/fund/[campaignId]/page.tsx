import FundCampaignClient from './FundCampaignClient';

export function generateStaticParams() {
  return [];
}

export default function Page({ params }: { params: { campaignId: string } }) {
  return <FundCampaignClient campaignId={params.campaignId} />;
}
