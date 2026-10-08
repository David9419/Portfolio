import { ImageResponse } from "next/og";

// Image d'aperçu affichée quand on partage le lien (WhatsApp, LinkedIn, Google…).
export const alt = "David Baron — Créateur digital & entrepreneur. Création de sites internet, logiciels et SaaS.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          background: "radial-gradient(circle at 85% 90%, #1d4ed8 0%, #0b1220 45%, #050a14 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <svg width="150" height="94" viewBox="0 0 96 60">
            <defs>
              <linearGradient id="b" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
            </defs>
            <path d="M0 0H18A28 30 0 0 1 18 60H0ZM12 12V48H18A16 18 0 0 0 18 12Z" fillRule="evenodd" fill="#ffffff" />
            <path
              d="M44 0H72Q88 0 88 15Q88 24 81 28Q94 32 94 44Q94 60 76 60H44V48H75Q81 48 81 42Q81 36 75 36H56V24H72Q76 24 76 18Q76 12 72 12H44Z"
              fill="url(#b)"
            />
            <path d="M2 58L40 26L46 30L10 60Z" fill="#3B82F6" />
          </svg>
          <div style={{ display: "flex", fontSize: 26, letterSpacing: 10, color: "#93c5fd" }}>PORTFOLIO</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 800, letterSpacing: -2 }}>David Baron</div>
          <div style={{ display: "flex", fontSize: 40, color: "#60a5fa", marginTop: 6 }}>Créateur digital & entrepreneur</div>
          <div style={{ display: "flex", fontSize: 30, color: "#cbd5e1", marginTop: 26 }}>
            Sites internet · Logiciels · SaaS · CRM · Design · SEO
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#94a3b8" }}>
          <span>Des idées aux projets concrets.</span>
          <span style={{ color: "white" }}>david-baron.com</span>
        </div>
      </div>
    ),
    size,
  );
}
