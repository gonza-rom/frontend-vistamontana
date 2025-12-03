// src/components/ReservaForm.jsx
import React, { useState } from 'react';
import { apiClient } from '../config/api';

const ReservaForm = ({ alquiler, onReservaExitosa }) => {
    const [formData, setFormData] = useState({
        alquiler_id: alquiler.id,
        nombre_cliente: '',
        email_cliente: '',
        telefono_cliente: '',
        fecha_entrada: '',
        fecha_salida: '',
        cantidad_personas: 1,
        notas: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [disponible, setDisponible] = useState(null);
    const [verificando, setVerificando] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const verificarDisponibilidad = async () => {
        if (!formData.fecha_entrada || !formData.fecha_salida) {
            return;
        }

        setVerificando(true);
        try {
            const response = await apiClient.post('/reservas/disponibilidad', {
                alquiler_id: formData.alquiler_id,
                fecha_entrada: formData.fecha_entrada,
                fecha_salida: formData.fecha_salida
            });

            setDisponible(response.data.disponible);
            if (!response.data.disponible) {
                setError('Las fechas seleccionadas no están disponibles');
            } else {
                setError('');
            }
        } catch (err) {
            console.error('Error al verificar disponibilidad:', err);
            setError('Error al verificar disponibilidad');
        } finally {
            setVerificando(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await apiClient.post('/reservas', formData);

            if (response.success) {
                onReservaExitosa(response.data);
            }
        } catch (err) {
            console.error('Error al crear reserva:', err);
            setError(err.message || 'Error al crear la reserva');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            <h2 className="text-3xl font-bold mb-8 text-gradient-sierra flex items-center">
                <span className="text-4xl mr-3">📅</span>
                Hacer una Reserva
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Nombre completo *
                        </label>
                        <input
                            type="text"
                            name="nombre_cliente"
                            value={formData.nombre_cliente}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                            placeholder="Juan Pérez"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Email *
                        </label>
                        <input
                            type="email"
                            name="email_cliente"
                            value={formData.email_cliente}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                            placeholder="juan@ejemplo.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Teléfono
                        </label>
                        <input
                            type="tel"
                            name="telefono_cliente"
                            value={formData.telefono_cliente}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                            placeholder="+54 9 11 1234-5678"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Cantidad de personas *
                        </label>
                        <input
                            type="number"
                            name="cantidad_personas"
                            value={formData.cantidad_personas}
                            onChange={handleChange}
                            min="1"
                            max={alquiler.capacidad_maxima}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Máximo: {alquiler.capacidad_maxima} personas
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Fecha de entrada *
                        </label>
                        <input
                            type="date"
                            name="fecha_entrada"
                            value={formData.fecha_entrada}
                            onChange={handleChange}
                            onBlur={verificarDisponibilidad}
                            required
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Fecha de salida *
                        </label>
                        <input
                            type="date"
                            name="fecha_salida"
                            value={formData.fecha_salida}
                            onChange={handleChange}
                            onBlur={verificarDisponibilidad}
                            required
                            min={formData.fecha_entrada || new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Comentarios adicionales
                    </label>
                    <textarea
                        name="notas"
                        value={formData.notas}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Dejanos saber si tenés algún requerimiento especial..."
                    ></textarea>
                </div>

                {verificando && (
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 text-blue-800 px-5 py-4 rounded-xl flex items-center animate-pulse">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent mr-3"></div>
                        <span className="font-medium">Verificando disponibilidad...</span>
                    </div>
                )}

                {disponible === true && !verificando && (
                    <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 text-green-800 px-5 py-4 rounded-xl flex items-center animate-slide-up">
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-medium">¡Fechas disponibles!</span>
                    </div>
                )}

                {error && (
                    <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 text-red-800 px-5 py-4 rounded-xl flex items-center animate-slide-up">
                        <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">{error}</span>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading || disponible === false || verificando}
                    className="w-full gradient-sierra text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                            Procesando...
                        </>
                    ) : (
                        <>
                            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Confirmar Reserva
                        </>
                    )}
                </button>

                <p className="text-sm text-gray-500 text-center leading-relaxed">
                    Al confirmar, recibirás un email con los detalles de tu reserva
                </p>
            </form>
        </div>
    );
};

export default ReservaForm;