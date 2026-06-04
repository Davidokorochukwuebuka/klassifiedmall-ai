import NegotiationChatClient from './NegotiationChatClient';

export function generateStaticParams() {
  return [];
}

export default function Page({ params }: { params: { id: string } }) {
  return <NegotiationChatClient id={params.id} />;
}
