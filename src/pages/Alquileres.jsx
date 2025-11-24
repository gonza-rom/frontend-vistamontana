// src/pages/Alquileres.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../config/api';

const Alquileres = () => {
    const [alquileres, setAlquileres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tipoFiltro, setTipoFiltro] = useState('todos');

    useEffect(() => {
        cargarAlquileres();
    }, []);

    const cargarAlquileres = async () => {
        try {
            const response = await apiClient.get('/alquileres');
            setAlquileres(response.data);
        } catch (error) {
            console.error('Error al cargar alquileres:', error);
        } finally {
            setLoading(false);
        }
    };

    const alquileresFiltrados = tipoFiltro === 'todos' 
        ? alquileres 
        : alquileres.filter(a => a.tipo === tipoFiltro);

    if (loading) {
        return <div className="text-center py-20">Cargando...</div>;
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
                    className={`px-6 py-2 rounded-lg ${
                        tipoFiltro === 'todos' 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    Todos
                </button>
                <button
                    onClick={() => setTipoFiltro('habitacion')}
                    className={`px-6 py-2 rounded-lg ${
                        tipoFiltro === 'habitacion' 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    Habitaciones
                </button>
                <button
                    onClick={() => setTipoFiltro('casa_completa')}
                    className={`px-6 py-2 rounded-lg ${
                        tipoFiltro === 'casa_completa' 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    Casa Completa
                </button>
            </div>

            {/* Grid de alquileres */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {alquileresFiltrados.map(alquiler => (
                    <div key={alquiler.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                        <div className="h-64 bg-gray-300">
                            {alquiler.habitacion_fotos && alquiler.habitacion_fotos.length > 0 ? (
                                <img 
                                    src={`/images/${alquiler.habitacion_fotos[0]}`}
                                    alt={alquiler.nombre}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500">
                                    Sin imagen
                                </div>
                            )}
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold">{alquiler.nombre}</h3>
                                <span className={`px-3 py-1 rounded-full text-sm ${
                                    alquiler.tipo === 'casa_completa' 
                                        ? 'bg-purple-100 text-purple-800' 
                                        : 'bg-blue-100 text-blue-800'
                                }`}>
                                    {alquiler.tipo === 'casa_completa' ? 'Casa Completa' : 'Habitación'}
                                </span>
                            </div>
                            <p className="text-gray-600 mb-4">
                                {alquiler.descripcion || alquiler.habitacion_descripcion}
                            </p>
                            <div className="flex justify-between items-center mb-4">
                                <div className="text-sm text-gray-500">
                                    👥 Hasta {alquiler.capacidad_maxima} personas
                                </div>
                                <div className="text-2xl font-bold text-green-600">
                                    ${alquiler.precio.toLocaleString()}
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
                    No hay alojamientos disponibles en esta categoría
                </div>
            )}
        </div>
    );
};

export default Alquileres;