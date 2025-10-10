import InsightDetailClient from './InsightDetailClient';

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <InsightDetailClient id={id} />;
}
