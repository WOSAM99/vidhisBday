import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import castleBridgeMobile from "../assets/castle-bridge-mobile.png";
import castleBg from "../assets/vidhis-castle-bg.png";
import goldenFootsteps from "../assets/golden-footsteps.png";

const LOCATION_URL = " https://maps.google.com?q=Svamitva%20Terravana,%20off%20Kanakapura%20Main%20Road,%20Pipeline%20Rd,%20Bengaluru,%20Ravugodlu,%20Karnataka%20560116&ftid=0x3bae43ecce40b8f5:0xc1c4b88234a924b2&entry=gps&shh=CAE&lucs=,94297699,94231188,94280568,47071704,94218641,94282134,94286869&g_st=iw";
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
  "Within Vidhi's Castle, not every smile is loyal...",
  "Among you hide traitors...",
  "Trust will be tested...",
  "Every glance may conceal a scheme...",
  "And only the bold will dine by candlelight.",
];

const footstepPath = [
  { left: "50%", bottom: "10%", rotate: -4, threshold: 10, scale: 1.24 },
  { left: "51.5%", bottom: "23%", rotate: 3, threshold: 30, scale: 0.98 },
  { left: "49.5%", bottom: "36%", rotate: -3, threshold: 50, scale: 0.76 },
  { left: "50.8%", bottom: "50%", rotate: 2, threshold: 70, scale: 0.57 },
  { left: "50%", bottom: "58%", rotate: -1, threshold: 88, scale: 0.46 },
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
      }, 92);

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

  const startHolding = (event) => {
    event.preventDefault();

    if (completedRef.current) {
      return;
    }

    setHolding(true);
  };

  return (
    <SceneShell className="items-stretch p-0">
      <div
        className="no-mobile-callout relative h-full w-full overflow-hidden bg-[#06070c]"
        onContextMenu={(event) => event.preventDefault()}
        onDragStart={(event) => event.preventDefault()}
      >
        <ScenicPathBackdrop progress={progress} />

        <GateOpenEffect opened={opened} progress={progress} />

        {footstepPath.map((step) => {
          const age = progress - step.threshold;
          const isVisible = age >= 0;
          const opacity = isVisible ? Math.max(0.18, 1 - age / 34) : 0;

          return (
            <motion.div
              key={`${step.left}-${step.bottom}`}
              className="absolute z-20"
              style={{ left: step.left, bottom: step.bottom }}
              initial={{
                opacity: 0,
                scale: 0.5,
                rotate: step.rotate,
                x: "-50%",
                y: "50%",
              }}
              animate={{
                opacity,
                scale: isVisible
                ? [
                    step.scale * 0.72,
                    step.scale * 1.08,
                    step.scale * (1 - Math.min(age, 24) / 160),
                  ]
                : step.scale * 0.55,
                x: "-50%",
                y: "50%",
              }}
              transition={{
                duration: 0.45,
                ease: "easeOut",
              }}
            >
              <Footprint />
            </motion.div>
          );
        })}

        <motion.button
          type="button"
          onPointerDown={startHolding}
          onPointerUp={(event) => {
            event.preventDefault();
            setHolding(false);
          }}
          onPointerLeave={() => setHolding(false)}
          onContextMenu={(event) => event.preventDefault()}
          className="absolute bottom-[5.5%] left-1/2 z-30 flex h-36 w-36 -translate-x-1/2 select-none items-center justify-center rounded-full border border-gold/40 bg-black/62 p-3 text-center shadow-glow backdrop-blur-md outline-none transition [touch-action:none] [-webkit-tap-highlight-color:transparent] [-webkit-touch-callout:none] hover:border-gold/70 focus:border-gold md:h-40 md:w-40"
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
          <div
            className="absolute inset-[-7px] rounded-full"
            style={{
              background: `conic-gradient(#C6A85B ${progress * 3.6}deg, rgba(198,168,91,0.12) 0deg)`,
            }}
          />
          <div className="absolute inset-[7px] rounded-full bg-black/82" />
          <div className="relative z-10 flex h-full w-full flex-col items-center justify-center rounded-full px-3">
            <motion.p
              className="font-heading text-[0.68rem] uppercase leading-relaxed tracking-[0.12em] text-gold md:text-xs md:tracking-[0.16em]"
              animate={{ opacity: holding ? 1 : [0.45, 1, 0.45] }}
              transition={{ duration: 0.95, repeat: holding ? 0 : Infinity }}
            >
              Tap & Hold
            </motion.p>
            <p className="mt-1 font-heading text-[0.58rem] uppercase tracking-[0.1em] text-bone/62">
              Walk Forward
            </p>
          </div>
        </motion.button>

      </div>
    </SceneShell>
  );
}

