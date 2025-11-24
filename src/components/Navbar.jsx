// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-green-700 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="text-2xl font-bold">
                        🏔️ Hospedaje Vista Montaña
                    </Link>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6">
                        <Link to="/" className="hover:text-green-200">Inicio</Link>
                        <Link to="/alquileres" className="hover:text-green-200">Reservar</Link>
                        <Link to="/turismo" className="hover:text-green-200">Turismo</Link>
                        <Link to="/contacto" className="hover:text-green-200">Contacto</Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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