
import {
  GraduationCap,
  House,
  ShoppingCart,
  Utensils,
  QrCode,
  Users,
  Store,
  CalendarDays,
  Building2
} from "lucide-react";
import { useState } from "react";
import Auth from "./Auth";
import Canteen from "./Canteen";

// HERO SECTION :

function Hero() {
  return (
    <section
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
 <button type="button" className="!inline-flex !h-14 !w-auto !min-w-[150px] !items-center !justify-center !gap-2 !whitespace-nowrap !rounded-full !border-0 !bg-teal-600 !px-8 !py-0 !text-lg !font-bold !leading-none !text-white !shadow-lg transition hover:!bg-teal-500">
  <span className="text-xl">Get Started</span>
  <span className="text-2xl">→</span>
 </button>
      </div>
    </section>
  );
}


// FEATURES COMPONENT :


function Features({ onCanteenClick }) {
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
        <div style={cardStyle}>
          <House size={42} className="mb-5 text-teal-700" />
          <h3 className="mb-3 text-xl font-bold text-[#123D50]">
            Campus Hub
          </h3>
          <p className="leading-relaxed text-slate-600">
            Stay updated with the latest campus announcements and events.
          </p>
        </div>

        <div style={cardStyle}>
          <ShoppingCart size={42} className="mb-5 text-teal-700" />
          <h3 className="mb-3 text-xl font-bold text-[#123D50]">
            Marketplace
          </h3>
          <p className="leading-relaxed text-slate-600">
            Buy and sell books, accessories and other items with ease.
          </p>
        </div>

        <div
  style={{ ...cardStyle, cursor: "pointer" }}
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


// STATISTICS COMPONENT :


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



// NAVBAR COMPONENT :

function Navbar({ onAuthClick }) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-[#E0F2F1] p-2 rounded-xl">
            <GraduationCap size={36} className="text-[#123D50]" />
          </div>

          <h1 className="text-2xl font-extrabold text-[#123D50]">
            CampusConnect
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-14 text-base font-semibold text-slate-600">

          <a href="#home" className="text-[#0F766E]">Home</a>
          <a href="#features" className="hover:text-[#0F766E] transition">Features</a>
          <a href="#about" className="hover:text-[#0F766E] transition">About</a>
          <a href="#contact" className="hover:text-[#0F766E] transition">Contact</a>

        </div>

        {/* Login and Signup */}
       <div className="flex items-center gap-4 pr-2">
  <button
  onClick={() => onAuthClick("login")}
  className="inline-flex min-w-[120px] items-center justify-center whitespace-nowrap rounded-full border-2 border-teal-700 px-6 py-3 text-base font-semibold text-teal-800 transition hover:bg-teal-50"
>
  Login
</button>

<button
  onClick={() => onAuthClick("register")}
  className="inline-flex min-w-[120px] items-center justify-center whitespace-nowrap rounded-full bg-teal-700 px-6 py-3 text-base font-semibold text-white transition hover:bg-teal-800">
   Sign Up
</button>
</div>

      </div>
    </nav>



  );
}


// MAIN APP COMPONENT

function App() {
  const [authMode, setAuthMode] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");

  if (authMode) {
    return <Auth key={authMode} initialMode={authMode} />;
  }

  if (currentPage === "canteen") {
    return <Canteen />;
  }

  return (
    <div className="min-h-screen bg-[#F0FAFA]">
      <Navbar onAuthClick={setAuthMode} />
      <Hero />
      <Features onCanteenClick={() => setCurrentPage("canteen")} />
      <Stats />
    </div>
  );
}

export default App;