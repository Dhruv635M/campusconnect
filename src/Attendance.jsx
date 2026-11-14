
import { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Html5QrcodeScanner } from "html5-qrcode";
import {
  QrCode,
  ScanLine,
  Plus,
  History,
  BarChart3,
  Clock,
  CheckCircle2,
  X,
  Users,
  CalendarDays,
  BookOpen,
  Search,
  UserCheck,
  ClipboardCheck,
  AlertCircle,
} from "lucide-react";

const SESSION_KEY = "campusAttendanceSessions";
const RECORD_KEY = "campusAttendanceRecords";

const readStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};

const saveStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const formatTime = (date) =>
  new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

function Attendance({ user }) {
  const role = (user?.role || "student").toLowerCase();
  const isTeacher = ["teacher", "faculty"].includes(role);
  const isAdmin = role === "admin";
  const isStudent = !isTeacher && !isAdmin;

  const currentUser = {
    id:
      user?.id ||
      user?.email ||
      user?.enrollmentNo ||
      user?.name ||
      "student-user",
    name: user?.name || "Campus User",
    email: user?.email || "",
    role,
  };

  const [sessions, setSessions] = useState(() =>
    readStorage(SESSION_KEY)
  );
  const [records, setRecords] = useState(() =>
    readStorage(RECORD_KEY)
  );
  const [activeTab, setActiveTab] = useState("Mark Attendance");
  const [showCreate, setShowCreate] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [subject, setSubject] = useState("");
  const [className, setClassName] = useState("");
  const [duration, setDuration] = useState("15");
  const [manualName, setManualName] = useState("");
  const [manualId, setManualId] = useState("");
  const [selectedSession, setSelectedSession] = useState(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    saveStorage(SESSION_KEY, sessions);
  }, [sessions]);

  useEffect(() => {
    saveStorage(RECORD_KEY, records);
  }, [records]);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!showScanner) return;

    let scanner;

    try {
      scanner = new Html5QrcodeScanner(
        "attendance-reader",
        {
          fps: 10,
          qrbox: { width: 220, height: 220 },
          aspectRatio: 1,
        },
        false
      );

      scanner.render(
        (decodedText) => {
          try {
            const data = JSON.parse(decodedText);

            if (data.type !== "campusconnect-attendance") {
              setMessage("This is not a CampusConnect attendance QR code.");
              return;
            }

            markAttendance(data.sessionId);
            setShowScanner(false);
            scanner.clear().catch(() => {});
          } catch {
            setMessage("Invalid QR code. Please scan the session QR code.");
          }
        },
        () => {}
      );
    } catch {
      setMessage("Unable to start the scanner. Check camera permissions.");
    }

    return () => {
      if (scanner) scanner.clear().catch(() => {});
    };
    // Scanner should restart only when the scanner panel opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showScanner]);

  const activeSessions = sessions.filter(
    (session) => new Date(session.expiresAt).getTime() > now
  );

  const myRecords = records.filter(
    (record) => record.studentId === String(currentUser.id)
  );

  const mySessions = isStudent
    ? sessions.filter((session) =>
        records.some(
          (record) =>
            record.sessionId === session.id &&
            record.studentId === String(currentUser.id)
        )
      )
    : sessions;

  const visibleRecords = isStudent
    ? myRecords
    : records;

  const attendancePercentage = useMemo(() => {
    if (!isStudent) return 0;

    const total = myRecords.length;
    if (!total) return 0;

    const present = myRecords.filter(
      (record) => record.status === "Present"
    ).length;

    return Math.round((present / total) * 100);
  }, [myRecords, isStudent]);

  const latestSession = activeSessions[0] || null;

  const teacherSessions = sessions.filter(
    (session) => session.teacherId === String(currentUser.id)
  );

  const pageTitle = isStudent
    ? "My Attendance"
    : isTeacher
      ? "Attendance Management"
      : "Attendance Overview";

  const menuItems = isStudent
    ? [
        { label: "Mark Attendance", icon: QrCode },
        { label: "History", icon: History },
        { label: "Analytics", icon: BarChart3 },
      ]
    : [
        { label: "Mark Attendance", icon: QrCode },
        ...(isTeacher
          ? [{ label: "Create Session", icon: Plus }]
          : []),
        { label: "History", icon: History },
        { label: "Analytics", icon: BarChart3 },
      ];

  const notify = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3500);
  };

  const createSession = (event) => {
    event.preventDefault();

    if (!subject.trim() || !className.trim()) {
      notify("Please enter the subject and class.");
      return;
    }

    const createdAt = new Date();
    const session = {
      id: `session-${Date.now()}`,
      subject: subject.trim(),
      className: className.trim(),
      teacherId: String(currentUser.id),
      teacherName: currentUser.name,
      createdAt: createdAt.toISOString(),
      expiresAt: new Date(
        createdAt.getTime() + Number(duration) * 60000
      ).toISOString(),
      status: "Active",
    };

    setSessions((previous) => [session, ...previous]);
    setSelectedSession(session);
    setSubject("");
    setClassName("");
    setDuration("15");
    setShowCreate(false);
    setActiveTab("Mark Attendance");
    notify("Attendance session created successfully.");
  };

  const markAttendance = (sessionId) => {
    const session = sessions.find((item) => item.id === sessionId);

    if (!session) {
      notify("Attendance session not found.");
      return;
    }

    if (new Date(session.expiresAt).getTime() <= Date.now()) {
      notify("This attendance session has expired.");
      return;
    }

    const alreadyMarked = records.some(
      (record) =>
        record.sessionId === sessionId &&
        record.studentId === String(currentUser.id)
    );

    if (alreadyMarked) {
      notify("Your attendance is already marked for this session.");
      return;
    }

    const record = {
      id: `record-${Date.now()}`,
      sessionId,
      studentId: String(currentUser.id),
      studentName: currentUser.name,
      subject: session.subject,
      className: session.className,
      teacherName: session.teacherName,
      date: new Date().toISOString(),
      status: "Present",
      markedBy: "QR Scan",
    };

    setRecords((previous) => [record, ...previous]);
    notify("Attendance marked successfully!");
  };

  const markManualAttendance = (event) => {
    event.preventDefault();

    if (!selectedSession || !manualName.trim() || !manualId.trim()) {
      notify("Enter the student's name and ID.");
      return;
    }

    const alreadyMarked = records.some(
      (record) =>
        record.sessionId === selectedSession.id &&
        record.studentId.toLowerCase() === manualId.trim().toLowerCase()
    );

    if (alreadyMarked) {
      notify("Attendance is already marked for this student.");
      return;
    }

    const record = {
      id: `record-${Date.now()}`,
      sessionId: selectedSession.id,
      studentId: manualId.trim(),
      studentName: manualName.trim(),
      subject: selectedSession.subject,
      className: selectedSession.className,
      teacherName: currentUser.name,
      date: new Date().toISOString(),
      status: "Present",
      markedBy: "Teacher",
    };

    setRecords((previous) => [record, ...previous]);
    setManualName("");
    setManualId("");
    setShowManual(false);
    notify("Student attendance marked successfully.");
  };

  const getSessionCount = (sessionId) =>
    records.filter((record) => record.sessionId === sessionId).length;

  const filteredRecords = visibleRecords.filter((record) => {
    const term = search.toLowerCase();

    return (
      record.studentName?.toLowerCase().includes(term) ||
      record.studentId?.toLowerCase().includes(term) ||
      record.subject?.toLowerCase().includes(term) ||
      record.className?.toLowerCase().includes(term)
    );
  });

  const openSession = (session) => {
    setSelectedSession(session);
    setShowManual(true);
  };

  const remainingTime = (session) => {
    const difference = Math.max(
      0,
      new Date(session.expiresAt).getTime() - now
    );

    const minutes = Math.floor(difference / 60000);
    const seconds = Math.floor((difference % 60000) / 1000);

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const activeSessionForCard =
    selectedSession &&
    new Date(selectedSession.expiresAt).getTime() > now
      ? selectedSession
      : latestSession;

  const totalPresent = records.filter(
    (record) => record.status === "Present"
  ).length;

  const uniqueStudents = new Set(
    records.map((record) => record.studentId)
  ).size;

  const renderMainCard = () => {
    if (isStudent) {
      return (
        <div className="flex h-full flex-col">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-[#17324D]">
              Active Session
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Scan your teacher's QR code to mark attendance.
            </p>
          </div>

          {activeSessionForCard ? (
            <>
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <CheckCircle2 size={16} />
                  {activeSessionForCard.subject}
                </div>
                <p className="mt-2 text-xs text-slate-600">
                  Class: {activeSessionForCard.className}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Teacher: {activeSessionForCard.teacherName}
                </p>
                <p className="mt-2 text-xs font-medium text-emerald-700">
                  Session Active
                </p>
              </div>

              <div className="my-4 flex items-center justify-center gap-2 rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-600">
                <Clock size={16} />
                Time remaining: {remainingTime(activeSessionForCard)}
              </div>
            </>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center">
              <QrCode className="mx-auto mb-3 text-slate-400" size={38} />
              <p className="font-semibold text-slate-700">
                No active session
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Your teacher has not started an attendance session yet.
              </p>
            </div>
          )}

          <div className="my-5 flex flex-1 flex-col items-center justify-center">
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5">
              <QrCode size={100} strokeWidth={1.4} className="text-slate-400" />
            </div>
            <p className="mt-3 text-center text-xs text-slate-500">
              Scan the QR code displayed by your teacher
            </p>
          </div>

          <button
            onClick={() => {
              if (!activeSessionForCard) {
                notify("There is no active session to scan.");
                return;
              }
              setShowScanner(true);
            }}
            disabled={!activeSessionForCard}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#6338E8] px-4 py-3 text-sm font-semibold text-white shadow-md shadow-purple-100 transition hover:bg-[#512bd0] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ScanLine size={18} />
            Scan QR Code
          </button>
        </div>
      );
    }

    if (isTeacher) {
      return (
        <div className="flex h-full flex-col">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#17324D]">
                Active Session
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Create and manage classroom attendance.
              </p>
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-1.5 rounded-lg bg-[#6338E8] px-3 py-2 text-xs font-semibold text-white hover:bg-[#512bd0]"
            >
              <Plus size={15} />
              Create
            </button>
          </div>

          {activeSessionForCard ? (
            <>
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <CheckCircle2 size={16} />
                  {activeSessionForCard.subject}
                </div>
                <p className="mt-2 text-xs text-slate-600">
                  Class: {activeSessionForCard.className}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Started: {formatTime(activeSessionForCard.createdAt)}
                </p>
                <p className="mt-2 text-xs font-semibold text-emerald-700">
                  Session Active
                </p>
              </div>

              <div className="my-3 flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3 text-xs text-slate-600">
                <span className="flex items-center gap-2">
                  <Clock size={15} />
                  Time remaining
                </span>
                <strong className="text-[#17324D]">
                  {remainingTime(activeSessionForCard)}
                </strong>
              </div>

              <div className="flex flex-1 flex-col items-center justify-center py-3">
                <div className="rounded-xl border border-slate-100 bg-white p-3">
                  <QRCodeSVG
                    value={JSON.stringify({
                      type: "campusconnect-attendance",
                      sessionId: activeSessionForCard.id,
                    })}
                    size={150}
                    level="H"
                  />
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  Students can scan this QR code
                </p>
                <p className="mt-1 text-sm font-semibold text-[#17324D]">
                  {getSessionCount(activeSessionForCard.id)} students marked
                </p>
              </div>

              <button
                onClick={() => openSession(activeSessionForCard)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#6338E8] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#512bd0]"
              >
                <UserCheck size={17} />
                Mark Attendance Manually
              </button>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
              <QrCode size={48} className="mb-3 text-slate-300" />
              <p className="font-semibold text-slate-700">
                No active session
              </p>
              <p className="mt-1 max-w-xs text-xs text-slate-500">
                Create a session to generate a QR code for your students.
              </p>
              <button
                onClick={() => setShowCreate(true)}
                className="mt-4 rounded-lg bg-[#6338E8] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#512bd0]"
              >
                Create Attendance Session
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="flex h-full flex-col">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-[#17324D]">
            Attendance Overview
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Monitor attendance activity across CampusConnect.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <Users className="mb-2 text-[#6338E8]" size={21} />
            <p className="text-2xl font-bold text-[#17324D]">
              {uniqueStudents}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Students marked present
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <ClipboardCheck className="mb-2 text-emerald-600" size={21} />
            <p className="text-2xl font-bold text-[#17324D]">
              {totalPresent}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Total attendance records
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <QrCode className="mb-2 text-[#6338E8]" size={21} />
            <p className="text-2xl font-bold text-[#17324D]">
              {sessions.length}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Sessions created
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
            <CheckCircle2 className="mb-2 text-emerald-600" size={21} />
            <p className="text-2xl font-bold text-[#17324D]">
              {activeSessions.length}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Active sessions
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-slate-100 p-4">
          <p className="text-sm font-semibold text-[#17324D]">
            Recent activity
          </p>
          <p className="mt-2 text-xs text-slate-500">
            {records.length
              ? `${records.length} attendance records have been recorded.`
              : "Attendance activity will appear here once sessions begin."}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F9FD] p-4 md:p-6">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#6338E8]">
              CampusConnect
            </p>
            <h1 className="mt-1 text-2xl font-bold text-[#17324D]">
              {pageTitle}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Welcome, {currentUser.name}
            </p>
          </div>

          <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold capitalize text-slate-600 shadow-sm">
            {role}
          </div>
        </div>

        {message && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-purple-100 bg-purple-50 px-4 py-3 text-sm text-purple-800">
            <AlertCircle size={17} />
            {message}
            <button
              onClick={() => setMessage("")}
              className="ml-auto"
              aria-label="Dismiss message"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="grid min-h-[650px] grid-cols-1 gap-4 rounded-2xl border border-[#DCE5F2] bg-white p-3 shadow-sm lg:grid-cols-[190px_minmax(280px,1fr)_minmax(300px,1.15fr)]">
          {/* Sidebar */}
          <aside className="border-b border-slate-100 pb-3 lg:border-b-0 lg:border-r lg:pr-3">
            <h3 className="mb-4 px-3 pt-2 text-sm font-bold text-[#17324D]">
              Attendance
            </h3>

            <div className="flex gap-2 overflow-x-auto lg:flex-col">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.label;

                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      setActiveTab(item.label);
                      setShowScanner(false);
                    }}
                    className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition ${
                      active
                        ? "bg-[#EEE9FF] text-[#6338E8]"
                        : "text-slate-600 hover:bg-slate-50 hover:text-[#6338E8]"
                    }`}
                  >
                    <Icon size={17} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Centre panel */}
          <main className="min-w-0 rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
            {activeTab === "Mark Attendance" && renderMainCard()}

            {activeTab === "Create Session" && isTeacher && (
              <div className="flex h-full flex-col justify-center">
                <div className="mb-5">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-[#6338E8]">
                    <QrCode size={25} />
                  </div>
                  <h2 className="text-xl font-bold text-[#17324D]">
                    Create Attendance Session
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Start a class session and generate a QR code.
                  </p>
                </div>

                <form onSubmit={createSession} className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Subject
                    </label>
                    <input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Database Management System"
                      className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-[#6338E8] focus:ring-2 focus:ring-purple-100"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Class / Section
                    </label>
                    <input
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                      placeholder="e.g. MCA - Semester 1"
                      className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-[#6338E8] focus:ring-2 focus:ring-purple-100"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Session Duration
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#6338E8]"
                    >
                      <option value="5">5 minutes</option>
                      <option value="10">10 minutes</option>
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">60 minutes</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#6338E8] py-3 text-sm font-semibold text-white hover:bg-[#512bd0]"
                  >
                    <QrCode size={17} />
                    Generate QR Code
                  </button>
                </form>
              </div>
            )}

            {activeTab === "History" && (
              <div>
                <h2 className="text-lg font-bold text-[#17324D]">
                  Attendance History
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {isStudent
                    ? "Your recorded attendance."
                    : "Browse recorded attendance."}
                </p>

                <div className="mt-5 space-y-3">
                  {filteredRecords.length ? (
                    filteredRecords.slice(0, 8).map((record) => (
                      <div
                        key={record.id}
                        className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 p-3"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-[#17324D]">
                            {record.subject}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {record.studentName} · {formatDate(record.date)}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                          {record.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center">
                      <History className="mx-auto mb-3 text-slate-300" size={35} />
                      <p className="text-sm font-semibold text-slate-700">
                        No attendance records yet
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Your records will appear here.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "Analytics" && (
              <div>
                <h2 className="text-lg font-bold text-[#17324D]">
                  Attendance Analytics
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Attendance statistics and summary.
                </p>

                {isStudent ? (
                  <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50 p-5 text-center">
                    <p className="text-sm font-medium text-slate-500">
                      Your recorded attendance
                    </p>
                    <p className="mt-3 text-5xl font-bold text-[#6338E8]">
                      {attendancePercentage}%
                    </p>
                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-[#6338E8]"
                        style={{ width: `${attendancePercentage}%` }}
                      />
                    </div>
                    <p className="mt-3 text-xs text-slate-500">
                      {myRecords.length} recorded session(s)
                    </p>
                  </div>
                ) : (
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {[
                      ["Total Sessions", sessions.length],
                      ["Attendance Records", records.length],
                      ["Students Recorded", uniqueStudents],
                      ["Active Sessions", activeSessions.length],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                      >
                        <p className="text-2xl font-bold text-[#6338E8]">
                          {value}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </main>

          {/* Right panel */}
          <section className="min-w-0 rounded-xl border border-[#E5EAF2] bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-[#17324D]">
                  {isStudent ? "My Attendance History" : "Attendance History"}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Recent attendance records
                </p>
              </div>
              <button
                onClick={() => setActiveTab("History")}
                className="shrink-0 text-xs font-semibold text-[#6338E8] hover:underline"
              >
                View All
              </button>
            </div>

            <div className="mb-3 grid grid-cols-[1fr_1fr_auto] gap-2 border-b border-slate-100 pb-3 text-[11px] font-semibold text-slate-500">
              <span>Date</span>
              <span>{isStudent ? "Subject" : "Student / Subject"}</span>
              <span>Status</span>
            </div>

            <div className="space-y-0">
              {filteredRecords.length ? (
                filteredRecords.slice(0, 8).map((record) => (
                  <div
                    key={record.id}
                    className="grid grid-cols-[1fr_1fr_auto] items-center gap-2 border-b border-slate-100 py-3 text-xs"
                  >
                    <span className="text-slate-500">
                      {formatDate(record.date)}
                    </span>
                    <span className="min-w-0 truncate font-medium text-slate-700">
                      {isStudent
                        ? record.subject
                        : record.studentName}
                    </span>
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-center text-[10px] font-bold text-emerald-700">
                      {record.status}
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center">
                  <CalendarDays
                    size={32}
                    className="mx-auto mb-3 text-slate-300"
                  />
                  <p className="text-sm font-medium text-slate-600">
                    No records available
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Attendance history will appear here.
                  </p>
                </div>
              )}
            </div>

            {isTeacher && (
              <div className="mt-5 rounded-xl bg-purple-50 p-3">
                <p className="text-xs font-semibold text-[#6338E8]">
                  Your sessions
                </p>
                <p className="mt-1 text-2xl font-bold text-[#17324D]">
                  {teacherSessions.length}
                </p>
                <p className="text-xs text-slate-500">
                  Sessions created by you
                </p>
              </div>
            )}

            {isStudent && (
              <div className="mt-5 rounded-xl bg-purple-50 p-3">
                <p className="text-xs font-semibold text-[#6338E8]">
                  Attendance summary
                </p>
                <p className="mt-1 text-2xl font-bold text-[#17324D]">
                  {myRecords.length}
                </p>
                <p className="text-xs text-slate-500">
                  Sessions recorded for your account
                </p>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Create session modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#17324D]">
                Create Session
              </h2>
              <button onClick={() => setShowCreate(false)}>
                <X className="text-slate-500" />
              </button>
            </div>

            <form onSubmit={createSession} className="space-y-4">
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject name"
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-[#6338E8]"
              />
              <input
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="Class / Section"
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-[#6338E8]"
              />
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm"
              >
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">60 minutes</option>
              </select>
              <button
                type="submit"
                className="w-full rounded-lg bg-[#6338E8] py-3 text-sm font-semibold text-white hover:bg-[#512bd0]"
              >
                Create Session & Generate QR
              </button>
            </form>
          </div>
        </div>
      )}

      {/* QR scanner modal */}
      {showScanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-[#17324D]">
                  Scan Attendance QR
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Allow camera access to scan the teacher's QR code.
                </p>
              </div>
              <button
                onClick={() => setShowScanner(false)}
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>
            <div id="attendance-reader" className="overflow-hidden rounded-xl" />
            <p className="mt-3 text-center text-xs text-slate-400">
              Camera access is required for QR scanning.
            </p>
          </div>
        </div>
      )}

      {/* Manual attendance modal */}
      {showManual && selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-[#17324D]">
                  Mark Student Attendance
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {selectedSession.subject} · {selectedSession.className}
                </p>
              </div>
              <button onClick={() => setShowManual(false)}>
                <X className="text-slate-500" />
              </button>
            </div>

            <form onSubmit={markManualAttendance} className="space-y-4">
              <input
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
                placeholder="Student full name"
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-[#6338E8]"
              />
              <input
                value={manualId}
                onChange={(e) => setManualId(e.target.value)}
                placeholder="Student ID / Enrollment number"
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-[#6338E8]"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-[#6338E8] py-3 text-sm font-semibold text-white hover:bg-[#512bd0]"
              >
                Mark Present
              </button>
            </form>

            <p className="mt-3 text-xs text-slate-400">
              Already marked students cannot be added twice to this session.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Attendance;
