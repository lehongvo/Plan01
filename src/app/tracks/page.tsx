import type { Metadata } from "next";
import TrackList from "@/components/TrackList";

export const metadata: Metadata = { title: "Tracks" };

export default function TracksPage() {
  return <TrackList />;
}
