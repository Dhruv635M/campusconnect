
import { useState } from "react";
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  Megaphone,
  CalendarDays,
  BookOpen,
  ShoppingBag,
  Utensils,
  ClipboardCheck,
  BarChart3,
  Settings,
  LogOut,
  Search,
  Bell,
  Package,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";

// ================= DASHBOARD STATISTICS =================

const stats = [
  {
    label: "Total Students",
    value: "482",
    icon: Users,
    color: "blue",
    note: "Registered students",
  },
  {
    label: "Total Orders",
    value: "156",
    icon: ShoppingCart,
    color: "green",
    note: "Canteen orders",
  },
  {
    label: "Marketplace Items",
    value: "89",
    icon: Package,
    color: "rose",
    note: "Active listings",
  },
  {
    label: "Attendance Rate",
    value: "92%",
    icon: ClipboardCheck,
    color: "indigo",
    note: "Overall attendance",
  },
];

// ================= SIDEBAR NAVIGATION =================

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Users", icon: Users },
  { label: "Announcements", icon: Megaphone },
  { label: "Events", icon: CalendarDays },
  { label: "Resources", icon: BookOpen },
  { label: "Marketplace", icon: ShoppingBag },
  { label: "Canteen Orders", icon: Utensils },
  { label: "Attendance", icon: ClipboardCheck },
  { label: "Reports", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

// ================= RECENT ORDERS =================

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

// ================= COLORS =================

const colorStyles = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-emerald-50 text-emerald-600",
  rose: "bg-rose-50 text-rose-600",
  indigo: "bg-indigo-50 text-indigo-600",
};

// ================= ADMIN DASHBOARD =================

