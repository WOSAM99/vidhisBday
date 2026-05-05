import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import castleBg from "../assets/vidhis-castle-bg.png";

const LOCATION_URL = "https://maps.google.com/?q=Bangalore";
const EVENT_DATE = new Date("2026-05-09T18:30:00+05:30");

const scenes = [
  "summons",
  "path",
  "event",
  "story",
  "dress",
  "rsvp",
  "countdown",
  "location",
];

const storyLines = [
  "Within Vidhi's Castle, not every smile is loyal.",
  "Among you hide 3 Traitors.",
  "Trust will be tested. Lies will be told.",
  "Every glance may conceal a scheme.",
  "Only the bold will dine by candlelight.",
];

const footstepPath = [
  { left: "16%", bottom: "11%", rotate: -18, threshold: 8 },
  { left: "27%", bottom: "21%", rotate: 13, threshold: 22 },
  { left: "38%", bottom: "32%", rotate: -14, threshold: 38 },
  { left: "50%", bottom: "44%", rotate: 12, threshold: 54 },
  { left: "62%", bottom: "57%", rotate: -12, threshold: 70 },
  { left: "73%", bottom: "70%", rotate: 8, threshold: 86 },
];

const pathCheckpoints = [
  "Hold to begin the passage.",
  "The summons has been accepted.",
  "The passage remembers every step.",
  "Not every guest arrives loyal.",
  "The traitors are already inside.",
  "The gate is listening.",
  "The castle opens.",
];

function getTimeLeft() {
  const difference = EVENT_DATE.getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function InviteExperience() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const scene = scenes[sceneIndex];

  const goNext = () => {
    setSceneIndex((current) => Math.min(current + 1, scenes.length - 1));
  };

  return (
    <main className="relative h-dvh overflow-hidden bg-obsidian text-bone">
      {scene !== "path" && <Background />}

      <AnimatePresence mode="wait">
        {scene === "summons" && <SummonsScene key="summons" onDone={goNext} />}
        {scene === "path" && <CastlePathScene key="path" onDone={goNext} />}
        {scene === "event" && <EventScene key="event" onNext={goNext} />}
        {scene === "story" && <StoryScene key="story" onNext={goNext} />}
        {scene === "dress" && <DressScene key="dress" onNext={goNext} />}
        {scene === "rsvp" && <RsvpScene key="rsvp" onNext={goNext} />}
        {scene === "countdown" && <CountdownScene key="countdown" onNext={goNext} />}
        {scene === "location" && <LocationScene key="location" />}
      </AnimatePresence>
    </main>
  );
}

function Background() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center"
        style={{ backgroundImage: `url(${castleBg})` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,4,7,0.38),rgba(11,11,15,0.8)_52%,rgba(5,5,8,0.96)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_26%,rgba(198,168,91,0.2),transparent_24%),radial-gradient(circle_at_18%_22%,rgba(255,255,255,0.08),transparent_18%)]" />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black via-black/70 to-transparent"
        animate={{ opacity: [0.86, 1, 0.86] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function SceneShell({ children, className = "" }) {
  return (
    <motion.section
      className={`absolute inset-0 z-10 flex min-h-dvh items-center justify-center px-5 py-6 ${className}`}
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, filter: "blur(8px)" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}

function SummonsScene({ onDone }) {
  const message = "You have been summoned to Vidhi's Castle";
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount < message.length) {
      const timer = window.setTimeout(() => {
        setVisibleCount((count) => count + 1);
      }, 62);

      return () => window.clearTimeout(timer);
    }

    const doneTimer = window.setTimeout(onDone, 1450);
    return () => window.clearTimeout(doneTimer);
  }, [message.length, onDone, visibleCount]);

  return (
    <SceneShell>
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.div
          className="mb-8 h-px w-28 bg-gradient-to-r from-transparent via-gold to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9 }}
        />
        <h1 className="min-h-[8rem] font-heading text-4xl uppercase leading-tight tracking-[0.16em] text-bone md:min-h-[10rem] md:text-7xl">
          {message.slice(0, visibleCount)}
          <motion.span
            className="ml-1 inline-block h-[0.9em] w-[2px] translate-y-1 bg-gold"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
        </h1>
      </div>
    </SceneShell>
  );
}

