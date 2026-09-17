import { tracks } from "@/lib/curriculum/tracks";
import TrackContent from "./track-content";
import { use } from "react";

export function generateStaticParams() {
  return tracks.map((t) => ({
    trackId: t.id,
  }));
}

export default function TrackPage({ params }: { params: Promise<{ trackId: string }> }) {
  return <TrackContent params={params} />;
}
