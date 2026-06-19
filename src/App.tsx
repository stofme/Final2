import React from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import { Generator } from "./components/Generator";
import { SavedBriefs } from "./components/SavedBriefs";
import { About } from "./components/About";

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header element */}
      <Header />

      {/* Main workspace container */}
      <main className="flex-grow pb-16 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/generator" element={<Generator />} />
              <Route path="/saved" element={<SavedBriefs />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer element */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
