import { createBrowserRouter, Navigate } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { AuthPage } from "./pages/AuthPage";
import { OnboardingPage } from "./pages/OnboardingPage";
import { AppShell } from "./pages/AppShell";
import { MatchPage } from "./pages/MatchPage";
import { SwipePage } from "./pages/SwipePage";
import { ChatPage } from "./pages/ChatPage";
import { CollabPage } from "./pages/CollabPage";
import { MentorPage } from "./pages/MentorPage";
import { ProfilePage } from "./pages/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: AuthPage,
  },
  {
    path: "/onboarding",
    Component: OnboardingPage,
  },
  {
    path: "/app",
    Component: AppShell,
    children: [
      { index: true, Component: () => <Navigate to="/app/swipe" replace /> },
      { path: "match", Component: MatchPage },
      { path: "swipe", Component: SwipePage },
      { path: "chat", Component: ChatPage },
      { path: "collab", Component: CollabPage },
      { path: "mentor", Component: MentorPage },
      { path: "profile", Component: ProfilePage },
    ],
  },
  {
    path: "*",
    Component: () => <Navigate to="/" replace />,
  },
]);
