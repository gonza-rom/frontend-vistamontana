// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="text-white shadow-lg" style={{backgroundColor: '#656B5B'}}>
            <div className="container mx-auto px-4 nav">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="flex items-center space-x-3">
                        <img    
                            src="/logo-montana.png" 
                            alt="Hospedaje Vista Montaña" 
                            className="h-18 w-18 object-contain"
                        />
                        <span className="text-2xl font-bold">
                            Hospedaje Vista Montaña
                        </span>
                    </Link>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6">
                        <Link to="/" className="hover:text-gray-300 transition">Inicio</Link>
                        <Link to="/alquileres" className="hover:text-gray-300 transition">Reservar</Link>
                        <Link to="/turismo" className="hover:text-gray-300 transition">Turismo</Link>
                        <Link to="/contacto" className="hover:text-gray-300 transition">Contacto</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden"
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
                {isOpen && (
                    <div className="md:hidden pb-4">
                        <Link to="/" className="block py-2 hover:text-green-200">Inicio</Link>
                        <Link to="/alquileres" className="block py-2 hover:text-green-200">Reservar</Link>
                        <Link to="/turismo" className="block py-2 hover:text-green-200">Turismo</Link>
                        <Link to="/contacto" className="block py-2 hover:text-green-200">Contacto</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;