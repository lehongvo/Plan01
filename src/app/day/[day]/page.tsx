import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import DayPlan from "@/components/DayPlan";
import { TOTAL_DAYS } from "@/data/plan";

export function generateStaticParams() {
  return Array.from({ length: TOTAL_DAYS }, (_, i) => ({ day: String(i + 1) }));
}

function parseDay(value: string) {
  const day = Number(value);
  return Number.isInteger(day) && day >= 1 && day <= TOTAL_DAYS ? day : null;
}

export async function generateMetadata({ params }: PageProps<"/day/[day]">): Promise<Metadata> {
  const { day } = await params;
  return { title: `Day ${day}` };
}

// Reads the URL param inside Suspense so the page shell stays shared across days.
async function DayFromParams({ params }: Pick<PageProps<"/day/[day]">, "params">) {
  const day = parseDay((await params).day);
  if (day === null) notFound();
  return <DayPlan day={day} />;
}

export default function DayPage({ params }: PageProps<"/day/[day]">) {
  return (
    <div className="page">
      <Suspense fallback={<div className="page-loading" aria-busy="true" />}>
        <DayFromParams params={params} />
      </Suspense>
    </div>
  );
}
