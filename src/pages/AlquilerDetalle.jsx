// src/pages/AlquilerDetalle.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiClient } from '../config/api';
import ReservaForm from '../components/ReservaForm';

const AlquilerDetalle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [alquiler, setAlquiler] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reservaExitosa, setReservaExitosa] = useState(false);

    useEffect(() => {
        cargarAlquiler();
    }, [id]);

    const cargarAlquiler = async () => {
        try {
            const response = await apiClient.get(`/alquileres/${id}`);
            setAlquiler(response.data);
        } catch (error) {
            console.error('Error al cargar alquiler:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReservaExitosa = (data) => {
        setReservaExitosa(true);
        setTimeout(() => {
            navigate('/');
        }, 3000);
    };

    if (loading) {
        return <div className="text-center py-20">Cargando...</div>;
    }

    if (!alquiler) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Alojamiento no encontrado</h2>
                <button onClick={() => navigate('/alquileres')} className="text-green-600">
                    Volver a alojamientos
                </button>
            </div>
        );
    }

    if (reservaExitosa) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <div className="bg-green-100 text-green-800 p-8 rounded-lg max-w-2xl mx-auto">
                    <div className="text-6xl mb-4">✓</div>
                    <h2 className="text-3xl font-bold mb-4">¡Reserva Exitosa!</h2>
                    <p className="text-lg mb-4">
                        Tu reserva ha sido recibida. Te enviaremos un email de confirmación 
                        a la brevedad.
                    </p>
                    <p className="text-sm text-gray-600">
                        Serás redirigido automáticamente...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <button 
                onClick={() => navigate('/alquileres')}
                className="mb-6 text-green-600 hover:text-green-700"
            >
                ← Volver a alojamientos
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Información del alquiler */}
                <div>
                    <h1 className="text-4xl font-bold mb-4">{alquiler.nombre}</h1>
                    
                    <div className="flex items-center space-x-4 mb-6">
                        <span className={`px-4 py-2 rounded-full ${
                            alquiler.tipo === 'casa_completa' 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-blue-100 text-blue-800'
                        }`}>
                            {alquiler.tipo === 'casa_completa' ? 'Casa Completa' : 'Habitación'}
                        </span>
                        <span className="text-gray-600">
                            👥 Capacidad: {alquiler.capacidad_maxima} personas
                        </span>
                    </div>

                    <div className="text-3xl font-bold text-green-600 mb-6">
                        ${alquiler.precio.toLocaleString()}
                        <span className="text-lg text-gray-500"> / noche</span>
                    </div>

                    <div className="prose max-w-none mb-8">
                        <p className="text-gray-700 leading-relaxed">
                            {alquiler.descripcion || alquiler.habitacion_descripcion}
                        </p>
                    </div>

                    {/* Galería de fotos */}
                    {alquiler.habitacion_fotos && alquiler.habitacion_fotos.length > 0 && (
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {alquiler.habitacion_fotos.map((foto, index) => (
                                <img 
                                    key={index}
                                    src={`/images/${foto}`}
                                    alt={`${alquiler.nombre} - Foto ${index + 1}`}
                                    className="rounded-lg w-full h-48 object-cover"
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Formulario de reserva */}
                <div>
                    <ReservaForm 
                        alquiler={alquiler} 
                        onReservaExitosa={handleReservaExitosa}
                    />
                </div>
            </div>
        </div>
    );
};

export default AlquilerDetalle;