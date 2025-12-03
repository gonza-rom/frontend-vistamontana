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
    const [reservasOcupadas, setReservasOcupadas] = useState([]);
    const [imagenSeleccionada, setImagenSeleccionada] = useState(0);

    useEffect(() => {
        cargarAlquiler();
    }, [id]);

    useEffect(() => {
        if (alquiler) {
            cargarReservas();
        }
    }, [alquiler]);

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

    const cargarReservas = async () => {
        try {
            const response = await apiClient.get('/reservas');
            const todasLasReservas = response.data;

            let reservasFiltradas = todasLasReservas.filter(
                r => r.alquiler_id === id && r.estado === 'confirmada'
            );

            if (alquiler && alquiler.tipo === 'habitacion') {
                const alquileresResponse = await apiClient.get('/alquileres');
                const casaCompleta = alquileresResponse.data.find(a => a.tipo === 'casa_completa');

                if (casaCompleta) {
                    const reservasCasaCompleta = todasLasReservas.filter(
                        r => r.alquiler_id === casaCompleta.id && r.estado === 'confirmada'
                    );
                    reservasFiltradas = [...reservasFiltradas, ...reservasCasaCompleta];
                }
            }

            setReservasOcupadas(reservasFiltradas);
        } catch (error) {
            console.error('Error al cargar reservas:', error);
        }
    };

    const handleReservaExitosa = (data) => {
        setReservaExitosa(true);
        setTimeout(() => {
            navigate('/');
        }, 3000);
    };

    const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-AR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-32 min-h-screen">
                <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-6">
                        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin"
                            style={{ borderTopColor: 'var(--color-sierra)' }}></div>
                    </div>
                    <p className="text-gray-600 text-lg font-medium">Cargando detalles...</p>
                </div>
            </div>
        );
    }

    if (!alquiler) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
                <div className="text-center p-8">
                    <div className="text-8xl mb-6">🏔️</div>
                    <h2 className="text-3xl font-bold mb-6 text-gray-900">Alojamiento no encontrado</h2>
                    <button
                        onClick={() => navigate('/alquileres')}
                        className="px-8 py-3 gradient-sierra text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover-glow"
                    >
                        Volver a alojamientos
                    </button>
                </div>
            </div>
        );
    }

    if (reservaExitosa) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4 py-20 text-center">
                    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-12 animate-scale-in">
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full gradient-sierra flex items-center justify-center">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-4xl font-bold mb-4 text-gradient-sierra">¡Reserva Exitosa!</h2>
                        <p className="text-lg text-gray-700 mb-6">
                            Tu reserva ha sido recibida. Te enviaremos un email de confirmación a la brevedad.
                        </p>
                        <div className="flex items-center justify-center text-gray-500">
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-green-600 mr-3"></div>
                            <p className="text-sm">Serás redirigido automáticamente...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const fotos = alquiler.tipo === 'casa_completa'
        ? ['quincho-2.jpg', 'patio-5.jpg', 'patio-6.jpg', 'habitacion-1.jpg', 'habitacion-2.jpg', 'habitacion-3.jpg']
        : (alquiler.habitacion_fotos || []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16">
            <div className="container mx-auto px-4 py-8">
                <button onClick={() => navigate('/alquileres')} className="mb-8 flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-300 group">
                    <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-medium">Volver a alojamientos</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="animate-slide-up">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">{alquiler.nombre}</h1>
                            <div className="flex flex-wrap items-center gap-4 mb-6">
                                <span className={`px-5 py-2 rounded-full font-semibold shadow-md ${alquiler.tipo === 'casa_completa' ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'}`}>
                                    {alquiler.tipo === 'casa_completa' ? '🏠 Casa Completa' : '🛏️ Habitación'}
                                </span>
                                <span className="flex items-center text-gray-700 font-medium">
                                    <span className="text-2xl mr-2">👥</span>
                                    Hasta {alquiler.capacidad_maxima} personas
                                </span>
                            </div>
                            <div className="inline-block bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-2xl px-8 py-4 mb-8">
                                <div className="text-4xl font-bold text-gradient-sierra">${parseFloat(alquiler.precio).toLocaleString()}</div>
                                <div className="text-sm text-gray-600 font-medium">por noche</div>
                            </div>
                        </div>

                        {fotos.length > 0 && (
                            <div className="animate-slide-up stagger-1">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-4 group">
                                    <img src={`/${fotos[imagenSeleccionada]}`} alt={`${alquiler.nombre} - Foto principal`} className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105" onError={(e) => { e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%234A8B5C" width="800" height="400"/%3E%3Ctext fill="white" font-size="48" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E🏔️%3C/text%3E%3C/svg%3E'; }} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                {fotos.length > 1 && (
                                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                                        {fotos.map((foto, index) => (
                                            <button key={index} onClick={() => setImagenSeleccionada(index)} className={`relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 ${imagenSeleccionada === index ? 'ring-4 ring-green-500 shadow-lg' : 'opacity-70 hover:opacity-100'}`}>
                                                <img src={`/${foto}`} alt={`Miniatura ${index + 1}`} className="w-full h-20 object-cover" onError={(e) => e.target.style.display = 'none'} />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Amenities Section */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 animate-slide-up stagger-2">
                            <h2 className="text-2xl font-bold mb-6 flex items-center">
                                <span className="text-3xl mr-3">✨</span>
                                Características y Comodidades
                            </h2>

                            {alquiler.tipo === 'casa_completa' ? (
                                <div className="space-y-6">
                                    {/* Video */}
                                    <div className="mb-6">
                                        <video controls className="w-full rounded-xl shadow-lg" poster="/patio-6.jpg">
                                            <source src="/casa-completa-vid.mp4" type="video/mp4" />
                                            Tu navegador no soporta videos HTML5.
                                        </video>
                                    </div>

                                    <div className="border-l-4 border-purple-500 pl-4">
                                        <h3 className="font-bold text-lg mb-3 flex items-center"><span className="text-2xl mr-2">🛏️</span>3 Habitaciones Acogedoras</h3>
                                        <ul className="space-y-2 text-gray-700">
                                            <li className="flex items-start"><span className="mr-2">•</span><span>5 camas individuales</span></li>
                                            <li className="flex items-start"><span className="mr-2">•</span><span>2 camas dobles</span></li>
                                        </ul>
                                    </div>

                                    <div className="border-l-4 border-orange-500 pl-4">
                                        <h3 className="font-bold text-lg mb-3 flex items-center"><span className="text-2xl mr-2">🍳</span>Cocina Totalmente Equipada</h3>
                                        <ul className="space-y-2 text-gray-700">
                                            <li className="flex items-start"><span className="mr-2">•</span><span>Horno, vasos, platos y cubiertos</span></li>
                                            <li className="flex items-start"><span className="mr-2">•</span><span>Utensilios completos de cocina</span></li>
                                        </ul>
                                    </div>

                                    <div className="border-l-4 border-blue-500 pl-4">
                                        <h3 className="font-bold text-lg mb-3 flex items-center"><span className="text-2xl mr-2">📺</span>Sala de Estar</h3>
                                        <ul className="space-y-2 text-gray-700">
                                            <li className="flex items-start"><span className="mr-2">•</span><span>Mesa, sillas y TV con DirecTV</span></li>
                                        </ul>
                                    </div>

                                    <div className="border-l-4 border-red-500 pl-4">
                                        <h3 className="font-bold text-lg mb-3 flex items-center"><span className="text-2xl mr-2">🔥</span>Quincho Contiguo</h3>
                                        <ul className="space-y-2 text-gray-700">
                                            <li className="flex items-start"><span className="mr-2">•</span><span>Parrilla con mesada</span></li>
                                            <li className="flex items-start"><span className="mr-2">•</span><span>Grifo y bacha para mayor comodidad</span></li>
                                        </ul>
                                    </div>

                                    <div className="border-l-4 border-cyan-500 pl-4">
                                        <h3 className="font-bold text-lg mb-3 flex items-center"><span className="text-2xl mr-2">🚿</span>2 Baños Completos</h3>
                                        <ul className="space-y-2 text-gray-700">
                                            <li className="flex items-start"><span className="mr-2">•</span><span>Agua caliente con tanque</span></li>
                                        </ul>
                                    </div>

                                    <div className="border-l-4 border-green-500 pl-4">
                                        <h3 className="font-bold text-lg mb-3 flex items-center"><span className="text-2xl mr-2">🌟</span>Extras</h3>
                                        <ul className="space-y-2 text-gray-700">
                                            <li className="flex items-start"><span className="mr-2">•</span><span><strong>WiFi Starlink</strong> - Internet de alta velocidad</span></li>
                                            <li className="flex items-start"><span className="mr-2">•</span><span>Galpón de chapa para disfrutar de la lluvia</span></li>
                                        </ul>
                                    </div>

                                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200">
                                        <h3 className="font-bold text-lg mb-4 flex items-center text-green-800"><span className="text-2xl mr-2">💵</span>Precio de Alojamiento</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-700">Por persona (noche):</span>
                                                <span className="font-bold text-2xl text-green-700">$15.000</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {alquiler.nombre && alquiler.nombre.toLowerCase().includes('montaña') && (
                                        <div className="border-l-4 border-purple-500 pl-4">
                                            <h3 className="font-bold text-lg mb-3 flex items-center"><span className="text-2xl mr-2">🏔️</span>Habitación Montaña</h3>
                                            <ul className="space-y-2 text-gray-700">
                                                <li className="flex items-start"><span className="mr-2">•</span><span>Armario para guardar tus pertenencias</span></li>
                                                <li className="flex items-start"><span className="mr-2">•</span><span>Mesa de luz</span></li>
                                            </ul>
                                        </div>
                                    )}

                                    <div className="border-l-4 border-green-500 pl-4">
                                        <h3 className="font-bold text-lg mb-3 flex items-center"><span className="text-2xl mr-2">✨</span>Acceso a Áreas Comunes</h3>
                                        <ul className="space-y-2 text-gray-700">
                                            <li className="flex items-start"><span className="mr-2">•</span><span><strong>WiFi Starlink</strong> - Internet de alta velocidad</span></li>
                                            <li className="flex items-start"><span className="mr-2">•</span><span>Cocina equipada completa</span></li>
                                            <li className="flex items-start"><span className="mr-2">•</span><span>Sala de estar con TV DirecTV</span></li>
                                            <li className="flex items-start"><span className="mr-2">•</span><span>Quincho con parrilla</span></li>
                                            <li className="flex items-start"><span className="mr-2">•</span><span>Baños con agua caliente</span></li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg p-8 animate-slide-up stagger-2">
                            <h2 className="text-2xl font-bold mb-4 flex items-center">
                                <span className="text-3xl mr-3">📝</span>
                                Descripción
                            </h2>
                            <p className="text-gray-700 leading-relaxed text-lg">
                                {alquiler.descripcion || alquiler.habitacion_descripcion || 'Alojamiento cómodo con todas las comodidades necesarias para una estadía placentera.'}
                            </p>
                        </div>

                        {reservasOcupadas.length > 0 && (
                            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-8 shadow-lg animate-slide-up stagger-3">
                                <h3 className="text-2xl font-bold mb-6 flex items-center text-yellow-900">
                                    <span className="text-3xl mr-3">📅</span>
                                    Fechas No Disponibles
                                </h3>
                                <div className="space-y-3">
                                    {reservasOcupadas.map((reserva) => (
                                        <div key={reserva.id} className="flex items-center bg-white bg-opacity-60 rounded-lg p-3">
                                            <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3 flex-shrink-0"></span>
                                            <span className="text-gray-800 font-medium">
                                                {formatearFecha(reserva.fecha_entrada)} - {formatearFecha(reserva.fecha_salida)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm text-gray-600 mt-4 italic">
                                    * Estas fechas ya están reservadas. Por favor, seleccioná otras fechas para tu estadía.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-24 animate-slide-up stagger-2">
                            <ReservaForm alquiler={alquiler} onReservaExitosa={handleReservaExitosa} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlquilerDetalle;