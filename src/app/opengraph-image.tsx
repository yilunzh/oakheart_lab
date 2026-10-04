import { ImageResponse } from "next/og";

export const alt = "Oakheart Lab: Get found by AI. Get booked.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5f4ee",
          color: "#14181a",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, fontWeight: 600, display: "flex" }}>Oakheart Lab</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            More of your customers are asking AI where to book.
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, color: "#1f5c3a" }}>
            Does it get you right?
          </div>
        </div>
        <div style={{ fontSize: 28, color: "#555b55", display: "flex" }}>
          Free AI Visibility Check · report in under 24 hours
        </div>
      </div>
    ),
    size,
  );
}
