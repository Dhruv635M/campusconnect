
import { useState } from "react";
import { GraduationCap, Eye, EyeOff } from "lucide-react";

function Auth({ initialMode = "login", onAuthSuccess }) {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const inputStyle =
    "w-full rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-base text-[#1E293B] outline-none placeholder:text-[#64748B] focus:border-[#087F75] focus:ring-2 focus:ring-[#087F75]/20";

  // UPDATE FORM FIELDS
  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // SWITCH BETWEEN LOGIN AND REGISTER
  const switchMode = (newMode) => {
    setMode(newMode);
    setError("");
    setShowPassword(false);
  };

  // SAFELY GET REGISTERED USERS
  const getUsers = () => {
    try {
      const savedUsers = JSON.parse(
        localStorage.getItem("campusUsers") || "[]"
      );

      return Array.isArray(savedUsers) ? savedUsers : [];
    } catch {
      return [];
    }
  };

  // LOGIN AND REGISTRATION
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const email = form.email.trim().toLowerCase();
    const password = form.password;

    const users = getUsers();

    // ================= REGISTER =================

    if (mode === "register") {
      const name = form.name.trim();

      if (!name) {
        setError("Please enter your full name.");
        return;
      }

      if (password.length < 6) {
        setError("Password must contain at least 6 characters.");
        return;
      }

      if (password !== form.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      const existingUser = users.find(
        (user) =>
          user.email?.trim().toLowerCase() === email
      );

      if (existingUser) {
        setError("An account with this email already exists.");
        return;
      }

      // SAVE USER DETAILS
      const newUser = {
        name,
        email,
        password,
        role: form.role,
        profileImage: "",
      };

      const updatedUsers = [...users, newUser];

      localStorage.setItem(
        "campusUsers",
        JSON.stringify(updatedUsers)
      );

      localStorage.setItem(
        "campusCurrentUser",
        JSON.stringify(newUser)
      );

      // SEND USER DETAILS TO APP.JSX
      onAuthSuccess?.(newUser);

      return;
    }

    // ================= LOGIN =================

    const matchedUser = users.find(
      (user) =>
        user.email?.trim().toLowerCase() === email &&
        user.password === password
    );

    if (!matchedUser) {
      setError("Invalid email or password.");
      return;
    }

    // SUPPORT OLDER ACCOUNTS SAVED WITH FACULTY ROLE
    const normalizedRole =
      matchedUser.role === "faculty"
        ? "teacher"
        : matchedUser.role || "student";

    // PRESERVE REGISTERED USER DETAILS
    const loggedInUser = {
      ...matchedUser,
      role: normalizedRole,
      name: matchedUser.name?.trim() || "User",
      email,
      profileImage: matchedUser.profileImage || "",
    };

    localStorage.setItem(
      "campusCurrentUser",
      JSON.stringify(loggedInUser)
    );

    onAuthSuccess?.(loggedInUser);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#EAF3F5] px-4 py-8 sm:px-8">

      {/* MAIN AUTH CARD */}

      <div
        className="w-full rounded-3xl bg-white shadow-xl"
        style={{
          maxWidth: "1000px",
          padding: "40px 55px",
        }}
      >

        {/* LOGO AND HEADING */}

        <div className="mb-8 flex flex-col items-center text-center">

          <div className="mb-3 rounded-2xl bg-[#DDF3EF] p-4">
            <GraduationCap
              size={52}
              className="text-[#075E59]"
            />
          </div>

          <h1 className="text-3xl font-extrabold text-[#123D50] sm:text-4xl">
            CampusConnect
          </h1>

          <br />

          <h2 className="mt-4 text-2xl font-bold text-[#123D50] sm:text-3xl">
            {mode === "login"
              ? "Welcome Back!"
              : "Create Your Account"}
          </h2>

          <p className="mt-2 text-lg text-[#475569]">
            {mode === "login"
              ? "Login to your account to continue"
              : "Join CampusConnect today!"}
          </p>

        </div>


        {/* FORM CONTENT */}

        <div
          style={{
            width: "100%",
            maxWidth: "650px",
            margin: "0 auto",
          }}
        >

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* FULL NAME */}

            {mode === "register" && (
              <div>

                <label className="mb-2 block text-lg font-semibold text-[#1E293B]">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className={inputStyle}
                  value={form.name}
                  onChange={(e) =>
                    updateField("name", e.target.value)
                  }
                  autoComplete="name"
                  required
                />

              </div>
            )}


            {/* EMAIL */}

            <div>

              <label className="mb-2 block text-lg font-semibold text-[#1E293B]">
                Email ID
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className={inputStyle}
                value={form.email}
                onChange={(e) =>
                  updateField("email", e.target.value)
                }
                autoComplete="email"
                required
              />

            </div>


            {/* PASSWORD */}

            <div>

              <label className="mb-2 block text-lg font-semibold text-[#1E293B]">
                Password
              </label>

              <div className="flex items-center rounded-xl border border-[#CBD5E1] pr-4 focus-within:border-[#087F75] focus-within:ring-2 focus-within:ring-[#087F75]/20">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full rounded-lg px-4 py-3 text-base text-[#1E293B] outline-none placeholder:text-[#94A3B8]"
                  value={form.password}
                  onChange={(e) =>
                    updateField("password", e.target.value)
                  }
                  autoComplete={
                    mode === "login"
                      ? "current-password"
                      : "new-password"
                  }
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="text-[#64748B] hover:text-[#087F75]"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword
                    ? <EyeOff size={23} />
                    : <Eye size={23} />}
                </button>

              </div>

            </div>


            {/* REGISTRATION ONLY FIELDS */}

            {mode === "register" && (
              <>

                {/* CONFIRM PASSWORD */}

                <div>

                  <label className="mb-2 block text-lg font-semibold text-[#1E293B]">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    placeholder="Confirm your password"
                    className={inputStyle}
                    value={form.confirmPassword}
                    onChange={(e) =>
                      updateField(
                        "confirmPassword",
                        e.target.value
                      )
                    }
                    autoComplete="new-password"
                    required
                  />

                </div>


                {/* SELECT ROLE */}

                <div>

                  <label className="mb-2 block text-lg font-semibold text-[#1E293B]">
                    Select Role
                  </label>

                  <select
                    className={inputStyle}
                    value={form.role}
                    onChange={(e) =>
                      updateField("role", e.target.value)
                    }
                    required
                  >
                    <option value="student">
                      Student
                    </option>

                    <option value="teacher">
                      Teacher
                    </option>

                    <option value="admin">
                      Admin
                    </option>

                  </select>

                </div>

              </>
            )}


            {/* ERROR MESSAGE */}

            {error && (
              <div
                role="alert"
                className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
              >
                {error}
              </div>
            )}


            {/* FORGOT PASSWORD */}

            {mode === "login" && (
              <div className="text-right">

                <button
                  type="button"
                  className="text-base font-semibold text-[#087F75] hover:underline"
                >
                  Forgot Password?
                </button>

              </div>
            )}


            {/* SUBMIT BUTTON */}

            <button
              type="submit"
              className="w-full rounded-xl bg-[#087F75] py-5 text-xl font-bold text-white shadow-lg transition duration-200 hover:bg-[#075E59] hover:shadow-xl"
            >
              {mode === "login"
                ? "Login"
                : "Register"}
            </button>

          </form>


          {/* SOCIAL LOGIN */}

          {mode === "login" && (
            <>

              <br />

              <p className="text-center text-md text-gray-500">
                Or continue with
              </p>

              <br />

              <div className="grid grid-cols-2 gap-4">

                {/* GOOGLE BUTTON */}

                <button
                  type="button"
                  className="flex items-center justify-center gap-3 rounded-lg border border-[#CBD5E1] bg-white py-3 text-base font-semibold text-[#334155] transition hover:bg-[#F1F5F9]"
                >

                  <svg
                    viewBox="0 0 48 48"
                    className="h-6 w-6"
                  >
                    <path
                      fill="#4285F4"
                      d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
                    />

                    <path
                      fill="#34A853"
                      d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"
                    />

                    <path
                      fill="#FBBC05"
                      d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"
                    />

                    <path
                      fill="#EA4335"
                      d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6.1 29.5 4 24 4A20 20 0 0 0 5.8 15.1l6.8 5.3C14.2 15.7 18.7 12.1 24 12.1Z"
                    />
                  </svg>

                  Google

                </button>


                {/* MICROSOFT BUTTON */}

                <button
                  type="button"
                  className="flex items-center justify-center gap-3 rounded-lg border border-[#CBD5E1] bg-white py-3 text-base font-semibold text-[#334155] transition hover:bg-[#F1F5F9]"
                >

                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                  >
                    <path
                      fill="#F25022"
                      d="M1 1h10v10H1z"
                    />

                    <path
                      fill="#7FBA00"
                      d="M13 1h10v10H13z"
                    />

                    <path
                      fill="#00A4EF"
                      d="M1 13h10v10H1z"
                    />

                    <path
                      fill="#FFB900"
                      d="M13 13h10v10H13z"
                    />
                  </svg>

                  Microsoft

                </button>

              </div>

            </>
          )}


          {/* SWITCH LOGIN / REGISTER */}

          <br />

          <p className="mt-8 text-center text-lg text-[#475569]">

            {mode === "login"
              ? "Don't have an account? "
              : "Already have an account? "}

            <button
              type="button"
              onClick={() =>
                switchMode(
                  mode === "login"
                    ? "register"
                    : "login"
                )
              }
              className="font-bold text-[#087F75] hover:underline"
            >
              {mode === "login"
                ? "Register"
                : "Login"}
            </button>

          </p>

        </div>
      </div>
    </div>
  );
}

export default Auth;
