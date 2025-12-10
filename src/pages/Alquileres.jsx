// src/pages/Alquileres.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../config/api';

const Alquileres = () => {
    const [alquileres, setAlquileres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [tipoFiltro, setTipoFiltro] = useState('todos');

    useEffect(() => {
        cargarAlquileres();
    }, []);

    const cargarAlquileres = async () => {
        try {
            setError('');
            const response = await apiClient.get('/alquileres');
            console.log('Alquileres cargados:', response.data);
            setAlquileres(response.data);
        } catch (error) {
            console.error('Error al cargar alquileres:', error);
            setError('Error al cargar los alojamientos. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const alquileresFiltrados = tipoFiltro === 'todos'
        ? alquileres
        : alquileres.filter(a => a.tipo === tipoFiltro);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-32 min-h-screen">
                <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-6">
                        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
                            style={{ borderTopColor: 'var(--color-sierra)' }}></div>
                    </div>
                    <p className="text-gray-600 text-lg font-medium">Cargando alojamientos...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-32 min-h-screen">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 p-8 rounded-2xl shadow-lg">
                        <div className="text-6xl mb-4">⚠️</div>
                        <p className="text-xl font-bold text-red-800 mb-4">{error}</p>
                        <button
                            onClick={cargarAlquileres}
                            className="px-8 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 hover:scale-105 hover-glow"
                        >
                            Reintentar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16">
            <div className="container mx-auto px-4 py-12">
                {/* Header */}
                <div className="text-center mb-12 animate-slide-down">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-sierra">
                        Opciones de Alojamiento
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Elegí entre nuestras habitaciones individuales o alquilá la casa completa
                        para tu grupo. Todas las opciones incluyen acceso a las áreas comunes
                        y vistas espectaculares.
                    </p>
                </div>

                {/* Filtros */}
                <div className="flex flex-wrap justify-center gap-4 mb-12 animate-slide-up">
                    <button
                        onClick={() => setTipoFiltro('todos')}
                        className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${tipoFiltro === 'todos'
                            ? 'gradient-sierra text-white shadow-lg hover-glow'
                            : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
                            }`}
                    >
                        Todos ({alquileres.length})
                    </button>
                    <button
                        onClick={() => setTipoFiltro('habitacion')}
                        className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${tipoFiltro === 'habitacion'
                            ? 'gradient-sierra text-white shadow-lg hover-glow'
                            : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
                            }`}
                    >
                        Habitaciones ({alquileres.filter(a => a.tipo === 'habitacion').length})
                    </button>
                    <button
                        onClick={() => setTipoFiltro('casa_completa')}
                        className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${tipoFiltro === 'casa_completa'
                            ? 'gradient-sierra text-white shadow-lg hover-glow'
                            : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
                            }`}
                    >
                        Casa Completa ({alquileres.filter(a => a.tipo === 'casa_completa').length})
                    </button>
                </div>

                {/* Grid de alquileres */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {alquileresFiltrados.map((alquiler, index) => (
                        <div
                            key={alquiler.id}
                            className="group bg-white rounded-2xl shadow-lg overflow-hidden hover-lift animate-scale-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Image Container */}
                            <div className="relative h-72 overflow-hidden">
                                {alquiler.tipo === 'casa_completa' ? (
                                    <img
                                        src="/patio-6.jpg"
                                        alt={alquiler.nombre}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.innerHTML = `
                                                <div class="w-full h-full flex items-center justify-center gradient-sierra">
                                                    <span class="text-white text-7xl">🏠</span>
                                                </div>
                                            `;
                                        }}
                                    />
                                ) : (alquiler.habitacion_fotos && alquiler.habitacion_fotos.length > 0 ? (
                                    <img
                                        src={`/${alquiler.habitacion_fotos[0]}`}
                                        alt={alquiler.nombre}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentElement.innerHTML = `
                                                <div class="w-full h-full flex items-center justify-center gradient-sierra">
                                                    <span class="text-white text-7xl">🛏️</span>
                                                </div>
                                            `;
                                        }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center gradient-sierra">
                                        <span className="text-white text-7xl">
                                            🛏️
                                        </span>
                                    </div>
                                ))}

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {/* Type Badge */}
                                <div className="absolute top-4 right-4">
                                    <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm ${alquiler.tipo === 'casa_completa'
                                        ? 'bg-purple-500 bg-opacity-90 text-white'
                                        : 'bg-blue-500 bg-opacity-90 text-white'
                                        }`}>
                                        {alquiler.tipo === 'casa_completa' ? 'Casa Completa' : 'Habitación'}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                    {alquiler.nombre}
                                </h3>
                                <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                                    {alquiler.descripcion || 'Alojamiento cómodo con todas las comodidades'}
                                </p>

                                {/* Info Row */}
                                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                                    <div className="flex items-center text-gray-600">
                                        <span className="text-2xl mr-2">👥</span>
                                        <span className="font-medium">Hasta {alquiler.capacidad_maxima} personas</span>
                                    </div>
                                </div>

                                {/* Price and CTA */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-3xl font-bold text-gradient-sierra">
                                            ${parseFloat(alquiler.precio).toLocaleString()}
                                        </div>
                                        <div className="text-sm text-gray-500">por noche</div>
                                    </div>
                                    <Link
                                        to={`/alquileres/${alquiler.id}`}
                                        className="px-6 py-3 gradient-sierra text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover-glow"
                                    >
                                        Ver Detalles
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {alquileresFiltrados.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-8xl mb-6">🏔️</div>
                        <p className="text-2xl text-gray-500 font-medium">
                            No hay alojamientos disponibles en esta categoría
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Alquileres;