function CastlePathScene({ onDone }) {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [opened, setOpened] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    let frameId;
    let lastTime;

    const tick = (time) => {
      if (!lastTime) {
        lastTime = time;
      }

      const delta = Math.min(time - lastTime, 80);
      lastTime = time;

      setProgress((current) => {
        if (completedRef.current) {
          return current;
        }

        const rate = holding ? 17 : -4;
        const next = Math.max(0, Math.min(100, current + (rate * delta) / 1000));

        if (next >= 100) {
          completedRef.current = true;
          setOpened(true);
          window.setTimeout(onDone, 1700);
        }

        return next;
      });

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [holding, onDone]);

  useEffect(() => {
    const stopHolding = () => setHolding(false);

    window.addEventListener("pointerup", stopHolding);
    window.addEventListener("pointercancel", stopHolding);
    window.addEventListener("blur", stopHolding);

    return () => {
      window.removeEventListener("pointerup", stopHolding);
      window.removeEventListener("pointercancel", stopHolding);
      window.removeEventListener("blur", stopHolding);
    };
  }, []);

  const startHolding = () => {
    if (completedRef.current) {
      return;
    }

    setHolding(true);
  };

  const activeCheckpoint = Math.min(
    pathCheckpoints.length - 1,
    Math.floor(progress / (100 / (pathCheckpoints.length - 1))),
  );

  return (
    <SceneShell className="items-stretch p-0">
      <div className="relative h-full w-full overflow-hidden bg-[radial-gradient(circle_at_72%_14%,rgba(198,168,91,0.18),transparent_24%),linear-gradient(180deg,#111118_0%,#0b0b0f_58%,#050507_100%)]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.24)_55%,rgba(0,0,0,0.78)_100%)]" />
        <motion.div
          className="absolute left-1/2 top-3 z-20 w-[78vw] max-w-[34rem] -translate-x-1/2 md:top-2 md:w-[35rem]"
          initial={{ opacity: 0, y: -18, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: opened ? 1.04 : 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <CastleGateIllustration opened={opened} />
        </motion.div>

        <Passage progress={progress} />

        {footstepPath.map((step, index) => (
          <motion.div
            key={`${step.left}-${step.bottom}`}
            className="absolute z-20"
            style={{ left: step.left, bottom: step.bottom }}
            initial={{ opacity: 0, scale: 0.5, rotate: step.rotate }}
            animate={{
              opacity: progress >= step.threshold ? 1 : 0,
              scale: progress >= step.threshold ? [0.55, 1.18, 1] : 0.55,
            }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
          >
            <Footprint />
          </motion.div>
        ))}

        <motion.button
          type="button"
          onPointerDown={startHolding}
          onPointerUp={() => setHolding(false)}
          onPointerLeave={() => setHolding(false)}
          className="absolute bottom-[5%] left-1/2 z-30 flex w-[min(22rem,84vw)] -translate-x-1/2 items-center gap-4 rounded-lg border border-gold/35 bg-black/60 px-5 py-4 text-left shadow-glow backdrop-blur-md outline-none transition hover:border-gold/70 focus:border-gold md:left-[18%] md:w-[21rem]"
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{
            opacity: opened ? 0 : 1,
            y: 0,
            scale: holding ? 1.02 : [1, 1.025, 1],
          }}
          transition={{
            opacity: { duration: 0.8, delay: 0.25 },
            y: { duration: 0.8, delay: 0.25 },
            scale: { duration: holding ? 0.18 : 1.3, repeat: holding ? 0 : Infinity },
          }}
        >
          <Footprint large />
          <div className="min-w-0 flex-1">
            <motion.p
              className="font-heading text-sm uppercase tracking-[0.28em] text-gold md:text-base"
              animate={{ opacity: holding ? 1 : [0.45, 1, 0.45] }}
              transition={{ duration: 0.95, repeat: holding ? 0 : Infinity }}
            >
              Hold to walk
            </motion.p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#8f2232] via-gold to-[#f7e6ae]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.08, ease: "linear" }}
              />
            </div>
          </div>
        </motion.button>

        <div className="absolute bottom-[22%] left-1/2 z-30 w-[min(34rem,88vw)] -translate-x-1/2 text-center md:bottom-12 md:left-auto md:right-8 md:w-[29rem] md:translate-x-0 md:text-right">
          <motion.p
            key={activeCheckpoint}
            className="font-heading text-lg uppercase leading-relaxed tracking-[0.16em] text-bone/88 md:text-2xl"
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.45 }}
          >
            {pathCheckpoints[activeCheckpoint]}
          </motion.p>
          <motion.p
            className="mt-4 font-heading text-sm uppercase leading-relaxed tracking-[0.18em] text-gold/84 md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: progress > 44 ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            Wear white. Betrayal looks better on a clean canvas.
          </motion.p>
        </div>
      </div>
    </SceneShell>
  );
}

