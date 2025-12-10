// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { isAuthenticated } = useAuth();

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

                        {/* Admin/Login Button */}
                        <Link
                            to={isAuthenticated ? "/admin" : "/login"}
                            className="text-white font-medium transition-all duration-300 hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-lg flex items-center gap-2"
                            title={isAuthenticated ? "Panel de Admin" : "Iniciar Sesión"}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isAuthenticated ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                )}
                            </svg>
                            {isAuthenticated ? "Admin" : ""}
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
                                ? 'bg-black bg-opacity-20'
                                : 'hover:bg-white hover:bg-opacity-10'
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            Inicio
                        </Link>
                        <Link
                            to="/alquileres"
                            className={`text-white py-2 px-4 rounded-lg transition-all duration-300 ${isActive('/alquileres')
                                ? 'bg-black bg-opacity-20'
                                : 'hover:bg-white hover:bg-opacity-10'
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            Reservar
                        </Link>
                        <Link
                            to="/turismo"
                            className={`text-white py-2 px-4 rounded-lg transition-all duration-300 ${isActive('/turismo')
                                ? 'bg-black bg-opacity-20'
                                : 'hover:bg-white hover:bg-opacity-10'
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            Turismo
                        </Link>
                        <Link
                            to="/galeria"
                            className={`text-white py-2 px-4 rounded-lg transition-all duration-300 ${isActive('/galeria')
                                ? 'bg-black bg-opacity-20'
                                : 'hover:bg-white hover:bg-opacity-10'
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            Galería
                        </Link>
                        <Link
                            to="/contacto"
                            className={`text-white py-2 px-4 rounded-lg transition-all duration-300 ${isActive('/contacto')
                                ? 'bg-black bg-opacity-20'
                                : 'hover:bg-white hover:bg-opacity-10'
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            Contacto
                        </Link>

                        {/* Admin/Login Button Mobile */}
                        <Link
                            to={isAuthenticated ? "/admin" : "/login"}
                            className={`text-white py-2 px-4 rounded-lg transition-all duration-300 flex items-center gap-2 ${isActive(isAuthenticated ? '/admin' : '/login')
                                ? 'bg-black bg-opacity-20'
                                : 'hover:bg-white hover:bg-opacity-10'
                                }`}
                            onClick={() => setIsOpen(false)}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isAuthenticated ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                )}
                            </svg>
                            {isAuthenticated ? "Panel Admin" : "Iniciar Sesión"}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;