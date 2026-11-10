import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

export function ErrorMessage({ error, id }: { error?: string, id: string }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          id={id}
          initial={{ opacity: 0, height: 0, y: -5 }}
          animate={{ opacity: 1, height: 'auto', y: 0 }}
          exit={{ opacity: 0, height: 0, y: -5 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="flex items-center gap-1.5 text-destructive text-sm font-medium mt-1.5 overflow-hidden"
          role="alert"
        >
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