function AdminDashboard({
  user,
  onLogout = () => {},
  onNavigate = () => {},
  onProfileClick = () => {},
}) {
  const [activePage, setActivePage] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const adminName = user?.name || "Administrator";

  const getInitials = (name) =>
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "A";

  const statusStyles = {
    Preparing: "bg-amber-50 text-amber-700",
    Pending: "bg-orange-50 text-orange-700",
    Ready: "bg-emerald-50 text-emerald-700",
    Delivered: "bg-teal-50 text-teal-700",
  };

  // ================= NAVIGATION HANDLER =================

  const handleNavigation = (page) => {
    setActivePage(page);
    setSidebarOpen(false);

    if (page === "Settings") {
      onProfileClick();
      return;
    }

    if (page === "Marketplace") {
      onNavigate("Marketplace");
      return;
    }

    if (page === "Canteen Orders") {
      onNavigate("Canteen");
      return;
    }

    // Other admin sections remain on the admin dashboard.
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-slate-800">
      <div className="flex min-h-screen">

        {/* MOBILE SIDEBAR OVERLAY */}

        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          />
        )}

        {/* SIDEBAR */}

        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-[250px] flex-col bg-[#102342] text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* LOGO */}

          <div className="flex h-[82px] items-center justify-between border-b border-white/10 px-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/10 p-2">
                <GraduationCap size={25} />
              </div>

              <div>
                <h1 className="text-lg font-extrabold tracking-tight">
                  CampusConnect
                </h1>

                <p className="text-[10px] font-semibold uppercase tracking-[2px] text-blue-200">
                  Administration
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-2 text-slate-300 hover:bg-white/10 lg:hidden"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* NAVIGATION */}

          <div className="px-4 py-6">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[2px] text-slate-400">
              Main Menu
            </p>

            <nav className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = activePage === item.label;

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleNavigation(item.label)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition ${
                      active
                        ? "bg-[#2463D3] text-white shadow-lg shadow-blue-950/20"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* SIDEBAR PROFILE AND LOGOUT */}

          <div className="mt-auto border-t border-white/10 p-4">
            <button
              type="button"
              onClick={onProfileClick}
              className="mb-3 flex w-full items-center gap-3 rounded-xl bg-white/5 p-3 text-left transition hover:bg-white/10"
              title="Open Profile Settings"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-500 text-sm font-bold text-white">
                {getInitials(adminName)}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {adminName}
                </p>

                <p className="text-xs text-slate-400">
                  Administrator
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-slate-300 transition hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>

        {/* MAIN AREA */}

        <div className="min-w-0 flex-1">

          {/* TOP HEADER */}

          <header className="sticky top-0 z-30 flex min-h-[82px] items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 sm:px-7">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
                aria-label="Open navigation"
              >
                <Menu size={22} />
              </button>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  CampusConnect / Admin
                </p>

                <h2 className="text-lg font-bold text-[#102342] sm:text-xl">
                  {activePage}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-5">

              {/* SEARCH */}

              <div className="hidden h-10 w-56 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 md:flex">
                <Search size={17} className="text-slate-400" />

                <input
                  type="text"
                  placeholder="Search dashboard..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>

              {/* NOTIFICATIONS */}

              <button
                type="button"
                aria-label="Notifications"
                className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
              >
                <Bell size={21} />

                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-amber-500" />
              </button>

              {/* PROFILE SETTINGS */}

              <button
                type="button"
                onClick={onProfileClick}
                title="Profile Settings"
                aria-label="Open Profile Settings"
                className="flex items-center gap-2 border-l border-slate-200 pl-3 transition hover:opacity-80 sm:pl-5"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0F2F1] text-sm font-bold text-[#0F766E]">
                  {getInitials(adminName)}
                </div>

                <div className="hidden text-left sm:block">
                  <p className="max-w-[130px] truncate text-sm font-bold text-[#102342]">
                    {adminName}
                  </p>

                  <p className="text-xs text-slate-500">
                    Admin
                  </p>
                </div>

                <Settings
                  size={17}
                  className="hidden text-slate-400 sm:block"
                />
              </button>
            </div>
          </header>

          {/* DASHBOARD CONTENT */}

          <main className="mx-auto max-w-[1600px] p-4 sm:p-7">

            {/* WELCOME SECTION */}

            <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Welcome back, {adminName}
                </p>

                <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-[#102342] sm:text-3xl">
                  Admin Dashboard
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Here's what's happening across your campus.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-500">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-500" />
                Dashboard Overview
              </div>
            </div>

            {/* STATISTICS CARDS */}

            <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-500">
                          {stat.label}
                        </p>

                        <h3 className="mt-3 text-3xl font-extrabold tracking-tight text-[#102342]">
                          {stat.value}
                        </h3>

                        <p className="mt-1 text-xs text-slate-400">
                          {stat.note}
                        </p>
                      </div>

                      <div
                        className={`rounded-xl p-3 ${colorStyles[stat.color]}`}
                      >
                        <Icon size={23} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>

            {/* ORDERS AND ATTENDANCE */}

            <section className="grid grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,1fr)]">

              {/* RECENT ORDERS */}

              <div className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-5">
                  <div>
                    <h2 className="text-lg font-bold text-[#102342]">
                      Recent Orders
                    </h2>

                    <p className="mt-1 text-xs text-slate-400">
                      Latest activity from your campus
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleNavigation("Canteen Orders")}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-800"
                  >
                    View all
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[650px] text-left">
                    <thead className="bg-slate-50">
                      <tr className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        <th className="px-5 py-4">Order ID</th>
                        <th className="px-5 py-4">User</th>
                        <th className="px-5 py-4">Item</th>
                        <th className="px-5 py-4">Status</th>
                        <th className="px-5 py-4">Date</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {recentOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="text-sm transition hover:bg-slate-50"
                        >
                          <td className="whitespace-nowrap px-5 py-4 font-semibold text-blue-700">
                            {order.id}
                          </td>

                          <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-700">
                            {order.user}
                          </td>

                          <td className="whitespace-nowrap px-5 py-4 text-slate-600">
                            {order.item}
                          </td>

                          <td className="whitespace-nowrap px-5 py-4">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-bold ${
                                statusStyles[order.status]
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>

                          <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-500">
                            {order.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ATTENDANCE OVERVIEW */}

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-[#102342]">
                    Attendance Overview
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">
                    Campus attendance distribution
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center gap-7 py-4 sm:flex-row 2xl:flex-col">
                  <div
                    className="relative flex h-48 w-48 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background:
                        "conic-gradient(#18B88A 0% 92%, #E34D78 92% 97%, #A7B7CC 97% 100%)",
                    }}
                  >
                    <div className="flex h-[132px] w-[132px] flex-col items-center justify-center rounded-full bg-white">
                      <span className="text-3xl font-extrabold text-[#102342]">
                        92%
                      </span>

                      <span className="mt-1 text-xs font-medium text-slate-400">
                        Present
                      </span>
                    </div>
                  </div>

                  <div className="w-full space-y-5 sm:w-auto 2xl:w-full">
                    {[
                      {
                        label: "Present",
                        value: "92%",
                        color: "bg-[#18B88A]",
                      },
                      {
                        label: "Absent",
                        value: "5%",
                        color: "bg-[#E34D78]",
                      },
                      {
                        label: "Leave",
                        value: "3%",
                        color: "bg-[#A7B7CC]",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between gap-8"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`h-3 w-3 rounded-full ${item.color}`}
                          />

                          <span className="text-sm font-medium text-slate-600">
                            {item.label}
                          </span>
                        </div>

                        <span className="text-sm font-bold text-[#102342]">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <p className="mt-7 text-center text-xs text-slate-400">
              CampusConnect Admin Panel · Dashboard preview
            </p>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
