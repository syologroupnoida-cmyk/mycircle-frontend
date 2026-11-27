
import { Suspense } from "react";
import { notFound } from "next/navigation";
import SectionPage from "@/components/SectionPage";

const validSections = [
  "network",
  "discover",
  "messages",
  "notifications",
  "profile",
];

export function generateStaticParams() {
  return validSections.map((section) => ({
    section,
  }));
}

export default function Page({ params }) {
  return (
    <Suspense fallback={<SectionLoading />}>
      <SectionContent params={params} />
    </Suspense>
  );
}

async function SectionContent({ params }) {
  const { section } = await params;

  if (!validSections.includes(section)) {
    notFound();
  }

  return <SectionPage section={section} />;
}

function SectionLoading() {
  return (
    <main className="section-layout">
      <div style={{ padding: "40px", textAlign: "center" }}>
        Loading section...
      </div>
    </main>
  );
}
