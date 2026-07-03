import { createFileRoute } from "@tanstack/react-router";
import { type ComponentType, type SVGProps, useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Play,
  Star,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  Crown,
  Utensils,
  Car,
  Wine,
  BedDouble,
  Presentation,
  Snowflake,
  Users,
  Shield,
  Music,
  Wifi,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  Check,
  ArrowUp,
} from "lucide-react";

import hero from "@/assets/hero.jpg";
import about from "@/assets/about.jpg";
import featured from "@/assets/featured.jpg";
import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";
import g4 from "@/assets/g4.jpg";
import g5 from "@/assets/g5.jpg";
import g6 from "@/assets/g6.jpg";
import g7 from "@/assets/g7.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
});

/* ----------------------------- data ----------------------------- */

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#packages" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const AMENITIES = [
  {
    icon: Crown,
    title: "Grand Banquet Hall",
    d: "Soaring ceilings crowned by crystal chandeliers.",
  },
  {
    icon: Sparkles,
    title: "Royal Wedding Stage",
    d: "Bespoke floral & drapery design for every couple.",
  },
  { icon: Utensils, title: "Premium Catering", d: "Multi-cuisine, chef-curated tasting menus." },
  { icon: Car, title: "Valet & Parking", d: "Ample parking with dedicated valet service." },
  { icon: Wine, title: "VIP Lounge", d: "Private lounge for family and honored guests." },
  { icon: BedDouble, title: "Bridal Suite", d: "A serene retreat for the bride and her party." },
  {
    icon: Presentation,
    title: "Conference Facilities",
    d: "AV, staging and boardrooms of the finest grade.",
  },
  {
    icon: Snowflake,
    title: "Fully Climate Controlled",
    d: "Whisper-quiet comfort in every season.",
  },
  {
    icon: Users,
    title: "Professional Staff",
    d: "Trained hospitality team, discreet and attentive.",
  },
  { icon: Shield, title: "24/7 Security", d: "Round-the-clock protection for guests and gifts." },
  { icon: Music, title: "Live Music & DJ", d: "Concert-grade sound and lighting design." },
  { icon: Wifi, title: "High-Speed Wi-Fi", d: "Enterprise connectivity throughout the property." },
];

const STATS = [
  { n: 10, s: "+", l: "Years of Excellence" },
  { n: 500, s: "+", l: "Events Hosted" },
  { n: 50, s: "K+", l: "Happy Guests" },
  { n: 98, s: "%", l: "Client Satisfaction" },
];

const SERVICES = [
  { t: "Wedding Ceremony", d: "A sacred setting for your once-in-a-lifetime vows.", img: g1 },
  { t: "Wedding Reception", d: "Cinematic receptions curated with couture detail.", img: g4 },
  { t: "Corporate Galas", d: "Refined stages for keynotes, awards and launches.", img: g6 },
  { t: "Bratabandha", d: "Traditional ceremonies staged with cultural elegance.", img: g7 },
  { t: "Engagement", d: "Intimate soirées to mark the beginning of forever.", img: g5 },
  { t: "Private Celebrations", d: "Birthdays, anniversaries and milestone dinners.", img: g2 },
];

const GALLERY: { src: string; span: string; cat: string }[] = [
  { src: g1, span: "md:col-span-2 md:row-span-2", cat: "Stage" },
  { src: g2, span: "", cat: "Dining" },
  { src: g3, span: "", cat: "Catering" },
  { src: g4, span: "md:row-span-2", cat: "Reception" },
  { src: g5, span: "md:col-span-2", cat: "Outdoor" },
  { src: g6, span: "", cat: "Corporate" },
  { src: g7, span: "", cat: "Ceremony" },
];

