// layouts/MainLayout.jsx
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#0a0a0a]">
        <Outlet />
      </main>
    </>
  );
}
