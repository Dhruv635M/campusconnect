
import { useEffect, useState } from "react";
import {
  UserRound,
  LockKeyhole,
  Bell,
  ShieldCheck,
  Headset,
  Camera,
  Save,
  ArrowLeft,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

function ProfileSettings({ user: userProp, onBack = () => {}, onUserUpdate = () => {} }) {
  const readUser = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("campusCurrentUser") || "{}");
      return { ...saved, ...(userProp || {}) };
    } catch {
      return userProp || {};
    }
  };

  const [user, setUser] = useState(readUser);
  const [activeSection, setActiveSection] = useState("Profile");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const role = (user.role || "student").toLowerCase();
  const roleLabel =
    role === "admin" ? "Administrator" :
    role === "teacher" || role === "faculty" ? "Faculty Member" :
    "Student";

  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    department: user.department || "",
    enrollment: user.enrollment || user.enrollmentNumber || "",
    course: user.course || "",
    semester: user.semester || "",
    employeeId: user.employeeId || user.facultyId || "",
    designation: user.designation || "",
    subjects: user.subjects || "",
    adminId: user.adminId || "",
  });

  const [notifications, setNotifications] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("campusProfileNotifications")) || {
        announcements: true,
        events: true,
        orders: true,
        email: false,
      };
    } catch {
      return { announcements: true, events: true, orders: true, email: false };
    }
  });

  const [privacy, setPrivacy] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("campusProfilePrivacy")) || {
        showEmail: false,
        showPhone: false,
        showProfile: true,
      };
    } catch {
      return { showEmail: false, showPhone: false, showProfile: true };
    }
  });

  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  useEffect(() => {
    const latest = readUser();
    setUser(latest);
    setForm((prev) => ({
      ...prev,
      name: latest.name || prev.name,
      email: latest.email || prev.email,
      phone: latest.phone || prev.phone,
      department: latest.department || prev.department,
      course: latest.course || prev.course,
      semester: latest.semester || prev.semester,
    }));
  }, [userProp]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setMessage("");
  };

  const saveProfile = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      ...form,
      role,
    };

    localStorage.setItem("campusCurrentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
    onUserUpdate(updatedUser);
    setMessage("Profile changes saved successfully!");
  };

  const saveNotifications = () => {
    localStorage.setItem(
      "campusProfileNotifications",
      JSON.stringify(notifications)
    );
    setMessage("Notification preferences saved!");
  };

  const savePrivacy = () => {
    localStorage.setItem("campusProfilePrivacy", JSON.stringify(privacy));
    setMessage("Privacy settings saved!");
  };

  const changePassword = (e) => {
    e.preventDefault();

    if (!passwords.current || !passwords.next || !passwords.confirm) {
      setMessage("Please fill in all password fields.");
      return;
    }

    if (passwords.next.length < 8) {
      setMessage("New password must contain at least 8 characters.");
      return;
    }

    if (passwords.next !== passwords.confirm) {
      setMessage("New password and confirmation do not match.");
      return;
    }

    setMessage(
      "Password form validated. Connect the Spring Boot backend to securely change passwords."
    );
    setPasswords({ current: "", next: "", confirm: "" });
  };

  const sections = [
    { name: "Profile", icon: UserRound },
    { name: "Change Password", icon: LockKeyhole },
    { name: "Notifications", icon: Bell },
    { name: "Privacy", icon: ShieldCheck },
    { name: "Help & Support", icon: Headset },
  ];

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100";

  const labelClass = "mb-2 block text-sm font-semibold text-slate-600";

  const Field = ({ label, value, onChange, placeholder, type = "text" }) => (
    <div>
      <label className={labelClass}>{label}</label>
      <input
        className={inputClass}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
      />
    </div>
  );

  const Toggle = ({ title, description, checked, onChange }) => (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-0">
      <div>
        <p className="text-sm font-semibold text-slate-700">{title}</p>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-violet-600" : "bg-slate-300"
        }`}
        aria-label={`Toggle ${title}`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-violet-600">CampusConnect</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-800 sm:text-3xl">
              Profile & Settings
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your account and personal preferences.
            </p>
          </div>

          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </button>
        </div>

        <div className="grid min-h-[650px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[260px_1fr]">
          <aside className="border-b border-slate-200 bg-white p-4 sm:p-5 lg:border-b-0 lg:border-r">
            <p className="mb-4 px-3 text-xs font-bold uppercase tracking-wider text-slate-400">
              Account Settings
            </p>

            <nav className="flex gap-2 overflow-x-auto lg:flex-col">
              {sections.map(({ name, icon: Icon }) => (
                <button
                  key={name}
                  onClick={() => {
                    setActiveSection(name);
                    setMessage("");
                  }}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                    activeSection === name
                      ? "bg-violet-50 text-violet-700"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  <Icon size={18} />
                  {name}
                </button>
              ))}
            </nav>
          </aside>

          <main className="p-5 sm:p-8 lg:p-10">
            {message && (
              <div className="mb-6 flex items-start gap-2 rounded-xl border border-violet-100 bg-violet-50 p-3 text-sm text-violet-700">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                {message}
              </div>
            )}

            {activeSection === "Profile" && (
              <form onSubmit={saveProfile}>
                <h2 className="text-xl font-bold text-slate-800">My Profile</h2>
                <p className="mt-1 text-sm text-slate-500">
                  View and update your personal information.
                </p>

                <div className="my-7 flex flex-wrap items-center gap-4 border-b border-slate-100 pb-7">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-100 text-2xl font-bold text-violet-700">
                    {(form.name || "U").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">
                      {form.name || "Your Name"}
                    </h3>
                    <p className="text-sm text-slate-500">{roleLabel}</p>
                    <p className="mt-1 text-sm text-slate-500">{form.email}</p>
                  </div>
                </div>

                <h3 className="mb-5 text-lg font-bold text-slate-800">
                  Personal Information
                </h3>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Full Name"
                    value={form.name}
                    onChange={(v) => updateField("name", v)}
                  />
                  <Field
                    label="Email Address"
                    type="email"
                    value={form.email}
                    onChange={(v) => updateField("email", v)}
                  />
                  <Field
                    label="Phone Number"
                    value={form.phone}
                    onChange={(v) => updateField("phone", v)}
                  />
                  <Field
                    label="Department"
                    value={form.department}
                    onChange={(v) => updateField("department", v)}
                  />

                  {role === "student" && (
                    <>
                      <Field
                        label="Enrollment Number"
                        value={form.enrollment}
                        onChange={(v) => updateField("enrollment", v)}
                      />
                      <Field
                        label="Course"
                        value={form.course}
                        onChange={(v) => updateField("course", v)}
                      />
                      <Field
                        label="Semester"
                        value={form.semester}
                        onChange={(v) => updateField("semester", v)}
                      />
                    </>
                  )}

                  {(role === "teacher" || role === "faculty") && (
                    <>
                      <Field
                        label="Faculty / Employee ID"
                        value={form.employeeId}
                        onChange={(v) => updateField("employeeId", v)}
                      />
                      <Field
                        label="Designation"
                        value={form.designation}
                        onChange={(v) => updateField("designation", v)}
                      />
                      <Field
                        label="Subjects Taught"
                        value={form.subjects}
                        onChange={(v) => updateField("subjects", v)}
                      />
                    </>
                  )}

                  {role === "admin" && (
                    <>
                      <Field
                        label="Admin ID"
                        value={form.adminId}
                        onChange={(v) => updateField("adminId", v)}
                      />
                      <Field
                        label="Designation"
                        value={form.designation}
                        onChange={(v) => updateField("designation", v)}
                      />
                    </>
                  )}
                </div>

                <button
                  type="submit"
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700 sm:w-auto sm:min-w-48"
                >
                  <Save size={17} />
                  Save Changes
                </button>
              </form>
            )}

            {activeSection === "Change Password" && (
              <form onSubmit={changePassword} className="max-w-xl">
                <h2 className="text-xl font-bold text-slate-800">Change Password</h2>
                <p className="mb-7 mt-1 text-sm text-slate-500">
                  Update your account password.
                </p>

                <div className="space-y-5">
                  {[
                    ["current", "Current Password"],
                    ["next", "New Password"],
                    ["confirm", "Confirm New Password"],
                  ].map(([key, label]) => (
                    <div key={key}>
                      <label className={labelClass}>{label}</label>
                      <div className="relative">
                        <input
                          className={`${inputClass} pr-12`}
                          type={showPassword ? "text" : "password"}
                          value={passwords[key]}
                          onChange={(e) =>
                            setPasswords((p) => ({ ...p, [key]: e.target.value }))
                          }
                          placeholder={`Enter ${label.toLowerCase()}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-3.5 text-slate-400"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="mt-7 rounded-xl bg-violet-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-violet-700">
                  Update Password
                </button>
                <p className="mt-4 text-xs text-slate-400">
                  Secure password updates will be connected to the backend.
                </p>
              </form>
            )}

            {activeSection === "Notifications" && (
              <div className="max-w-2xl">
                <h2 className="text-xl font-bold text-slate-800">Notifications</h2>
                <p className="mb-5 mt-1 text-sm text-slate-500">
                  Choose which updates you want to receive.
                </p>

                <Toggle
                  title="Campus Announcements"
                  description="Updates about important campus announcements."
                  checked={notifications.announcements}
                  onChange={(v) => setNotifications((p) => ({ ...p, announcements: v }))}
                />
                <Toggle
                  title="Events & Activities"
                  description="Get updates about upcoming campus events."
                  checked={notifications.events}
                  onChange={(v) => setNotifications((p) => ({ ...p, events: v }))}
                />
                <Toggle
                  title="Canteen Orders"
                  description="Receive updates about your food orders."
                  checked={notifications.orders}
                  onChange={(v) => setNotifications((p) => ({ ...p, orders: v }))}
                />
                <Toggle
                  title="Email Notifications"
                  description="Receive selected updates through email."
                  checked={notifications.email}
                  onChange={(v) => setNotifications((p) => ({ ...p, email: v }))}
                />

                <button
                  onClick={saveNotifications}
                  className="mt-7 rounded-xl bg-violet-600 px-6 py-3 text-sm font-bold text-white hover:bg-violet-700"
                >
                  Save Preferences
                </button>
              </div>
            )}

            {activeSection === "Privacy" && (
              <div className="max-w-2xl">
                <h2 className="text-xl font-bold text-slate-800">Privacy Settings</h2>
                <p className="mb-5 mt-1 text-sm text-slate-500">
                  Manage what other campus users can see.
                </p>

                <Toggle
                  title="Show My Profile"
                  description="Allow other users to view your profile."
                  checked={privacy.showProfile}
                  onChange={(v) => setPrivacy((p) => ({ ...p, showProfile: v }))}
                />
                <Toggle
                  title="Show Email Address"
                  description="Allow your email address to appear on your profile."
                  checked={privacy.showEmail}
                  onChange={(v) => setPrivacy((p) => ({ ...p, showEmail: v }))}
                />
                <Toggle
                  title="Show Phone Number"
                  description="Allow your phone number to appear on your profile."
                  checked={privacy.showPhone}
                  onChange={(v) => setPrivacy((p) => ({ ...p, showPhone: v }))}
                />

                <button
                  onClick={savePrivacy}
                  className="mt-7 rounded-xl bg-violet-600 px-6 py-3 text-sm font-bold text-white hover:bg-violet-700"
                >
                  Save Privacy Settings
                </button>
              </div>
            )}

            {activeSection === "Help & Support" && (
              <div className="max-w-2xl">
                <h2 className="text-xl font-bold text-slate-800">Help & Support</h2>
                <p className="mb-7 mt-1 text-sm text-slate-500">
                  Need assistance with CampusConnect? Here are some ways to get help.
                </p>

                <div className="space-y-4">
                  <div className="rounded-xl border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-700">Technical Support</h3>
                    <p className="mt-2 text-sm text-slate-500">
                      Contact your CampusConnect administrator for technical issues.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-700">Account Assistance</h3>
                    <p className="mt-2 text-sm text-slate-500">
                      Ask your college administration for account or access-related help.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-5">
                    <h3 className="font-bold text-slate-700">Frequently Asked Questions</h3>
                    <p className="mt-2 text-sm text-slate-500">
                      Check your college's support resources for guidance on using CampusConnect.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
