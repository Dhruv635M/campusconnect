
import { useState } from "react";
import {
  GraduationCap,
  Search,
  Bell,
  ChevronDown,
  LayoutDashboard,
  Megaphone,
  CalendarDays,
  ShoppingBag,
  ClipboardCheck,
  BriefcaseBusiness,
  PartyPopper,
  BookOpen,
  Presentation,
  Menu,
  X,
} from "lucide-react";

// ================= ANNOUNCEMENTS =================

const announcements = [
  {
    title: "Summer Internship Drive 2025",
    date: "Apr 18, 2025",
    icon: BriefcaseBusiness,
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    title: "Cultural Fest – Registrations Open",
    date: "Apr 15, 2025",
    icon: PartyPopper,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    title: "Library Timings During Exams",
    date: "Apr 12, 2025",
    icon: BookOpen,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

// ================= EVENTS =================

const events = [
  {
    title: "Business Quiz Competition",
    date: "Apr 22, 2025",
    icon: CalendarDays,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    title: "Guest Lecture – Marketing",
    date: "Apr 25, 2025",
    icon: Presentation,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "BBA Alumni Meet",
    date: "May 02, 2025",
    icon: GraduationCap,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
];

// ================= STUDENT AVATAR =================

function StudentAvatar({ size = "large", image, name = "User" }) {
  const dimensions =
    size === "small" ? "h-10 w-10" : "h-14 w-14";

  const initial = name.trim().charAt(0).toUpperCase() || "U";

  return (
    <div
      className={`${dimensions} flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-[#E0F2F1] text-lg font-extrabold text-[#0F766E] shadow-sm`}
    >
      {image ? (
        <img
          src={image}
          alt={`${name}'s profile`}
          className="h-full w-full object-cover"
        />
      ) : (
        initial
      )}
    </div>
  );
}

// ================= DASHBOARD STATISTICS =================

function DashboardStat({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  iconColor,
}) {
  return (
    <div
      className={`flex min-h-[108px] items-center gap-3 rounded-xl border border-black/[0.04] p-3 sm:gap-4 sm:p-4 ${color}`}
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/70 ${iconColor}`}
      >
        <Icon size={23} strokeWidth={2.3} />
      </div>

      <div className="min-w-0">
        <p className="truncate text-xs font-semibold sm:text-sm">
          {title}
        </p>

        <p className="mt-1 text-xl font-extrabold leading-none text-[#123D50] sm:text-2xl">
          {value}
        </p>

        <p className="mt-1.5 text-[11px] font-medium opacity-70 sm:text-xs">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

// ================= DASHBOARD LIST =================

function DashboardList({ title, items, onViewAll }) {
  return (
    <section className="min-w-0 rounded-xl border border-slate-100 bg-white p-4 shadow-[0_2px_12px_rgba(18,61,80,0.035)] sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-sm font-extrabold text-[#123D50] sm:text-base">
          {title}
        </h2>

        <button
          type="button"
          onClick={onViewAll}
          className="shrink-0 text-xs font-bold text-[#365DCE] transition hover:text-[#0F766E]"
        >
          View All
        </button>
      </div>

      <div>
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className={`flex min-h-[68px] items-center gap-3 py-3 ${
                index !== items.length - 1
                  ? "border-b border-slate-100"
                  : ""
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${item.bg} ${item.color}`}
              >
                <Icon size={20} strokeWidth={2.2} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-[#34516A] sm:text-sm">
                  {item.title}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {item.date}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ================= STUDENT DASHBOARD =================

function StudentDashboard({
  user,
  studentName,
  course,
  profileImage = "",
  onNavigate = () => {},
}) {
  // GET CURRENT USER DETAILS

  const displayName =
    user?.name?.trim() || studentName || "User";

  const roleLabels = {
    student: "Student",
    teacher: "Teacher",
    faculty: "Teacher",
    admin: "Admin",
  };

  const displayRole =
    roleLabels[user?.role?.toLowerCase()] ||
    course ||
    "User";

  const displayImage =
    user?.profileImage || profileImage || "";

  // DASHBOARD STATES

  const [activeTab, setActiveTab] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] =
    useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  // NAVIGATION

  const navigation = [
    { name: "Dashboard", icon: LayoutDashboard },
    { name: "Campus Hub", icon: GraduationCap },
    { name: "Marketplace", icon: ShoppingBag },
    { name: "Canteen", icon: ShoppingBag },
    { name: "Attendance", icon: ClipboardCheck },
    { name: "My Orders", icon: ShoppingBag },
  ];

  const handleNavigation = (name) => {
    setActiveTab(name);
    setMobileMenu(false);

    if (name !== "Dashboard") {
      onNavigate(name);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      const match = navigation.find((item) =>
        item.name
          .toLowerCase()
          .includes(search.trim().toLowerCase())
      );

      if (match) {
        handleNavigation(match.name);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] px-3 py-4 text-[#123D50] sm:px-5 sm:py-6">

      <div className="mx-auto min-h-[650px] w-full max-w-[1450px] overflow-hidden rounded-2xl border border-[#DCE8F3] bg-white shadow-[0_4px_24px_rgba(35,79,120,0.06)]">

        {/* TOP HEADER */}

        <header className="relative flex min-h-[66px] items-center gap-3 border-b border-slate-100 px-4 py-3 sm:px-6 lg:gap-7 lg:px-7">

          {/* LOGO */}

          <button
            type="button"
            onClick={() => handleNavigation("Dashboard")}
            className="flex shrink-0 items-center gap-2"
          >
            <GraduationCap
              size={29}
              strokeWidth={2.7}
              className="text-[#123D50]"
            />

            <span className="text-lg font-extrabold tracking-tight text-[#123D50] sm:text-xl">
              CampusConnect
            </span>
          </button>

          {/* SEARCH */}

          <form
            onSubmit={handleSearch}
            className="hidden h-10 min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-[#FBFCFE] px-3 sm:flex"
          >
            <Search
              size={18}
              className="shrink-0 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search anything..."
              className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#123D50] outline-none placeholder:text-slate-400"
            />

            <button
              type="submit"
              aria-label="Search"
              className="text-slate-400 hover:text-[#0F766E]"
            >
              <Search size={17} />
            </button>
          </form>

          {/* HEADER ACTIONS */}

          <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-5">

            {/* NOTIFICATIONS */}

            <div className="relative">
              <button
                type="button"
                aria-label="Notifications"
                onClick={() =>
                  setShowNotifications(!showNotifications)
                }
                className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100"
              >
                <Bell size={21} />

                <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
                  <p className="text-sm font-bold">
                    Notifications
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    You're all caught up. New campus notifications
                    will appear here.
                  </p>
                </div>
              )}
            </div>

            {/* PROFILE */}

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-1"
              >
                <StudentAvatar
                  size="small"
                  image={displayImage}
                  name={displayName}
                />

                <ChevronDown
                  size={14}
                  className="hidden text-slate-400 sm:block"
                />
              </button>

              {showProfile && (
                <div className="absolute right-0 top-12 z-50 w-52 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">

                  <div className="flex items-center gap-3">
                    <StudentAvatar
                      size="small"
                      image={displayImage}
                      name={displayName}
                    />

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">
                        {displayName}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {displayRole}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowProfile(false)}
                    className="mt-3 w-full rounded-lg bg-slate-50 py-2 text-xs font-semibold text-[#123D50]"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

            {/* MOBILE MENU */}

            <button
              type="button"
              onClick={() => setMobileMenu(!mobileMenu)}
              className="rounded-lg p-2 text-[#123D50] hover:bg-slate-100 lg:hidden"
              aria-label="Toggle navigation"
            >
              {mobileMenu ? <X size={21} /> : <Menu size={21} />}
            </button>

          </div>
        </header>

        {/* NAVIGATION BAR */}

        <nav className="hidden min-h-[53px] items-center gap-2 border-b border-slate-100 px-5 py-2 lg:flex lg:px-7">

          {navigation.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => handleNavigation(item.name)}
              className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-xs font-bold transition xl:px-5 ${
                activeTab === item.name
                  ? "bg-[#365FE8] text-white shadow-[0_3px_8px_rgba(54,95,232,0.2)]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-[#0F766E]"
              }`}
            >
              {item.name}
            </button>
          ))}

        </nav>

        {/* MOBILE NAVIGATION */}

        {mobileMenu && (
          <nav className="grid grid-cols-2 gap-2 border-b border-slate-100 p-4 lg:hidden">

            {navigation.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => handleNavigation(item.name)}
                className={`rounded-lg px-3 py-3 text-left text-xs font-bold ${
                  activeTab === item.name
                    ? "bg-[#365FE8] text-white"
                    : "bg-slate-50 text-slate-600"
                }`}
              >
                {item.name}
              </button>
            ))}

          </nav>
        )}

        {/* DASHBOARD CONTENT */}

        <main className="px-4 pb-7 pt-6 sm:px-6 sm:pt-7 lg:px-7 lg:pt-8">

          {/* WELCOME / USER PROFILE */}

          <section className="mb-7 flex min-h-[65px] items-center gap-3 sm:mb-8 sm:gap-4">

            <StudentAvatar
              size="large"
              image={displayImage}
              name={displayName}
            />

            <div className="min-w-0">

              <h1 className="text-base font-extrabold tracking-tight text-[#123D50] sm:text-lg">
                Good Morning, {displayName}{" "}
                <span className="inline-block">👋</span>
              </h1>

              <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                {displayRole}
              </p>

            </div>
          </section>

          {/* STATISTIC CARDS */}

          <section className="mb-5 grid grid-cols-2 gap-3 sm:mb-5 sm:gap-4 xl:grid-cols-4">

            <DashboardStat
              title="Announcements"
              value="5"
              subtitle="5 New"
              icon={Megaphone}
              color="bg-[#F0ECFA]"
              iconColor="text-[#5145C7]"
            />

            <DashboardStat
              title="Upcoming Events"
              value="3"
              subtitle="3 This Week"
              icon={CalendarDays}
              color="bg-[#FCEBFA]"
              iconColor="text-[#9C45A0]"
            />

            <DashboardStat
              title="My Orders"
              value="2"
              subtitle="2 Active"
              icon={ShoppingBag}
              color="bg-[#FFF5E5]"
              iconColor="text-[#D68A16]"
            />

            <DashboardStat
              title="Attendance"
              value="92%"
              subtitle="Overall"
              icon={ClipboardCheck}
              color="bg-[#E4F8F4]"
              iconColor="text-[#168D7C]"
            />

          </section>

          {/* ANNOUNCEMENTS AND EVENTS */}

          <section className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2 lg:gap-5">

            <DashboardList
              title="Recent Announcements"
              items={announcements}
              onViewAll={() => onNavigate("Campus Hub")}
            />

            <DashboardList
              title="Upcoming Events"
              items={events}
              onViewAll={() => onNavigate("Campus Hub")}
            />

          </section>

        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;
