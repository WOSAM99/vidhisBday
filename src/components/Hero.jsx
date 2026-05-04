import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center">
      <div className="section-frame">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9 }}
          >
            <p className="gold-label">An Invitation To The Castle</p>
            <h1 className="mt-6 font-heading text-5xl uppercase leading-[0.95] tracking-[0.12em] text-bone md:text-7xl">
              You Are
              <span className="block text-gold">Summoned</span>
            </h1>
            <p className="mt-8 max-w-2xl text-2xl leading-relaxed text-bone/80 md:text-3xl">
              Step into a night of whispered alliances, velvet shadows, and
              dangerous elegance.
            </p>

            <div className="mt-10 flex flex-wrap gap-4 text-lg uppercase tracking-[0.28em] text-gold/85">
              <span>May 9, 2026</span>
              <span className="text-gold/35">|</span>
              <span>6:30 PM</span>
              <span className="text-gold/35">|</span>
              <span>Bangalore</span>
            </div>
          </motion.div>

          <motion.div
            className="panel relative min-h-[30rem] overflow-hidden border-gold/20"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.9 }}
            style={{
              background:
                "linear-gradient(180deg, rgba(198,168,91,0.08), rgba(11,11,15,0.72)), radial-gradient(circle at 50% 10%, rgba(198,168,91,0.18), transparent 30%), linear-gradient(180deg, #131319 0%, #0b0b0f 100%)",
            }}
          >
            <motion.div
              className="absolute left-1/2 top-10 h-40 w-40 -translate-x-1/2 rounded-full bg-gold/12 blur-3xl"
              animate={{ opacity: [0.35, 0.65, 0.35] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-x-10 bottom-10 top-20 rounded-t-[12rem] border border-gold/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />
            <div className="absolute inset-x-16 bottom-16 top-32 rounded-t-[10rem] border border-gold/10" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/80 to-transparent" />
            <div className="absolute inset-x-0 top-[30%] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

            <div className="absolute inset-0 flex items-end justify-center p-10">
              <div className="w-full max-w-sm rounded-[2rem] border border-gold/10 bg-black/20 px-6 py-8 text-center backdrop-blur-sm">
                <p className="font-heading text-sm uppercase tracking-[0.45em] text-gold/70">
                  Confidential
                </p>
                <p className="mt-4 text-2xl italic leading-relaxed text-bone/78">
                  The location will be revealed to those whose loyalty does not
                  waver.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
