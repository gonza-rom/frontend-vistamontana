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
            <div className="flex justify-center items-center py-20">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando alojamientos...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-20">
                <div className="bg-red-100 text-red-800 p-6 rounded-lg max-w-2xl mx-auto text-center">
                    <p className="text-xl font-bold mb-2">⚠️ {error}</p>
                    <button 
                        onClick={cargarAlquileres}
                        className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center mb-8">
                Opciones de Alojamiento
            </h1>
            
            <p className="text-center text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Elegí entre nuestras habitaciones individuales o alquilá la casa completa 
                para tu grupo. Todas las opciones incluyen acceso a las áreas comunes 
                y vistas espectaculares.
            </p>

            {/* Filtros */}
            <div className="flex justify-center mb-8 space-x-4">
                <button
                    onClick={() => setTipoFiltro('todos')}
                    className={`px-6 py-2 rounded-lg transition ${
                        tipoFiltro === 'todos' 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Todos ({alquileres.length})
                </button>
                <button
                    onClick={() => setTipoFiltro('habitacion')}
                    className={`px-6 py-2 rounded-lg transition ${
                        tipoFiltro === 'habitacion' 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Habitaciones ({alquileres.filter(a => a.tipo === 'habitacion').length})
                </button>
                <button
                    onClick={() => setTipoFiltro('casa_completa')}
                    className={`px-6 py-2 rounded-lg transition ${
                        tipoFiltro === 'casa_completa' 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Casa Completa ({alquileres.filter(a => a.tipo === 'casa_completa').length})
                </button>
            </div>

            {/* Grid de alquileres */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {alquileresFiltrados.map(alquiler => (
                    <div key={alquiler.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                        <div className="h-64 bg-gradient-to-br from-green-400 to-blue-500">
                            {alquiler.habitacion_fotos && alquiler.habitacion_fotos.length > 0 ? (
                                <img 
                                    src={`/images/${alquiler.habitacion_fotos[0]}`}
                                    alt={alquiler.nombre}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.innerHTML = `
                                            <div class="w-full h-full flex items-center justify-center text-white text-6xl">
                                                ${alquiler.tipo === 'casa_completa' ? '🏠' : '🛏️'}
                                            </div>
                                        `;
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white text-6xl">
                                    {alquiler.tipo === 'casa_completa' ? '🏠' : '🛏️'}
                                </div>
                            )}
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold">{alquiler.nombre}</h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    alquiler.tipo === 'casa_completa' 
                                        ? 'bg-purple-100 text-purple-800' 
                                        : 'bg-blue-100 text-blue-800'
                                }`}>
                                    {alquiler.tipo === 'casa_completa' ? 'Casa Completa' : 'Habitación'}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-4 line-clamp-2">
                                {alquiler.descripcion || 'Alojamiento cómodo con todas las comodidades'}
                            </p>
                            <div className="flex justify-between items-center mb-4">
                                <div className="text-sm text-gray-500">
                                    👥 Hasta {alquiler.capacidad_maxima} personas
                                </div>
                                <div className="text-2xl font-bold text-green-600">
                                    ${parseFloat(alquiler.precio).toLocaleString()}
                                    <span className="text-sm text-gray-500">/noche</span>
                                </div>
                            </div>
                            <Link 
                                to={`/alquileres/${alquiler.id}`}
                                className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
                            >
                                Ver Detalles y Reservar
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {alquileresFiltrados.length === 0 && (
                <div className="text-center text-gray-500 py-12">
                    <p className="text-xl">No hay alojamientos disponibles en esta categoría</p>
                </div>
            )}
        </div>
    );
};

export default Alquileres;