const PACKAGES = [
  {
    name: "Silver",
    from: "NPR 4,50,000",
    tag: "For intimate gatherings",
    features: [
      "Up to 200 guests",
      "Elegant floral décor",
      "Signature catering menu",
      "Photography (optional)",
      "Complimentary parking",
    ],
    featured: false,
  },
  {
    name: "Gold",
    from: "NPR 8,50,000",
    tag: "Most requested",
    features: [
      "Up to 500 guests",
      "Premium designer décor",
      "Luxury multi-cuisine dining",
      "Professional photo & film",
      "In-house DJ and lighting",
      "VIP lounge access",
    ],
    featured: true,
  },
  {
    name: "Diamond",
    from: "On request",
    tag: "The royal experience",
    features: [
      "Unlimited guest capacity",
      "Royal couture décor",
      "Bespoke tasting menu",
      "Cinematic film & drone",
      "Live music ensemble",
      "Private bridal suite",
      "White-glove concierge",
    ],
    featured: false,
  },
];

const TESTIMONIALS = [
  {
    name: "Ananya & Rohan",
    role: "Wedding · 2025",
    quote:
      "DrillThru gave us the wedding we had only dared to dream of. Every detail was flawless — from the floral arches to the way our guests were welcomed.",
  },
  {
    name: "Kritika Sharma",
    role: "Corporate Gala",
    quote:
      "An extraordinary venue with a team that anticipates every need. Our annual gala has never looked, or felt, more prestigious.",
  },
  {
    name: "Rajan & Meera",
    role: "Reception · 2024",
    quote:
      "It felt like being welcomed into a palace. Even our most travelled guests said it was the finest banquet they had ever attended.",
  },
  {
    name: "Sujan Basnet",
    role: "Engagement",
    quote:
      "Unreal attention to detail. The lighting, the food, the pacing of the evening — everything was curated with love.",
  },
];

/* --------------------------- primitives -------------------------- */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GoldDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="gold-line w-16" />
      {label && <span className="eyebrow whitespace-nowrap">{label}</span>}
      <span className="gold-line w-16" />
    </div>
  );
}

/* ----------------------------- loader ---------------------------- */

function Loader({ done }: { done: () => void }) {
  useEffect(() => {
    const t = setTimeout(done, 1800);
    return () => clearTimeout(t);
  }, [done]);
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0a0a0a]"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div className="font-cinzel text-xs tracking-[0.7em] text-white/50">DRILLTHRU</div>
        <div className="font-display gold-text mt-3 text-5xl md:text-6xl">Banquet</div>
      </motion.div>
      <div className="relative mt-10 h-px w-64 overflow-hidden bg-white/10">
        <motion.span
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.6, ease: [0.6, 0, 0.4, 1] }}
          className="absolute inset-y-0 left-0 w-full"
          style={{ background: "linear-gradient(90deg, transparent, #d4af37, transparent)" }}
        />
      </div>
    </motion.div>
  );
}

