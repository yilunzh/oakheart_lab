import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1f5c3a", borderRadius: 256 }}>
        <svg width="300" height="300" viewBox="0 0 26 26">
          <path d="M13 5.5c3.6 2.4 4.8 6.1 0 15-4.8-8.9-3.6-12.6 0-15Z" fill="#f5f4ee" />
          <path d="M13 9v11" stroke="#1f5c3a" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
