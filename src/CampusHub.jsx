
import { useEffect, useMemo, useState } from "react";
import {
  GraduationCap,
  Search,
  Bell,
  ChevronDown,
  CalendarDays,
  Megaphone,
  BookOpen,
  PackageSearch,
  BriefcaseBusiness,
  PartyPopper,
  Library,
  FileText,
  Download,
  ExternalLink,
  MapPin,
  Clock,
  UserCircle,
  Plus,
  X,
  ArrowLeft,
  CheckCircle2,
  ImagePlus,
  Link as LinkIcon,
} from "lucide-react";

const initialAnnouncements = [
  {
    id: 1,
    title: "Summer Internship Drive 2026",
    date: "Nov 14, 2026",
    category: "Placements",
    description:
      "The Training and Placement Cell is organising a Summer Internship Drive. Students interested in gaining industry experience can register through the placement office. Keep your updated resume ready.",
    icon: BriefcaseBusiness,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: 2,
    title: "Cultural Fest – Registrations Open",
    date: "Nov 12, 2026",
    category: "Campus Life",
    description:
      "Registrations are open for the annual cultural fest. Students can participate in music, dance, drama, fashion and other activities. Contact the student coordinator for more information.",
    icon: PartyPopper,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    id: 3,
    title: "Library Timings During Exams",
    date: "Nov 10, 2026",
    category: "General",
    description:
      "The library will follow extended working hours during the examination period. Students are requested to carry their college identity cards.",
    icon: Library,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    id: 4,
    title: "New Study Resources Added",
    date: "Nov 08, 2026",
    category: "Academics",
    description:
      "New subject-wise study resources and reference material have been added to the Campus Hub. Visit the Resources section to explore them.",
    icon: BookOpen,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

const initialEvents = [
  {
    id: 1,
    title: "Business Quiz Competition",
    date: "Nov 22, 2026",
    time: "11:00 AM",
    location: "Main Auditorium",
    category: "Competition",
    description:
      "Test your business knowledge and compete with fellow students in an exciting campus quiz competition.",
    image:
      "pic1.jpg",
  },
  {
    id: 2,
    title: "Guest Lecture – Marketing",
    date: "Nov 25, 2026",
    time: "12:00 PM",
    location: "Seminar Hall",
    category: "Academic",
    description:
      "Join an interactive guest lecture covering modern marketing strategies, branding and digital business trends.",
    image:
      "pic2.jpg",
  },
  {
    id: 3,
    title: "BBA Alumni Meet",
    date: "Dec 02, 2026",
    time: "10:30 AM",
    location: "College Campus",
    category: "Networking",
    description:
      "Meet alumni, hear about their professional journeys and connect with graduates from different batches.",
    image:
      "pic3.jpg",
  },
];

const initialResources = [
  {
    id: 1,
    title: "DBMS Study Notes",
    subject: "Database Management Systems",
    type: "Study Notes",
    description: "Revision notes covering database concepts, ER models and SQL.",
    icon: FileText,
    color: "text-blue-600",
    bg: "bg-blue-50",
    url: "https://www.geeksforgeeks.org/dbms/",
  },
  {
    id: 2,
    title: "Java Programming Guide",
    subject: "Programming",
    type: "Reference",
    description: "Java concepts, examples and programming reference material.",
    icon: BookOpen,
    color: "text-purple-600",
    bg: "bg-purple-50",
    url: "https://dev.java/learn/",
  },
  {
    id: 3,
    title: "Computer Networks",
    subject: "Computer Networks",
    type: "Learning Resource",
    description: "Explore networking concepts, protocols and network architecture.",
    icon: Library,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    url: "https://www.geeksforgeeks.org/computer-network-tutorials/",
  },
];

const tabs = [
  { label: "Announcements", icon: Megaphone },
  { label: "Events", icon: CalendarDays },
  { label: "Resources", icon: BookOpen },
  { label: "Lost & Found", icon: PackageSearch },
];

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function StudentAvatar({ name = "User", image = "" }) {
  const initial = name.trim().charAt(0).toUpperCase() || "U";

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-[#E0F2F1] text-sm font-extrabold text-[#0F766E] shadow-sm">
      {image ? (
        <img src={image} alt={name} className="h-full w-full object-cover" />
      ) : (
        initial
      )}
    </div>
  );
}

function CampusHub({ user, onBack = () => {} }) {
  const [activeTab, setActiveTab] = useState("Announcements");
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState(() =>
    readStorage("campusHubRegistrations", [])
  );
  const [lostItems, setLostItems] = useState(() =>
    readStorage("campusHubLostFound", [])
  );
  const [showLostForm, setShowLostForm] = useState(false);
  const [lostForm, setLostForm] = useState({
    title: "",
    type: "Lost",
    location: "",
    description: "",
    contact: "",
  });

  const displayName = user?.name?.trim() || "Student";
  const profileImage = user?.profileImage || "";

  useEffect(() => {
    localStorage.setItem(
      "campusHubRegistrations",
      JSON.stringify(registeredEvents)
    );
  }, [registeredEvents]);

  useEffect(() => {
    localStorage.setItem("campusHubLostFound", JSON.stringify(lostItems));
  }, [lostItems]);

  const filteredAnnouncements = useMemo(
    () =>
      initialAnnouncements.filter((item) =>
        `${item.title} ${item.category} ${item.description}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search]
  );

  const filteredEvents = useMemo(
    () =>
      initialEvents.filter((item) =>
        `${item.title} ${item.category} ${item.location}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search]
  );

  const filteredResources = useMemo(
    () =>
      initialResources.filter((item) =>
        `${item.title} ${item.subject} ${item.type}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search]
  );

  const filteredLostItems = useMemo(
    () =>
      lostItems.filter((item) =>
        `${item.title} ${item.type} ${item.location} ${item.description}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [lostItems, search]
  );

  const toggleRegistration = (eventId) => {
    setRegisteredEvents((current) =>
      current.includes(eventId)
        ? current.filter((id) => id !== eventId)
        : [...current, eventId]
    );
  };

  const handleLostSubmit = (e) => {
    e.preventDefault();

    if (
      !lostForm.title.trim() ||
      !lostForm.location.trim() ||
      !lostForm.description.trim() ||
      !lostForm.contact.trim()
    ) {
      return;
    }

    const newItem = {
      ...lostForm,
      id: Date.now(),
      postedBy: displayName,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };

    setLostItems((current) => [newItem, ...current]);
    setLostForm({
      title: "",
      type: "Lost",
      location: "",
      description: "",
      contact: "",
    });
    setShowLostForm(false);
  };

  const pageTitle = {
    Announcements: "Latest Announcements",
    Events: "Upcoming Campus Events",
    Resources: "Study Resources",
    "Lost & Found": "Campus Lost & Found",
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] px-3 py-4 text-[#123D50] sm:px-5 sm:py-6">
      <div className="mx-auto min-h-[650px] w-full max-w-[1450px] overflow-hidden rounded-2xl border border-[#DCE8F3] bg-white shadow-[0_4px_24px_rgba(35,79,120,0.06)]">
        {/* HEADER */}
        <header className="flex min-h-[68px] flex-wrap items-center gap-3 border-b border-slate-100 px-4 py-3 sm:px-6 lg:gap-7 lg:px-7">
          <button
            type="button"
            onClick={onBack}
            className="flex shrink-0 items-center gap-2"
            title="Back to dashboard"
          >
            <GraduationCap size={29} strokeWidth={2.7} />
            <span className="text-lg font-extrabold tracking-tight sm:text-xl">
              CampusConnect
            </span>
          </button>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="order-3 flex h-10 w-full items-center gap-2 rounded-xl border border-slate-200 bg-[#FBFCFE] px-3 sm:order-none sm:ml-4 sm:min-w-0 sm:flex-1"
          >
            <Search size={17} className="shrink-0 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search ${activeTab.toLowerCase()}...`}
              className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
            {search && (
              <button type="button" onClick={() => setSearch("")}>
                <X size={16} className="text-slate-400" />
              </button>
            )}
          </form>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="max-w-[130px] truncate text-sm font-bold">
                {displayName}
              </p>
              <p className="text-xs text-slate-400">
                {user?.role || "Student"}
              </p>
            </div>
            <StudentAvatar name={displayName} image={profileImage} />
          </div>
        </header>

        {/* TABS */}
        <nav className="flex gap-1 overflow-x-auto border-b border-slate-100 px-4 py-2 sm:px-6 lg:px-7">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.label;

            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => {
                  setActiveTab(tab.label);
                  setSearch("");
                  setSelectedItem(null);
                }}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-3 text-xs font-bold transition sm:px-5 sm:text-sm ${
                  active
                    ? "border-b-2 border-[#365FE8] bg-blue-50/60 text-[#365FE8]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[#365FE8]"
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <main className="min-h-[570px] bg-[#FBFCFE] px-4 py-6 sm:px-6 sm:py-7 lg:px-7">
          {/* PAGE HEADING */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <button
                type="button"
                onClick={onBack}
                className="mb-2 flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-[#365FE8]"
              >
                <ArrowLeft size={14} />
                Back to Dashboard
              </button>
              <h1 className="text-xl font-extrabold tracking-tight text-[#123D50] sm:text-2xl">
                {pageTitle[activeTab]}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Stay connected with everything happening on campus.
              </p>
            </div>

            {activeTab === "Lost & Found" && (
              <button
                type="button"
                onClick={() => setShowLostForm(true)}
                className="flex items-center gap-2 rounded-lg bg-[#365FE8] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700"
              >
                <Plus size={16} />
                Post an Item
              </button>
            )}
          </div>

          {/* ANNOUNCEMENTS */}
          {activeTab === "Announcements" && (
            <section className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              {filteredAnnouncements.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="group flex w-full items-center gap-4 rounded-xl border border-slate-100 bg-white p-4 text-left shadow-[0_2px_12px_rgba(18,61,80,0.035)] transition hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-md sm:p-5"
                  >
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color}`}>
                      <Icon size={23} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-[#34516A] group-hover:text-[#365FE8] sm:text-base">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-400">
                        {item.date}
                      </p>
                    </div>
                    <ChevronDown className="-rotate-90 shrink-0 text-slate-400" size={19} />
                  </button>
                );
              })}
              {filteredAnnouncements.length === 0 && (
                <EmptyState text="No announcements match your search." />
              )}
            </section>
          )}

          {/* EVENTS */}
          {activeTab === "Events" && (
            <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredEvents.map((event) => {
                const registered = registeredEvents.includes(event.id);

                return (
                  <article
                    key={event.id}
                    className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="h-44 w-full object-cover"
                    />
                    <div className="p-5">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold text-blue-600">
                        {event.category}
                      </span>
                      <h3 className="mt-3 text-base font-extrabold text-[#123D50]">
                        {event.title}
                      </h3>
                      <div className="mt-3 space-y-2 text-xs text-slate-500">
                        <p className="flex items-center gap-2">
                          <CalendarDays size={15} />
                          {event.date}
                        </p>
                        <p className="flex items-center gap-2">
                          <Clock size={15} />
                          {event.time}
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin size={15} />
                          {event.location}
                        </p>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedItem(event)}
                          className="flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-600 transition hover:bg-slate-50"
                        >
                          View Details
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleRegistration(event.id)}
                          className={`flex-1 rounded-lg px-3 py-2.5 text-xs font-bold transition ${
                            registered
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-[#365FE8] text-white hover:bg-blue-700"
                          }`}
                        >
                          {registered ? "Registered ✓" : "Register Now"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
              {filteredEvents.length === 0 && (
                <EmptyState text="No events match your search." />
              )}
            </section>
          )}

          {/* RESOURCES */}
          {activeTab === "Resources" && (
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredResources.map((resource) => {
                const Icon = resource.icon;

                return (
                  <article
                    key={resource.id}
                    className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${resource.bg} ${resource.color}`}>
                        <Icon size={23} />
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-500">
                        {resource.type}
                      </span>
                    </div>
                    <h3 className="mt-4 text-base font-extrabold text-[#123D50]">
                      {resource.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-[#365FE8]">
                      {resource.subject}
                    </p>
                    <p className="mt-3 min-h-[40px] text-sm leading-6 text-slate-500">
                      {resource.description}
                    </p>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#365FE8] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700"
                    >
                      Open Resource
                      <ExternalLink size={15} />
                    </a>
                  </article>
                );
              })}
              {filteredResources.length === 0 && (
                <EmptyState text="No resources match your search." />
              )}
            </section>
          )}

          {/* LOST AND FOUND */}
          {activeTab === "Lost & Found" && (
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredLostItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl border border-slate-100 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                      item.type === "Lost"
                        ? "bg-rose-50 text-rose-600"
                        : "bg-emerald-50 text-emerald-700"
                    }`}>
                      {item.type} Item
                    </span>
                    <span className="text-xs text-slate-400">{item.date}</span>
                  </div>
                  <h3 className="mt-4 text-base font-extrabold text-[#123D50]">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <MapPin size={14} />
                    {item.location}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                  <div className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">
                    <p>Posted by: {item.postedBy}</p>
                    <p className="mt-1">Contact: {item.contact}</p>
                  </div>
                </article>
              ))}
              {filteredLostItems.length === 0 && (
                <EmptyState text="No lost or found items have been posted yet. You can post the first one." />
              )}
            </section>
          )}
        </main>
      </div>

      {/* DETAILS MODAL */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  {selectedItem.category || "Campus Update"}
                </span>
                <h2 className="mt-2 text-xl font-extrabold text-[#123D50]">
                  {selectedItem.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mt-2 text-xs text-slate-400">
              {selectedItem.date}
            </p>
            <p className="mt-5 text-sm leading-7 text-slate-600">
              {selectedItem.description}
            </p>

            {selectedItem.location && (
              <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <MapPin size={16} />
                {selectedItem.location}
              </p>
            )}

            {initialEvents.some((event) => event.id === selectedItem.id) && (
              <button
                type="button"
                onClick={() => {
                  toggleRegistration(selectedItem.id);
                  setSelectedItem(null);
                }}
                className="mt-6 w-full rounded-lg bg-[#365FE8] py-3 text-sm font-bold text-white hover:bg-blue-700"
              >
                {registeredEvents.includes(selectedItem.id)
                  ? "Cancel Registration"
                  : "Register for Event"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* LOST AND FOUND FORM */}
      {showLostForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4">
          <form
            onSubmit={handleLostSubmit}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-[#123D50]">
                  Post a Lost & Found Item
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Help the campus community find missing belongings.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowLostForm(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-600">
                  Item Name
                </label>
                <input
                  required
                  value={lostForm.title}
                  onChange={(e) =>
                    setLostForm({ ...lostForm, title: e.target.value })
                  }
                  placeholder="e.g. Black wallet"
                  className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-600">
                  Listing Type
                </label>
                <select
                  value={lostForm.type}
                  onChange={(e) =>
                    setLostForm({ ...lostForm, type: e.target.value })
                  }
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-blue-500"
                >
                  <option value="Lost">I lost something</option>
                  <option value="Found">I found something</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-600">
                  Location
                </label>
                <input
                  required
                  value={lostForm.location}
                  onChange={(e) =>
                    setLostForm({ ...lostForm, location: e.target.value })
                  }
                  placeholder="Where was it lost or found?"
                  className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-600">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  value={lostForm.description}
                  onChange={(e) =>
                    setLostForm({ ...lostForm, description: e.target.value })
                  }
                  placeholder="Describe the item..."
                  className="w-full resize-none rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-600">
                  Contact Information
                </label>
                <input
                  required
                  value={lostForm.contact}
                  onChange={(e) =>
                    setLostForm({ ...lostForm, contact: e.target.value })
                  }
                  placeholder="Email or phone number"
                  className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowLostForm(false)}
                className="flex-1 rounded-lg border border-slate-200 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-lg bg-[#365FE8] py-3 text-sm font-bold text-white hover:bg-blue-700"
              >
                Publish Listing
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="col-span-full rounded-xl border border-dashed border-slate-200 bg-white px-5 py-12 text-center">
      <PackageSearch size={30} className="mx-auto text-slate-300" />
      <p className="mt-3 text-sm font-medium text-slate-500">{text}</p>
    </div>
  );
}

export default CampusHub;
