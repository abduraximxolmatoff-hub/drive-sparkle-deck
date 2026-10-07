import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, X, Clock } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { brands } from "@/data/brands";
import { searchCars, suggestCars, matchRange, POPULAR, type SearchResult } from "@/lib/search";

const RECENT_KEY = "autoinfo.recentSearches";

function Highlight({ text, q }: { text: string; q: string }) {
  const r = matchRange(text, q);
  if (!r) return <>{text}</>;
  return (
    <>
      {text.slice(0, r[0])}
      <mark className="rounded bg-primary/25 px-0.5 text-foreground">{text.slice(r[0], r[1])}</mark>
      {text.slice(r[1])}
    </>
  );
}

export function CarSearch() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]"));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setQ(value), 200);
    return () => clearTimeout(id);
  }, [value]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const results = useMemo(() => searchCars(q), [q]);
  const suggestions = useMemo(() => (q && !results.length ? suggestCars(q) : []), [q, results.length]);
  useEffect(() => setActive(0), [q]);

  const remember = (term: string) => {
    const s = term.trim();
    if (!s) return;
    const next = [s, ...recent.filter((r) => r.toLowerCase() !== s.toLowerCase())].slice(0, 5);
    setRecent(next);
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const go = (r: SearchResult) => {
    remember(value || r.label);
    setOpen(false);
    if (r.kind === "brand") navigate({ to: "/brand/$slug", params: { slug: r.brand.slug } });
    else navigate({ to: "/$brand/$model", params: { brand: r.brand.slug, model: r.model.slug } });
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      const r = searchCars(value)[value === q ? active : 0];
      if (r) go(r);
    }
  };

  const showEmpty = open && !value.trim();
  const showResults = open && !!value.trim() && q === value && !!q.trim();

  return (
    <div ref={wrapRef} className="relative mx-auto mt-6 w-full max-w-xl text-left">
      <div className="group relative flex items-center rounded-2xl border border-border/70 bg-card-gradient shadow-card backdrop-blur-xl transition focus-within:border-primary focus-within:shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_22%,transparent)]">
        <Search className="pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground group-focus-within:text-primary" />
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          placeholder={t("search.placeholder")}
          aria-label={t("search.placeholder")}
          role="combobox"
          aria-expanded={open}
          aria-controls="car-search-list"
          className="h-14 w-full rounded-2xl bg-transparent pl-12 pr-12 text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {value && (
          <button
            type="button"
            aria-label={t("search.clear")}
            onClick={() => {
              setValue("");
              setQ("");
              inputRef.current?.focus();
            }}
            className="absolute right-3 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {(showEmpty || showResults) && (
        <div
          id="car-search-list"
          role="listbox"
          className="absolute inset-x-0 top-full z-40 mt-2 max-h-[70vh] overflow-y-auto rounded-2xl border border-border/70 bg-popover/95 p-2 shadow-card backdrop-blur-xl"
        >
          {showEmpty && (
            <div className="space-y-3 p-2">
              {recent.length > 0 && (
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    {t("search.recent")}
                  </p>
                  <ul className="space-y-1">
                    {recent.map((r) => (
                      <li key={r}>
                        <button
                          type="button"
                          onClick={() => setValue(r)}
                          className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-foreground hover:bg-muted"
                        >
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          {r}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                  {t("search.popular")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR.map(([b, m]) => {
                    const brand = brands.find((x) => x.slug === b);
                    const model = brand?.models.find((x) => x.slug === m);
                    if (!brand || !model) return null;
                    return (
                      <Link
                        key={m}
                        to="/$brand/$model"
                        params={{ brand: b, model: m }}
                        onClick={() => remember(model.name.replace(brand.name, "").trim())}
                        className="rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs text-foreground hover:border-primary hover:text-primary"
                      >
                        {model.name.replace(brand.name, "").trim()}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {showResults && results.length > 0 && (
            <ul>
              {results.map((r, i) => (
                <li key={r.kind + r.brand.slug + (r.kind === "model" ? r.model.slug : "")}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={i === active}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(r)}
                    className={`flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition ${
                      i === active ? "bg-muted" : ""
                    }`}
                  >
                    <div className="flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-background/50">
                      <img
                        src={r.kind === "model" ? r.model.image : r.brand.logo}
                        alt=""
                        loading="lazy"
                        className={r.kind === "model" ? "h-full w-full object-cover" : "h-9 w-9 object-contain"}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">
                        <Highlight text={r.label} q={value} />
                      </p>
                      <p className="flex items-center gap-1.5 truncate text-xs text-muted-foreground">
                        {r.kind === "model" && (
                          <img src={r.brand.logo} alt="" className="h-3.5 w-3.5 object-contain" />
                        )}
                        {r.kind === "brand"
                          ? `${t("search.brand")} · ${r.brand.models.length} ${t("home.modelsCount")}`
                          : `${r.brand.name}${r.model.taglineKey ? " · " + t(r.model.taglineKey) : ""}`}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {showResults && results.length === 0 && (
            <div className="p-3">
              <p className="text-sm font-semibold text-foreground">{t("search.notFound")}</p>
              <p className="mt-2 text-xs text-muted-foreground">{t("search.didYouMean")}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <Link
                    key={s.brand.slug + s.model.slug}
                    to="/$brand/$model"
                    params={{ brand: s.brand.slug, model: s.model.slug }}
                    className="rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs text-foreground hover:border-primary hover:text-primary"
                  >
                    {s.model.name}
                  </Link>
                ))}
              </div>
              <Link to="/brands" className="mt-3 inline-block text-xs font-semibold text-primary hover:underline">
                {t("search.allBrands")} →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