/* ------------------------------ header --------------------------- */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-dark py-3" : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <a href="#home" className="flex items-center gap-3">
            <span className="hairline flex h-9 w-9 items-center justify-center rounded-full">
              <span className="font-cinzel text-[10px] gold-text">DT</span>
            </span>
            <span className="font-display text-xl text-white leading-none">
              DrillThru <span className="gold-text">Banquet</span>
            </span>
          </a>
          <nav className="hidden items-center gap-9 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="group relative text-[12px] font-medium tracking-[0.22em] uppercase text-white/70 transition hover:text-white"
              >
                {n.label}
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-[color:var(--gold)] transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="hidden lg:block">
            <a href="#booking" className="btn-gold">
              Book Now <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <button
            className="lg:hidden text-white"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#0a0a0a] lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-display gold-text text-xl">DrillThru</span>
              <button onClick={() => setOpen(false)} className="text-white" aria-label="Close menu">
                <X />
              </button>
            </div>
            <nav className="mt-6 flex flex-col items-center gap-8">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="font-display text-3xl text-white"
                >
                  {n.label}
                </motion.a>
              ))}
              <a href="#booking" onClick={() => setOpen(false)} className="btn-gold mt-4">
                Book Now
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------ hero ----------------------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const subs = [
    "Luxury Weddings",
    "Receptions",
    "Corporate Galas",
    "Bratabandha",
    "Private Celebrations",
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % subs.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-black">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={hero}
          alt="DrillThru grand ballroom with crystal chandeliers"
          className="ken-burns h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)",
          }}
        />
      </motion.div>

      {/* floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 18 }).map((_, k) => (
          <motion.span
            key={k}
            className="absolute h-1 w-1 rounded-full"
            style={{
              left: `${(k * 53) % 100}%`,
              top: `${(k * 37) % 100}%`,
              background: "rgba(212,175,55,0.6)",
              boxShadow: "0 0 12px rgba(212,175,55,0.7)",
            }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: 6 + (k % 5), repeat: Infinity, delay: k * 0.3 }}
          />
        ))}
      </div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <Reveal>
          <GoldDivider label="Est. Nepal · Since 2015" />
        </Reveal>

        <Reveal delay={0.15}>
          <h1 className="font-display mt-8 max-w-5xl text-[clamp(2.5rem,7vw,6.5rem)] leading-[1.02] text-white">
            Where Celebrations Become
            <span className="block italic gold-text">Timeless Memories</span>
          </h1>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-8 flex items-center gap-3 text-white/80">
            <span className="h-px w-8 bg-white/40" />
            <span className="text-[11px] tracking-[0.35em] uppercase">Curated for</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={subs[i]}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
                className="font-display italic text-lg text-[color:var(--gold-soft)] min-w-[190px] text-left"
              >
                {subs[i]}
              </motion.span>
            </AnimatePresence>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a href="#booking" className="btn-gold">
              Book Your Event <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <a href="#gallery" className="btn-ghost-gold">
              Explore Gallery
            </a>
          </div>
        </Reveal>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60"
      >
        <span className="font-cinzel text-[10px] tracking-[0.4em]">SCROLL</span>
        <ChevronDown className="h-4 w-4" />
      </motion.div>
    </section>
  );
}

/* ------------------------------ about ---------------------------- */

function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-[color:var(--cream)] py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12 lg:gap-24">
        <Reveal className="lg:col-span-5">
          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] shadow-[var(--shadow-luxe)]">
              <img
                src={about}
                alt="Grand marble entrance with chandelier"
                loading="lazy"
                width={1200}
                height={1500}
                className="h-[560px] w-full object-cover md:h-[680px]"
              />
            </div>
            <div className="glass-light absolute -bottom-8 -right-6 hidden rounded-2xl px-6 py-5 md:block">
              <div className="font-display text-4xl gold-text">
                10<span className="text-2xl">+</span>
              </div>
              <div className="mt-1 text-[10px] tracking-[0.3em] uppercase text-[color:var(--ink)]/70">
                Years of Excellence
              </div>
            </div>
            <div className="hairline absolute -left-4 -top-4 h-24 w-24 rounded-full" />
          </div>
        </Reveal>

        <div className="lg:col-span-7 lg:pt-8">
          <Reveal>
            <p className="eyebrow">Our Story</p>
            <h2 className="font-display mt-5 text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] text-[color:var(--ink)]">
              A house of hospitality, crafted for the{" "}
              <span className="italic gold-text">unforgettable</span>.
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-8 max-w-xl text-[15px] leading-[1.9] text-[color:var(--ink)]/70">
              DrillThru Banquet was born from a simple conviction — that every celebration deserves
              to feel like a masterpiece. For over a decade our halls have hosted some of Nepal's
              most exquisite weddings, private galas and corporate evenings, each staged with the
              discreet perfectionism of a grand hotel.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-[1.9] text-[color:var(--ink)]/70">
              From candlelit ceremonies to full-property receptions, every detail — the linens, the
              lighting, the pacing of the evening — is composed by hand. It is hospitality as art.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-[color:var(--ink)]/10 pt-8">
              {[
                "Royal interiors",
                "Chef-curated catering",
                "Concierge service",
                "Cinematic staging",
              ].map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--gold)]/15 text-[color:var(--gold)]">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm text-[color:var(--ink)]/80">{t}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.45}>
            <a href="#services" className="btn-gold mt-12">
              Discover our services <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- amenities -------------------------- */

