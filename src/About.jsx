
import {
  GraduationCap,
  ArrowLeft,
  Target,
  Eye,
  Users,
  ShoppingBag,
  Utensils,
  QrCode,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

function About({ onBack }) {
  const features = [
    {
      icon: Users,
      number: "01",
      title: "Campus Community",
      description:
        "A connected space where students can discover campus activities, stay informed and engage with their college community.",
    },
    {
      icon: ShoppingBag,
      number: "02",
      title: "Student Marketplace",
      description:
        "A convenient platform for students to buy, sell and exchange useful products within their campus.",
    },
    {
      icon: Utensils,
      number: "03",
      title: "Smart Canteen",
      description:
        "Order meals in advance, avoid long queues and collect your food conveniently during lunch breaks.",
    },
    {
      icon: QrCode,
      number: "04",
      title: "QR Attendance",
      description:
        "A smarter attendance experience using QR-based scanning to make the process faster and more convenient.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-[#183B4E]">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8 lg:px-12">

          <button onClick={onBack} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123D50] text-white">
              <GraduationCap size={23} />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#123D50]">
              CampusConnect
            </span>
          </button>

          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-[#123D50] transition hover:border-[#0F766E] hover:bg-[#E0F2F1]"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#123D50]">
        <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="absolute -right-10 -top-16 h-72 w-72 rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="max-w-3xl">

            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#A7D9CE] sm:text-sm">
              About Our Platform
            </p>

            <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Making campus life
              <span className="text-[#83CFC0]"> simpler, smarter </span>
              and more connected.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:mt-7 sm:text-lg sm:leading-8">
              CampusConnect brings essential campus services together in one
              digital platform, helping students make the most of their
              everyday college experience.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {["Student-focused", "Convenient", "Connected campus"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium text-white sm:text-sm"
                >
                  {item}
                </span>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-24">

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E] sm:text-sm">
            Who We Are
          </p>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#123D50] sm:text-4xl">
            One platform.
            <br />
            Everything campus.
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-600 sm:mt-6 sm:text-base sm:leading-8">
            College life involves more than classrooms and lectures. Students
            need a convenient way to access campus information, connect with
            one another, manage everyday activities and use college services.
          </p>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            CampusConnect is designed to bring these experiences together.
            From exploring student activities to ordering food and managing
            attendance, our platform aims to make everyday campus tasks simpler
            and more accessible.
          </p>

          <div className="mt-7 space-y-3.5">
            {[
              "Convenient access to campus services",
              "A more connected student community",
              "Simplified everyday college activities",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 size={19} className="shrink-0 text-[#0F766E]" />
                <span className="text-sm font-medium text-slate-700">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-[#E0F2F1] p-5 sm:p-8 lg:p-10">
          <div className="rounded-2xl border border-white bg-white p-6 shadow-sm sm:p-9">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#123D50] text-white">
              <GraduationCap size={29} />
            </div>

            <p className="mt-7 text-xs font-bold uppercase tracking-widest text-[#0F766E]">
              Our Approach
            </p>

            <h3 className="mt-3 text-2xl font-bold leading-snug text-[#123D50] sm:text-3xl">
              Technology that makes student life easier.
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              We aim to create a unified digital campus experience where
              useful services are easy to find, access and use.
            </p>

            <div className="mt-7 h-1.5 w-16 rounded-full bg-[#0F766E]" />
          </div>
        </div>

      </section>

      {/* MISSION & VISION */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-2 lg:gap-16 lg:px-12">

          <div className="flex gap-4 sm:gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E0F2F1] text-[#0F766E]">
              <Target size={24} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#0F766E]">
                Our Mission
              </p>
              <h3 className="mt-3 text-xl font-bold text-[#123D50] sm:text-2xl">
                Simplifying everyday campus life
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                Our mission is to provide students with a unified platform
                that simplifies campus services, encourages interaction and
                makes everyday college activities more efficient.
              </p>
            </div>
          </div>

          <div className="flex gap-4 sm:gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E0F2F1] text-[#0F766E]">
              <Eye size={24} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#0F766E]">
                Our Vision
              </p>
              <h3 className="mt-3 text-xl font-bold text-[#123D50] sm:text-2xl">
                A smarter digital campus
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                Our vision is to support a more connected and digitally
                enabled campus environment where students can access
                essential services with ease.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">

        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E] sm:text-sm">
            What We Offer
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-[#123D50] sm:text-4xl">
            Everything you need, in one place.
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
            CampusConnect brings together four key areas designed to improve
            the student experience.
          </p>
        </div>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:mt-11 lg:gap-6">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.number}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#B7D8D0] hover:shadow-lg sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E0F2F1] text-[#0F766E] transition group-hover:bg-[#123D50] group-hover:text-white">
                    <Icon size={23} />
                  </div>

                  <span className="text-sm font-semibold tracking-widest text-slate-300">
                    {feature.number}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-bold text-[#123D50] sm:text-xl">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {feature.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#0F766E]">
                  CampusConnect
                  <ArrowUpRight size={16} />
                </div>
              </div>
            );
          })}

        </div>
      </section>

      {/* CLOSING SECTION */}
      <section className="bg-[#123D50]">
        <div className="mx-auto max-w-7xl px-5 py-14 text-center sm:px-8 sm:py-16 lg:px-12 lg:py-20">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Bringing the campus closer.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
            CampusConnect aims to make college life more organised,
            accessible and connected through technology.
          </p>

          <button
            onClick={onBack}
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#83CFC0] px-6 py-3 text-sm font-semibold text-[#123D50] transition hover:bg-white"
          >
            Explore CampusConnect
            <ArrowUpRight size={18} />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 sm:px-8 md:flex-row lg:px-12">

          <div className="flex items-center gap-2">
            <GraduationCap size={21} className="text-[#0F766E]" />
            <span className="font-bold text-[#123D50]">
              CampusConnect
            </span>
          </div>

          <p className="text-center text-xs text-slate-500 sm:text-sm">
            Making campus life simpler, smarter and more connected.
          </p>

          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} CampusConnect
          </p>

        </div>
      </footer>

    </div>
  );
}

export default About;
