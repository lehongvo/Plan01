"use client";

import { useState } from "react";
import { course } from "@/data/course";
import { START_DATE } from "@/data/plan";
import { formatStudyDate, useToday } from "@/lib/dates";
import { useCourseProgress } from "@/lib/course-progress";
import { getDayStats } from "@/lib/course-stats";
import { useI18n } from "@/lib/i18n";
import { planDayFor } from "@/lib/schedule";
import CourseDay from "./CourseDay";
import CourseOverview from "./CourseOverview";
import CourseTabs from "./CourseTabs";

/** The 85-video Rust course, studied in the Rust slots of plan days 1–7. */
export default function RustCourse() {
  const progress = useCourseProgress();
  const startDate = START_DATE;
  const today = useToday();
  const { lang } = useI18n();
  const [pickedDay, setPickedDay] = useState<number | null>(null);

  const stats = course.days.map((day) => getDayStats(day, progress));
  const todayPlanDay = today ? planDayFor(startDate, today) : null;
  const todayDay =
    todayPlanDay !== null && todayPlanDay >= 1 && todayPlanDay <= course.days.length ? todayPlanDay : null;
  const firstOpenDay = course.days.find((_, i) => !stats[i].complete)?.day ?? 1;
  const day = course.days[(pickedDay ?? todayDay ?? firstOpenDay) - 1];

  return (
    <div className="page">
      <CourseOverview stats={stats} startDate={startDate} todayPlanDay={todayPlanDay} />
      <CourseTabs days={course.days} stats={stats} activeDay={day.day} todayDay={todayDay} onSelect={setPickedDay} />
      <CourseDay
        key={day.day}
        day={day}
        progress={progress}
        dateLabel={formatStudyDate(startDate, day.day - 1, lang)}
        isToday={todayDay === day.day}
      />
    </div>
  );
}
