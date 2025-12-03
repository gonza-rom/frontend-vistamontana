// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => location.pathname === path;

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled
                    ? 'glass-dark shadow-xl'
                    : 'bg-transparent'
                }`}
            style={{
                backgroundColor: scrolled ? 'rgba(45, 95, 63, 0.95)' : 'rgba(45, 95, 63, 0.7)',
                backdropFilter: 'blur(10px)'
            }}
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="flex items-center space-x-3 group">
                        <img
                            src="/logo-montana.png"
                            alt="Hospedaje Vista Montaña"
                            className="h-16 w-16 object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                        <span className="text-2xl font-bold text-white transition-all duration-300 group-hover:text-opacity-90">
                            Hospedaje Vista Montaña
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        <Link to="/" className={`text-white font-medium transition-all duration-300 relative group ${isActive('/') ? 'text-opacity-100' : 'text-opacity-90 hover:text-opacity-100'
                            }`}>
                            Inicio
                            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left transition-transform duration-300 ${isActive('/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                }`}></span>
                        </Link>
                        <Link to="/alquileres" className={`text-white font-medium transition-all duration-300 relative group ${isActive('/alquileres') ? 'text-opacity-100' : 'text-opacity-90 hover:text-opacity-100'
                            }`}>
                            Reservar
                            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left transition-transform duration-300 ${isActive('/alquileres') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                }`}></span>
                        </Link>
                        <Link to="/turismo" className={`text-white font-medium transition-all duration-300 relative group ${isActive('/turismo') ? 'text-opacity-100' : 'text-opacity-90 hover:text-opacity-100'
                            }`}>
                            Turismo
                            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left transition-transform duration-300 ${isActive('/turismo') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                }`}></span>
                        </Link>
                        <Link to="/galeria" className={`text-white font-medium transition-all duration-300 relative group ${isActive('/galeria') ? 'text-opacity-100' : 'text-opacity-90 hover:text-opacity-100'
                            }`}>
                            Galería
                            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left transition-transform duration-300 ${isActive('/galeria') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                }`}></span>
                        </Link>
                        <Link to="/contacto" className={`text-white font-medium transition-all duration-300 relative group ${isActive('/contacto') ? 'text-opacity-100' : 'text-opacity-90 hover:text-opacity-100'
                            }`}>
                            Contacto
                            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left transition-transform duration-300 ${isActive('/contacto') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                }`}></span>
                        </Link>
                        <DarkModeToggle />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-300"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Menú"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-80 pb-4' : 'max-h-0'
                        }`}
                >
                    <div className="flex flex-col space-y-3 animate-slide-down">
                        <Link
                            to="/"
                            className={`text-white py-2 px-4 rounded-lg transition-all duration-300 ${isActive('/')
                                    ? 'bg-white bg-opacity-20'
                                    : 'hover:bg-white hover:bg-opacity-10'
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            Inicio
                        </Link>
                        <Link
                            to="/alquileres"
                            className={`text-white py-2 px-4 rounded-lg transition-all duration-300 ${isActive('/alquileres')
                                    ? 'bg-white bg-opacity-20'
                                    : 'hover:bg-white hover:bg-opacity-10'
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            Reservar
                        </Link>
                        <Link
                            to="/turismo"
                            className={`text-white py-2 px-4 rounded-lg transition-all duration-300 ${isActive('/turismo')
                                    ? 'bg-white bg-opacity-20'
                                    : 'hover:bg-white hover:bg-opacity-10'
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            Turismo
                        </Link>
                        <Link
                            to="/galeria"
                            className={`text-white py-2 px-4 rounded-lg transition-all duration-300 ${isActive('/galeria')
                                    ? 'bg-white bg-opacity-20'
                                    : 'hover:bg-white hover:bg-opacity-10'
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            Galería
                        </Link>
                        <Link
                            to="/contacto"
                            className={`text-white py-2 px-4 rounded-lg transition-all duration-300 ${isActive('/contacto')
                                    ? 'bg-white bg-opacity-20'
                                    : 'hover:bg-white hover:bg-opacity-10'
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            Contacto
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;