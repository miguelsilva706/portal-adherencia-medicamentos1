import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./DashboardLayout.css";

export default function DashboardLayout({ children }) {
  return (
    <div className="layout">
      <Sidebar />

      <div className="layout-content">
        <Navbar />

        <main className="layout-main">
          {children}
        </main>
      </div>
    </div>
  );
}