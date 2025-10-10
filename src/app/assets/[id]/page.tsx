import AssetDetailsClient from './AssetDetailsClient';

export default async function AssetDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <AssetDetailsClient id={id} />;
}
