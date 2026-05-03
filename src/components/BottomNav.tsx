import { Link, useLocation } from "@tanstack/react-router";
import { Home, Car, Wrench, User } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

export function BottomNav() {
  const { t } = useLanguage();
  const { pathname } = useLocation();

  const items = [
    { to: "/", label: t("nav.home"), icon: Home, exact: true },
    { to: "/brands", label: t("nav.brands"), icon: Car, exact: false },
    { to: "/maintenance", label: t("nav.service"), icon: Wrench, exact: false },
    { to: "/profile", label: t("nav.profile"), icon: User, exact: false },
  ] as const;

  return (
    <nav
      aria-label="Bottom navigation"
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/60 bg-background/80 backdrop-blur-xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-3xl items-stretch justify-around px-2 py-1.5">
        {items.map(({ to, label, icon: Icon, exact }) => {
          const active = exact ? pathname === to : pathname.startsWith(to);
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className={`flex flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-[10px] font-medium uppercase tracking-wider transition ${
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`h-5 w-5 transition ${active ? "scale-110" : ""}`} strokeWidth={active ? 2.4 : 1.8} />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