function Passage({ progress }) {
  const dashOffset = 1 - progress / 100;

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-x-0 bottom-0 h-[76%] bg-[radial-gradient(ellipse_at_bottom,rgba(198,168,91,0.16),transparent_56%)]" />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="passageFill" x1="22" y1="100" x2="72" y2="22">
            <stop offset="0%" stopColor="rgba(198,168,91,0.34)" />
            <stop offset="48%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(198,168,91,0.04)" />
          </linearGradient>
          <linearGradient id="passageStroke" x1="12" y1="94" x2="74" y2="19">
            <stop offset="0%" stopColor="#8f2232" />
            <stop offset="52%" stopColor="#c6a85b" />
            <stop offset="100%" stopColor="#f7e6ae" />
          </linearGradient>
        </defs>
        <path
          d="M7 100 C24 78 41 60 55 43 C63 33 68 25 73 17 L84 17 C78 33 68 48 54 65 C44 77 34 88 25 100 Z"
          fill="url(#passageFill)"
        />
        <path
          d="M12 96 C28 77 43 58 56 42 C64 31 69 24 75 17"
          fill="none"
          stroke="rgba(198,168,91,0.22)"
          strokeLinecap="round"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d="M12 96 C28 77 43 58 56 42 C64 31 69 24 75 17"
          fill="none"
          pathLength="1"
          stroke="url(#passageStroke)"
          strokeDasharray="1"
          strokeLinecap="round"
          strokeWidth="2.4"
          vectorEffect="non-scaling-stroke"
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 0.12, ease: "linear" }}
        />
      </svg>
      <motion.div
        className="absolute bottom-[6%] left-[20%] h-[70%] w-[48%] origin-bottom rotate-[-27deg] bg-gradient-to-t from-gold/18 via-gold/8 to-transparent blur-xl"
        animate={{ opacity: [0.18, 0.38, 0.18] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function Footprint({ large = false }) {
  return (
    <div className={`relative ${large ? "h-16 w-12" : "h-14 w-10"}`}>
      <div className="absolute inset-[-10px] rounded-full bg-gold/16 blur-xl" />
      <svg
        viewBox="0 0 48 64"
        className="relative h-full w-full drop-shadow-[0_0_12px_rgba(198,168,91,0.38)]"
        aria-hidden="true"
      >
        <path
          d="M17 5C8 9 8 23 13 34C15 38 21 38 24 35C29 30 28 14 24 8C22 5 19 4 17 5Z"
          fill="#060608"
          stroke="#e4c978"
          strokeOpacity="0.82"
          strokeWidth="2"
        />
        <path
          d="M33 30C24 34 24 48 29 59C31 63 37 63 40 60C45 55 44 39 40 33C38 30 35 29 33 30Z"
          fill="#060608"
          stroke="#e4c978"
          strokeOpacity="0.82"
          strokeWidth="2"
        />
        <path
          d="M15 12C12 16 12 23 15 30"
          stroke="#c6a85b"
          strokeOpacity="0.45"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <path
          d="M31 37C28 41 28 48 31 55"
          stroke="#c6a85b"
          strokeOpacity="0.45"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

function CastleGateIllustration({ opened }) {
  return (
    <svg
      viewBox="0 0 640 430"
      className="h-auto w-full overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="castleWallClean" x1="320" y1="54" x2="320" y2="390">
          <stop offset="0%" stopColor="#3b3b46" />
          <stop offset="100%" stopColor="#111116" />
        </linearGradient>
        <linearGradient id="gateLight" x1="320" y1="205" x2="320" y2="405">
          <stop offset="0%" stopColor="#fff2bd" stopOpacity="0.98" />
          <stop offset="56%" stopColor="#c6a85b" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#7a1d2a" stopOpacity="0.04" />
        </linearGradient>
        <filter id="gateGlow">
          <feGaussianBlur stdDeviation="13" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.ellipse
        cx="320"
        cy="378"
        rx="250"
        ry="42"
        fill="#000"
        fillOpacity="0.52"
        animate={{ opacity: opened ? 0.72 : 0.44, scaleX: opened ? 1.08 : 1 }}
        transition={{ duration: 0.9 }}
      />

      <motion.path
        d="M146 364V182H206V364H146Z"
        fill="url(#castleWallClean)"
        stroke="#c6a85b"
        strokeOpacity="0.36"
        animate={{ y: opened ? -5 : 0 }}
        transition={{ duration: 0.8 }}
      />
      <motion.path
        d="M434 364V182H494V364H434Z"
        fill="url(#castleWallClean)"
        stroke="#c6a85b"
        strokeOpacity="0.36"
        animate={{ y: opened ? -5 : 0 }}
        transition={{ duration: 0.8 }}
      />
      <motion.path
        d="M206 364V126H434V364H206Z"
        fill="url(#castleWallClean)"
        stroke="#c6a85b"
        strokeOpacity="0.44"
        animate={{ y: opened ? -3 : 0 }}
        transition={{ duration: 0.8 }}
      />

      <path d="M120 182H232V212H120V182Z" fill="#101016" />
      <path d="M408 182H520V212H408V182Z" fill="#101016" />
      <path d="M184 126H456V158H184V126Z" fill="#101016" />

      <path
        d="M156 182L176 98L196 182H156Z"
        fill="#15151b"
        stroke="#c6a85b"
        strokeOpacity="0.36"
      />
      <path
        d="M444 182L464 98L484 182H444Z"
        fill="#15151b"
        stroke="#c6a85b"
        strokeOpacity="0.36"
      />
      <path
        d="M278 126L320 42L362 126H278Z"
        fill="#15151b"
        stroke="#c6a85b"
        strokeOpacity="0.42"
      />

      {[180, 248, 392, 460].map((x, index) => (
        <motion.g
          key={x}
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{
            duration: 2.8,
            delay: index * 0.28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <rect x={x - 8} y="222" width="16" height="54" rx="8" fill="#c6a85b" />
          <rect
            x={x - 19}
            y="210"
            width="38"
            height="78"
            rx="18"
            fill="#c6a85b"
            fillOpacity="0.13"
          />
        </motion.g>
      ))}

      <motion.path
        d="M257 364C257 284 285 219 320 219C355 219 383 284 383 364H257Z"
        fill="url(#gateLight)"
        filter="url(#gateGlow)"
        initial={{ opacity: 0, scaleY: 0.8 }}
        animate={{
          opacity: opened ? [0.25, 0.95, 0.7] : 0.08,
          scaleY: opened ? 1.12 : 0.9,
        }}
        style={{ originY: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />

      <motion.path
        d="M257 364C257 284 285 219 320 219V364H257Z"
        fill="#09090d"
        stroke="#c6a85b"
        strokeOpacity="0.5"
        animate={{
          x: opened ? -28 : 0,
          rotate: opened ? -5 : 0,
          opacity: opened ? 0.62 : 1,
        }}
        transition={{ duration: 0.95, ease: "easeInOut" }}
      />
      <motion.path
        d="M320 219C355 219 383 284 383 364H320V219Z"
        fill="#09090d"
        stroke="#c6a85b"
        strokeOpacity="0.5"
        animate={{
          x: opened ? 28 : 0,
          rotate: opened ? 5 : 0,
          opacity: opened ? 0.62 : 1,
        }}
        transition={{ duration: 0.95, ease: "easeInOut" }}
      />

      <motion.path
        d="M80 364H560V402H80V364Z"
        fill="#07070a"
        stroke="#c6a85b"
        strokeOpacity="0.2"
        animate={{ y: opened ? 3 : 0 }}
        transition={{ duration: 0.8 }}
      />
    </svg>
  );
}

function EventScene({ onNext }) {
  return (
    <ContentScene eyebrow="The Castle Opens" onNext={onNext} cta="Enter the hall">
      <h2 className="font-heading text-5xl uppercase leading-tight tracking-[0.14em] text-gold md:text-7xl">
        May 9, 2026
      </h2>
      <p className="mt-6 font-heading text-2xl uppercase tracking-[0.22em] text-bone md:text-4xl">
        6:30 PM | Bangalore
      </p>
    </ContentScene>
  );
}

function StoryScene({ onNext }) {
  return (
    <ContentScene eyebrow="Within Vidhi's Castle" onNext={onNext} cta="Accept the risk">
      <div className="space-y-4 md:space-y-5">
        {storyLines.map((line, index) => (
          <motion.p
            key={line}
            className="font-body text-3xl italic leading-snug text-bone/86 md:text-5xl"
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.75, delay: index * 0.18 }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </ContentScene>
  );
}

function DressScene({ onNext }) {
  return (
    <ContentScene eyebrow="Dress Code" onNext={onNext} cta="Answer the summons">
      <h2 className="font-heading text-5xl uppercase leading-tight tracking-[0.16em] text-bone md:text-7xl">
        Wear White
      </h2>
      <p className="mx-auto mt-7 max-w-3xl text-3xl italic leading-relaxed text-bone/80 md:text-5xl">
        Betrayal looks better on a clean canvas.
      </p>
    </ContentScene>
  );
}

function RsvpScene({ onNext }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    diet: "",
    secret: "Yes",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const submitter = event.nativeEvent.submitter;

    if (submitter?.name && submitter?.value) {
      formData.set(submitter.name, submitter.value);
    }

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => setSubmitted(true))
      .catch(() => setSubmitted(true));
  };

  return (
    <SceneShell>
      <motion.div
        className="mx-auto grid max-h-[calc(100dvh-3rem)] w-full max-w-5xl overflow-y-auto rounded-lg border border-gold/18 bg-black/46 shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-md lg:grid-cols-[0.86fr_1.14fr]"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="border-b border-gold/12 bg-[linear-gradient(180deg,rgba(198,168,91,0.12),rgba(0,0,0,0.04))] p-6 lg:border-b-0 lg:border-r lg:p-9">
          <p className="gold-label">RSVP</p>
          <h2 className="mt-5 font-heading text-4xl uppercase tracking-[0.14em] md:text-5xl">
            Answer The Summons
          </h2>
          <p className="mt-6 text-2xl leading-relaxed text-bone/78">
            Declare your loyalty, leave your details, and await your passage
            into Vidhi's Castle.
          </p>
        </div>

        <div className="p-6 md:p-8">
          {submitted ? (
            <div className="flex min-h-[22rem] flex-col items-center justify-center text-center">
              <p className="gold-label">Confirmed</p>
              <h3 className="mt-5 font-heading text-3xl uppercase tracking-[0.14em] text-gold md:text-4xl">
                Your fate is sealed.
              </h3>
              <p className="mt-4 text-2xl italic text-bone/78">
                The location waits behind the next door.
              </p>
              <button
                type="button"
                onClick={onNext}
                className="mt-8 rounded-full border border-gold/45 bg-gold px-6 py-4 font-heading text-sm uppercase tracking-[0.28em] text-obsidian transition hover:shadow-glow"
              >
                Reveal location
              </button>
            </div>
          ) : (
            <form
              name="rsvp"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <input type="hidden" name="form-name" value="rsvp" />
              <input type="hidden" name="bot-field" />

              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
                <Field
                  label="Phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Your number"
                  type="tel"
                  required
                />
              </div>

              <Field
                label="Dietary Restrictions"
                name="diet"
                value={form.diet}
                onChange={handleChange}
                placeholder="Tell us what to prepare"
                textarea
              />

              <label className="block">
                <span className="mb-2 block font-heading text-xs uppercase tracking-[0.24em] text-gold/72">
                  Can You Keep A Secret?
                </span>
                <select
                  name="secret"
                  value={form.secret}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gold/18 bg-black/35 px-4 py-3 text-xl text-bone outline-none transition focus:border-gold/60 focus:shadow-glow"
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </label>

              <div className="grid gap-3 pt-3 md:grid-cols-2">
                <button
                  type="submit"
                  name="attendance"
                  value="I Dare"
                  className="rounded-full border border-gold/45 bg-gold px-5 py-4 font-heading text-xs uppercase tracking-[0.24em] text-obsidian transition hover:shadow-glow md:text-sm"
                >
                  RSVP - I Dare
                </button>
                <button
                  type="submit"
                  name="attendance"
                  value="I Refuse"
                  className="rounded-full border border-gold/30 bg-transparent px-5 py-4 font-heading text-xs uppercase tracking-[0.24em] text-gold transition hover:border-gold/60 hover:bg-gold/8 md:text-sm"
                >
                  Decline - I Refuse
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </SceneShell>
  );
}

function LocationScene() {
  return (
    <ContentScene eyebrow="Location Reveal" cta={null}>
      <h2 className="font-heading text-5xl uppercase leading-tight tracking-[0.14em] text-gold md:text-7xl">
        Bangalore
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-3xl italic leading-relaxed text-bone/78 md:text-5xl">
        The castle gates point the way.
      </p>
      <a
        href={LOCATION_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-9 inline-flex rounded-full border border-gold/45 bg-gold px-7 py-4 font-heading text-sm uppercase tracking-[0.28em] text-obsidian transition hover:shadow-glow"
      >
        Open map
      </a>
    </ContentScene>
  );
}

function CountdownScene({ onNext }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const units = useMemo(() => Object.entries(timeLeft), [timeLeft]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <ContentScene eyebrow="The Countdown" onNext={onNext} cta="Reveal location">
      <h2 className="font-heading text-4xl uppercase leading-tight tracking-[0.14em] text-bone md:text-6xl">
        Vidhi's Castle Opens Soon
      </h2>
      <div className="mt-9 grid w-full max-w-4xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {units.map(([label, value], index) => (
          <motion.div
            key={label}
            className="rounded-lg border border-gold/14 bg-black/40 px-3 py-6 text-center backdrop-blur-sm md:px-4 md:py-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="font-heading text-4xl text-gold md:text-6xl">
              {String(value).padStart(2, "0")}
            </div>
            <div className="mt-3 text-xs uppercase tracking-[0.28em] text-bone/60 md:text-sm">
              {label}
            </div>
          </motion.div>
        ))}
      </div>
    </ContentScene>
  );
}

function ContentScene({ eyebrow, children, onNext, cta }) {
  return (
    <SceneShell>
      <motion.div
        className="mx-auto flex max-h-[calc(100dvh-3rem)] w-full max-w-5xl flex-col items-center overflow-y-auto rounded-lg border border-gold/16 bg-black/44 px-5 py-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-md md:px-10 md:py-12"
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85 }}
      >
        <p className="gold-label">{eyebrow}</p>
        <div className="mt-8 flex w-full flex-col items-center">{children}</div>
        {cta && (
          <button
            type="button"
            onClick={onNext}
            className="mt-10 rounded-full border border-gold/35 bg-black/35 px-7 py-4 font-heading text-sm uppercase tracking-[0.28em] text-gold transition hover:border-gold/70 hover:bg-gold/10 focus:border-gold"
          >
            {cta}
          </button>
        )}
      </motion.div>
    </SceneShell>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
  textarea = false,
  type = "text",
  required = false,
}) {
  const className =
    "w-full rounded-md border border-gold/18 bg-black/35 px-4 py-3 text-xl text-bone placeholder:text-bone/35 outline-none transition focus:border-gold/60 focus:shadow-glow";

  return (
    <label className="block">
      <span className="mb-2 block font-heading text-xs uppercase tracking-[0.24em] text-gold/72">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${className} min-h-24 resize-y`}
          required={required}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
          required={required}
        />
      )}
    </label>
  );
}
