import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(124,92,255,0.30), transparent 70%), radial-gradient(40% 35% at 90% 10%, rgba(0,212,168,0.20), transparent 70%), linear-gradient(180deg, #07070b 0%, #0f0f17 100%)",
          color: "#ededf2",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "monospace",
              fontWeight: 600,
              fontSize: 16,
              color: "#ededf2",
            }}
          >
            RS
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 18,
              color: "#a1a1aa",
              letterSpacing: 1,
            }}
          >
            rajareddy.site
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 28,
              fontFamily: "monospace",
              letterSpacing: 4,
              color: "#a1a1aa",
              textTransform: "uppercase",
            }}
          >
            {site.role}
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              letterSpacing: -2,
              lineHeight: 1.05,
              color: "#ededf2",
              maxWidth: 1000,
            }}
          >
            Building secure systems that scale.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#a1a1aa",
              maxWidth: 1000,
              lineHeight: 1.4,
            }}
          >
            {`${site.name} · 150+ CVEs · 100+ incidents · M.S. Cybersecurity, FIU`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "monospace",
            fontSize: 18,
            color: "#6b6b76",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <div>Miami, FL · Open to roles</div>
          <div>github.com/raja045</div>
        </div>
      </div>
    ),
    size,
  );
}
