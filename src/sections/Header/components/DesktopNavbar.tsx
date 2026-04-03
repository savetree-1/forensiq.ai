import brandLogo from "@/assets/branding/logo.png";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

type NavItem = {
  label: string;
  href: string;
};

type DesktopNavbarProps = {
  items: NavItem[];
};

export const DesktopNavbar = ({ items }: DesktopNavbarProps) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const hideCta = typeof window !== "undefined" && window.location.pathname === "/try-it-now";

  const handleTryNow = () => {
    if (isAuthenticated) {
      navigate("/dashboard/upload-queue");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="hidden items-center md:flex w-full">
      <a
        href="/"
        className="flex shrink-0 items-center"
        aria-label="Go to top"
      >
        <img
          src={brandLogo}
          alt="ForensIQ AI"
          className="h-10 w-auto"
        />
      </a>
      <nav className="ml-7 flex items-center gap-4">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="group inline-flex items-center gap-1 rounded-lg px-2 py-2 text-base font-semibold text-slate-700 transition hover:text-slate-900"
          >
            <span>{item.label}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-[18px] w-[18px] text-slate-500 transition group-hover:text-slate-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 7.5 10 12.5 15 7.5" />
            </svg>
          </a>
        ))}
      </nav>
      {!hideCta && (
        <div className="ml-auto pl-8 flex items-center gap-4">
          {!isAuthenticated ? (
            <button
              onClick={() => navigate("/login")}
              className="text-base font-semibold text-slate-700 hover:text-slate-900 transition mr-2"
            >
              Sign in / Sign up
            </button>
          ) : (
            <div className="flex items-center gap-2 mr-4">
               <span className="text-sm font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full border border-slate-200">Session Active</span>
            </div>
          )}
          <button
            onClick={handleTryNow}
            className="inline-flex items-center justify-center rounded-xl bg-[#67E8C8] px-7 py-3 text-base font-semibold text-slate-900 shadow-[rgba(10,13,18,0.08)_0px_8px_20px_0px] transition hover:bg-[#5BDFC0]"
          >
            {isAuthenticated ? "Go to Dashboard" : "Try it now"}
          </button>
        </div>
      )}
    </div>
  );
};