function ScenicPathBackdrop({ progress }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${castleBridgeMobile})` }}
        animate={{ scale: 1.01 + progress * 0.00042 }}
        transition={{ duration: 0.2, ease: "linear" }}
      />
      <motion.div
        className="absolute left-[-25%] top-[40%] h-28 w-[150%] bg-[radial-gradient(ellipse_at_center,rgba(230,235,242,0.16),transparent_64%)] blur-2xl"
        animate={{ x: ["-7%", "7%", "-7%"], opacity: [0.18, 0.38, 0.18] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[-40%] bottom-[16%] h-40 w-[180%] bg-[radial-gradient(ellipse_at_center,rgba(230,235,242,0.14),transparent_62%)] blur-3xl"
        animate={{ x: ["8%", "-8%", "8%"], opacity: [0.16, 0.34, 0.16] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.08)_45%,rgba(0,0,0,0.58)_100%)]" />
    </div>
  );
}

function GateOpenEffect({ opened, progress }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <motion.div
        className="absolute left-[43%] top-[33.5%] h-[15%] w-[7%] origin-left rounded-t-full bg-black/78 shadow-[0_0_24px_rgba(0,0,0,0.85)]"
        animate={{
          x: opened ? "-5vw" : 0,
          rotateY: opened ? -76 : 0,
          opacity: opened ? 0.56 : progress > 90 ? 0.92 : 0,
        }}
        transition={{ duration: 0.95, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[50%] top-[33.5%] h-[15%] w-[7%] origin-right rounded-t-full bg-black/78 shadow-[0_0_24px_rgba(0,0,0,0.85)]"
        animate={{
          x: opened ? "5vw" : 0,
          rotateY: opened ? 76 : 0,
          opacity: opened ? 0.56 : progress > 90 ? 0.92 : 0,
        }}
        transition={{ duration: 0.95, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-[36%] h-[15%] w-[22%] -translate-x-1/2 rounded-t-full bg-[radial-gradient(ellipse_at_center,#fff3c2,rgba(198,168,91,0.58)_42%,transparent_72%)] blur-xl"
        animate={{
          opacity: opened ? [0.2, 0.9, 0.62] : progress > 88 ? 0.18 : 0,
          scale: opened ? 1.18 : 0.74,
        }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />
    </div>
  );
}

function Footprint({ large = false }) {
  return (
    <div className={`relative ${large ? "h-96 w-80" : "h-80 w-64"}`}>
      <img
        src={goldenFootsteps}
        alt=""
        className="h-full w-full object-contain drop-shadow-[0_0_18px_rgba(248,213,118,0.72)]"
        draggable="false"
      />
    </div>
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
    <ContentScene eyebrow="THE STORY" onNext={onNext} cta="Accept the risk">
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
                label="Why should I make you the traitor?"
                name="diet"
                value={form.diet}
                onChange={handleChange}
                placeholder="Make your case"
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
      <h2 className="font-heading text-4xl uppercase leading-tight tracking-[0.14em] text-gold md:text-5xl">
        Terravana Bangalore
      </h2>
      <p className="mx-auto mt-6 max-w-2xl text-3xl italic leading-relaxed text-bone/78 md:text-5xl">
        
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
