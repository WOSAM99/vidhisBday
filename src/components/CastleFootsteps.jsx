import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const STEP_COUNT = 6;
const STEP_LIFETIME = 2600;

function createTrail(startX, startY, targetX, targetY) {
  return Array.from({ length: STEP_COUNT }, (_, index) => {
    const progress = index / (STEP_COUNT - 1);
    const sway = index % 2 === 0 ? -14 : 14;
    const drift = (Math.random() - 0.5) * 10;

    return {
      id: `${Date.now()}-${Math.random()}-${index}`,
      x: startX + (targetX - startX) * progress + sway,
      y: startY + (targetY - startY) * progress + drift,
      rotation: index % 2 === 0 ? -24 : 24,
      delay: index * 0.1,
      targetX: targetX + sway * 0.35,
      targetY: targetY + index * 2,
    };
  });
}

export default function CastleFootsteps({
  targetXRatio = 0.5,
  targetYRatio = 0.74,
  onTrailStart,
  className = "",
}) {
  const [trails, setTrails] = useState([]);
  const [pulse, setPulse] = useState(0);
  const cleanupTimers = useRef([]);

  useEffect(() => {
    return () => {
      cleanupTimers.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const handlePointerDown = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const startX = event.clientX - rect.left;
    const startY = event.clientY - rect.top;
    const targetX = rect.width * targetXRatio;
    const targetY = rect.height * targetYRatio;
    const trailId = `${Date.now()}-${Math.random()}`;
    const steps = createTrail(startX, startY, targetX, targetY);

    setTrails((current) => [...current, { id: trailId, steps }]);
    setPulse(Date.now());
    onTrailStart?.();

    const timer = window.setTimeout(() => {
      setTrails((current) => current.filter((trail) => trail.id !== trailId));
    }, STEP_LIFETIME);

    cleanupTimers.current.push(timer);
  };

  return (
    <>
      <div
        className={`absolute inset-0 z-[3] cursor-crosshair ${className}`}
        onMouseDown={handlePointerDown}
        onTouchStart={(event) => {
          const touch = event.touches[0];
          if (!touch) {
            return;
          }

          handlePointerDown({
            clientX: touch.clientX,
            clientY: touch.clientY,
            currentTarget: event.currentTarget,
          });
        }}
      />

      <motion.div
        key={pulse}
        className="pointer-events-none absolute z-[2] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/12 blur-2xl"
        style={{ left: `${targetXRatio * 100}%`, top: `${targetYRatio * 100}%` }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 0.35, 0], scale: [0.6, 1.2, 1.4] }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />

      <div className="pointer-events-none absolute inset-0 z-[4]">
        {trails.flatMap((trail) =>
          trail.steps.map((step) => (
            <motion.div
              key={step.id}
              className="absolute h-6 w-3 rounded-full bg-black/80 shadow-[0_0_10px_rgba(0,0,0,0.35)]"
              initial={{
                left: step.x,
                top: step.y,
                opacity: 0,
                rotate: step.rotation,
                scale: 0.7,
              }}
              animate={{
                left: step.targetX,
                top: step.targetY,
                opacity: [0, 0.9, 0.9, 0],
                scale: [0.7, 1, 1, 0.85],
              }}
              transition={{
                duration: 1.7,
                delay: step.delay,
                ease: [0.2, 0.8, 0.2, 1],
              }}
            >
              <div className="absolute inset-[1px] rounded-full border border-gold/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(0,0,0,0.12))]" />
            </motion.div>
          )),
        )}
      </div>
    </>
  );
}
