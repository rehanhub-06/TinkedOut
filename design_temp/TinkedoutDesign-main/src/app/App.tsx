import { RouterProvider } from "react-router";
import { router } from "./routes";
import "../styles/fonts.css";

// Global styles applied once
const globalStyle = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #0F1115; color: #FFFFFF; font-family: 'DM Sans', system-ui, sans-serif; overflow-x: hidden; }

  ::-webkit-scrollbar { width: 5px; height: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,106,61,0.25); border-radius: 999px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(255,106,61,0.45); }

  ::selection { background: rgba(255,106,61,0.3); color: #FFFFFF; }

  * { transition: background 0.2s ease, border-color 0.2s ease, opacity 0.2s ease; }
  a, button { transition: transform 0.15s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease, background 0.2s ease; }

  input, textarea, select { font-family: 'DM Sans', system-ui, sans-serif; }

  /* Playfair headings */
  h1, h2, h3 { font-family: 'Playfair Display', Georgia, serif; font-weight: 400; line-height: 1.2; }
`;

export default function App() {
  return (
    <>
      <style>{globalStyle}</style>
      <RouterProvider router={router} />
    </>
  );
}
