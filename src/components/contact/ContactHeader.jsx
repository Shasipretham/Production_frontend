import { useState } from "react"
import { motion } from "framer-motion"
import { Sparkles, ArrowDown, Globe, Users, Zap } from "lucide-react"
import { ScheduleCallModal } from "@/components/contact/ScheduleCallModal"

export function ContactHeader() {
    const [scheduleOpen, setScheduleOpen] = useState(false)
    const stats = [
        { icon: Users, label: "Happy Clients", value: "10,000+" },
        { icon: Globe, label: "Countries", value: "50+" },
        { icon: Zap, label: "Response Time", value: "< 2hrs" }
    ]

    return (
        <div className="text-center mb-20">
            {/* Badge */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/10 via-cyan-500/10 to-emerald-500/10 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-8"
            >
                <Sparkles className="h-4 w-4 text-violet-400 animate-pulse" />
                <span className="text-sm text-white/90 font-medium">Trusted by industry leaders worldwide</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-6xl md:text-8xl font-bold mb-6"
            >
                <span className="bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
                    Let's Build
                </span>
                <br />
                <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                    Something Amazing
                </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl text-white/60 max-w-4xl mx-auto leading-relaxed mb-12"
            >
                Transform your ideas into reality with our expert team.
                From concept to launch, we're here to support your journey every step of the way.
            </motion.p>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12"
            >
                {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <div key={index} className="group">
                            <div className="flex flex-col items-center">
                                <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors mb-3">
                                    <Icon className="h-6 w-6 text-violet-400" />
                                </div>
                                <div className="text-2xl font-bold text-white">{stat.value}</div>
                                <div className="text-sm text-white/50">{stat.label}</div>
                            </div>
                        </div>
                    )
                })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
                <button className="group px-8 py-4 bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:scale-[1.02]">
                    Start a Project
                    <ArrowDown className="inline-block ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
                </button>
                <button
                    onClick={() => setScheduleOpen(true)}
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl transition-all hover:scale-[1.02]"
                >
                    Schedule a Call
                </button>
            </motion.div>

            <ScheduleCallModal isOpen={scheduleOpen} onClose={() => setScheduleOpen(false)} />
        </div>
    )
}