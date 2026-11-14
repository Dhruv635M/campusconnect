
import {
  GraduationCap,
  House,
  ShoppingCart,
  Utensils,
  QrCode,
  Users,
  Store,
  CalendarDays,
  Building2,
  UserCircle,
  LogOut,
  LayoutDashboard,
  Megaphone,
  BookOpen,
  ClipboardList,
  BarChart3,
  Settings,
  ShieldCheck,
  Package,
  Clock,
  CheckCircle2,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
} from "lucide-react";

import { useState } from "react";

import Auth from "./Auth";
import Canteen from "./Canteen";
import About from "./About";
import Marketplace from "./Marketplace";
import StudentDashboard from "./StudentDashboard";
import CampusHub from "./CampusHub";
import ProfileSettings from "./ProfileSettings";
import Attendance from "./Attendance";

// ======================================================
// ADMIN DASHBOARD
// ======================================================

function AdminDashboard({
  user,
  onLogout,
  onNavigate,
  onProfileClick = () => {},
}) {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Users", icon: Users },
    { name: "Announcements", icon: Megaphone },
    { name: "Events", icon: CalendarDays },
    { name: "Resources", icon: BookOpen },
    { name: "Marketplace", icon: Store },
    { name: "Canteen Orders", icon: ClipboardList },
    { name: "Attendance", icon: QrCode },
    { name: "Reports", icon: BarChart3 },
    { name: "Settings", icon: Settings },
  ];

  const stats = [
    {
      title: "Total Students",
      value: "482",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Total Orders",
      value: "156",
      icon: ShoppingCart,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Marketplace Items",
      value: "89",
      icon: Store,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      title: "Attendance Rate",
      value: "92%",
      icon: QrCode,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD001",
      user: "Riya Sharma",
      item: "Paneer Wrap",
      status: "Preparing",
      date: "Nov 14, 2026",
    },
    {
      id: "#ORD002",
      user: "Aman Verma",
      item: "Cold Coffee",
      status: "Ready",
      date: "Nov 14, 2026",
    },
    {
      id: "#ORD003",
      user: "Shreya Gupta",
      item: "Veg Thali",
      status: "Delivered",
      date: "Nov 13, 2026",
    },
    {
      id: "#ORD004",
      user: "Rohit Singh",
      item: "Backpack",
      status: "Pending",
      date: "Nov 13, 2026",
    },
  ];

  const handleMenuClick = (name) => {
    setSidebarOpen(false);

    if (name === "Marketplace") {
      setActiveTab(name);
      onNavigate("Marketplace");
    } else if (name === "Canteen Orders") {
      setActiveTab(name);
      onNavigate("Canteen");
    } else if (name === "Attendance") {
      onNavigate("Attendance");
    } else if (name === "Settings") {
      onProfileClick();
    } else {
      setActiveTab(name);
    }
  };

  const getStatusStyle = (status) => {
    const styles = {
      Preparing: "bg-amber-100 text-amber-700",
      Pending: "bg-orange-100 text-orange-700",
      Ready: "bg-emerald-100 text-emerald-700",
      Delivered: "bg-teal-100 text-teal-700",
    };

    return styles[status] || "bg-slate-100 text-slate-600";
  };

  return (
    <div className="flex min-h-screen bg-[#F3F7FB]">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#10264F] text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/10 p-2">
              <GraduationCap size={27} />
            </div>

            <div>
              <h1 className="text-lg font-extrabold">CampusConnect</h1>
              <p className="text-xs text-blue-200">Administration</p>
            </div>
          </div>

          <button
            type="button"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <div className="px-4 py-5">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[2px] text-blue-300">
            Main Menu
          </p>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleMenuClick(item.name)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-blue-100 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto border-t border-white/10 p-4">
          <button
            type="button"
            onClick={onProfileClick}
            className="mb-4 flex w-full items-center gap-3 rounded-xl bg-white/10 p-3 text-left transition hover:bg-white/15"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 font-bold text-white">
              {(user?.name || "Admin")
                .trim()
                .split(/\s+/)
                .map((part) => part[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">
                {user?.name || "Administrator"}
              </p>
              <p className="text-xs text-blue-200">Administrator</p>
            </div>

            <Settings size={16} className="text-blue-200" />
          </button>

          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-blue-100 transition hover:bg-red-500/20 hover:text-white"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 shadow-sm sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={23} />
            </button>

            <div>
              <h2 className="text-xl font-extrabold text-[#10264F] sm:text-2xl">
                {activeTab}
              </h2>
              <p className="hidden text-xs text-slate-500 sm:block">
                CampusConnect / Administration / {activeTab}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100"
              title="Orders"
              onClick={() => handleMenuClick("Canteen Orders")}
            >
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-amber-500" />
              <Package size={21} />
            </button>

            <button
              type="button"
              onClick={onProfileClick}
              title="Profile Settings"
              className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100 hover:text-teal-700"
            >
              <UserCircle size={23} />
            </button>

            <div className="hidden h-9 w-px bg-slate-200 sm:block" />

            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold text-[#10264F]">
                {user?.name || "Administrator"}
              </p>
              <p className="text-xs text-slate-500">Admin Account</p>
            </div>
          </div>
        </header>

        <div className="p-5 sm:p-8">
          {activeTab === "Dashboard" ? (
            <>
              <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-extrabold text-[#10264F]">
                    Admin Overview
                  </h1>
                  <p className="mt-1 text-sm text-slate-500">
                    Here's what's happening across your campus today.
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600">
                  <span className="inline-flex items-center gap-2">
                    <Clock size={16} className="text-teal-600" />
                    November 14, 2026
                  </span>
                </div>
              </div>

              <div className="mb-7 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.title}
                      className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold text-slate-500">
                          {stat.title}
                        </p>
                        <div className={`rounded-xl p-3 ${stat.bg} ${stat.color}`}>
                          <Icon size={22} />
                        </div>
                      </div>

                      <h2 className="mt-4 text-3xl font-extrabold text-[#10264F]">
                        {stat.value}
                      </h2>
                      <p className="mt-2 text-xs text-slate-400">
                        Campus overview
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.9fr)]">
                <section className="min-w-0 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5">
                    <div>
                      <h3 className="text-lg font-extrabold text-[#10264F]">
                        Recent Orders
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        Latest canteen and marketplace orders
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleMenuClick("Canteen Orders")}
                      className="text-sm font-bold text-blue-600 hover:text-blue-800"
                    >
                      View all
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[650px] text-left">
                      <thead className="bg-slate-50">
                        <tr className="text-xs font-bold uppercase tracking-wide text-slate-500">
                          <th className="px-5 py-4">Order ID</th>
                          <th className="px-5 py-4">User</th>
                          <th className="px-5 py-4">Item</th>
                          <th className="px-5 py-4">Status</th>
                          <th className="px-5 py-4">Date</th>
                        </tr>
                      </thead>

                      <tbody>
                        {recentOrders.map((order) => (
                          <tr
                            key={order.id}
                            className="border-t border-slate-100 text-sm transition hover:bg-slate-50"
                          >
                            <td className="whitespace-nowrap px-5 py-5 font-semibold text-blue-700">
                              {order.id}
                            </td>
                            <td className="whitespace-nowrap px-5 py-5 font-medium text-slate-700">
                              {order.user}
                            </td>
                            <td className="whitespace-nowrap px-5 py-5 text-slate-600">
                              {order.item}
                            </td>
                            <td className="px-5 py-5">
                              <span
                                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold ${getStatusStyle(
                                  order.status
                                )}`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-5 py-5 text-xs text-slate-500">
                              {order.date}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <div className="mb-5">
                    <h3 className="text-lg font-extrabold text-[#10264F]">
                      Attendance Overview
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Today's student attendance
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-7 py-5 sm:flex-row sm:justify-around 2xl:flex-col">
                    <div className="relative h-44 w-44 shrink-0">
                      <div
                        className="h-full w-full rounded-full"
                        style={{
                          background:
                            "conic-gradient(#10B981 0% 92%, #F43F5E 92% 97%, #CBD5E1 97% 100%)",
                        }}
                      />
                      <div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white">
                        <span className="text-3xl font-extrabold text-[#10264F]">
                          92%
                        </span>
                        <span className="text-xs font-medium text-slate-500">
                          Present
                        </span>
                      </div>
                    </div>

                    <div className="w-full space-y-5 sm:w-auto">
                      {[
                        ["Present", "92%", "bg-emerald-500"],
                        ["Absent", "5%", "bg-rose-500"],
                        ["Leave", "3%", "bg-slate-300"],
                      ].map(([label, value, color]) => (
                        <div
                          key={label}
                          className="flex items-center justify-between gap-8"
                        >
                          <span className="flex items-center gap-2 text-sm text-slate-600">
                            <span className={`h-3 w-3 rounded-full ${color}`} />
                            {label}
                          </span>
                          <span className="text-sm font-extrabold text-[#10264F]">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl bg-emerald-50 p-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-emerald-700">
                      <CheckCircle2 size={17} />
                      Attendance is on track
                    </div>
                    <p className="mt-1 text-xs text-emerald-700/80">
                      Overall attendance is above the expected target.
                    </p>
                  </div>
                </section>
              </div>

              <section className="mt-7 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <h3 className="mb-4 text-lg font-extrabold text-[#10264F]">
                  Quick Actions
                </h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  {[
                    { label: "Manage Users", icon: Users, tab: "Users" },
                    { label: "Announcements", icon: Megaphone, tab: "Announcements" },
                    { label: "View Reports", icon: BarChart3, tab: "Reports" },
                    { label: "Manage Events", icon: CalendarDays, tab: "Events" },
                  ].map((action) => {
                    const Icon = action.icon;

                    return (
                      <button
                        key={action.label}
                        type="button"
                        onClick={() => setActiveTab(action.tab)}
                        className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-left transition hover:border-teal-300 hover:bg-teal-50"
                      >
                        <div className="rounded-lg bg-teal-50 p-2 text-teal-700">
                          <Icon size={20} />
                        </div>
                        <span className="text-sm font-bold text-[#10264F]">
                          {action.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </section>
            </>
          ) : (
            <section className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-sm">
              <div className="mb-5 rounded-2xl bg-teal-50 p-5 text-teal-700">
                {(() => {
                  const selected = menuItems.find(
                    (item) => item.name === activeTab
                  );
                  const Icon = selected?.icon || ShieldCheck;
                  return <Icon size={38} />;
                })()}
              </div>

              <h2 className="text-2xl font-extrabold text-[#10264F]">
                {activeTab}
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500">
                The {activeTab.toLowerCase()} management section will be
                connected to the CampusConnect backend in the next stage.
              </p>

              <button
                type="button"
                onClick={() => setActiveTab("Dashboard")}
                className="mt-6 rounded-xl bg-[#10264F] px-6 py-3 text-sm font-bold text-white transition hover:bg-teal-700"
              >
                Back to Dashboard
              </button>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

// ======================================================
// HERO SECTION
// ======================================================

function Hero({ onGetStarted, loggedInUser }) {
  return (
    <section
      id="home"
      className="relative flex min-h-[520px] items-center justify-center overflow-hidden bg-cover bg-center px-6 py-20 text-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(10, 42, 55, 0.55), rgba(10, 42, 55, 0.65)), url('/campus.png')",
      }}
    >
      <div className="max-w-3xl text-white">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[4px] text-teal-200">
          Your Campus, Your Community
        </p>

        <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl">
          Welcome to <span className="text-teal-300">CampusConnect</span>
        </h1>

        <p className="mb-8 text-lg leading-relaxed text-gray-200 md:text-xl">
          Announcements · Marketplace · Canteen · Attendance
        </p>

        <button
          type="button"
          onClick={onGetStarted}
          className="inline-flex h-14 min-w-[150px] items-center justify-center gap-2 whitespace-nowrap rounded-full border-0 bg-teal-600 px-8 text-lg font-bold text-white shadow-lg transition hover:bg-teal-500"
        >
          <span className="text-xl">
            {loggedInUser ? "Go to Dashboard" : "Get Started"}
          </span>
          <span className="text-2xl">→</span>
        </button>
      </div>
    </section>
  );
}

// ======================================================
// FEATURES COMPONENT
// ======================================================

function Features({
  onCampusHubClick,
  onCanteenClick,
  onMarketplaceClick,
  onAttendanceClick,
}) {
  const features = [
    {
      title: "Campus Hub",
      description:
        "Stay updated with the latest campus announcements and events.",
      icon: House,
      action: onCampusHubClick,
    },
    {
      title: "Marketplace",
      description:
        "Buy and sell books, accessories and other items with ease.",
      icon: ShoppingCart,
      action: onMarketplaceClick,
    },
    {
      title: "Canteen",
      description:
        "Pre-order your favourite food and save time during lunch breaks.",
      icon: Utensils,
      action: onCanteenClick,
    },
    {
      title: "Attendance",
      description:
        "Mark your attendance quickly and easily using QR scanning.",
      icon: QrCode,
      action: onAttendanceClick,
    },
  ];

  return (
    <section id="features" className="bg-[#F0FAFA] px-6 py-16 sm:py-20">
      <div className="mb-12 text-center">
        <p className="mb-3 font-semibold uppercase tracking-widest text-teal-700">
          Explore CampusConnect
        </p>
        <h2 className="text-3xl font-extrabold text-[#123D50] md:text-4xl">
          Everything Your Campus Needs
        </h2>
        <p className="mt-3 text-slate-600">
          One platform to make your campus life easier and smarter.
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-[1170px] grid-cols-1 justify-items-center gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <button
              key={feature.title}
              type="button"
              onClick={feature.action}
              className="group flex aspect-square w-full max-w-[270px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white p-7 text-center shadow-[0_4px_15px_rgba(18,61,80,0.10)] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-teal-200 hover:shadow-[0_14px_30px_rgba(18,61,80,0.16)] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-4"
            >
              <div className="mb-5 rounded-2xl bg-[#E0F2F1] p-4 text-teal-700 transition-all duration-300 group-hover:scale-110 group-hover:bg-teal-700 group-hover:text-white">
                <Icon size={34} />
              </div>

              <h3 className="mb-3 text-xl font-bold text-[#123D50] transition-colors group-hover:text-teal-700">
                {feature.title}
              </h3>

              <p className="text-sm leading-relaxed text-slate-600">
                {feature.description}
              </p>

              <span className="mt-4 translate-y-1 text-xs font-bold text-teal-700 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Explore Now →
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

// ======================================================
// STATISTICS COMPONENT
// ======================================================

function Stats() {
  const stats = [
    { number: "500+", label: "Active Students", icon: Users },
    { number: "100+", label: "Marketplace Listings", icon: Store },
    { number: "50+", label: "Events This Month", icon: CalendarDays },
    { number: "98%", label: "Attendance Rate", icon: Building2 },
  ];

  const cardStyle = {
    width: "270px",
    maxWidth: "100%",
    minHeight: "190px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "white",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 4px 15px rgba(18, 61, 80, 0.10)",
  };

  return (
    <section style={{ backgroundColor: "#F0FAFA", padding: "0 24px 65px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 270px))",
          justifyContent: "center",
          gap: "30px",
          width: "100%",
          maxWidth: "1170px",
          margin: "0 auto",
        }}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div key={index} style={cardStyle}>
              <div className="mb-3 rounded-full bg-[#E0F2F1] p-3">
                <Icon size={32} className="text-[#0F766E]" />
              </div>
              <h3 className="text-4xl font-extrabold text-[#123D50]">
                {stat.number}
              </h3>
              <p className="mt-2 text-base font-medium text-slate-600">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ======================================================
// NAVBAR COMPONENT
// ======================================================

function Navbar({
  onAuthClick,
  onAboutClick,
  onContactClick,
  loggedInUser,
  onDashboardClick,
  onLogout,
}) {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#E0F2F1] p-2">
            <GraduationCap size={36} className="text-[#123D50]" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#123D50]">
            CampusConnect
          </h1>
        </div>

        <div className="hidden items-center gap-14 text-base font-semibold text-slate-600 md:flex">
          <a href="#home" className="text-[#0F766E]">
            Home
          </a>

          <a href="#features" className="transition hover:text-[#0F766E]">
            Features
          </a>

          <button
            type="button"
            onClick={onAboutClick}
            className="transition hover:text-[#0F766E]"
          >
            About
          </button>

          <button
            type="button"
            onClick={onContactClick}
            className="transition hover:text-[#0F766E]"
          >
            Contact
          </button>
        </div>

        <div className="flex items-center gap-3">
          {loggedInUser ? (
            <>
              <button
                type="button"
                onClick={onDashboardClick}
                className="flex items-center gap-2 rounded-full border border-[#CBD5E1] px-4 py-2.5 font-semibold text-[#123D50] transition hover:bg-[#E0F2F1]"
              >
                {loggedInUser.profileImage ? (
                  <img
                    src={loggedInUser.profileImage}
                    alt="Profile"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                ) : (
                  <UserCircle size={22} className="text-teal-700" />
                )}
                <span className="max-w-[130px] truncate">
                  {loggedInUser.name || "User"}
                </span>
              </button>

              <button
                type="button"
                onClick={onLogout}
                title="Logout"
                className="flex items-center gap-2 rounded-full bg-teal-700 px-4 py-3 font-semibold text-white transition hover:bg-teal-800"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => onAuthClick("login")}
                className="inline-flex min-w-[120px] items-center justify-center whitespace-nowrap rounded-full border-2 border-teal-700 px-6 py-3 text-base font-semibold text-teal-800 transition hover:bg-teal-50"
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => onAuthClick("register")}
                className="inline-flex min-w-[120px] items-center justify-center whitespace-nowrap rounded-full bg-teal-700 px-6 py-3 text-base font-semibold text-white transition hover:bg-teal-800"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

// ======================================================
// CONTACT PAGE - BUILT DIRECTLY INTO APP.JSX
// ======================================================

function ContactPage({ onBack }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    alert(
      "Thank you for contacting CampusConnect! Your message has been received in this demo."
    );

    event.target.reset();
  };

  return (
    <div className="min-h-screen bg-[#F0FAFA]">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5 shadow-sm sm:px-10">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#E0F2F1] p-2">
            <GraduationCap size={32} className="text-[#123D50]" />
          </div>
          <h1 className="text-xl font-extrabold text-[#123D50] sm:text-2xl">
            CampusConnect
          </h1>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="rounded-full bg-[#10264F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
        >
          Back to Home
        </button>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[3px] text-teal-700">
            We'd Love to Hear From You
          </p>

          <h1 className="text-4xl font-extrabold text-[#123D50] sm:text-5xl">
            Get in Touch
          </h1>

          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-600">
            Have a question, suggestion, or feedback? Reach out to the
            CampusConnect team. We're always happy to help.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-[0.85fr_1.15fr]">
          <section className="bg-[#10264F] p-8 text-white sm:p-10">
            <div className="mb-10">
              <div className="mb-5 inline-flex rounded-2xl bg-white/10 p-4">
                <MessageSquare size={30} />
              </div>

              <h2 className="text-2xl font-extrabold">
                Contact Information
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-blue-100">
                Feel free to contact us for any queries related to
                CampusConnect and its features.
              </p>
            </div>

            <div className="space-y-7">
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-white/10 p-3">
                  <Mail size={21} />
                </div>
                <div>
                  <p className="font-bold">Email Us</p>
                  <p className="mt-1 break-all text-sm text-blue-200">
                    campusconnect@example.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-white/10 p-3">
                  <Phone size={21} />
                </div>
                <div>
                  <p className="font-bold">Phone</p>
                  <p className="mt-1 text-sm text-blue-200">
                    Contact through your campus administration
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-white/10 p-3">
                  <MapPin size={21} />
                </div>
                <div>
                  <p className="font-bold">Location</p>
                  <p className="mt-1 text-sm text-blue-200">
                    CampusConnect - Your Campus Community
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 rounded-2xl border border-white/10 bg-white/10 p-5">
              <p className="text-sm font-semibold text-teal-200">
                CampusConnect
              </p>
              <p className="mt-2 text-sm leading-relaxed text-blue-100">
                Bringing students, teachers, and campus services together
                on one platform.
              </p>
            </div>
          </section>

          <section className="p-7 sm:p-10">
            <h2 className="text-2xl font-extrabold text-[#123D50]">
              Send Us a Message
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Fill in the details below and let us know how we can help.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email address"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="What is this regarding?"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows="5"
                  placeholder="Write your message here..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-teal-700 px-6 py-4 font-bold text-white shadow-md transition hover:bg-teal-800"
              >
                Send Message
                <Send size={18} />
              </button>
            </form>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white px-6 py-6 text-center text-sm text-slate-500">
        © 2026 CampusConnect. All rights reserved.
      </footer>
    </div>
  );
}

// ======================================================
// MAIN APP COMPONENT
// ======================================================

function App() {
  const [authMode, setAuthMode] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");

  const [loggedInUser, setLoggedInUser] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("campusCurrentUser") || "null"
      );
    } catch {
      return null;
    }
  });

  const [previousPage, setPreviousPage] = useState("home");

  const getRoleLabel = (role) => {
    const roles = {
      student: "Student",
      teacher: "Teacher",
      faculty: "Teacher",
      admin: "Admin",
    };

    return roles[(role || "").toLowerCase()] || "User";
  };

  // ====================================================
  // NAVIGATION HELPERS
  // ====================================================

  const openMarketplace = () => {
    setPreviousPage(currentPage);
    setCurrentPage("marketplace");
  };

  const openCampusHub = () => {
    setPreviousPage(currentPage);
    setCurrentPage("campusHub");
  };

  const openCanteen = () => {
    setPreviousPage(currentPage);
    setCurrentPage("canteen");
  };

  const openAttendance = () => {
    setPreviousPage(currentPage);
    setCurrentPage("attendance");
  };

  const openProfileSettings = () => {
    setPreviousPage(currentPage);
    setCurrentPage("profileSettings");
  };

  const openContact = () => {
    setPreviousPage(currentPage);
    setCurrentPage("contact");
  };

  // ====================================================
  // AUTH SUCCESS
  // ====================================================

  const handleAuthSuccess = (user) => {
    const updatedUser = {
      ...user,
      name: user.name?.trim() || "User",
      role: (user.role || "student").toLowerCase(),
    };

    localStorage.setItem(
      "campusCurrentUser",
      JSON.stringify(updatedUser)
    );

    setLoggedInUser(updatedUser);
    setAuthMode(null);

    if (updatedUser.role === "admin") {
      setCurrentPage("admin");
    } else {
      setCurrentPage("dashboard");
    }
  };

  // ====================================================
  // UPDATE USER PROFILE
  // ====================================================

  const handleUserUpdate = (updatedUser) => {
    const mergedUser = {
      ...loggedInUser,
      ...updatedUser,
    };

    localStorage.setItem(
      "campusCurrentUser",
      JSON.stringify(mergedUser)
    );

    setLoggedInUser(mergedUser);
  };

  // ====================================================
  // LOGOUT
  // ====================================================

  const handleLogout = () => {
    localStorage.removeItem("campusCurrentUser");

    setLoggedInUser(null);
    setAuthMode(null);
    setCurrentPage("home");
    setPreviousPage("home");
  };

  // ====================================================
  // AUTH PAGE
  // ====================================================

  if (authMode) {
    return (
      <Auth
        key={authMode}
        initialMode={authMode}
        onAuthSuccess={handleAuthSuccess}
      />
    );
  }

  // ====================================================
  // PROFILE SETTINGS PAGE
  // ====================================================

  if (currentPage === "profileSettings") {
    if (!loggedInUser) {
      return (
        <Auth
          initialMode="login"
          onAuthSuccess={handleAuthSuccess}
        />
      );
    }

    return (
      <ProfileSettings
        user={loggedInUser}
        onUserUpdate={handleUserUpdate}
        onBack={() => {
          setCurrentPage(previousPage || "dashboard");
        }}
      />
    );
  }

  // ====================================================
  // ATTENDANCE PAGE
  // ====================================================

  if (currentPage === "attendance") {
    if (!loggedInUser) {
      return (
        <Auth
          initialMode="login"
          onAuthSuccess={handleAuthSuccess}
        />
      );
    }

    return <Attendance user={loggedInUser} />;
  }

  // ====================================================
  // ADMIN DASHBOARD
  // ====================================================

  if (currentPage === "admin") {
    if (!loggedInUser || loggedInUser.role?.toLowerCase() !== "admin") {
      return (
        <Auth
          initialMode="login"
          onAuthSuccess={handleAuthSuccess}
        />
      );
    }

    return (
      <AdminDashboard
        user={loggedInUser}
        onLogout={handleLogout}
        onProfileClick={openProfileSettings}
        onNavigate={(page) => {
          if (page === "Marketplace") {
            setPreviousPage("admin");
            setCurrentPage("marketplace");
          } else if (page === "Canteen") {
            setPreviousPage("admin");
            setCurrentPage("canteen");
          } else if (page === "Attendance") {
            openAttendance();
          }
        }}
      />
    );
  }

  // ====================================================
  // STUDENT / FACULTY DASHBOARD
  // ====================================================

  if (currentPage === "dashboard") {
    if (!loggedInUser) {
      return (
        <Auth
          initialMode="login"
          onAuthSuccess={handleAuthSuccess}
        />
      );
    }

    return (
      <StudentDashboard
        user={loggedInUser}
        studentName={loggedInUser.name}
        course={getRoleLabel(loggedInUser.role)}
        profileImage={loggedInUser.profileImage || ""}
        onUserUpdate={handleUserUpdate}
        onLogout={handleLogout}
        onNavigate={(page) => {
          if (page === "Dashboard") {
            setCurrentPage("dashboard");
          } else if (page === "Marketplace") {
            openMarketplace();
          } else if (page === "Canteen") {
            openCanteen();
          } else if (page === "Campus Hub") {
            openCampusHub();
          } else if (page === "Attendance") {
            openAttendance();
          } else if (page === "Settings") {
            openProfileSettings();
          } else {
            alert(`${page} module will be connected soon.`);
          }
        }}
      />
    );
  }

  // ====================================================
  // CAMPUS HUB
  // ====================================================

  if (currentPage === "campusHub") {
    return (
      <CampusHub
        user={loggedInUser}
        onBack={() => {
          setCurrentPage(previousPage || "dashboard");
        }}
      />
    );
  }

  // ====================================================
  // MARKETPLACE
  // ====================================================

  if (currentPage === "marketplace") {
    return (
      <Marketplace
        user={loggedInUser}
        onBack={() => setCurrentPage(previousPage)}
        onLogout={handleLogout}
      />
    );
  }

  // ====================================================
  // CANTEEN
  // ====================================================

  if (currentPage === "canteen") {
    return (
      <Canteen
        user={loggedInUser}
        onLogout={handleLogout}
        onDashboardClick={() => {
          setCurrentPage(
            loggedInUser?.role?.toLowerCase() === "admin"
              ? "admin"
              : "dashboard"
          );
        }}
      />
    );
  }

  // ====================================================
  // ABOUT PAGE
  // ====================================================

  if (currentPage === "about") {
    return <About onBack={() => setCurrentPage("home")} />;
  }

  // ====================================================
  // CONTACT PAGE
  // ====================================================

  if (currentPage === "contact") {
    return (
      <ContactPage
        onBack={() => setCurrentPage(previousPage || "home")}
      />
    );
  }

  // ====================================================
  // HOME PAGE
  // ====================================================

  return (
    <div className="min-h-screen bg-[#F0FAFA]">
      <Navbar
        onAuthClick={setAuthMode}
        onAboutClick={() => setCurrentPage("about")}
        onContactClick={openContact}
        loggedInUser={loggedInUser}
        onDashboardClick={() => {
          setCurrentPage(
            loggedInUser?.role?.toLowerCase() === "admin"
              ? "admin"
              : "dashboard"
          );
        }}
        onLogout={handleLogout}
      />

      <Hero
        loggedInUser={loggedInUser}
        onGetStarted={() => {
          if (loggedInUser) {
            setCurrentPage(
              loggedInUser.role?.toLowerCase() === "admin"
                ? "admin"
                : "dashboard"
            );
          } else {
            setAuthMode("login");
          }
        }}
      />

      <Features
        onCampusHubClick={openCampusHub}
        onMarketplaceClick={openMarketplace}
        onCanteenClick={openCanteen}
        onAttendanceClick={openAttendance}
      />

      <Stats />
    </div>
  );
}

export default App;
