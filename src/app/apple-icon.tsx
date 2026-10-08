import { ImageResponse } from "next/og";

// Icône utilisée quand on ajoute le site sur l'écran d'accueil d'un iPhone.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0b1220" }}>
        <svg width="130" height="81" viewBox="0 0 96 60">
          <path d="M0 0H18A28 30 0 0 1 18 60H0ZM12 12V48H18A16 18 0 0 0 18 12Z" fillRule="evenodd" fill="#ffffff" />
          <path
            d="M44 0H72Q88 0 88 15Q88 24 81 28Q94 32 94 44Q94 60 76 60H44V48H75Q81 48 81 42Q81 36 75 36H56V24H72Q76 24 76 18Q76 12 72 12H44Z"
            fill="#3B82F6"
          />
          <path d="M2 58L40 26L46 30L10 60Z" fill="#60A5FA" />
        </svg>
      </div>
    ),
    size,
  );
}
