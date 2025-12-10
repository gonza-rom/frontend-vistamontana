import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Imágenes para el carrusel del hero
    const heroImages = [
        { src: '/patio-5.webp', alt: 'Vista del patio' },
        { src: '/montaña-1.jpg', alt: 'Vista de las montañas' },
        { src: '/quincho.webp', alt: 'Quincho del hospedaje' },
        { src: '/patio-1.webp', alt: 'Patio principal' },
        { src: '/vista-exterior.jpg', alt: 'Vista exterior' }
    ];

    useEffect(() => {
        // Add scroll reveal effect
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-slide-up');
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

        // Auto-advance carousel
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 5000);

        return () => {
            observer.disconnect();
            clearInterval(interval);
        };
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    };

    return (
        <div>
            {/* Hero Section with Carousel */}
            <div className="relative h-screen overflow-hidden">
                <div className="absolute inset-0 gradient-overlay z-10"></div>

                {/* Carousel Images */}
                {heroImages.map((image, index) => (
                    <img
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                ))}

                <div className="absolute inset-0 z-20 flex items-center justify-center text-center">
                    <div className="text-white px-4 max-w-5xl">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-down">
                            Hospedaje Vista Montaña
                        </h1>
                        <p className="text-xl md:text-3xl mb-10 animate-slide-up font-light">
                            Tu refugio en las sierras de Balcozna, Catamarca
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                            <Link
                                to="/alquileres"
                                className="group relative px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover-glow"
                                style={{
                                    background: 'linear-gradient(135deg, #2D5F3F 0%, #4A8B5C 100%)'
                                }}
                            >
                                <span className="relative z-10 text-white">Reservar Ahora</span>
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            </Link>
                            <Link
                                to="/turismo"
                                className="group relative px-8 py-4 rounded-xl font-semibold text-lg bg-white text-gray-800 overflow-hidden transition-all duration-300 hover:scale-105 hover-glow"
                            >
                                <span className="relative z-10">Lugares para Visitar</span>
                                <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Carousel Controls */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                    aria-label="Imagen anterior"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                    aria-label="Siguiente imagen"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Carousel Indicators */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                    {heroImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                ? 'bg-white w-8'
                                : 'bg-white/50 hover:bg-white/75'
                                }`}
                            aria-label={`Ir a imagen ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-float">
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Características con imágenes */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 reveal">
                        ¿Por qué elegirnos?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <Link to="/galeria" className="text-center reveal hover-lift p-8 rounded-2xl bg-white shadow-lg transition-all duration-300 group cursor-pointer">
                            <div className="relative mb-6 overflow-hidden rounded-2xl">
                                <img
                                    src="/montañas-2.jpg"
                                    alt="Vistas increíbles de las montañas"
                                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-6xl">🏔️</div>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gradient-sierra">Vistas Increíbles</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Despertá rodeado de las hermosas sierras de Catamarca
                            </p>
                        </Link>
                        <Link to="/galeria" className="text-center reveal hover-lift p-8 rounded-2xl bg-white shadow-lg transition-all duration-300 stagger-1 group cursor-pointer">
                            <div className="relative mb-6 overflow-hidden rounded-2xl">
                                <img
                                    src="/salton-1.jpg"
                                    alt="Cascada El Saltón"
                                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-6xl">💧</div>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gradient-sierra">Cerca de El Saltón</h3>
                            <p className="text-gray-600 leading-relaxed">
                                A solo minutos de la cascada más impresionante de la zona
                            </p>
                        </Link>
                        <Link to="/galeria" className="text-center reveal hover-lift p-8 rounded-2xl bg-white shadow-lg transition-all duration-300 stagger-2 group cursor-pointer">
                            <div className="relative mb-6 overflow-hidden rounded-2xl">
                                <img
                                    src="/habitacion-1.jpg"
                                    alt="Habitaciones cómodas"
                                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                <div className="absolute bottom-3 left-3 text-6xl">🏠</div>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gradient-sierra">Comodidad Total</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Habitaciones equipadas y posibilidad de alquilar la casa completa
                            </p>
                        </Link>
                        <Link to="/alquileres" className="text-center reveal hover-lift p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg transition-all duration-300 stagger-3 group cursor-pointer border-2 border-blue-200">
                            <div className="relative mb-6 flex items-center justify-center h-48">
                                <div className="text-8xl animate-pulse">📡</div>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">WiFi Starlink</h3>
                            <p className="text-gray-700 leading-relaxed font-medium">
                                Internet de alta velocidad en plena montaña
                            </p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Sobre el hospedaje con video */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="reveal">
                            <h2 className="text-4xl md:text-5xl font-bold mb-8">
                                Naturaleza y Tranquilidad
                            </h2>
                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                Hospedaje Vista Montaña está ubicado en Balcozna, un paraíso natural
                                en el corazón de las sierras de Catamarca. Ofrecemos alojamiento
                                cómodo y acogedor para que puedas disfrutar de la belleza del paisaje
                                montañoso.
                            </p>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                Podés elegir entre nuestras habitaciones individuales o alquilar
                                la casa completa para grupos más grandes. Todas nuestras instalaciones
                                están diseñadas para que te sientas como en casa mientras explorás
                                los tesoros naturales de la región.
                            </p>
                            <Link
                                to="/alquileres"
                                className="inline-block px-8 py-4 rounded-xl font-semibold text-lg text-white transition-all duration-300 hover:scale-105 hover-glow"
                                style={{
                                    background: 'linear-gradient(135deg, #2D5F3F 0%, #4A8B5C 100%)'
                                }}
                            >
                                Ver Opciones de Alojamiento
                            </Link>
                        </div>
                        <div className="reveal stagger-1">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
                                <div className="relative rounded-2xl shadow-2xl overflow-hidden aspect-[9/16]">
                                    <iframe
                                        className="absolute top-0 left-0 w-full h-full"
                                        src="https://www.youtube.com/embed/y8SgfCrdxME"
                                        title="Hospedaje Vista Montaña"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Galería rápida con link */}
            <section className="py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 reveal">
                            Galería
                        </h2>
                        <p className="text-lg text-gray-600 mb-6 reveal">
                            Descubrí más fotos de nuestro hospedaje y los lugares que podés visitar
                        </p>
                        <Link
                            to="/galeria"
                            className="inline-flex items-center gap-2 px-6 py-3 gradient-sierra text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover-glow shadow-lg reveal"
                        >
                            <span>Ver Galería Completa</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { src: '/patio-1.webp', alt: 'Patio principal' },
                            { src: '/patio-2.jpg', alt: 'Patio exterior' },
                            { src: '/habitacion-2.jpg', alt: 'Habitación confortable' },
                            { src: '/quincho-2.jpg', alt: 'Quincho' }
                        ].map((image, index) => (
                            <Link
                                key={index}
                                to="/galeria"
                                className="reveal stagger-1 group relative overflow-hidden rounded-2xl shadow-lg hover-lift"
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                    <p className="text-white font-semibold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        {image.alt}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 gradient-nature opacity-90"></div>
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-slide-up">
                        ¿Listo para tu próxima aventura?
                    </h2>
                    <p className="text-xl text-white mb-10 max-w-2xl mx-auto animate-slide-up stagger-1">
                        Reservá ahora y descubrí la magia de las sierras de Catamarca
                    </p>
                    <Link
                        to="/alquileres"
                        className="inline-block px-10 py-5 bg-white text-gray-900 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-scale-in stagger-2"
                    >
                        Hacer una Reserva
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;