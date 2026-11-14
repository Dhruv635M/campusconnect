
import { useState } from "react";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Headphones,
  ArrowRight,
  CheckCircle2,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const contactDetails = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Have a question? Send us an email.",
      value: "support@campusconnect.edu",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "We're happy to help with your queries.",
      value: "+91 XXXXX XXXXX",
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Connect with us at our campus.",
      value: "CampusConnect, New Delhi, India",
      color: "bg-violet-50 text-violet-600",
    },
    {
      icon: Clock,
      title: "Working Hours",
      description: "Our support team is available.",
      value: "Monday – Saturday, 9 AM – 5 PM",
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#102A56] via-[#173F78] to-[#2563A8] px-6 py-20 sm:px-10 lg:px-16">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-blue-300/10" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-blue-100">
              <MessageCircle size={16} />
              We're here to help
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Let's start a
              <span className="block text-blue-300">
                conversation.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
              Have a question, suggestion, or need assistance?
              We'd love to hear from you. Get in touch with the
              CampusConnect team and let's make campus life better together.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3 text-sm font-medium text-white">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-green-300" />
                Student Support
              </span>
              <span className="h-1 w-1 rounded-full bg-blue-300" />
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-green-300" />
                Faculty Assistance
              </span>
              <span className="h-1 w-1 rounded-full bg-blue-300" />
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-green-300" />
                General Enquiries
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">

        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Get in touch
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            We'd love to hear from you
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Whether you're a student, faculty member, or administrator,
            we're always ready to listen and help.
          </p>
        </div>

        {/* CONTACT CARDS */}
        <div className="mb-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {contactDetails.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                  <Icon size={23} />
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 min-h-[42px] text-sm leading-6 text-slate-500">
                  {item.description}
                </p>

                <p className="mt-4 break-words text-sm font-semibold text-blue-700">
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* FORM + SUPPORT PANEL */}
        <div className="grid gap-8 lg:grid-cols-5">

          {/* MESSAGE FORM */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9 lg:col-span-3">
            <div className="mb-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <Send size={23} />
              </div>

              <h2 className="text-2xl font-bold text-slate-900">
                Send us a message
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Fill out the form below and tell us how we can help.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-2xl border border-green-200 bg-green-50 px-6 py-10 text-center">
                <CheckCircle2
                  size={48}
                  className="mx-auto text-green-600"
                />

                <h3 className="mt-4 text-xl font-bold text-green-800">
                  Message submitted!
                </h3>

                <p className="mt-2 text-sm text-green-700">
                  Thank you for contacting CampusConnect.
                  Your message has been received in this demo.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Subject
                  </label>

                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="">Select a subject</option>
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Canteen">Canteen Related</option>
                    <option value="Marketplace">Marketplace Related</option>
                    <option value="Attendance">Attendance Related</option>
                    <option value="Feedback">Feedback & Suggestions</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Your Message
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows={5}
                    required
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800"
                >
                  Send Message
                  <ArrowRight size={18} />
                </button>

                <p className="text-center text-xs text-slate-400">
                  Your information is used only for this demo contact form.
                </p>
              </form>
            )}
          </div>

          {/* SUPPORT PANEL */}
          <div className="relative flex flex-col overflow-hidden rounded-3xl bg-[#102A56] p-7 text-white sm:p-9 lg:col-span-2">
            <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-blue-400/10" />
            <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-blue-400/10" />

            <div className="relative">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-blue-200">
                <Headphones size={28} />
              </div>

              <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">
                CampusConnect Support
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-snug">
                We're here to make your campus experience better.
              </h2>

              <p className="mt-5 text-sm leading-7 text-blue-100">
                From attendance and canteen orders to campus events
                and marketplace queries, we're here to make things easier.
              </p>

              <div className="my-9 h-px bg-white/15" />

              <h3 className="text-lg font-bold">
                How can we help?
              </h3>

              <div className="mt-5 space-y-5">
                {[
                  "Account and login assistance",
                  "Attendance and academic queries",
                  "Canteen and marketplace support",
                  "Suggestions and feedback",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2
                      size={19}
                      className="shrink-0 text-blue-300"
                    />
                    <span className="text-sm text-blue-50">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-2xl border border-white/15 bg-white/10 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-400/20">
                    <GraduationCap size={22} />
                  </div>

                  <div>
                    <p className="font-bold">CampusConnect</p>
                    <p className="text-xs text-blue-200">
                      One campus. One connected community.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="mt-16 rounded-3xl border border-blue-100 bg-blue-50 px-6 py-10 text-center sm:px-10">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-700 shadow-sm">
            <MessageCircle size={23} />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-slate-900">
            Your feedback helps us grow.
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
            Have an idea that could improve campus life?
            Share it with us. Every suggestion makes CampusConnect better.
          </p>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white px-6 py-7">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 text-white">
              <GraduationCap size={21} />
            </div>

            <span className="font-bold text-slate-800">
              Campus<span className="text-blue-700">Connect</span>
            </span>
          </div>

          <p className="text-center text-xs text-slate-500">
            © {new Date().getFullYear()} CampusConnect. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="#" aria-label="Facebook" className="transition hover:text-blue-700">
              <Facebook size={19} />
            </a>
            <a href="#" aria-label="Instagram" className="transition hover:text-blue-700">
              <Instagram size={19} />
            </a>
            <a href="#" aria-label="LinkedIn" className="transition hover:text-blue-700">
              <Linkedin size={19} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Contact;
