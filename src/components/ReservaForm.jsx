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
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Hacer una Reserva</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Nombre completo *</label>
                        <input
                            type="text"
                            name="nombre_cliente"
                            value={formData.nombre_cliente}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <input
                            type="email"
                            name="email_cliente"
                            value={formData.email_cliente}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Teléfono</label>
                        <input
                            type="tel"
                            name="telefono_cliente"
                            value={formData.telefono_cliente}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-2">Cantidad de personas *</label>
                        <input
                            type="number"
                            name="cantidad_personas"
                            value={formData.cantidad_personas}
                            onChange={handleChange}
                            min="1"
                            max={alquiler.capacidad_maxima}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Fecha de entrada *</label>
                        <input
                            type="date"
                            name="fecha_entrada"
                            value={formData.fecha_entrada}
                            onChange={handleChange}
                            onBlur={verificarDisponibilidad}
                            required
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium mb-2">Fecha de salida *</label>
                        <input
                            type="date"
                            name="fecha_salida"
                            value={formData.fecha_salida}
                            onChange={handleChange}
                            onBlur={verificarDisponibilidad}
                            required
                            min={formData.fecha_entrada || new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Comentarios adicionales</label>
                    <textarea
                        name="notas"
                        value={formData.notas}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        placeholder="Dejanos saber si tenés algún requerimiento especial..."
                    ></textarea>
                </div>

                {verificando && (
                    <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
                        ⏳ Verificando disponibilidad...
                    </div>
                )}

                {disponible === true && !verificando && (
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                        ✓ Fechas disponibles
                    </div>
                )}

                {error && (
                    <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading || disponible === false || verificando}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
                >
                    {loading ? 'Procesando...' : 'Confirmar Reserva'}
                </button>

                <p className="text-sm text-gray-500 text-center">
                    Al confirmar, recibirás un email con los detalles de tu reserva
                </p>
            </form>
        </div>
    );
};

export default ReservaForm;