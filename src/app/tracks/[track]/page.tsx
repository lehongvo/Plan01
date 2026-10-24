import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import TrackDetail from "@/components/TrackDetail";
import { TRACKS } from "@/data/plan";
import { tr } from "@/lib/text";

export function generateStaticParams() {
  return TRACKS.map((track) => ({ track: track.id }));
}

const findTrack = (id: string) => TRACKS.find((track) => track.id === id);

export async function generateMetadata({ params }: PageProps<"/tracks/[track]">): Promise<Metadata> {
  const track = findTrack((await params).track);
  return { title: track ? tr(track.name, "en") : "Tracks" };
}

// Reads the URL param inside Suspense so the page shell stays shared across tracks.
async function TrackFromParams({ params }: Pick<PageProps<"/tracks/[track]">, "params">) {
  const track = findTrack((await params).track);
  if (!track) notFound();
  return <TrackDetail trackId={track.id} />;
}

export default function TrackPage({ params }: PageProps<"/tracks/[track]">) {
  return (
    <Suspense fallback={<div className="page page-loading" aria-busy="true" />}>
      <TrackFromParams params={params} />
    </Suspense>
  );
}
