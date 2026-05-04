import { useState } from "react";
import { motion } from "motion/react";
import CastleFootsteps from "./CastleFootsteps";

export default function Hero() {
  const [started, setStarted] = useState(false);

  return (
    <section className="relative flex min-h-screen items-end">
      <CastleFootsteps
        targetXRatio={0.5}
        targetYRatio={0.68}
        onTrailStart={() => setStarted(true)}
      />

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,15,0.16),rgba(11,11,15,0.45)_45%,rgba(11,11,15,0.9)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,235,180,0.12),transparent_22%),linear-gradient(180deg,transparent_0%,rgba(11,11,15,0.2)_50%,rgba(11,11,15,0.86)_100%)]" />

      <div className="section-frame relative z-10 flex min-h-screen items-end pb-14 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="w-full max-w-3xl"
        >
          <motion.p
            className="gold-label"
            animate={{ opacity: started ? 1 : 0.82 }}
          >
            Vidhi's Castle
          </motion.p>

          <motion.div
            className="mt-4 space-y-3 md:space-y-4"
            initial={false}
            animate={{ opacity: 1 }}
          >
            <motion.p
              className="font-heading text-3xl uppercase tracking-[0.18em] text-bone/92 md:text-5xl"
              animate={{
                opacity: started ? 0.55 : 1,
                y: started ? -8 : 0,
              }}
              transition={{ duration: 0.6 }}
            >
              Not Everyone Is Meant To Enter
            </motion.p>

            <motion.h1
              className="font-heading text-5xl uppercase leading-[0.92] tracking-[0.12em] text-bone md:text-7xl"
              initial={{ opacity: 0.72 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{ duration: 0.9 }}
            >
              You Are
              <span className="block text-gold">Summoned</span>
            </motion.h1>

            <motion.p
              className="max-w-2xl text-xl leading-relaxed text-bone/82 md:text-3xl"
              animate={{
                opacity: started ? 1 : 0.86,
                y: started ? 0 : 6,
              }}
              transition={{ duration: 0.8, delay: started ? 0.15 : 0 }}
            >
              Follow the path to Vidhi's Castle. Every step brings you closer
              to a night of whispered alliances, velvet shadows, and dangerous
              elegance.
            </motion.p>
          </motion.div>

          <motion.div
            className="mt-8 inline-flex rounded-full border border-gold/25 bg-black/30 px-5 py-3 backdrop-blur-sm md:mt-10"
            animate={{
              opacity: started ? 0.72 : 1,
              scale: started ? 0.98 : 1,
            }}
          >
            <p className="font-heading text-[11px] uppercase tracking-[0.34em] text-gold/82 md:text-sm">
              Tap anywhere to send footsteps toward the gate
            </p>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap gap-3 text-sm uppercase tracking-[0.24em] text-gold/90 md:gap-4 md:text-lg md:tracking-[0.28em]"
            initial={{ opacity: 0, y: 18 }}
            animate={{
              opacity: started ? 1 : 0.84,
              y: 0,
            }}
            transition={{ duration: 0.8, delay: started ? 0.25 : 0.1 }}
          >
            <span>May 9, 2026</span>
            <span className="text-gold/35">|</span>
            <span>6:30 PM</span>
            <span className="text-gold/35">|</span>
            <span>Bangalore</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
