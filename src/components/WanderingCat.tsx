
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./WanderingCat.css";

const messages = [
  "Salom! Zikrillo portfolioiga xush kelibsiz! 👋",
  "Nima gaplar? 😻",
  "Loyihalarni ko‘ramizmi?",
  "Miyov! Bu yerda zo‘r loyihalar bor! 🐾",
  "Zikrilloning ishlarini ko‘rdingizmi? 😎",
];

export default function WanderingCat() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [screen, setScreen] = useState({
    width: 0,
    height: 0,
  });

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const updateScreen = () => {
      setScreen({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateScreen();
    window.addEventListener("resize", updateScreen);

    return () => {
      window.removeEventListener("resize", updateScreen);
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % messages.length);
    }, 10000);

    return () => window.clearInterval(interval);
  }, []);

  const catWidth = screen.width < 650 ? 78 : 105;
  const catHeight = screen.width < 650 ? 105 : 135;

  const maxX = Math.max(0, screen.width - catWidth);
  const maxY = Math.max(0, screen.height - catHeight);

  const positions = [
    { x: 15, y: 100 },
    { x: maxX * 0.8, y: maxY * 0.2 },
    { x: maxX * 0.45, y: maxY * 0.5 },
    { x: maxX * 0.05, y: maxY * 0.8 },
    { x: maxX * 0.7, y: maxY * 0.85 },
    { x: maxX * 0.35, y: maxY * 0.1 },
    { x: 15, y: 100 },
  ];

  const handleClick = () => {
    setMessageIndex((current) => (current + 1) % messages.length);
  };

  if (screen.width === 0) return null;

  return (
    <motion.div
      className="wandering-cat"
      animate={
        reduceMotion
          ? { x: 15, y: 100 }
          : {
              x: positions.map((position) => position.x),
              y: positions.map((position) => position.y),
            }
      }
      transition={{
        duration: 65,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.17, 0.34, 0.51, 0.68, 0.85, 1],
      }}
    >
      <motion.div
        key={messageIndex}
        className="cat-bubble"
        initial={{ opacity: 0, y: 10, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {messages[messageIndex]}
      </motion.div>

      <button
        className="cat-button"
        onClick={handleClick}
        type="button"
        aria-label="Mushukcha bilan gaplashish"
      >
        <motion.img
          className="cat-image"
          src="/images/kitten-walk.gif"
          alt="Yoqimtoy mushukcha"
          draggable={false}
          animate={
            reduceMotion
              ? undefined
              : { y: [0, -3, 0] }
          }
          transition={{
            duration: 0.7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.span
          className="cat-shadow"
          animate={
            reduceMotion
              ? undefined
              : {
                  scaleX: [1, 0.8, 1],
                  opacity: [0.5, 0.3, 0.5],
                }
          }
          transition={{
            duration: 0.7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </button>
    </motion.div>
  );
}
