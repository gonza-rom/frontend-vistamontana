// src/pages/Admin.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { paymentAPI } from '../config/api';

const Admin = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedReserva, setSelectedReserva] = useState(null);

    useEffect(() => {
        cargarReservasPendientes();
    }, []);

    const cargarReservasPendientes = async () => {
        try {
            setLoading(true);
            const response = await paymentAPI.getPending();
            setReservas(response.data || []);
            setError('');
        } catch (err) {
            setError('Error al cargar reservas pendientes');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleVerificarPago = async (reservaId) => {
        if (!confirm('¿Confirmar que el pago fue verificado?')) return;

        try {
            await paymentAPI.verifyPayment(reservaId);
            alert('Pago verificado exitosamente');
            cargarReservasPendientes(); // Recargar lista
        } catch (err) {
            alert('Error al verificar pago: ' + err.message);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
                <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-6">
                        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-t-transparent animate-spin" style={{ borderTopColor: 'var(--color-sierra)' }}></div>
                    </div>
                    <p className="text-gray-600 text-lg font-medium">Cargando...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16">
            {/* Header */}
            <div className="bg-white shadow-md border-b border-gray-200">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
                            <p className="text-gray-600 mt-1">Bienvenido, {user?.username}</p>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/')}
                                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
                            >
                                Ver Sitio
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all duration-300"
                            >
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-yellow-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 font-medium">Pagos Pendientes</p>
                                <p className="text-4xl font-bold text-gray-900 mt-2">{reservas.length}</p>
                            </div>
                            <div className="text-5xl">⏳</div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 font-medium">Total a Verificar</p>
                                <p className="text-4xl font-bold text-gray-900 mt-2">
                                    ${reservas.reduce((sum, r) => sum + (parseFloat(r.precio_total || 0) * 0.5), 0).toLocaleString('es-AR')}
                                </p>
                            </div>
                            <div className="text-5xl">💰</div>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 font-medium">Reservas Totales</p>
                                <p className="text-4xl font-bold text-gray-900 mt-2">{reservas.length}</p>
                            </div>
                            <div className="text-5xl">📋</div>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
                        <p className="text-red-700 font-medium">{error}</p>
                    </div>
                )}

                {/* Reservas List */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900">Reservas Pendientes de Verificación</h2>
                    </div>

                    {reservas.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="text-8xl mb-4">✅</div>
                            <p className="text-xl text-gray-500 font-medium">No hay pagos pendientes de verificación</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {reservas.map((reserva) => (
                                <div key={reserva.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <h3 className="text-xl font-bold text-gray-900">
                                                    {reserva.nombre_cliente}
                                                </h3>
                                                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                                                    Pendiente
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                <div>
                                                    <p className="text-gray-500">Email</p>
                                                    <p className="font-medium text-gray-900">{reserva.email}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Teléfono</p>
                                                    <p className="font-medium text-gray-900">{reserva.telefono}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Check-in</p>
                                                    <p className="font-medium text-gray-900">{reserva.fecha_entrada || reserva.fecha_checkin || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Check-out</p>
                                                    <p className="font-medium text-gray-900">{reserva.fecha_salida || reserva.fecha_checkout || 'N/A'}</p>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex items-center gap-6">
                                                <div>
                                                    <p className="text-gray-500 text-sm">Total</p>
                                                    <p className="text-2xl font-bold text-gray-900">
                                                        ${reserva.precio_total ? parseFloat(reserva.precio_total).toLocaleString('es-AR') : '0'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500 text-sm">50% a Verificar</p>
                                                    <p className="text-2xl font-bold text-green-600">
                                                        ${reserva.precio_total ? (parseFloat(reserva.precio_total) * 0.5).toLocaleString('es-AR') : '0'}
                                                    </p>
                                                </div>
                                            </div>

                                            {reserva.comprobante_url && (
                                                <div className="mt-4">
                                                    <a
                                                        href={`https://vistamontana.free.nf/backendVistaMontana/${reserva.comprobante_url}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                        Ver Comprobante
                                                    </a>
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => handleVerificarPago(reserva.id)}
                                            className="px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 hover:scale-105"
                                        >
                                            ✓ Verificar Pago
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Admin;
