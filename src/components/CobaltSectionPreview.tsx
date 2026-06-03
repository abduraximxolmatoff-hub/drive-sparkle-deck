import { motion } from "framer-motion";

interface Props {
  imageSrc?: string;
  title: string;
  brandAccent: string;
}

export function CobaltSectionPreview({ imageSrc, title, brandAccent }: Props) {
  if (!imageSrc) return null;

  return (
    <motion.div
      key={imageSrc}
      initial={{ opacity: 0, y: 14, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.985 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative mb-4 overflow-hidden rounded-2xl border bg-card-gradient shadow-card"
      style={{ borderColor: `${brandAccent}33`, boxShadow: `0 20px 60px -30px ${brandAccent}55` }}
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/10 via-transparent to-background/35" />
      <img
        src={imageSrc}
        alt={title}
        className="relative z-0 h-[260px] w-full object-cover sm:h-[300px] lg:h-[340px]"
        loading="lazy"
      />
    </motion.div>
  );
}
