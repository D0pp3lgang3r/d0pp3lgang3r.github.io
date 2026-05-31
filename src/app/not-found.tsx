'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <motion.div
        className="text-center px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div
          className="text-8xl md:text-9xl font-orbitron font-black text-ame-purple/30 mb-4"
          style={{ fontFamily: 'Orbitron, monospace' }}
        >
          404
        </div>
        <div className="text-ame-muted text-sm font-jp mb-2">迷子になった</div>
        <h1
          className="text-2xl font-orbitron font-bold text-ame-text mb-4"
          style={{ fontFamily: 'Orbitron, monospace' }}
        >
          PAGE NOT FOUND
        </h1>
        <p className="text-ame-muted font-mono text-sm mb-8">
          Cette page a disparu dans la pluie d&apos;Amegakure.
        </p>
        <Link
          href="/"
          className="px-6 py-3 font-orbitron text-xs font-bold tracking-widest text-ame-black bg-ame-purple hover:bg-ame-rain transition-all duration-300"
          style={{
            fontFamily: 'Orbitron, monospace',
            clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)',
          }}
        >
          RETOUR
        </Link>
      </motion.div>
    </div>
  );
}
