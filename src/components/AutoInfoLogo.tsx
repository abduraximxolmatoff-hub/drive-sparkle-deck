import { motion } from "framer-motion";

export function AutoInfoLogo({ size = "lg" }: { size?: "sm" | "lg" }) {
  const letters = "AutoINFO".split("");
  const cls = size === "lg" ? "text-6xl md:text-8xl" : "text-2xl";
  return (
    <motion.h1
      className={`font-display font-bold tracking-tight ${cls}`}
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
    >
      {letters.map((l, i) => (
        <motion.span
          key={i}
          className={i < 4 ? "text-foreground" : "text-gradient-gold"}
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {l}
        </motion.span>
      ))}
    </motion.h1>
  );
}
