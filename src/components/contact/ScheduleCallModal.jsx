import React, { useState, useMemo } from 'react';
import { X, ArrowLeft, ArrowRight, Phone, Mail, Calendar, Clock, Check, MapPin, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TIME_SLOTS = [
    { id: 'morning', label: '9:00 AM – 12:00 PM', tag: 'Morning' },
    { id: 'afternoon', label: '12:00 PM – 3:00 PM', tag: 'Afternoon' },
    { id: 'evening1', label: '3:00 PM – 6:00 PM', tag: 'Evening' },
    { id: 'evening2', label: '6:00 PM – 9:00 PM', tag: 'Night' },
];

function getNext7Days() {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        days.push(d);
    }
    return days;
}

function formatDay(date) {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
}

function formatDate(date) {
    return date.getDate();
}

function formatMonth(date) {
    return date.toLocaleDateString('en-US', { month: 'short' });
}

function formatFullDate(date) {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
}

function isToday(date) {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
}

export function ScheduleCallModal({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');

    const dates = useMemo(() => getNext7Days(), []);

    const handleClose = () => {
        onClose();
        // reset after close animation
        setTimeout(() => {
            setStep(1);
            setSelectedDate(null);
            setSelectedSlot(null);
            setSending(false);
            setSent(false);
            setError('');
        }, 300);
    };

    const handleContinue = () => {
        if (selectedDate !== null && selectedSlot) {
            setStep(2);
        }
    };

    const handleBack = () => {
        setStep(1);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        onClick={handleClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ y: '100%', scale: 0.95 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={{ y: '100%', scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative bg-gradient-to-b from-slate-900 to-slate-800 w-full md:w-[560px] md:rounded-3xl rounded-t-[32px] overflow-hidden max-h-[92vh] flex flex-col border border-white/10 shadow-2xl"
                    >
                        {/* Header */}
                        <div className="relative px-6 pt-6 pb-4 border-b border-white/10">
                            <div className="flex items-center justify-between">
                                {step === 2 ? (
                                    <button
                                        onClick={handleBack}
                                        className="p-2.5 hover:bg-white/10 rounded-xl transition-colors"
                                    >
                                        <ArrowLeft className="w-5 h-5 text-white/70" />
                                    </button>
                                ) : (
                                    <div className="w-10" />
                                )}

                                <div className="text-center flex-1">
                                    <h2 className="text-xl font-bold text-white">
                                        {step === 1 ? 'Schedule a Call' : 'Contact Details'}
                                    </h2>
                                    <p className="text-sm text-white/50 mt-0.5">
                                        {step === 1
                                            ? 'Pick your preferred date & time'
                                            : 'Reach out at your chosen time'}
                                    </p>
                                </div>

                                <button
                                    onClick={handleClose}
                                    className="p-2.5 hover:bg-white/10 rounded-xl transition-colors"
                                >
                                    <X className="w-5 h-5 text-white/70" />
                                </button>
                            </div>

                            {/* Step indicator */}
                            <div className="flex items-center gap-2 mt-4 justify-center">
                                <div className={`h-1 w-16 rounded-full transition-colors ${step >= 1 ? 'bg-gradient-to-r from-violet-500 to-cyan-500' : 'bg-white/10'}`} />
                                <div className={`h-1 w-16 rounded-full transition-colors ${step >= 2 ? 'bg-gradient-to-r from-violet-500 to-cyan-500' : 'bg-white/10'}`} />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto px-6 py-6">
                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        {/* Date selection */}
                                        <div className="mb-6">
                                            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-violet-400" />
                                                Select Date
                                            </h3>
                                            <div className="grid grid-cols-7 gap-2">
                                                {dates.map((date, idx) => {
                                                    const active = selectedDate === idx;
                                                    return (
                                                        <button
                                                            key={idx}
                                                            onClick={() => setSelectedDate(idx)}
                                                            className={`flex flex-col items-center p-3 rounded-2xl border transition-all duration-200 ${active
                                                                ? 'bg-gradient-to-b from-violet-500 to-cyan-500 border-transparent shadow-lg shadow-violet-500/25 scale-105'
                                                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                                                }`}
                                                        >
                                                            <span className={`text-[10px] font-semibold uppercase ${active ? 'text-white' : 'text-white/50'}`}>
                                                                {formatDay(date)}
                                                            </span>
                                                            <span className={`text-lg font-bold mt-0.5 ${active ? 'text-white' : 'text-white/90'}`}>
                                                                {formatDate(date)}
                                                            </span>
                                                            <span className={`text-[10px] ${active ? 'text-white/80' : 'text-white/40'}`}>
                                                                {formatMonth(date)}
                                                            </span>
                                                            {isToday(date) && (
                                                                <span className={`text-[8px] font-bold mt-0.5 px-1.5 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-emerald-500/20 text-emerald-400'
                                                                    }`}>
                                                                    TODAY
                                                                </span>
                                                            )}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Time slot selection */}
                                        <div>
                                            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-cyan-400" />
                                                Select Time Slot
                                            </h3>
                                            <div className="grid grid-cols-2 gap-3">
                                                {TIME_SLOTS.map((slot) => {
                                                    const active = selectedSlot === slot.id;
                                                    return (
                                                        <button
                                                            key={slot.id}
                                                            onClick={() => setSelectedSlot(slot.id)}
                                                            className={`relative p-4 rounded-2xl border text-left transition-all duration-200 ${active
                                                                ? 'bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border-violet-400/50 shadow-lg shadow-violet-500/10'
                                                                : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                                                }`}
                                                        >
                                                            {active && (
                                                                <div className="absolute top-3 right-3 w-5 h-5 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full flex items-center justify-center">
                                                                    <Check className="w-3 h-3 text-white" />
                                                                </div>
                                                            )}
                                                            <span className={`text-xs font-semibold uppercase ${active ? 'text-violet-300' : 'text-white/40'}`}>
                                                                {slot.tag}
                                                            </span>
                                                            <p className={`text-sm font-medium mt-1 ${active ? 'text-white' : 'text-white/80'}`}>
                                                                {slot.label}
                                                            </p>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.25 }}
                                        className="space-y-6"
                                    >
                                        {/* Confirmation banner */}
                                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                                                    <Check className="w-5 h-5 text-emerald-400" />
                                                </div>
                                                <div>
                                                    <h3 className="text-white font-semibold">Time Slot Selected</h3>
                                                    <p className="text-white/50 text-sm">Your preferred schedule</p>
                                                </div>
                                            </div>
                                            <div className="bg-white/5 rounded-xl p-4 space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <Calendar className="w-4 h-4 text-violet-400" />
                                                    <span className="text-white/90 text-sm font-medium">
                                                        {selectedDate !== null ? formatFullDate(dates[selectedDate]) : ''}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Clock className="w-4 h-4 text-cyan-400" />
                                                    <span className="text-white/90 text-sm font-medium">
                                                        {TIME_SLOTS.find((s) => s.id === selectedSlot)?.label || ''}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Contact cards */}
                                        <div>
                                            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-3">
                                                Contact Us At Your Scheduled Time
                                            </h3>

                                            <div className="space-y-3">
                                                {/* Phone card */}
                                                <a
                                                    href="tel:+13145489101"
                                                    className="group flex items-center gap-4 p-5 bg-gradient-to-r from-violet-500/10 to-violet-500/5 border border-violet-500/20 rounded-2xl hover:border-violet-400/40 hover:bg-violet-500/15 transition-all"
                                                >
                                                    <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:scale-110 transition-transform">
                                                        <Phone className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-xs text-white/50 font-medium uppercase tracking-wider">Phone</p>
                                                        <p className="text-lg font-bold text-white mt-0.5">+1 314 548 9101</p>
                                                    </div>
                                                    <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                                                </a>

                                                {/* Email card */}
                                                <a
                                                    href="mailto:accommodations.nextkinlife@gmail.com"
                                                    className="group flex items-center gap-4 p-5 bg-gradient-to-r from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded-2xl hover:border-cyan-400/40 hover:bg-cyan-500/15 transition-all"
                                                >
                                                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25 group-hover:scale-110 transition-transform">
                                                        <Mail className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-xs text-white/50 font-medium uppercase tracking-wider">Email</p>
                                                        <p className="text-lg font-bold text-white mt-0.5">accommodations.nextkinlife@gmail.com</p>
                                                    </div>
                                                    <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                                                </a>
                                            </div>
                                        </div>

                                        {/* Office info */}
                                        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                            <div className="flex items-center gap-3">
                                                <MapPin className="w-5 h-5 text-violet-400" />
                                                <div>
                                                    <p className="text-sm font-semibold text-white">Global Headquarters</p>
                                                    <p className="text-xs text-white/50 mt-0.5">
                                                        8795 Stonehouse Dr, Ellicott City, MD - 21043, United States
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-5 border-t border-white/10 bg-gradient-to-t from-black/30 to-transparent">
                            {step === 1 ? (
                                <button
                                    onClick={handleContinue}
                                    disabled={selectedDate === null || !selectedSlot}
                                    className={`w-full h-14 rounded-xl font-semibold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${selectedDate !== null && selectedSlot
                                        ? 'bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
                                        : 'bg-white/10 text-white/30 cursor-not-allowed'
                                        }`}
                                >
                                    Continue
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            ) : sent ? (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-center py-2"
                                >
                                    <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Check className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-1">Notification Sent!</h3>
                                    <p className="text-white/60 text-sm">We'll be expecting your call</p>
                                </motion.div>
                            ) : (
                                <div className="space-y-2">
                                    {error && (
                                        <p className="text-red-400 text-sm text-center">{error}</p>
                                    )}
                                    <button
                                        onClick={async () => {
                                            setSending(true);
                                            setError('');
                                            try {
                                                const API_BASE = import.meta.env.PROD
                                                    ? 'https://api.nextkinlife.live'
                                                    : '/api';
                                                const res = await fetch(`${API_BASE}/contact/schedule-call`, {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({
                                                        date: selectedDate !== null ? formatFullDate(dates[selectedDate]) : '',
                                                        timeSlot: TIME_SLOTS.find((s) => s.id === selectedSlot)?.label || '',
                                                    }),
                                                });
                                                if (!res.ok) throw new Error('Failed to send');
                                                setSent(true);
                                                setTimeout(() => handleClose(), 2500);
                                            } catch (err) {
                                                setError('Could not send notification. Please try again.');
                                            } finally {
                                                setSending(false);
                                            }
                                        }}
                                        disabled={sending}
                                        className="w-full h-14 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 hover:from-violet-600 hover:to-cyan-600 text-white font-semibold text-lg shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {sending ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Check className="w-5 h-5" />
                                                Done
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
