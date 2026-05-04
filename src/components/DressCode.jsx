import { motion } from "motion/react";

export default function DressCode() {
  return (
    <section className="relative">
      <div className="section-frame">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8 }}
        >
          <p className="gold-label">Dress Code</p>
          <h2 className="mt-5 font-heading text-4xl uppercase tracking-[0.14em] md:text-5xl">
            Dark. Elegant. Gold.
          </h2>
          <p className="mx-auto mt-8 max-w-3xl text-2xl leading-relaxed text-bone/78 md:text-3xl">
            Think candlelit corridors, velvet confidence, and a touch of
            treachery worthy of Vidhi's grand hall.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              "Black tailoring and midnight silhouettes",
              "Gold accents that catch the firelight",
              "An entrance that says you came to play",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[1.75rem] border border-gold/12 bg-white/[0.03] px-6 py-8 text-left text-xl italic leading-relaxed text-bone/80"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
