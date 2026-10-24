import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Plan01 · 100 days",
    short_name: "Plan01",
    description: "100-day study plan: Rust, Solidity, English and Upwork.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f4f1",
    theme_color: "#c2410c",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
