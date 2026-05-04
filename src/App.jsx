import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SealGate from "./components/SealGate";
import MainSite from "./components/MainSite";

function App() {
  const [entered, setEntered] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-obsidian text-bone">
      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.div
            key="gate"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <SealGate onComplete={() => setEntered(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <MainSite />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