function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-[#0d0d0d] py-28 md:py-40 text-white">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #d4af37 1px, transparent 1px), radial-gradient(circle at 80% 60%, #d4af37 1px, transparent 1px)",
          backgroundSize: "60px 60px, 90px 90px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="text-center">
          <p className="eyebrow">Why Choose DrillThru</p>
          <h2 className="font-display mt-5 text-[clamp(2rem,4.5vw,4rem)] leading-[1.05]">
            Twelve reasons to <span className="italic gold-text">celebrate here</span>.
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[color:var(--gold)] to-transparent" />
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {AMENITIES.map(({ icon: Icon, title, d }, i) => (
            <Reveal key={title} delay={i * 0.04}>
              <div className="luxe-card-dark group h-full p-7">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--gold)]/40 bg-black/30 text-[color:var(--gold)] transition group-hover:bg-[color:var(--gold)] group-hover:text-black">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="font-display text-xl">{title}</div>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{d}</p>
                <div className="mt-6 h-px w-8 bg-[color:var(--gold)]/40 transition-all duration-500 group-hover:w-16" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ stats ---------------------------- */

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

function Stats() {
  return (
    <section className="relative bg-[color:var(--cream)] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-y-14 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.1} className="text-center">
              <div className="font-display text-[clamp(2.5rem,6vw,5rem)] gold-text leading-none">
                <Counter to={s.n} suffix={s.s} />
              </div>
              <div className="mt-4 text-[10px] tracking-[0.35em] uppercase text-[color:var(--ink)]/60">
                {s.l}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- services --------------------------- */

function Services() {
  return (
    <section id="services" className="relative bg-[color:var(--cream)] py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <p className="eyebrow">Services</p>
            <h2 className="font-display mt-5 max-w-2xl text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] text-[color:var(--ink)]">
              Every occasion, staged with <span className="italic gold-text">quiet grandeur</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-sm leading-relaxed text-[color:var(--ink)]/60">
              From sacred ceremonies to corporate galas, our team designs each event to a
              couturier's standard.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.05}>
              <article className="luxe-card group h-full">
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.t}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute left-5 top-5 hairline rounded-full bg-black/40 px-3 py-1 text-[10px] tracking-[0.3em] uppercase text-white">
                    Signature
                  </div>
                </div>
                <div className="p-7">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl text-[color:var(--ink)]">{s.t}</h3>
                    <ArrowUpRight className="h-4 w-4 text-[color:var(--gold)] transition-transform duration-500 group-hover:rotate-45" />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink)]/65">{s.d}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- featured venue ---------------------- */

function Featured() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <section ref={ref} className="relative h-[92vh] w-full overflow-hidden bg-black">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={featured}
          alt="Aerial view of DrillThru at dusk"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/60" />
      </motion.div>
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
        <div className="max-w-xl text-white">
          <Reveal>
            <p className="eyebrow">The Estate</p>
            <h2 className="font-display mt-6 text-[clamp(2rem,5vw,4.5rem)] leading-[1.02]">
              An estate designed for <span className="italic gold-text">once-in-a-lifetime</span>{" "}
              evenings.
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-[1.9] text-white/70">
              Grand ballroom. VIP wing. Manicured gardens. Private dining pavilion. A cinematic
              photography courtyard. Every corner of DrillThru is composed to be beautiful from
              every angle.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-5 border-t border-white/15 pt-8 sm:grid-cols-3">
              {[
                "Grand Ballroom",
                "VIP Hall",
                "Garden Lawns",
                "Dining Pavilion",
                "Ceremony Stage",
                "Photo Courtyard",
              ].map((v) => (
                <div key={v} className="text-[13px] text-white/80">
                  <span className="text-[color:var(--gold)] mr-2">◆</span>
                  {v}
                </div>
              ))}
            </div>
            <a href="#booking" className="btn-gold mt-12">
              Schedule a private tour
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- gallery ---------------------------- */

function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  return (
    <section id="gallery" className="relative bg-[color:var(--cream)] py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center">
          <p className="eyebrow">Gallery</p>
          <h2 className="font-display mt-5 text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] text-[color:var(--ink)]">
            A quiet look inside the <span className="italic gold-text">house</span>.
          </h2>
        </Reveal>

        <div className="mt-16 grid auto-rows-[240px] grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {GALLERY.map((g, i) => (
            <Reveal
              key={i}
              delay={i * 0.04}
              className={`group relative overflow-hidden rounded-2xl ${g.span}`}
            >
              <button onClick={() => setLightbox(g.src)} className="block h-full w-full">
                <img
                  src={g.src}
                  alt={g.cat}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-5 left-5 translate-y-3 text-white opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="eyebrow" style={{ color: "var(--gold)" }}>
                    {g.cat}
                  </p>
                  <p className="font-display mt-1 text-lg">View</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-6"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute right-6 top-6 text-white/70 hover:text-white"
              aria-label="Close"
            >
              <X />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={lightbox}
              alt=""
              className="max-h-[86vh] max-w-[92vw] rounded-2xl object-contain shadow-[var(--shadow-gold)]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------------------- packages --------------------------- */

function Packages() {
  return (
    <section
      id="packages"
      className="relative overflow-hidden bg-[#0d0d0d] py-28 md:py-40 text-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center">
          <p className="eyebrow">Packages</p>
          <h2 className="font-display mt-5 text-[clamp(2rem,4.5vw,4rem)] leading-[1.05]">
            Choose the celebration that <span className="italic gold-text">feels like you</span>.
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {PACKAGES.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div
                className={`relative h-full rounded-[1.5rem] p-10 transition-all duration-500 ${
                  p.featured
                    ? "border border-[color:var(--gold)]/60 bg-gradient-to-b from-[#1a1408] via-[#141210] to-[#0d0d0d] lg:-translate-y-4 shadow-[var(--shadow-gold)]"
                    : "border border-white/10 bg-[#111]"
                }`}
              >
                {p.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-[color:var(--gold)] bg-black px-4 py-1 text-[10px] tracking-[0.35em] uppercase text-[color:var(--gold)]">
                    Most Requested
                  </div>
                )}
                <p className="eyebrow">{p.tag}</p>
                <h3 className="font-display mt-4 text-5xl">{p.name}</h3>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-[11px] tracking-[0.3em] uppercase text-white/50">From</span>
                  <span className="font-display text-2xl gold-text">{p.from}</span>
                </div>
                <div className="my-8 gold-line" />
                <ul className="space-y-4">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-white/75">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[color:var(--gold)]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#booking"
                  className={`mt-10 flex ${p.featured ? "btn-gold" : "btn-ghost-gold"} justify-center`}
                >
                  Book Now <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ video ---------------------------- */

function VideoSection() {
  return (
    <section className="relative h-[75vh] overflow-hidden bg-black">
      <img
        src={g4}
        alt="Wedding highlights film"
        className="h-full w-full object-cover opacity-70"
        loading="lazy"
      />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.55), rgba(20,10,0,0.7))" }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
        <Reveal>
          <p className="eyebrow">Cinematic Film</p>
          <h2 className="font-display mt-4 max-w-3xl text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.1]">
            "It felt like walking into a story we would tell forever."
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <button className="mt-10 group relative inline-flex h-24 w-24 items-center justify-center rounded-full border border-[color:var(--gold)] bg-black/30 text-[color:var(--gold)] transition hover:scale-105">
            <span className="absolute inset-0 rounded-full border border-[color:var(--gold)]/40 animate-ping" />
            <Play className="h-8 w-8 fill-current" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------- testimonials ------------------------ */

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[i];
  return (
    <section id="testimonials" className="relative bg-[color:var(--cream)] py-28 md:py-40">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <p className="eyebrow">Words from our guests</p>
        </Reveal>
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
            className="mt-12"
          >
            <div className="mb-6 flex justify-center gap-1 text-[color:var(--gold)]">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="font-display text-[clamp(1.5rem,3vw,2.6rem)] leading-[1.3] text-[color:var(--ink)]">
              "{t.quote}"
            </blockquote>
            <div className="mt-10">
              <div className="font-cinzel text-sm tracking-[0.25em] text-[color:var(--ink)]">
                {t.name}
              </div>
              <div className="mt-1 text-xs tracking-[0.25em] uppercase text-[color:var(--ink)]/50">
                {t.role}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="mt-12 flex justify-center gap-3">
          {TESTIMONIALS.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              aria-label={`Testimonial ${k + 1}`}
              className={`h-[3px] transition-all duration-500 ${k === i ? "w-10 bg-[color:var(--gold)]" : "w-5 bg-[color:var(--ink)]/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- booking --------------------------- */

function Booking() {
  const [sent, setSent] = useState(false);
  return (
    <section
      id="booking"
      className="relative overflow-hidden bg-[#0a0a0a] py-28 md:py-40 text-white"
    >
      <div className="absolute inset-0">
        <img src={g5} alt="" className="h-full w-full object-cover opacity-25" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/85 to-[#0a0a0a]" />
      </div>
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-16 px-6 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Book Your Event</p>
          <h2 className="font-display mt-5 text-[clamp(2rem,4.5vw,4rem)] leading-[1.05]">
            Let's compose your <span className="italic gold-text">perfect evening</span>.
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-[1.9] text-white/60">
            Share a few details and our concierge will respond within 24 hours to arrange a private
            consultation at the estate.
          </p>
          <div className="mt-10 space-y-4 text-sm text-white/70">
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-[color:var(--gold)]" /> +977 9800000000
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-[color:var(--gold)]" /> concierge@drillthru.com
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-[color:var(--gold)]" /> Viewings 10:00 – 20:00, daily
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="glass-dark relative rounded-[1.5rem] p-8 md:p-10"
          >
            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-[1.5rem] bg-[#0a0a0a]/95 p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full border border-[color:var(--gold)] text-[color:var(--gold)]"
                  >
                    <Check className="h-10 w-10" />
                  </motion.div>
                  <h3 className="font-display mt-6 text-3xl gold-text">Merci</h3>
                  <p className="mt-3 max-w-sm text-sm text-white/60">
                    Your enquiry has arrived. Our concierge will be in touch within 24 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field label="Full Name" name="name" />
              <Field label="Phone" name="phone" type="tel" />
              <Field label="Email" name="email" type="email" full />
              <Field label="Event Type" name="event" />
              <Field label="Event Date" name="date" type="date" />
              <Field label="Guests (approx.)" name="guests" type="number" full />
              <div className="md:col-span-2">
                <label className="text-[10px] tracking-[0.3em] uppercase text-white/50">
                  Special Requirements
                </label>
                <textarea
                  rows={4}
                  className="mt-2 w-full resize-none border-b border-white/20 bg-transparent py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-[color:var(--gold)]"
                  placeholder="Tell us about your vision…"
                />
              </div>
            </div>
            <button type="submit" className="btn-gold mt-10 w-full justify-center">
              Send Enquiry <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  full,
}: {
  label: string;
  name: string;
  type?: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="text-[10px] tracking-[0.3em] uppercase text-white/50">{label}</label>
      <input
        name={name}
        type={type}
        required
        className="mt-2 w-full border-b border-white/20 bg-transparent py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-[color:var(--gold)]"
      />
    </div>
  );
}

/* ---------------------------- location --------------------------- */

function Location() {
  return (
    <section id="contact" className="relative bg-[color:var(--cream)] py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Visit The Estate</p>
            <h2 className="font-display mt-5 text-[clamp(2rem,4.5vw,4rem)] leading-[1.05] text-[color:var(--ink)]">
              You will feel it the moment you <span className="italic gold-text">arrive</span>.
            </h2>
            <div className="mt-10 space-y-6 text-[15px] text-[color:var(--ink)]/75">
              <InfoRow
                icon={MapPin}
                title="Address"
                text="Bhaisepati Height, Lalitpur, Kathmandu Valley, Nepal"
              />
              <InfoRow icon={Phone} title="Reservations" text="+977 9800000000 · +977 01-5555555" />
              <InfoRow icon={Mail} title="Enquiries" text="concierge@drillthru.com" />
              <InfoRow icon={Clock} title="Viewings" text="Daily · 10:00 AM – 8:00 PM" />
              <InfoRow
                icon={Car}
                title="Parking"
                text="Complimentary valet · 200+ vehicle capacity"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="hairline overflow-hidden rounded-[1.5rem] shadow-[var(--shadow-luxe)]">
              <iframe
                title="DrillThru Banquet map"
                src="https://www.google.com/maps?q=Bhaisepati,Lalitpur,Nepal&output=embed"
                width="100%"
                height="560"
                style={{ border: 0, filter: "grayscale(0.4) contrast(1.05)" }}
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  title,
  text,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-start gap-4 border-b border-[color:var(--ink)]/10 pb-6">
      <span className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[color:var(--gold)]/40 text-[color:var(--gold)]">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--ink)]/50">
          {title}
        </div>
        <div className="mt-1">{text}</div>
      </div>
    </div>
  );
}

/* ----------------------------- footer ---------------------------- */

function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] pt-24 pb-10 text-white/70">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="font-display text-3xl text-white">
              DrillThru <span className="gold-text">Banquet</span>
            </div>
            <p className="font-display italic mt-3 text-lg text-[color:var(--gold-soft)]">
              Where celebrations become timeless memories.
            </p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/50">
              Nepal's premier luxury venue for weddings, receptions, corporate galas and private
              celebrations — staged with the discreet perfectionism of a grand hotel.
            </p>
            <div className="mt-8 flex gap-4">
              {[Instagram, Facebook, Youtube, Twitter].map((I, k) => (
                <a
                  key={k}
                  href="#"
                  aria-label="social"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
                >
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="eyebrow">Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-[color:var(--gold)]">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Contact</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>Bhaisepati Height, Lalitpur, Nepal</li>
              <li>+977 9800000000</li>
              <li>concierge@drillthru.com</li>
            </ul>
            <a href="#booking" className="btn-ghost-gold mt-6">
              Book Now
            </a>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row">
          <p>© {new Date().getFullYear()} DrillThru Banquet. All rights reserved.</p>
          <a href="#home" className="flex items-center gap-2 hover:text-[color:var(--gold)]">
            Back to top <ArrowUp className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------ page ----------------------------- */

function Landing() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
  }, [loading]);

  return (
    <>
      <AnimatePresence>{loading && <Loader done={() => setLoading(false)} />}</AnimatePresence>
      <div className="min-h-screen bg-[color:var(--cream)]">
        <Header />
        <Hero />
        <About />
        <WhyUs />
        <Stats />
        <Services />
        <Featured />
        <Gallery />
        <Packages />
        <VideoSection />
        <Testimonials />
        <Booking />
        <Location />
        <Footer />
      </div>
    </>
  );
}
