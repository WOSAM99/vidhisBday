import { motion } from "motion/react";

const lines = [
  "Within Vidhi's Castle, not every smile is loyal...",
  "Among you hide traitors...",
  "Trust will be tested...",
  "Every glance may conceal a scheme...",
  "And only the bold will dine by candlelight.",
];

export default function Story() {
  return (
    <section className="relative">
      <div className="section-frame">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="glow-line" />
            <p className="gold-label mt-6">The Story</p>
          </motion.div>

          <div className="mt-12 space-y-8">
            {lines.map((line, index) => (
              <motion.p
                key={line}
                className="font-body text-3xl italic leading-relaxed text-bone/82 md:text-5xl"
                initial={{ opacity: 0, filter: "blur(10px)", y: 30 }}
                whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.85, delay: index * 0.16 }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
