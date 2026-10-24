import type { Metadata } from "next";
import RustCourse from "@/components/RustCourse";

export const metadata: Metadata = { title: "Rust course" };

export default function RustPage() {
  return <RustCourse />;
}
