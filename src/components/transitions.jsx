import { motion } from "framer-motion";

export default function Transition({
  children,
  duration,
  className,
}) {
  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ ease: "easeInOut", duration: duration || 1 }}
      className={`flex justify-center items-center ${className}`}
    >
      {children}
    </motion.div>
  );
}
