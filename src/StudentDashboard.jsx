
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
  Settings,
  QrCode,
  Users,
  Clock,
  CheckCircle2,
  Plus,
  ArrowLeft,
  History,
  BarChart3,
  ScanLine,
  Copy,
  UserCheck,
  UserX,
} from "lucide-react";

// ================= ANNOUNCEMENTS =================

const announcements = [
  {
    title: "Summer Internship Drive 2026",
    date: "Nov 14, 2026",
    icon: BriefcaseBusiness,
    color: "text-pink-600",
    bg: "bg-pink-50",
  },
  {
    title: "Cultural Fest – Registrations Open",
    date: "Nov 12, 2026",
    icon: PartyPopper,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    title: "Library Timings During Exams",
    date: "Nov 10, 2026",
    icon: BookOpen,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

// ================= EVENTS =================

const events = [
  {
    title: "Business Quiz Competition",
    date: "Nov 22, 2026",
    icon: CalendarDays,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    title: "Guest Lecture – Marketing",
    date: "Nov 25, 2026",
    icon: Presentation,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "BBA Alumni Meet",
    date: "Dec 02, 2026",
    icon: GraduationCap,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
];

// ================= DEMO ATTENDANCE DATA =================

const demoStudents = [
  { id: "STU001", name: "Aarav Sharma", course: "MCA" },
  { id: "STU002", name: "Priya Verma", course: "MCA" },
  { id: "STU003", name: "Rohan Gupta", course: "MCA" },
  { id: "STU004", name: "Ananya Singh", course: "MCA" },
  { id: "STU005", name: "Kabir Mehta", course: "MCA" },
];

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const saveStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const todayString = () => new Date().toISOString().slice(0, 10);

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

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

// ================= ATTENDANCE PAGE =================

function AttendancePage({ user, onBack }) {
  const role = (user?.role || "student").toLowerCase();
  const isTeacher = role === "teacher" || role === "faculty";
  const isAdmin = role === "admin";
  const isStaff = isTeacher || isAdmin;

  const currentUserName = user?.name?.trim() || "Student";
  const currentUserId =
    user?.enrollmentNumber ||
    user?.studentId ||
    user?.email ||
    currentUserName;

  const [section, setSection] = useState(
    isStaff ? "Create Session" : "Mark Attendance"
  );

  const [sessions, setSessions] = useState(() =>
    readStorage("campusAttendanceSessions", [])
  );

  const [records, setRecords] = useState(() =>
    readStorage("campusAttendanceRecords", [])
  );

  const [selectedSession, setSelectedSession] = useState("");
  const [subject, setSubject] = useState("");
  const [sessionCode, setSessionCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [message, setMessage] = useState("");
  const [searchStudent, setSearchStudent] = useState("");

  const activeSessions = sessions.filter(
    (session) => session.status === "Active"
  );

  const selectedSessionData = sessions.find(
    (session) => session.id === selectedSession
  );

  const myRecords = records.filter(
    (record) =>
      record.studentId === currentUserId ||
      record.studentName === currentUserName
  );

  const presentCount = myRecords.filter(
    (record) => record.status === "Present"
  ).length;

  const attendancePercentage =
    myRecords.length > 0
      ? Math.round((presentCount / myRecords.length) * 100)
      : 0;

  const updateSessions = (updated) => {
    setSessions(updated);
    saveStorage("campusAttendanceSessions", updated);
  };

  const updateRecords = (updated) => {
    setRecords(updated);
    saveStorage("campusAttendanceRecords", updated);
  };

  const createSession = (event) => {
    event.preventDefault();

    if (!subject.trim()) {
      setMessage("Please enter a subject name.");
      return;
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    const newSession = {
      id: `SESSION-${Date.now()}`,
      code,
      subject: subject.trim(),
      teacher: currentUserName,
      date: todayString(),
      time: new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "Active",
    };

    updateSessions([newSession, ...sessions]);
    setSelectedSession(newSession.id);
    setSessionCode(code);
    setSubject("");
    setSection("Create Session");
    setMessage("Attendance session created successfully.");
  };

  const markMyAttendance = (event) => {
    event.preventDefault();

    const code = enteredCode.trim();

    if (!code) {
      setMessage("Please enter the session code.");
      return;
    }

    const matchingSession = activeSessions.find(
      (session) => session.code === code
    );

    if (!matchingSession) {
      setMessage("Invalid or inactive session code.");
      return;
    }

    const alreadyMarked = records.some(
      (record) =>
        record.sessionId === matchingSession.id &&
        record.studentId === currentUserId
    );

    if (alreadyMarked) {
      setMessage("You have already marked attendance for this session.");
      return;
    }

    const newRecord = {
      id: `ATT-${Date.now()}`,
      sessionId: matchingSession.id,
      studentId: currentUserId,
      studentName: currentUserName,
      subject: matchingSession.subject,
      date: matchingSession.date,
      time: new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "Present",
      markedBy: "Student",
    };

    updateRecords([newRecord, ...records]);
    setEnteredCode("");
    setMessage("Your attendance has been marked successfully.");
  };

  const markStudent = (student, status) => {
    if (!selectedSessionData) {
      setMessage("Please select an attendance session first.");
      return;
    }

    const existingRecord = records.find(
      (record) =>
        record.sessionId === selectedSessionData.id &&
        record.studentId === student.id
    );

    let updatedRecords;

    if (existingRecord) {
      updatedRecords = records.map((record) =>
        record.id === existingRecord.id
          ? { ...record, status, markedBy: currentUserName }
          : record
      );
    } else {
      updatedRecords = [
        {
          id: `ATT-${Date.now()}-${student.id}`,
          sessionId: selectedSessionData.id,
          studentId: student.id,
          studentName: student.name,
          subject: selectedSessionData.subject,
          date: selectedSessionData.date,
          time: new Date().toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          status,
          markedBy: currentUserName,
        },
        ...records,
      ];
    }

    updateRecords(updatedRecords);
    setMessage(`${student.name} marked ${status}.`);
  };

  const closeSession = (sessionId) => {
    const updated = sessions.map((session) =>
      session.id === sessionId
        ? { ...session, status: "Closed" }
        : session
    );

    updateSessions(updated);
    setMessage("Attendance session has been closed.");
  };

  const getStudentRecord = (student) => {
    return records.find(
      (record) =>
        record.sessionId === selectedSession &&
        record.studentId === student.id
    );
  };

  const filteredStudents = demoStudents.filter((student) =>
    `${student.name} ${student.id}`
      .toLowerCase()
      .includes(searchStudent.toLowerCase())
  );

  const menuItems = isStaff
    ? [
        { name: "Create Session", icon: Plus },
        { name: "Mark Students", icon: Users },
        { name: "History", icon: History },
        { name: "Analytics", icon: BarChart3 },
      ]
    : [
        { name: "Mark Attendance", icon: ScanLine },
        { name: "History", icon: History },
        { name: "Analytics", icon: BarChart3 },
      ];

  const cardStyle =
    "rounded-xl border border-slate-100 bg-white p-4 shadow-[0_2px_12px_rgba(18,61,80,0.04)] sm:p-5";

  return (
    <div className="min-h-screen bg-[#F5F8FC] p-3 sm:p-5">
      <div className="mx-auto min-h-[650px] max-w-[1450px] overflow-hidden rounded-2xl border border-[#DCE8F3] bg-white shadow-sm">

        {/* ATTENDANCE HEADER */}

        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
              title="Back to Dashboard"
            >
              <ArrowLeft size={20} />
            </button>

            <div className="rounded-xl bg-[#E0F2F1] p-2.5 text-[#0F766E]">
              <QrCode size={25} />
            </div>

            <div>
              <h1 className="text-lg font-extrabold text-[#123D50] sm:text-xl">
                Attendance Management
              </h1>
              <p className="text-xs text-slate-500">
                CampusConnect / Attendance
              </p>
            </div>
          </div>

          <div className="rounded-full bg-[#EAF8F5] px-4 py-2 text-xs font-bold text-[#0F766E]">
            {isAdmin ? "Administrator" : isTeacher ? "Teacher Portal" : "Student Portal"}
          </div>
        </header>

        <div className="grid min-h-[580px] grid-cols-1 lg:grid-cols-[205px_minmax(0,1fr)]">

          {/* ATTENDANCE SIDEBAR */}

          <aside className="border-b border-slate-100 bg-[#FBFCFE] p-4 lg:border-b-0 lg:border-r">
            <p className="mb-3 px-3 text-[10px] font-extrabold uppercase tracking-[1.5px] text-slate-400">
              Attendance
            </p>

            <nav className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-1">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      setSection(item.name);
                      setMessage("");
                    }}
                    className={`flex items-center gap-2 rounded-lg px-3 py-3 text-left text-xs font-bold transition ${
                      section === item.name
                        ? "bg-[#E9EAFE] text-[#365FE8]"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    <Icon size={17} />
                    {item.name}
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 hidden rounded-xl bg-[#F0FAFA] p-3 lg:block">
              <p className="text-xs font-bold text-[#123D50]">
                Signed in as
              </p>
              <p className="mt-1 truncate text-xs text-slate-500">
                {currentUserName}
              </p>
            </div>
          </aside>

          {/* ATTENDANCE MAIN AREA */}

          <main className="min-w-0 bg-[#FCFDFE] p-4 sm:p-6 lg:p-7">

            {/* FEEDBACK MESSAGE */}

            {message && (
              <div className="mb-5 flex items-start justify-between gap-3 rounded-lg border border-teal-100 bg-teal-50 px-4 py-3 text-sm text-teal-800">
                <span>{message}</span>
                <button
                  type="button"
                  onClick={() => setMessage("")}
                  className="font-bold"
                >
                  ×
                </button>
              </div>
            )}

            {/* STUDENT: MARK ATTENDANCE */}

            {!isStaff && section === "Mark Attendance" && (
              <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.1fr)]">
                <section className={cardStyle}>
                  <div className="mb-4">
                    <h2 className="text-base font-extrabold text-[#123D50]">
                      Mark Attendance
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Enter the active session code shared by your teacher.
                    </p>
                  </div>

                  <div className="mb-5 flex min-h-[190px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#DCE8F3] bg-[#FBFCFE] p-5 text-center">
                    <div className="mb-3 rounded-2xl bg-[#E9EAFE] p-4 text-[#365FE8]">
                      <QrCode size={52} />
                    </div>
                    <p className="text-sm font-bold text-[#123D50]">
                      QR Attendance
                    </p>
                    <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
                      QR camera scanning can be connected in the next stage.
                      For this frontend demo, use the session code.
                    </p>
                  </div>

                  <form onSubmit={markMyAttendance}>
                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Enter Session Code
                    </label>

                    <input
                      value={enteredCode}
                      onChange={(e) => setEnteredCode(e.target.value)}
                      placeholder="e.g. 482913"
                      maxLength={6}
                      className="mb-3 h-12 w-full rounded-lg border border-slate-200 px-4 text-center text-lg font-extrabold tracking-[5px] text-[#123D50] outline-none focus:border-[#365FE8] focus:ring-2 focus:ring-blue-100"
                    />

                    <button
                      type="submit"
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#6040E8] text-sm font-bold text-white transition hover:bg-[#4E32C8]"
                    >
                      <CheckCircle2 size={17} />
                      Mark My Attendance
                    </button>
                  </form>
                </section>

                <section className={cardStyle}>
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <div>
                      <h2 className="text-base font-extrabold text-[#123D50]">
                        Active Sessions
                      </h2>
                      <p className="mt-1 text-xs text-slate-500">
                        Sessions currently open by teachers
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700">
                      {activeSessions.length} Active
                    </span>
                  </div>

                  {activeSessions.length === 0 ? (
                    <div className="flex min-h-[250px] flex-col items-center justify-center text-center">
                      <Clock size={36} className="text-slate-300" />
                      <p className="mt-3 text-sm font-bold text-slate-600">
                        No active sessions
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Your teacher has not started an attendance session yet.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {activeSessions.map((session) => (
                        <div
                          key={session.id}
                          className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-sm font-extrabold text-[#123D50]">
                              {session.subject}
                            </p>
                            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                              Active
                            </span>
                          </div>

                          <p className="mt-2 text-xs text-slate-500">
                            Teacher: {session.teacher}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {formatDate(session.date)} · {session.time}
                          </p>

                          <div className="mt-3 flex items-center justify-between rounded-lg bg-white px-3 py-2">
                            <span className="text-xs font-semibold text-slate-500">
                              Session Code
                            </span>
                            <span className="text-base font-extrabold tracking-[3px] text-[#365FE8]">
                              {session.code}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>
            )}

            {/* TEACHER: CREATE SESSION */}

            {isStaff && section === "Create Session" && (
              <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.15fr)]">
                <section className={cardStyle}>
                  <div className="mb-5">
                    <h2 className="text-base font-extrabold text-[#123D50]">
                      Create Attendance Session
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Start a new class attendance session.
                    </p>
                  </div>

                  <form onSubmit={createSession}>
                    <label className="mb-2 block text-xs font-bold text-slate-600">
                      Subject / Class Name
                    </label>

                    <input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Database Management"
                      className="mb-4 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#365FE8]"
                    />

                    <div className="mb-5 rounded-lg bg-[#F5F7FF] p-3">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#365FE8]">
                        <Clock size={15} />
                        Session date and time
                      </div>
                      <p className="mt-2 text-xs text-slate-500">
                        {formatDate(todayString())} ·{" "}
                        {new Date().toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#6040E8] text-sm font-bold text-white transition hover:bg-[#4E32C8]"
                    >
                      <Plus size={17} />
                      Create Session
                    </button>
                  </form>

                  {sessionCode && (
                    <div className="mt-5 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                      <p className="text-xs font-bold text-emerald-700">
                        Latest session code
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-3">
                        <span className="text-2xl font-extrabold tracking-[5px] text-[#123D50]">
                          {sessionCode}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard?.writeText(sessionCode);
                            setMessage("Session code copied.");
                          }}
                          className="rounded-lg bg-white p-2 text-emerald-700 hover:bg-emerald-100"
                          title="Copy session code"
                        >
                          <Copy size={17} />
                        </button>
                      </div>
                      <p className="mt-2 text-xs text-emerald-700">
                        Share this code with students so they can mark attendance.
                      </p>
                    </div>
                  )}
                </section>

                <section className={cardStyle}>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-extrabold text-[#123D50]">
                        Active Session
                      </h2>
                      <p className="mt-1 text-xs text-slate-500">
                        Your currently running attendance sessions
                      </p>
                    </div>
                    <QrCode size={25} className="text-[#6040E8]" />
                  </div>

                  {activeSessions.filter(
                    (session) => session.teacher === currentUserName
                  ).length === 0 ? (
                    <div className="flex min-h-[250px] flex-col items-center justify-center text-center">
                      <CalendarDays size={36} className="text-slate-300" />
                      <p className="mt-3 text-sm font-bold text-slate-600">
                        No active session created
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        Create a session to begin taking attendance.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {activeSessions
                        .filter(
                          (session) => session.teacher === currentUserName
                        )
                        .map((session) => (
                          <div
                            key={session.id}
                            className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <p className="text-sm font-extrabold text-[#123D50]">
                                {session.subject}
                              </p>
                              <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                                Active
                              </span>
                            </div>

                            <p className="mt-2 text-xs text-slate-500">
                              {formatDate(session.date)} · {session.time}
                            </p>

                            <div className="mt-3 flex items-center justify-between rounded-lg bg-white px-3 py-3">
                              <span className="text-xs font-semibold text-slate-500">
                                Session Code
                              </span>
                              <span className="text-lg font-extrabold tracking-[3px] text-[#365FE8]">
                                {session.code}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => {
                                setSelectedSession(session.id);
                                setSection("Mark Students");
                              }}
                              className="mt-3 w-full rounded-lg bg-[#365FE8] py-2.5 text-xs font-bold text-white hover:bg-blue-700"
                            >
                              Mark Students
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                </section>
              </div>
            )}

            {/* TEACHER: MARK STUDENTS */}

            {isStaff && section === "Mark Students" && (
              <section className={cardStyle}>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-extrabold text-[#123D50]">
                      Mark Student Attendance
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Select a session and mark each student's attendance.
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">
                    Teacher Panel
                  </span>
                </div>

                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Select Session
                </label>

                <select
                  value={selectedSession}
                  onChange={(e) => setSelectedSession(e.target.value)}
                  className="mb-5 h-11 w-full max-w-lg rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-[#365FE8]"
                >
                  <option value="">Choose an active session</option>
                  {activeSessions.map((session) => (
                    <option key={session.id} value={session.id}>
                      {session.subject} — {session.date}
                    </option>
                  ))}
                </select>

                {selectedSessionData ? (
                  <>
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#F5F7FF] p-4">
                      <div>
                        <p className="text-sm font-extrabold text-[#123D50]">
                          {selectedSessionData.subject}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Session code: {selectedSessionData.code}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => closeSession(selectedSessionData.id)}
                        className="rounded-lg border border-rose-200 bg-white px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50"
                      >
                        Close Session
                      </button>
                    </div>

                    <input
                      value={searchStudent}
                      onChange={(e) => setSearchStudent(e.target.value)}
                      placeholder="Search student by name or ID..."
                      className="mb-4 h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-[#365FE8] sm:max-w-sm"
                    />

                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[620px] text-left">
                        <thead className="bg-slate-50 text-[11px] font-bold uppercase text-slate-500">
                          <tr>
                            <th className="px-4 py-3">Student</th>
                            <th className="px-4 py-3">Student ID</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Mark Attendance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredStudents.map((student) => {
                            const record = getStudentRecord(student);

                            return (
                              <tr
                                key={student.id}
                                className="border-t border-slate-100 text-sm"
                              >
                                <td className="px-4 py-4 font-semibold text-[#123D50]">
                                  {student.name}
                                </td>
                                <td className="px-4 py-4 text-slate-500">
                                  {student.id}
                                </td>
                                <td className="px-4 py-4">
                                  {record ? (
                                    <span
                                      className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                                        record.status === "Present"
                                          ? "bg-emerald-50 text-emerald-700"
                                          : "bg-rose-50 text-rose-700"
                                      }`}
                                    >
                                      {record.status}
                                    </span>
                                  ) : (
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-500">
                                      Not Marked
                                    </span>
                                  )}
                                </td>
                                <td className="px-4 py-4">
                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        markStudent(student, "Present")
                                      }
                                      className="flex items-center gap-1 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100"
                                    >
                                      <UserCheck size={14} />
                                      Present
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        markStudent(student, "Absent")
                                      }
                                      className="flex items-center gap-1 rounded-lg bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100"
                                    >
                                      <UserX size={14} />
                                      Absent
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <div className="flex min-h-[220px] flex-col items-center justify-center text-center">
                    <Users size={36} className="text-slate-300" />
                    <p className="mt-3 text-sm font-bold text-slate-600">
                      Select an active session
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Create a session first if you haven't created one.
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* ATTENDANCE HISTORY */}

            {section === "History" && (
              <section className={cardStyle}>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base font-extrabold text-[#123D50]">
                      Attendance History
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      {isStaff
                        ? "Attendance records for campus sessions"
                        : "Your previous attendance records"}
                    </p>
                  </div>
                  <History size={24} className="text-[#365FE8]" />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[570px] text-left">
                    <thead className="bg-slate-50 text-[11px] font-bold uppercase text-slate-500">
                      <tr>
                        {isStaff && <th className="px-4 py-3">Student</th>}
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Subject</th>
                        <th className="px-4 py-3">Time</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(isStaff ? records : myRecords).map((record) => (
                        <tr
                          key={record.id}
                          className="border-t border-slate-100 text-sm"
                        >
                          {isStaff && (
                            <td className="px-4 py-4 font-semibold text-[#123D50]">
                              {record.studentName}
                            </td>
                          )}
                          <td className="whitespace-nowrap px-4 py-4 text-slate-600">
                            {formatDate(record.date)}
                          </td>
                          <td className="px-4 py-4 font-medium text-slate-700">
                            {record.subject}
                          </td>
                          <td className="px-4 py-4 text-slate-500">
                            {record.time}
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={`rounded-full px-3 py-1 text-[11px] font-bold ${
                                record.status === "Present"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-rose-50 text-rose-700"
                              }`}
                            >
                              {record.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {(isStaff ? records : myRecords).length === 0 && (
                  <div className="py-14 text-center">
                    <History
                      size={35}
                      className="mx-auto text-slate-300"
                    />
                    <p className="mt-3 text-sm font-bold text-slate-600">
                      No attendance records yet
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Records will appear here after attendance is marked.
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* ATTENDANCE ANALYTICS */}

            {section === "Analytics" && (
              <section className={cardStyle}>
                <div className="mb-6">
                  <h2 className="text-base font-extrabold text-[#123D50]">
                    Attendance Analytics
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    {isStaff
                      ? "Overview of recorded attendance"
                      : "Your personal attendance overview"}
                  </p>
                </div>

                {isStaff ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-xl bg-[#F0FAFA] p-5">
                      <Users className="text-teal-700" size={23} />
                      <p className="mt-3 text-2xl font-extrabold text-[#123D50]">
                        {demoStudents.length}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Demo Students
                      </p>
                    </div>
                    <div className="rounded-xl bg-emerald-50 p-5">
                      <UserCheck className="text-emerald-700" size={23} />
                      <p className="mt-3 text-2xl font-extrabold text-[#123D50]">
                        {records.filter((r) => r.status === "Present").length}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Present Records
                      </p>
                    </div>
                    <div className="rounded-xl bg-rose-50 p-5">
                      <UserX className="text-rose-700" size={23} />
                      <p className="mt-3 text-2xl font-extrabold text-[#123D50]">
                        {records.filter((r) => r.status === "Absent").length}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Absent Records
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-[180px_1fr] sm:items-center">
                    <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full border-[12px] border-[#E4F8F4] bg-white">
                      <span className="text-3xl font-extrabold text-[#123D50]">
                        {attendancePercentage}%
                      </span>
                      <span className="mt-1 text-xs font-semibold text-slate-500">
                        Attendance
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#123D50]">
                        Your Attendance Summary
                      </p>
                      <p className="mt-2 text-xs leading-6 text-slate-500">
                        Present: {presentCount} out of {myRecords.length} recorded classes.
                      </p>
                      <p className="mt-2 text-xs leading-6 text-slate-500">
                        Your attendance percentage is calculated from the records available in this demo.
                      </p>
                    </div>
                  </div>
                )}
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
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

  const [activeTab, setActiveTab] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

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
    setSearch("");
    setShowProfile(false);
    setShowNotifications(false);

    // Attendance is rendered inside this dashboard.
    // Other sections are handled by App.jsx.
    if (name !== "Attendance" && name !== "Dashboard") {
      onNavigate(name);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const query = search.trim().toLowerCase();

    if (!query) return;

    const match = navigation.find((item) =>
      item.name.toLowerCase().includes(query)
    );

    if (match) {
      handleNavigation(match.name);
    }
  };

  const handleProfileSettings = () => {
    setShowProfile(false);
    setMobileMenu(false);
    onNavigate("Settings");
  };

  // Attendance page is shown within the dashboard.

  if (activeTab === "Attendance") {
    return (
      <AttendancePage
        user={user}
        onBack={() => setActiveTab("Dashboard")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F8FC] px-3 py-4 text-[#123D50] sm:px-5 sm:py-6">
      <div className="mx-auto min-h-[650px] w-full max-w-[1450px] overflow-hidden rounded-2xl border border-[#DCE8F3] bg-white shadow-[0_4px_24px_rgba(35,79,120,0.06)]">

        {/* TOP HEADER */}

        <header className="relative flex min-h-[66px] items-center gap-3 border-b border-slate-100 px-4 py-3 sm:px-6 lg:gap-7 lg:px-7">
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

          <form
            onSubmit={handleSearch}
            className="hidden h-10 min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-[#FBFCFE] px-3 sm:flex"
          >
            <Search size={18} className="shrink-0 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search anything..."
              className="h-full min-w-0 flex-1 bg-transparent text-sm text-[#123D50] outline-none placeholder:text-slate-400"
            />
            <button type="submit" aria-label="Search" className="text-slate-400 hover:text-[#0F766E]">
              <Search size={17} />
            </button>
          </form>

          <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-5">
            <div className="relative">
              <button
                type="button"
                aria-label="Notifications"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100"
              >
                <Bell size={21} />
                <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
                  <p className="text-sm font-bold">Notifications</p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    You're all caught up. New campus notifications will appear here.
                  </p>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowNotifications(false);
                }}
                aria-label="Open profile menu"
                className="flex items-center gap-1"
              >
                <StudentAvatar size="small" image={displayImage} name={displayName} />
                <ChevronDown size={14} className="hidden text-slate-400 sm:block" />
              </button>

              {showProfile && (
                <div className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <StudentAvatar size="small" image={displayImage} name={displayName} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[#123D50]">
                        {displayName}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{displayRole}</p>
                    </div>
                  </div>

                  <div className="my-3 border-t border-slate-100" />

                  <button
                    type="button"
                    onClick={handleProfileSettings}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-[#34516A] transition hover:bg-[#F0F5FF] hover:text-[#365FE8]"
                  >
                    <Settings size={17} />
                    Profile Settings
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowProfile(false)}
                    className="mt-2 w-full rounded-lg bg-slate-50 py-2 text-xs font-semibold text-[#123D50] transition hover:bg-slate-100"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

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
          <section className="mb-7 flex min-h-[65px] items-center gap-3 sm:mb-8 sm:gap-4">
            <StudentAvatar size="large" image={displayImage} name={displayName} />
            <div className="min-w-0">
              <h1 className="text-base font-extrabold tracking-tight text-[#123D50] sm:text-lg">
                Good Morning, {displayName} <span className="inline-block">👋</span>
              </h1>
              <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                {displayRole}
              </p>
            </div>
          </section>

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
            <button
              type="button"
              onClick={() => handleNavigation("Attendance")}
              className="text-left"
            >
              <DashboardStat
                title="Attendance"
                value="View"
                subtitle="Open attendance"
                icon={ClipboardCheck}
                color="bg-[#E4F8F4]"
                iconColor="text-[#168D7C]"
              />
            </button>
          </section>

          <section className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2 lg:gap-5">
            <DashboardList
              title="Recent Announcements"
              items={announcements}
              onViewAll={() => handleNavigation("Campus Hub")}
            />
            <DashboardList
              title="Upcoming Events"
              items={events}
              onViewAll={() => handleNavigation("Campus Hub")}
            />
          </section>
        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;
