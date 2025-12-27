import { Link } from "wouter";
import { Gamepad2, Blocks, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 overflow-hidden relative">
      {/* Background ambient effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 max-w-2xl"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 pb-2">
            PREMIUM REWARDS
          </h1>
          <p className="text-lg md:text-xl text-gray-400">
            Select your platform below to claim your exclusive in-game currency. 
            Instant delivery, secure processing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          {/* Fortnite Card */}
          <Link href="/fortnite" className="group">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-full bg-gradient-to-br from-blue-900/80 to-purple-900/80 rounded-3xl p-1 border-2 border-white/10 hover:border-yellow-400/50 transition-all cursor-pointer relative overflow-hidden group-hover:shadow-[0_0_40px_-10px_rgba(234,179,8,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              <div className="relative h-full flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
                <div className="w-24 h-24 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-yellow-500/20 group-hover:scale-110 transition-transform duration-300">
                  <Gamepad2 className="w-12 h-12 text-black" />
                </div>
                <h2 className="text-4xl md:text-5xl font-fortnite text-yellow-400 mb-2 drop-shadow-lg tracking-wide uppercase">
                  Fortnite
                </h2>
                <p className="text-blue-200 font-bold tracking-wider mb-8 uppercase text-sm">
                  Get Free V-Bucks
                </p>
                <div className="mt-auto inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 text-black font-black uppercase rounded-xl transform group-hover:translate-y-[-4px] transition-transform">
                  Claim Now <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Roblox Card */}
          <Link href="/roblox" className="group">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-1 border-2 border-white/10 hover:border-red-500/50 transition-all cursor-pointer relative overflow-hidden group-hover:shadow-[0_0_40px_-10px_rgba(239,68,68,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              <div className="relative h-full flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
                <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-white/10 group-hover:scale-110 transition-transform duration-300">
                  <Blocks className="w-12 h-12 text-slate-900" />
                </div>
                <h2 className="text-4xl md:text-5xl font-roblox font-extrabold text-white mb-2 drop-shadow-lg">
                  ROBLOX
                </h2>
                <p className="text-slate-300 font-bold tracking-wider mb-8 uppercase text-sm">
                  Get Free Robux
                </p>
                <div className="mt-auto inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-bold uppercase rounded-xl transform group-hover:translate-y-[-4px] transition-transform">
                  Claim Now <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/owner" className="text-xs text-white/20 hover:text-white/50 transition-colors uppercase tracking-widest">
            Admin Access
          </Link>
        </div>
      </div>
    </div>
  );
}