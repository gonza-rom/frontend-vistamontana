// src/pages/Galeria.jsx
import React, { useState } from 'react';

const Galeria = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('todas');

    // Organizar las imágenes por categorías
    const imagenes = {
        habitaciones: [
            { src: '/habitacion-1.jpg', alt: 'Habitación acogedora', title: 'Habitación 1' },
            { src: '/habitacion-2.jpg', alt: 'Habitación confortable', title: 'Habitación 2' },
            { src: '/habitacion-3.jpg', alt: 'Habitación con vista', title: 'Habitación 3' }
        ],
        patios: [
            { src: '/patio-1.jpg', alt: 'Patio principal', title: 'Patio Principal' },
            { src: '/patio-2.jpg', alt: 'Patio exterior', title: 'Patio Exterior' },
            { src: '/patio-3.jpg', alt: 'Área de descanso', title: 'Área de Descanso' },
            { src: '/patio-4.jpg', alt: 'Espacio al aire libre', title: 'Espacio Exterior' },
            { src: '/patio-5.jpg', alt: 'Jardín', title: 'Jardín' },
            { src: '/patio-6.jpg', alt: 'Jardín', title: 'Jardín' },
            { src: '/patio-noche.jpg', alt: 'Patio de noche', title: 'Patio Nocturno' }
        ],
        quincho: [
            { src: '/quincho.jpg', alt: 'Quincho principal', title: 'Quincho' },
            { src: '/quincho-2.jpg', alt: 'Área de parrilla', title: 'Área de Parrilla' },
            { src: '/quincho-3.jpg', alt: 'Espacio para reuniones', title: 'Espacio Social' }
        ],
        salton: [
            { src: '/salton-1.jpg', alt: 'Cascada El Saltón', title: 'El Saltón 1' },
            { src: '/salton-2.jpg', alt: 'El Saltón vista panorámica', title: 'El Saltón 2' },
            { src: '/salton-3.jpg', alt: 'Cascada desde arriba', title: 'El Saltón 3' },
            { src: '/salton-4.jpg', alt: 'Sendero al Saltón', title: 'El Saltón 4' },
            { src: '/salton-5.jpg', alt: 'Vista lateral cascada', title: 'El Saltón 5' },
            { src: '/salton-6.jpg', alt: 'Poza del Saltón', title: 'El Saltón 6' },
            { src: '/salton-7.jpg', alt: 'Naturaleza en El Saltón', title: 'El Saltón 7' },
            { src: '/salton-8.jpg', alt: 'Camino a la cascada', title: 'El Saltón 8' },
            { src: '/salton-9.jpg', alt: 'Vista completa', title: 'El Saltón 9' }
        ],
        miradores: [
            { src: '/mirador-las-lajas.jpg', alt: 'Mirador Las Lajas', title: 'Mirador Las Lajas' },
            { src: '/mirador-las-lajas2.jpg', alt: 'Vista desde el mirador', title: 'Mirador Las Lajas 2' },
            { src: '/mirador-las-lajas3.jpg', alt: 'Panorámica del mirador', title: 'Mirador Las Lajas 3' }
        ],
        vistas: [
            { src: '/montaña-1.jpg', alt: 'Vista de las montañas', title: 'Montañas 1' },
            { src: '/montañas-2.jpg', alt: 'Sierras de Catamarca', title: 'Montañas 2' },
            { src: '/vista-exterior.jpg', alt: 'Vista exterior del hospedaje', title: 'Vista Exterior' }
        ],
        visitas: [
            { src: '/visitas-1.jpg', alt: 'Huéspedes disfrutando del hospedaje', title: 'Visitas de Huéspedes' },
            { src: '/visitas-2.jpg', alt: 'Momentos de nuestros visitantes', title: 'Recuerdos de Visitas' },
            { src: '/visitas-3.jpg', alt: 'Momentos de nuestros visitantes', title: 'Recuerdos de Visitas' },
            { src: '/visitas-4.jpg', alt: 'Momentos de nuestros visitantes', title: 'Recuerdos de Visitas' },
            { src: '/visitas-5.jpg', alt: 'Momentos de nuestros visitantes', title: 'Recuerdos de Visitas' }
        ]
    };

    // Obtener todas las imágenes o filtradas por categoría
    const getImagenes = () => {
        if (selectedCategory === 'todas') {
            return Object.values(imagenes).flat();
        }
        return imagenes[selectedCategory] || [];
    };

    const imagenesActuales = getImagenes();

    const categorias = [
        { id: 'todas', nombre: 'Todas', icon: '🖼️', count: Object.values(imagenes).flat().length },
        { id: 'habitaciones', nombre: 'Habitaciones', icon: '🛏️', count: imagenes.habitaciones.length },
        { id: 'patios', nombre: 'Patios', icon: '🌿', count: imagenes.patios.length },
        { id: 'quincho', nombre: 'Quincho', icon: '🔥', count: imagenes.quincho.length },
        { id: 'salton', nombre: 'El Saltón', icon: '💧', count: imagenes.salton.length },
        { id: 'miradores', nombre: 'Miradores', icon: '👁️', count: imagenes.miradores.length },
        { id: 'vistas', nombre: 'Vistas', icon: '🏔️', count: imagenes.vistas.length },
        { id: 'visitas', nombre: 'Visitas', icon: '�', count: imagenes.visitas.length }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16">
            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12 animate-slide-down">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-sierra">
                        Galería de Fotos
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Descubrí la belleza de nuestro hospedaje y los lugares increíbles que podés visitar
                    </p>
                    <div className="mt-6 inline-block bg-gradient-to-r from-green-50 to-blue-50 px-6 py-3 rounded-full">
                        <p className="text-gray-700 font-semibold">
                            📸 {Object.values(imagenes).flat().length} fotos en total
                        </p>
                    </div>
                </div>

                {/* Filtros por categoría */}
                <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
                    {categorias.map((categoria) => (
                        <button
                            key={categoria.id}
                            onClick={() => setSelectedCategory(categoria.id)}
                            className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 text-sm md:text-base ${selectedCategory === categoria.id
                                ? 'gradient-sierra text-white shadow-lg hover-glow'
                                : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
                                }`}
                        >
                            <span className="text-lg">{categoria.icon}</span>
                            <span>{categoria.nombre}</span>
                            <span className="text-xs opacity-75 bg-white/20 px-2 py-0.5 rounded-full">
                                {categoria.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Grid de imágenes - Masonry Layout */}
                <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                    {imagenesActuales.map((imagen, index) => (
                        <div
                            key={index}
                            className="break-inside-avoid group relative overflow-hidden rounded-2xl shadow-lg hover-lift cursor-pointer animate-scale-in bg-white"
                            style={{ animationDelay: `${index * 30}ms` }}
                            onClick={() => setSelectedImage(imagen)}
                        >
                            <img
                                src={imagen.src}
                                alt={imagen.alt}
                                className="w-full transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-white font-bold text-lg mb-1">{imagen.title}</h3>
                                    <p className="text-white/90 text-sm">{imagen.alt}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {imagenesActuales.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-8xl mb-6">📷</div>
                        <p className="text-2xl text-gray-500 font-medium">
                            No hay imágenes en esta categoría
                        </p>
                    </div>
                )}
            </div>

            {/* Modal de imagen ampliada */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2 hover:bg-black/70"
                        aria-label="Cerrar"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="max-w-7xl max-h-[95vh] relative animate-scale-in">
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className="mt-4 bg-black/60 backdrop-blur-md p-4 rounded-lg">
                            <h3 className="text-white font-bold text-xl mb-1">{selectedImage.title}</h3>
                            <p className="text-white/80 text-sm">{selectedImage.alt}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Galeria;
