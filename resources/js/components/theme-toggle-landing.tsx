import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { AnimatePresence, motion } from 'framer-motion';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function ThemeToggleLanding() {
    const { appearance, updateAppearance } = useAppearance();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const themes: { value: Appearance; icon: typeof Sun; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Claro' },
        { value: 'dark', icon: Moon, label: 'Escuro' },
        { value: 'system', icon: Monitor, label: 'Automático' },
    ];

    const getCurrentIcon = () => {
        switch (appearance) {
            case 'dark':
                return <Moon className="h-5 w-5" />;
            case 'light':
                return <Sun className="h-5 w-5" />;
            default:
                return <Monitor className="h-5 w-5" />;
        }
    };

    const getCurrentLabel = () => {
        switch (appearance) {
            case 'dark':
                return 'Escuro';
            case 'light':
                return 'Claro';
            default:
                return 'Automático';
        }
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={menuRef} className="relative">
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-gray-700 backdrop-blur-sm transition-all hover:bg-white/20 dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:hover:bg-white/10"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                {getCurrentIcon()}
                <span className="hidden text-sm font-medium sm:inline">
                    {getCurrentLabel()}
                </span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-[#1a1a1a]"
                    >
                        {themes.map(({ value, icon: Icon, label }) => (
                            <button
                                key={value}
                                onClick={() => {
                                    updateAppearance(value);
                                    setIsOpen(false);
                                }}
                                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                                    appearance === value
                                        ? 'bg-[#5FA8A8]/10 text-[#5FA8A8]'
                                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                                }`}
                            >
                                <Icon className="h-4 w-4" />
                                <span className="text-sm font-medium">
                                    {label}
                                </span>
                                {appearance === value && (
                                    <motion.div
                                        layoutId="activeTheme"
                                        className="ml-auto h-2 w-2 rounded-full bg-[#5FA8A8]"
                                    />
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
