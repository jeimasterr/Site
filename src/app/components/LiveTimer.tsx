import { motion } from 'motion/react';
import { Clock } from 'lucide-react';

export function LiveTimer() {
  return (
    <div className="flex items-center gap-2 text-[#686868] bg-[#fffbeb] px-4 py-2 rounded-full">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <Clock className="w-4 h-4 text-[#ffcc00]" />
      </motion.div>
      <span className="text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
        Обновлено 1 мин назад
      </span>
    </div>
  );
}
