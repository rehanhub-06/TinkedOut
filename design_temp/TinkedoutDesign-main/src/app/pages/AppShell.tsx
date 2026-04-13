import { Outlet } from "react-router";
import { AppNav } from "../components/AppNav";
import { AnimatedBackground } from "../components/AnimatedBackground";

export function AppShell() {
  return (
    <div style={{ minHeight: "100vh", background: "#0F1115", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <AnimatedBackground />
      <AppNav />
      {/* Content area — offset for sidebar on desktop */}
      <div
        style={{
          marginLeft: 68,
          minHeight: "100vh",
          position: "relative",
          zIndex: 1,
        }}
        className="app-content"
      >
        <Outlet />
      </div>
      <style>{`
        @media (max-width: 768px) {
          .app-content { margin-left: 0 !important; padding-bottom: 100px; }
        }
      `}</style>
    </div>
  );
}
