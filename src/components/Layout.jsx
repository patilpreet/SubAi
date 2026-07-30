import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useTheme } from "../hooks/useTheme";

const NAV_LINKS = [
  { to: "/templates", label: "Templates" },
  { to: "/pricing", label: "Pricing" },
  { to: "/plugin/download", label: "Plugin" },
  { to: "/changelog", label: "Changelog" },
  { to: "/about", label: "About" },
];

export function Layout({ children, hideNav, hideFooter }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isDark, toggle: toggleTheme } = useTheme();

  return (
    <div className="bg-[var(--bg-base)] text-[var(--text-primary)] min-h-screen font-sans selection:bg-[var(--primary)]/15 flex flex-col">
      {!hideNav && (
        <>
          <header className="fixed top-0 left-0 right-0 z-50">
            <div className="mx-auto max-w-4xl px-4 pt-5">
              <div className="flex items-center justify-between rounded-full border border-[var(--border-base)] bg-[var(--bg-surface)]/70 backdrop-blur-xl px-5 py-2.5 shadow-sm transition-all duration-300">
                <Link className="flex items-center gap-2 shrink-0" to="/">
                  <img src="/subai-logo.png" alt="SubAI" className="h-10 w-auto object-contain brightness-95 contrast-125" />
                </Link>

                <nav className="hidden md:flex items-center gap-1">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="px-4 py-1.5 text-[13px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-full hover:bg-[var(--primary)]/8 transition-all font-medium"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="flex items-center gap-2">
                  {/* Dark mode toggle */}
                  <button
                    onClick={toggleTheme}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--primary)]/8 transition-all"
                    title={isDark ? "Switch to light mode" : "Switch to dark mode"}
                    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    {isDark ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
                      </svg>
                    ) : (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                      </svg>
                    )}
                  </button>
                  <Link
                    to="/dashboard"
                    className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-[13px] font-semibold text-white bg-[var(--primary)] hover:bg-[var(--tertiary)] rounded-full transition-all shadow-sm shadow-[var(--primary)]/20"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--primary)]/8 transition-all"
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                    >
                      {mobileOpen ? (
                        <>
                          <path d="M18 6 6 18" />
                          <path d="m6 6 12 12" />
                        </>
                      ) : (
                        <>
                          <path d="M4 5h16" />
                          <path d="M4 12h16" />
                          <path d="M4 19h16" />
                        </>
                      )}
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </header>

          <div
            className={`fixed inset-0 z-40 transition-all duration-300 ${
              mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="absolute inset-0 bg-[var(--text-primary)]/10 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div
              className={`bg-[var(--bg-surface)] border-b border-[var(--border-base)] pt-20 pb-6 px-6 transition-transform duration-300 ${
                mobileOpen ? "translate-y-0" : "-translate-y-full"
              }`}
            >
              <nav className="flex flex-col gap-1 max-w-7xl mx-auto">
                <Link
                  to="/dashboard"
                  className="px-4 py-2.5 text-[13px] font-bold text-white bg-[var(--primary)] hover:bg-[var(--tertiary)] rounded-full text-center mb-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="px-4 py-2 text-[14px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-full hover:bg-[var(--primary)]/8 transition-all font-medium"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </>
      )}

      {children}

      {!hideFooter && (
        <footer className="border-t border-[var(--border-base)] bg-[var(--bg-surface)] pt-16 pb-8 mt-auto">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <img src="/subai-logo.png" alt="SubAI" className="h-10 w-auto object-contain brightness-95 contrast-125" />
              </Link>
              <p className="text-[var(--text-secondary)] text-sm max-w-xs leading-relaxed">
                The free, browser-native AI caption studio built for Indian creators.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-[var(--text-primary)] mb-4 text-sm tracking-wide">Product</h4>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                <li>
                  <Link
                    to="/pricing"
                    className="hover:text-[var(--primary)] transition-colors duration-200"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/changelog"
                    className="hover:text-[var(--primary)] transition-colors duration-200"
                  >
                    Changelog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/templates"
                    className="hover:text-[var(--primary)] transition-colors duration-200"
                  >
                    Templates
                  </Link>
                </li>
                <li>
                  <Link
                    to="/plugin/download"
                    className="hover:text-[var(--primary)] transition-colors duration-200"
                  >
                    Plugin
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[var(--text-primary)] mb-4 text-sm tracking-wide">Company</h4>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                <li>
                  <Link to="/about" className="hover:text-[var(--primary)] transition-colors duration-200">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-[var(--primary)] transition-colors duration-200">
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="hover:text-[var(--primary)] transition-colors duration-200"
                  >
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[var(--text-primary)] mb-4 text-sm tracking-wide">Legal</h4>
              <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
                <li>
                  <Link
                    to="/privacy"
                    className="hover:text-[var(--primary)] transition-colors duration-200"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-[var(--primary)] transition-colors duration-200">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="max-w-5xl mx-auto px-6 pt-8 border-t border-[var(--border-base)] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[var(--text-tertiary)] text-xs">© 2026 Preet Patil. All rights reserved.</p>
            <div className="flex items-center gap-4 text-[var(--text-tertiary)] text-xs">
              <span>Powered by Groq & Whisper</span>
              <span className="w-1 h-1 rounded-full bg-[var(--border-base)]" />
              <span>v1.0.0</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
