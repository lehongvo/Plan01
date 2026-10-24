import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home-screen icon for "Add to Home Screen" on iPhone and iPad.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#c2410c",
          color: "#fff",
          fontSize: 112,
          fontWeight: 700,
        }}
      >
        P
      </div>
    ),
    size,
  );
}
