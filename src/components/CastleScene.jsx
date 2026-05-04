import { motion } from "motion/react";
import CastleFootsteps from "./CastleFootsteps";

export default function CastleScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <CastleFootsteps />
      <motion.div
        className="absolute inset-x-3 bottom-10 top-10 opacity-100 md:inset-x-8 md:bottom-14 md:top-14"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <svg
          viewBox="0 0 600 520"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="castleGlow" x1="300" y1="40" x2="300" y2="420">
              <stop offset="0%" stopColor="#f1d48a" stopOpacity="0.82" />
              <stop offset="35%" stopColor="#c6a85b" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#c6a85b" stopOpacity="0.04" />
            </linearGradient>
            <linearGradient id="wallFill" x1="300" y1="80" x2="300" y2="430">
              <stop offset="0%" stopColor="#353540" />
              <stop offset="100%" stopColor="#111118" />
            </linearGradient>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <motion.ellipse
            cx="300"
            cy="102"
            rx="118"
            ry="62"
            fill="url(#castleGlow)"
            filter="url(#softGlow)"
            animate={{ opacity: [0.55, 0.78, 0.55], scale: [1, 1.08, 1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <circle cx="470" cy="112" r="34" fill="#f7e5af" fillOpacity="0.9" />
          <circle cx="470" cy="112" r="62" fill="#f7e5af" fillOpacity="0.14" />

          <path
            d="M92 428H508V472H92V428Z"
            fill="#08080b"
            fillOpacity="0.9"
          />
          <path
            d="M168 420V244H230V420"
            fill="url(#wallFill)"
            stroke="#c6a85b"
            strokeOpacity="0.38"
          />
          <path
            d="M370 420V244H432V420"
            fill="url(#wallFill)"
            stroke="#c6a85b"
            strokeOpacity="0.38"
          />
          <path
            d="M230 420V188H370V420"
            fill="url(#wallFill)"
            stroke="#c6a85b"
            strokeOpacity="0.45"
          />
          <path
            d="M142 244H256V274H142V244Z"
            fill="#111118"
            fillOpacity="0.95"
          />
          <path
            d="M344 244H458V274H344V244Z"
            fill="#111118"
            fillOpacity="0.95"
          />
          <path
            d="M214 188H386V214H214V188Z"
            fill="#111118"
            fillOpacity="0.95"
          />
          <path
            d="M190 244L199 186L208 244"
            stroke="#c6a85b"
            strokeOpacity="0.4"
            strokeWidth="3"
          />
          <path
            d="M410 244L401 186L392 244"
            stroke="#c6a85b"
            strokeOpacity="0.4"
            strokeWidth="3"
          />
          <path
            d="M300 188L312 126L324 188"
            stroke="#c6a85b"
            strokeOpacity="0.45"
            strokeWidth="4"
          />
          <path
            d="M175 244L199 214L223 244"
            fill="#141419"
            stroke="#c6a85b"
            strokeOpacity="0.36"
          />
          <path
            d="M377 244L401 214L425 244"
            fill="#141419"
            stroke="#c6a85b"
            strokeOpacity="0.36"
          />
          <path
            d="M270 188L300 146L330 188"
            fill="#141419"
            stroke="#c6a85b"
            strokeOpacity="0.4"
          />
          <path
            d="M245 420C245 343.784 269.624 282 300 282C330.376 282 355 343.784 355 420"
            fill="#0c0c10"
            fillOpacity="0.96"
            stroke="#c6a85b"
            strokeOpacity="0.48"
          />

          {[
            { x: 189, y: 290, h: 64 },
            { x: 300, y: 222, h: 92 },
            { x: 411, y: 290, h: 64 },
          ].map((windowGlow) => (
            <motion.g
              key={`${windowGlow.x}-${windowGlow.y}`}
              animate={{ opacity: [0.5, 1, 0.6] }}
              transition={{
                duration: 3.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: windowGlow.x / 300,
              }}
            >
              <rect
                x={windowGlow.x - 10}
                y={windowGlow.y}
                width="20"
                height={windowGlow.h}
                rx="10"
                fill="rgba(198,168,91,0.78)"
              />
              <rect
                x={windowGlow.x - 24}
                y={windowGlow.y - 16}
                width="48"
                height={windowGlow.h + 30}
                rx="20"
                fill="rgba(198,168,91,0.12)"
              />
            </motion.g>
          ))}
        </svg>
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/[0.07] via-white/[0.03] to-transparent blur-2xl"
        animate={{ x: ["-6%", "6%", "-6%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-8 h-24 bg-gradient-to-r from-transparent via-gold/10 to-transparent blur-xl"
        animate={{ opacity: [0.18, 0.35, 0.18] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
