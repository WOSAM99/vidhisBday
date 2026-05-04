import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const HOLD_DURATION = 1800;

export default function SealGate({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const completedRef = useRef(false);

  useEffect(() => {
    let interval;

    if (holding && !completedRef.current) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const next = Math.min(prev + 100 / (HOLD_DURATION / 30), 100);

          if (next >= 100 && !completedRef.current) {
            completedRef.current = true;
            clearInterval(interval);
            window.setTimeout(() => onComplete(), 350);
          }

          return next;
        });
      }, 30);
    } else if (!holding && !completedRef.current) {
      interval = setInterval(() => {
        setProgress((prev) => Math.max(prev - 4, 0));
      }, 20);
    }

    return () => clearInterval(interval);
  }, [holding, onComplete]);

  useEffect(() => {
    const stopHolding = () => setHolding(false);

    window.addEventListener("mouseup", stopHolding);
    window.addEventListener("touchend", stopHolding);
    window.addEventListener("touchcancel", stopHolding);

    return () => {
      window.removeEventListener("mouseup", stopHolding);
      window.removeEventListener("touchend", stopHolding);
      window.removeEventListener("touchcancel", stopHolding);
    };
  }, []);

  const ringStyle = {
    background: `conic-gradient(#C6A85B ${progress * 3.6}deg, rgba(198,168,91,0.12) 0deg)`,
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-castle-mist px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,11,15,0.18)_45%,rgba(11,11,15,0.85)_100%)]" />
        <motion.div
          className="absolute left-1/2 top-20 h-56 w-56 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
          animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.08, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        <motion.p
          className="gold-label mb-5"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Vidhi's Castle
        </motion.p>

        <motion.h1
          className="font-heading text-4xl uppercase tracking-[0.18em] text-bone md:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.9 }}
        >
          Hold To Seal Your Fate
        </motion.h1>

        <motion.p
          className="mt-5 max-w-xl text-lg text-bone/72 md:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.24, duration: 0.9 }}
        >
          Only those who keep the pact may enter Vidhi's hall.
        </motion.p>

        <motion.div
          className="mt-14"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
        >
          <div
            role="button"
            tabIndex={0}
            aria-label="Hold to seal the pact"
            onMouseDown={() => setHolding(true)}
            onTouchStart={() => setHolding(true)}
            onKeyDown={(event) => {
              if (event.code === "Space" || event.code === "Enter") {
                event.preventDefault();
                setHolding(true);
              }
            }}
            onKeyUp={() => setHolding(false)}
            className="relative cursor-pointer outline-none"
          >
            <motion.div
              className="absolute inset-[-14px] rounded-full"
              style={ringStyle}
              animate={{ rotate: holding ? 180 : 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
            <div className="absolute inset-[6px] rounded-full bg-obsidian" />

            <motion.div
              className="relative flex h-40 w-40 items-center justify-center rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_30%,#8f2232_0%,#5c111a_52%,#3e0b12_100%)] shadow-seal"
              animate={{
                scale: holding ? 1.08 : 1,
                boxShadow: holding
                  ? "0 0 45px rgba(198, 168, 91, 0.35), 0 26px 60px rgba(0,0,0,0.55)"
                  : "0 24px 60px rgba(0,0,0,0.55), inset 0 2px 10px rgba(255,255,255,0.12)",
              }}
              transition={{ duration: 0.25 }}
            >
              <div className="absolute inset-5 rounded-full border border-white/10" />
              <div className="absolute inset-8 rounded-full border border-gold/25" />
              <motion.div
                className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 bg-black/20 font-heading text-lg uppercase tracking-[0.35em] text-gold"
                animate={{ rotate: holding ? -8 : 0 }}
                transition={{ duration: 0.25 }}
              >
                Seal
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-10 h-2 w-full max-w-xs overflow-hidden rounded-full bg-white/8">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#8f2232] via-gold to-[#f6e2a1]"
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.03 }}
          />
        </div>

        <p className="mt-6 text-lg italic tracking-[0.08em] text-bone/78 md:text-xl">
          {progress < 100 ? "Do not break the seal..." : "The pact is sealed."}
        </p>
      </div>
    </div>
  );
}
