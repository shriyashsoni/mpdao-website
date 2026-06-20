import { Metadata, ResolvingMetadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const event = await fetchQuery(api.events.getEventBySlug, { slug: id }).catch(() => null);

  if (!event) {
    return {
      title: "Event Not Found | MP DAO",
      description: "This event does not exist or has been removed."
    }
  }

  const title = `${event.title} | MP DAO`;
  const description = event.slogan || event.description?.substring(0, 160) || "Join the MP DAO Event!";
  const images = event.image ? [event.image] : [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  }
}

export default function EventLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
