// src/components/ReservaForm.jsx
import React, { useState, useEffect } from 'react';
import { apiClient, paymentAPI } from '../config/api';

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
    const [comprobante, setComprobante] = useState(null);
    const [precioTotal, setPrecioTotal] = useState(0);
    const [diasEstadia, setDiasEstadia] = useState(0);

    // Calcular precio total cuando cambian las fechas o personas
    useEffect(() => {
        console.log('Alquiler data:', alquiler); // Debug
        console.log('Precio por noche:', alquiler.precio_por_noche); // Debug

        if (formData.fecha_entrada && formData.fecha_salida) {
            const entrada = new Date(formData.fecha_entrada);
            const salida = new Date(formData.fecha_salida);
            const dias = Math.ceil((salida - entrada) / (1000 * 60 * 60 * 24));

            if (dias > 0) {
                setDiasEstadia(dias);
                // Usar precio_por_noche o precio como fallback
                const precioPorNoche = alquiler.precio_por_noche || alquiler.precio || 0;
                const total = precioPorNoche * formData.cantidad_personas * dias;
                console.log('Días:', dias, 'Precio por noche:', precioPorNoche, 'Total:', total); // Debug
                setPrecioTotal(total);
            }
        }
    }, [formData.fecha_entrada, formData.fecha_salida, formData.cantidad_personas, alquiler]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validar tamaño (máx 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('El archivo no debe superar los 5MB');
                e.target.value = '';
                return;
            }

            // Validar tipo
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
            if (!validTypes.includes(file.type)) {
                setError('Solo se permiten archivos JPG, PNG o PDF');
                e.target.value = '';
                return;
            }

            setComprobante(file);
            setError('');
        }
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

        // Validar que se haya subido el comprobante
        if (!comprobante) {
            setError('Debes subir el comprobante de pago');
            setLoading(false);
            return;
        }

        try {
            // 1. Crear la reserva
            const response = await apiClient.post('/reservas', formData);

            if (response.success) {
                const reservaId = response.data.id;

                // 2. Subir el comprobante
                try {
                    await paymentAPI.uploadReceipt(reservaId, comprobante);
                    onReservaExitosa(response.data);
                } catch (uploadErr) {
                    console.error('Error al subir comprobante:', uploadErr);
                    setError('Reserva creada pero hubo un error al subir el comprobante. Por favor contactanos.');
                }
            }
        } catch (err) {
            console.error('Error al crear reserva:', err);
            setError(err.message || 'Error al crear la reserva');
        } finally {
            setLoading(false);
        }
    };

    const pago50 = precioTotal * 0.5;

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

                {/* Sección de Pago */}
                {precioTotal > 0 && (
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl border-2 border-green-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <span className="text-3xl mr-2">💰</span>
                            Información de Pago
                        </h3>

                        <div className="bg-white p-4 rounded-xl mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">Estadía:</span>
                                <span className="font-semibold">{diasEstadia} {diasEstadia === 1 ? 'noche' : 'noches'}</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">Precio total:</span>
                                <span className="font-semibold">${precioTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t-2 border-gray-200">
                                <span className="text-lg font-bold text-green-600">Seña (50%):</span>
                                <span className="text-2xl font-bold text-green-600">${pago50.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-xl mb-4 border border-blue-200">
                            <p className="font-semibold text-gray-900 mb-3">Datos para transferencia:</p>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">CBU:</span>
                                    <span className="font-mono font-semibold">4530000800017862828905</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Alias:</span>
                                    <span className="font-semibold">gonzarom</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Banco:</span>
                                    <span className="font-semibold">Naranja X</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2 text-gray-700">
                                Comprobante de pago * (JPG, PNG o PDF - Máx 5MB)
                            </label>
                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png,.pdf"
                                onChange={handleFileChange}
                                required
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                            />
                            {comprobante && (
                                <p className="text-sm text-green-600 mt-2 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Archivo seleccionado: {comprobante.name}
                                </p>
                            )}
                        </div>
                    </div>
                )}

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
                    Al confirmar, recibirás un email con los detalles de tu reserva. El pago será verificado por el administrador.
                </p>
            </form>
        </div>
    );
};

export default ReservaForm;