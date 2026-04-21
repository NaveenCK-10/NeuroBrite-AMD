import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, PlusCircle, Lightbulb, MessageCircle, Brain } from 'lucide-react';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/log', label: 'Log Entry', icon: PlusCircle },
  { path: '/insights', label: 'Insights', icon: Lightbulb },
  { path: '/chat', label: 'AI Chat', icon: MessageCircle },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-white/[0.04]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2 group">
            <div className="relative">
              <Brain className="w-8 h-8 text-neuro-accent transition-all duration-300 group-hover:text-neuro-purple" />
              <div className="absolute inset-0 bg-neuro-accent/20 rounded-full blur-lg group-hover:bg-neuro-purple/20 transition-all duration-300" />
            </div>
            <span className="font-display font-bold text-xl gradient-text">
              NeuroBite
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`
                    relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                    transition-all duration-300 ease-out
                    ${isActive
                      ? 'text-white'
                      : 'text-white/40 hover:text-white/70'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-white/[0.06] border border-white/[0.08] shadow-sm shadow-neuro-accent/5"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
