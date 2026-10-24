"use client";

import { useState } from "react";
import { course } from "@/data/course";
import { daysBetween, formatStudyDate, useToday } from "@/lib/dates";
import { useProgress } from "@/lib/progress";
import { getDayStats } from "@/lib/stats";
import DataTools from "./DataTools";
import DayTabs from "./DayTabs";
import DayView from "./DayView";
import Overview from "./Overview";

export default function StudyApp() {
  const progress = useProgress();
  const today = useToday();
  const [pickedDay, setPickedDay] = useState<number | null>(null);

  const stats = course.days.map((day) => getDayStats(day, progress));
  const offset = progress.startDate && today ? daysBetween(progress.startDate, today) : null;
  const todayDay = offset !== null && offset >= 0 && offset < course.days.length ? offset + 1 : null;
  const firstOpenDay = course.days.find((_, i) => !stats[i].complete)?.day ?? 1;
  const day = course.days[(pickedDay ?? todayDay ?? firstOpenDay) - 1];

  return (
    <div className="app">
      <Overview stats={stats} startDate={progress.startDate} offset={offset} />
      <DayTabs
        days={course.days}
        stats={stats}
        activeDay={day.day}
        todayDay={todayDay}
        onSelect={setPickedDay}
      />
      <DayView
        key={day.day}
        day={day}
        progress={progress}
        dateLabel={progress.startDate ? formatStudyDate(progress.startDate, day.day - 1) : null}
        isToday={todayDay === day.day}
      />
      <DataTools />
    </div>
  );
}
