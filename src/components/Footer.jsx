// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 mt-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Hospedaje Vista Montaña</h3>
                        <p className="text-gray-400">
                            Tu refugio en las sierras de Balcozna, Catamarca.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contacto</h3>
                        <p className="text-gray-400">📍 Balcozna, Catamarca</p>
                        <p className="text-gray-400">📞 +54 9 3834 94-6767</p>
                        <p className="text-gray-400">✉️ info@vistamontana.com</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Enlaces</h3>
                        <div className="space-y-2">
                            <a href="/alquileres" className="block text-gray-400 hover:text-white">Reservar</a>
                            <a href="/turismo" className="block text-gray-400 hover:text-white">Lugares turísticos</a>
                            <a href="/contacto" className="block text-gray-400 hover:text-white">Contacto</a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Hospedaje Vista Montaña. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;