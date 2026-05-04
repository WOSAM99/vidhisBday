import { motion } from "motion/react";
import CastleScene from "./CastleScene";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center pt-6 md:pt-0">
      <div className="section-frame">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <motion.div
            className="panel order-1 relative min-h-[22rem] overflow-hidden border-gold/25 shadow-[0_30px_80px_rgba(0,0,0,0.45)] md:min-h-[28rem] lg:order-2 lg:min-h-[36rem]"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9 }}
            style={{
              background:
                "linear-gradient(180deg, rgba(198,168,91,0.14), rgba(11,11,15,0.62)), radial-gradient(circle at 50% 8%, rgba(198,168,91,0.28), transparent 28%), linear-gradient(180deg, #17171f 0%, #0b0b0f 100%)",
            }}
          >
            <motion.div
              className="absolute left-1/2 top-8 h-32 w-32 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl md:top-10 md:h-40 md:w-40"
              animate={{ opacity: [0.42, 0.72, 0.42] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <CastleScene />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/85 to-transparent" />
            <div className="absolute inset-x-0 top-[28%] h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

            <div className="absolute left-4 top-4 rounded-full border border-gold/20 bg-black/30 px-4 py-2 backdrop-blur-sm md:left-6 md:top-6">
              <p className="font-heading text-[10px] uppercase tracking-[0.35em] text-gold/80 md:text-xs">
                Vidhi's Castle
              </p>
            </div>

            <div className="absolute inset-x-4 bottom-4 md:inset-x-6 md:bottom-6">
              <div className="rounded-[1.5rem] border border-gold/15 bg-black/28 px-4 py-4 text-center backdrop-blur-sm md:px-6 md:py-6">
                <p className="font-heading text-[10px] uppercase tracking-[0.38em] text-gold/70 md:text-sm">
                  Tap The Castle
                </p>
                <p className="mt-2 text-lg italic leading-relaxed text-bone/78 md:mt-3 md:text-2xl">
                  Send your footsteps toward the gate.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9 }}
          >
            <p className="gold-label">An Invitation To Vidhi's Castle</p>
            <h1 className="mt-5 font-heading text-4xl uppercase leading-[0.95] tracking-[0.12em] text-bone md:text-6xl lg:text-7xl">
              You Are
              <span className="block text-gold">Summoned</span>
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-bone/80 md:text-3xl">
              Step into Vidhi's Castle for a night of whispered alliances,
              velvet shadows, and dangerous elegance.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 text-sm uppercase tracking-[0.24em] text-gold/85 md:mt-10 md:gap-4 md:text-lg md:tracking-[0.28em]">
              <span>May 9, 2026</span>
              <span className="text-gold/35">|</span>
              <span>6:30 PM</span>
              <span className="text-gold/35">|</span>
              <span>Bangalore</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
