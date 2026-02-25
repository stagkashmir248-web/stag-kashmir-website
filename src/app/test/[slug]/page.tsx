export default async function TestPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    return <div>Test: {resolvedParams.slug}</div>;
}
