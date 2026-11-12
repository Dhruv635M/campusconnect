
import { useState } from "react";
import { GraduationCap, Eye, EyeOff } from "lucide-react";

function Auth({ initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);

const inputStyle =
  "w-full rounded-lg border border-[#CBD5E1] bg-white px-4 py-3 text-base text-[#1E293B] outline-none placeholder:text-[#64748B] focus:border-[#087F75] focus:ring-2 focus:ring-[#087F75]/20";

  const switchMode = (newMode) => {
    setMode(newMode);
    setShowPassword(false);
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
            <GraduationCap size={52} className="text-[#075E59]" />
          </div>

          <h1 className="text-3xl font-extrabold text-[#123D50] sm:text-4xl">
          CampusConnect
           </h1> <br />

          <h2 className="mt-4 text-2xl font-bold text-[#123D50] sm:text-3xl">
  {mode === "login" ? "Welcome Back!" : "Create Your Account"}
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

          {/* LOGIN FORM */}
          {mode === "login" && (
            <>
             <form onSubmit={(e) => e.preventDefault()} className="space-y-2">

                <div className="mb-6">
                  <label className="mb-2 block text-lg font-semibold text-[#1E293B]">
                    Email ID
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={inputStyle}
                    required
                  />
                </div>
<br />
                <div className="mb-4">
                  <label className="mb-2 block text-lg font-semibold text-[#1E293B]">
                    Password
                  </label>

                  <div className="flex items-center rounded-xl border border-[#CBD5E1] pr-4 focus-within:border-[#087F75] focus-within:ring-2 focus-within:ring-[#087F75]/20">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full rounded-lg px-4 py-3 text-base text-[#1E293B] outline-none placeholder:text-[#94A3B8]"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[#64748B] hover:text-[#087F75]"
                    >
                      {showPassword ? <EyeOff size={23} /> : <Eye size={23} />}
                    </button>
                  </div>
                </div>
<br />
                <div className="mb-7 text-right">
                  <button
                    type="button"
                    className="text-base font-semibold text-[#087F75] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#087F75] py-5 text-xl font-bold text-white shadow-lg transition duration-200 hover:bg-[#075E59] hover:shadow-xl"
                >
                  Login
                </button>

              </form>
<br />
              {/* SOCIAL LOGIN */}
    <p className="text-center text-md text-gray-500">
  Or continue with
</p>          <br />
<div className="grid grid-cols-2 gap-4">
    
  {/* GOOGLE BUTTON */}
  <button
    type="button"
    className="flex items-center justify-center gap-3 rounded-lg border border-[#CBD5E1] bg-white py-3 text-base font-semibold text-[#334155] transition hover:bg-[#F1F5F9]"
  >
    <svg viewBox="0 0 48 48" className="h-6 w-6">
      <path fill="#4285F4" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"/>
      <path fill="#34A853" d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"/>
      <path fill="#FBBC05" d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.3H5.8a20 20 0 0 0 0 17.8l6.8-5.3Z"/>
      <path fill="#EA4335" d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6.1 29.5 4 24 4A20 20 0 0 0 5.8 15.1l6.8 5.3C14.2 15.7 18.7 12.1 24 12.1Z"/>
    </svg>
    Google
  </button>

  {/* MICROSOFT BUTTON */}
  <button
    type="button"
    className="flex items-center justify-center gap-3 rounded-lg border border-[#CBD5E1] bg-white py-3 text-base font-semibold text-[#334155] transition hover:bg-[#F1F5F9]"
  >
    <svg viewBox="0 0 24 24" className="h-6 w-6">
      <path fill="#F25022" d="M1 1h10v10H1z"/>
      <path fill="#7FBA00" d="M13 1h10v10H13z"/>
      <path fill="#00A4EF" d="M1 13h10v10H1z"/>
      <path fill="#FFB900" d="M13 13h10v10H13z"/>
    </svg>
    Microsoft
  </button>
</div>

<br />
              <p className="mt-10 text-center text-lg text-[#475569]">
                Don't have an account?{" "}
                <button
                  onClick={() => switchMode("register")}
                  className="font-bold text-[#087F75] hover:underline"
                >
                  Register
                </button>
              </p>
            </>
          )}

          {/* REGISTER FORM */}
          {mode === "register" && (
            <>
              <form onSubmit={(e) => e.preventDefault()}>

                <div className="mb-5">
                  <label className="mb-2 block text-lg font-semibold text-[#1E293B]">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    className={inputStyle}
                    required
                  />
                </div>
<br />
                <div className="mb-5">
                  <label className="mb-2 block text-lg font-semibold text-[#1E293B]">
                    Email ID
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={inputStyle}
                    required
                  />
                </div>
<br />
                <div className="mb-5">
                  <label className="mb-2 block text-lg font-semibold text-[#1E293B]">
                    Password
                  </label>

                  <div className="flex items-center rounded-xl border border-[#CBD5E1] pr-4 focus-within:border-[#087F75] focus-within:ring-2 focus-within:ring-[#087F75]/20">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full rounded-xl px-5 py-4 text-lg text-[#1E293B] outline-none placeholder:text-[#64748B]"
                      required
                    />
<br />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[#64748B] hover:text-[#087F75]"
                    >
                      {showPassword ? <EyeOff size={23} /> : <Eye size={23} />}
                    </button>
                  </div>
                </div>
<br />
                <div className="mb-5">
                  <label className="mb-2 block text-lg font-semibold text-[#1E293B]">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    placeholder="Confirm your password"
                    className={inputStyle}
                    required
                  />
                </div>
<br />
                <div className="mb-7">
                  <label className="mb-2 block text-lg font-semibold text-[#1E293B]">
                    Select Role
                  </label>

                  <select className={inputStyle}>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
<br />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#087F75] py-4 text-xl font-bold text-white shadow-md transition hover:bg-[#075E59]"
                >
                  Register
                </button>

              </form>
<br />
              <p className="mt-8 text-center text-lg text-[#475569]">
                Already have an account?{" "}
                <button
                  onClick={() => switchMode("login")}
                  className="font-bold text-[#087F75] hover:underline"
                >
                  Login
                </button>
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default Auth;
