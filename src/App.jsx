
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
  LogOut
} from "lucide-react";

import { useState } from "react";

import Auth from "./Auth";
import Canteen from "./Canteen";
import About from "./About";
import Marketplace from "./Marketplace";
import StudentDashboard from "./StudentDashboard";


// ================= HERO SECTION =================

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

        <br />

        <p className="mb-8 text-lg leading-relaxed text-gray-200 md:text-xl">
          Announcements · Marketplace · Canteen · Attendance
        </p>

        <br /><br />

        <button
          type="button"
          onClick={onGetStarted}
          className="!inline-flex !h-14 !w-auto !min-w-[150px] !items-center !justify-center !gap-2 !whitespace-nowrap !rounded-full !border-0 !bg-teal-600 !px-8 !py-0 !text-lg !font-bold !leading-none !text-white !shadow-lg transition hover:!bg-teal-500"
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


// ================= FEATURES COMPONENT =================

function Features({ onCanteenClick, onMarketplaceClick }) {

  const cardStyle = {
    width: "270px",
    maxWidth: "100%",
    aspectRatio: "1 / 1",
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
    <section
      id="features"
      style={{
        backgroundColor: "#F0FAFA",
        padding: "65px 24px 80px",
      }}
    >

      <div style={{ textAlign: "center", marginBottom: "55px" }}>

        <p className="mb-3 font-semibold uppercase tracking-widest text-teal-700">
          Explore CampusConnect
        </p>

        <br />

        <h2 className="text-3xl font-extrabold text-[#123D50] md:text-4xl">
          Everything Your Campus Needs
        </h2>

        <br />

        <p className="mt-3 text-slate-600">
          One platform to make your campus life easier and smarter.
        </p>

      </div>

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

        {/* CAMPUS HUB */}

        <div style={cardStyle}>
          <House size={42} className="mb-5 text-teal-700" />

          <h3 className="mb-3 text-xl font-bold text-[#123D50]">
            Campus Hub
          </h3>

          <p className="leading-relaxed text-slate-600">
            Stay updated with the latest campus announcements and events.
          </p>
        </div>


        {/* MARKETPLACE */}

        <div
          style={{
            ...cardStyle,
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onClick={onMarketplaceClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onMarketplaceClick();
            }
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow =
              "0 10px 25px rgba(18, 61, 80, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 4px 15px rgba(18, 61, 80, 0.10)";
          }}
        >
          <ShoppingCart size={42} className="mb-5 text-teal-700" />

          <h3 className="mb-3 text-xl font-bold text-[#123D50]">
            Marketplace
          </h3>

          <p className="leading-relaxed text-slate-600">
            Buy and sell books, accessories and other items with ease.
          </p>
        </div>


        {/* CANTEEN */}

        <div
          style={{
            ...cardStyle,
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          onClick={onCanteenClick}
        >
          <Utensils size={42} className="mb-5 text-teal-700" />

          <h3 className="mb-3 text-xl font-bold text-[#123D50]">
            Canteen
          </h3>

          <p className="leading-relaxed text-slate-600">
            Pre-order your favourite food and save time during lunch breaks.
          </p>
        </div>


        {/* ATTENDANCE */}

        <div style={cardStyle}>
          <QrCode size={42} className="mb-5 text-teal-700" />

          <h3 className="mb-3 text-xl font-bold text-[#123D50]">
            Attendance
          </h3>

          <p className="leading-relaxed text-slate-600">
            Mark your attendance quickly and easily using QR scanning.
          </p>
        </div>

      </div>
    </section>
  );
}


// ================= STATISTICS COMPONENT =================

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
    <section
      style={{
        backgroundColor: "#F0FAFA",
        padding: "0px 24px 65px",
      }}
    >

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


// ================= NAVBAR COMPONENT =================

function Navbar({
  onAuthClick,
  onAboutClick,
  loggedInUser,
  onDashboardClick,
  onLogout
}) {

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

        {/* LOGO */}

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-[#E0F2F1] p-2">
            <GraduationCap size={36} className="text-[#123D50]" />
          </div>

          <h1 className="text-2xl font-extrabold text-[#123D50]">
            CampusConnect
          </h1>

        </div>


        {/* NAVIGATION LINKS */}

        <div className="hidden items-center gap-14 text-base font-semibold text-slate-600 md:flex">

          <a href="#home" className="text-[#0F766E]">
            Home
          </a>

          <a href="#features" className="transition hover:text-[#0F766E]">
            Features
          </a>

          <button
            onClick={onAboutClick}
            className="transition hover:text-[#0F766E]"
          >
            About
          </button>

          <a href="#contact" className="transition hover:text-[#0F766E]">
            Contact
          </a>

        </div>


        {/* AUTHENTICATED / GUEST NAVIGATION */}

        <div className="flex items-center gap-3">

          {loggedInUser ? (

            <>
              <button
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
                onClick={() => onAuthClick("login")}
                className="inline-flex min-w-[120px] items-center justify-center whitespace-nowrap rounded-full border-2 border-teal-700 px-6 py-3 text-base font-semibold text-teal-800 transition hover:bg-teal-50"
              >
                Login
              </button>

              <button
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


// ================= MAIN APP COMPONENT =================

function App() {

  const [authMode, setAuthMode] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");

  // RESTORE LOGGED-IN USER

  const [loggedInUser, setLoggedInUser] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("campusCurrentUser") || "null"
      );
    } catch {
      return null;
    }
  });

  // REMEMBER PREVIOUS PAGE

  const [previousPage, setPreviousPage] = useState("home");

  // ROLE LABEL

  const getRoleLabel = (role) => {
    const roles = {
      student: "Student",
      teacher: "Teacher",
      faculty: "Teacher",
      admin: "Admin",
    };

    return roles[(role || "").toLowerCase()] || "User";
  };

  // OPEN MARKETPLACE

  const openMarketplace = () => {
    setPreviousPage(currentPage);
    setCurrentPage("marketplace");
  };

  // LOGIN / REGISTER SUCCESS

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
    setCurrentPage("dashboard");
  };

  // UPDATE USER PROFILE

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

  // LOGOUT

  const handleLogout = () => {

    localStorage.removeItem("campusCurrentUser");

    setLoggedInUser(null);
    setAuthMode(null);
    setCurrentPage("home");
    setPreviousPage("home");
  };

  // AUTH PAGE

  if (authMode) {
    return (
      <Auth
        key={authMode}
        initialMode={authMode}
        onAuthSuccess={handleAuthSuccess}
      />
    );
  }

  // STUDENT DASHBOARD

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
        onUserUpdate={handleUserUpdate}
        onLogout={handleLogout}
        onNavigate={(page) => {

          if (page === "Dashboard") {
            setCurrentPage("dashboard");
          }

          else if (page === "Marketplace") {
            openMarketplace();
          }

          else if (page === "Canteen") {
            setCurrentPage("canteen");
          }

          else {
            alert(`${page} module will be connected soon.`);
          }

        }}
      />
    );
  }

  // MARKETPLACE PAGE

  if (currentPage === "marketplace") {

    return (
      <Marketplace
        user={loggedInUser}
        onBack={() => setCurrentPage(previousPage)}
        onLogout={handleLogout}
      />
    );
  }

  // CANTEEN PAGE

  if (currentPage === "canteen") {

    return (
      <Canteen
        user={loggedInUser}
        onLogout={handleLogout}
        onDashboardClick={() => setCurrentPage("dashboard")}
      />
    );
  }

  // ABOUT PAGE

  if (currentPage === "about") {

    return (
      <About
        onBack={() => setCurrentPage("home")}
      />
    );
  }

  // HOME PAGE

  return (
    <div className="min-h-screen bg-[#F0FAFA]">

      <Navbar
        onAuthClick={setAuthMode}
        onAboutClick={() => setCurrentPage("about")}
        loggedInUser={loggedInUser}
        onDashboardClick={() => setCurrentPage("dashboard")}
        onLogout={handleLogout}
      />

      <Hero
        loggedInUser={loggedInUser}
        onGetStarted={() => {

          if (loggedInUser) {
            setCurrentPage("dashboard");
          } else {
            setAuthMode("login");
          }

        }}
      />

      <Features
        onCanteenClick={() => setCurrentPage("canteen")}
        onMarketplaceClick={openMarketplace}
      />

      <Stats />

    </div>
  );
}

export default App;
