import { useEffect, useState } from "react";
import { motion } from "motion/react";

const eventDate = new Date("2026-05-09T18:30:00+05:30");

function getTimeLeft() {
  const now = new Date();
  const difference = eventDate.getTime() - now.getTime();

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

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative">
      <div className="section-frame">
        <motion.div
          className="panel mx-auto max-w-5xl px-6 py-10 md:px-10 md:py-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col items-center text-center">
            <p className="gold-label">The Countdown</p>
            <h2 className="mt-5 font-heading text-4xl uppercase tracking-[0.14em] text-bone md:text-5xl">
              The Castle Opens Soon
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {Object.entries(timeLeft).map(([label, value], index) => (
              <motion.div
                key={label}
                className="rounded-[1.5rem] border border-gold/12 bg-black/20 px-4 py-8 text-center"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="font-heading text-4xl text-gold md:text-5xl">
                  {String(value).padStart(2, "0")}
                </div>
                <div className="mt-3 text-sm uppercase tracking-[0.35em] text-bone/55">
                  {label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
