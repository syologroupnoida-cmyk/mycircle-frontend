import { notFound } from "next/navigation";
import SectionPage from "@/components/SectionPage";

export function generateStaticParams() {
  return ["network", "discover", "messages", "notifications", "profile"].map(section => ({ section }));
}

export default async function Page({ params }) {
  const { section } = await params;
  if (!["network", "discover", "messages", "notifications", "profile"].includes(section)) notFound();
  return <SectionPage section={section} />;
}
