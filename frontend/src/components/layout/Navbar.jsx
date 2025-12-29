import { Link, useLocation } from 'react-router-dom';
import { Activity, Menu, X, ShieldAlert, Home as HomeIcon, Map as MapIcon, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../utils/helpers';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/', icon: HomeIcon },
        { name: 'Check Symptoms', path: '/symptom-input', icon: Activity },
        { name: 'Health Map', path: '/geo-risk', icon: MapIcon },
        { name: 'About & Ethics', path: '/ethics', icon: BookOpen },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <ShieldAlert className="h-6 w-6 text-primary" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-800">
                            Health<span className="text-primary">Guard</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={cn(
                                    "flex items-center gap-2 text-sm font-medium transition-colors duration-200",
                                    isActive(link.path)
                                        ? "text-primary bg-primary/5 px-3 py-2 rounded-full"
                                        : "text-slate-600 hover:text-primary"
                                )}
                            >
                                <link.icon className="h-4 w-4" />
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-600 hover:text-primary focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 absolute w-full shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium",
                                    isActive(link.path)
                                        ? "text-primary bg-primary/5"
                                        : "text-slate-600 hover:bg-slate-50"
                                )}
                            >
                                <link.icon className="h-5 w-5" />
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
