import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="relative h-screen">
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 z-10"></div>
                <img 
                    src="../hero-montanas.jpg" 
                    alt="Vista de las montañas de Balcozna"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
                    <div className="text-white px-4">
                        <h1 className="text-5xl md:text-7xl font-bold mb-4">
                            Hospedaje Vista Montaña
                        </h1>
                        <p className="text-xl md:text-2xl mb-8">
                            Tu refugio en las sierras de Balcozna, Catamarca
                        </p>
                        <div className="space-x-4">
                            <Link 
                                to="/alquileres" 
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg inline-block transition"
                            >
                                Reservar Ahora
                            </Link>
                            <Link 
                                to="/turismo" 
                                className="bg-white hover:bg-gray-100 text-green-700 px-8 py-3 rounded-lg inline-block transition"
                            >
                                Lugares para Visitar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Características */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">¿Por qué elegirnos?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-5xl mb-4">🏔️</div>
                            <h3 className="text-xl font-bold mb-2">Vistas Increíbles</h3>
                            <p className="text-gray-600">
                                Despertá rodeado de las hermosas sierras de Catamarca
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl mb-4">💧</div>
                            <h3 className="text-xl font-bold mb-2">Cerca de El Saltón</h3>
                            <p className="text-gray-600">
                                A solo minutos de la cascada más impresionante de la zona
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl mb-4">🏠</div>
                            <h3 className="text-xl font-bold mb-2">Comodidad Total</h3>
                            <p className="text-gray-600">
                                Habitaciones equipadas y posibilidad de alquilar la casa completa
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sobre el hospedaje */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-6">Naturaleza y Tranquilidad</h2>
                            <p className="text-lg text-gray-700 mb-4">
                                Hospedaje Vista Montaña está ubicado en Balcozna, un paraíso natural 
                                en el corazón de las sierras de Catamarca. Ofrecemos alojamiento 
                                cómodo y acogedor para que puedas disfrutar de la belleza del paisaje 
                                montañoso.
                            </p>
                            <p className="text-lg text-gray-700 mb-6">
                                Podés elegir entre nuestras habitaciones individuales o alquilar 
                                la casa completa para grupos más grandes. Todas nuestras instalaciones 
                                están diseñadas para que te sientas como en casa mientras explorás 
                                los tesoros naturales de la región.
                            </p>
                            <Link 
                                to="/alquileres" 
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg inline-block transition"
                            >
                                Ver Opciones de Alojamiento
                            </Link>
                        </div>
                        <div>
                            <img 
                                src="/images/casa-exterior.jpg" 
                                alt="Exterior del hospedaje"
                                className="rounded-lg shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Galería rápida */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">Galería</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <img src="/images/gallery-1.jpg" alt="Vista 1" className="rounded-lg h-64 w-full object-cover" />
                        <img src="/images/gallery-2.jpg" alt="Vista 2" className="rounded-lg h-64 w-full object-cover" />
                        <img src="/images/gallery-3.jpg" alt="Vista 3" className="rounded-lg h-64 w-full object-cover" />
                        <img src="/images/gallery-4.jpg" alt="Vista 4" className="rounded-lg h-64 w-full object-cover" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;