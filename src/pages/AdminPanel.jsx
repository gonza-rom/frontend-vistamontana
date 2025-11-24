// src/pages/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { apiClient } from '../config/api';

const AdminPanel = () => {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtroEstado, setFiltroEstado] = useState('todos');

    useEffect(() => {
        cargarReservas();
    }, []);

    const cargarReservas = async () => {
        try {
            const response = await apiClient.get('/reservas');
            setReservas(response.data);
        } catch (error) {
            console.error('Error al cargar reservas:', error);
        } finally {
            setLoading(false);
        }
    };

    const actualizarEstado = async (id, nuevoEstado) => {
        try {
            await apiClient.put(`/reservas/${id}`, { estado: nuevoEstado });
            // Recargar reservas
            cargarReservas();
        } catch (error) {
            console.error('Error al actualizar reserva:', error);
            alert('Error al actualizar el estado de la reserva');
        }
    };

    const reservasFiltradas = filtroEstado === 'todos' 
        ? reservas 
        : reservas.filter(r => r.estado === filtroEstado);

    const getEstadoColor = (estado) => {
        switch(estado) {
            case 'pendiente': return 'bg-yellow-100 text-yellow-800';
            case 'confirmada': return 'bg-green-100 text-green-800';
            case 'cancelada': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatearFecha = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    if (loading) {
        return <div className="text-center py-20">Cargando panel...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-2">Panel de Administración</h1>
                <p className="text-gray-600">Gestión de reservas y hospedaje</p>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-3xl mb-2">📋</div>
                    <div className="text-2xl font-bold">{reservas.length}</div>
                    <div className="text-gray-600">Total Reservas</div>
                </div>
                <div className="bg-yellow-50 rounded-lg shadow p-6">
                    <div className="text-3xl mb-2">⏳</div>
                    <div className="text-2xl font-bold">
                        {reservas.filter(r => r.estado === 'pendiente').length}
                    </div>
                    <div className="text-gray-600">Pendientes</div>
                </div>
                <div className="bg-green-50 rounded-lg shadow p-6">
                    <div className="text-3xl mb-2">✓</div>
                    <div className="text-2xl font-bold">
                        {reservas.filter(r => r.estado === 'confirmada').length}
                    </div>
                    <div className="text-gray-600">Confirmadas</div>
                </div>
                <div className="bg-red-50 rounded-lg shadow p-6">
                    <div className="text-3xl mb-2">✗</div>
                    <div className="text-2xl font-bold">
                        {reservas.filter(r => r.estado === 'cancelada').length}
                    </div>
                    <div className="text-gray-600">Canceladas</div>
                </div>
            </div>

            {/* Filtros */}
            <div className="mb-6">
                <div className="flex space-x-3">
                    <button
                        onClick={() => setFiltroEstado('todos')}
                        className={`px-4 py-2 rounded-lg ${
                            filtroEstado === 'todos' 
                                ? 'bg-green-600 text-white' 
                                : 'bg-gray-200 text-gray-700'
                        }`}
                    >
                        Todas
                    </button>
                    <button
                        onClick={() => setFiltroEstado('pendiente')}
                        className={`px-4 py-2 rounded-lg ${
                            filtroEstado === 'pendiente' 
                                ? 'bg-yellow-600 text-white' 
                                : 'bg-gray-200 text-gray-700'
                        }`}
                    >
                        Pendientes
                    </button>
                    <button
                        onClick={() => setFiltroEstado('confirmada')}
                        className={`px-4 py-2 rounded-lg ${
                            filtroEstado === 'confirmada' 
                                ? 'bg-green-600 text-white' 
                                : 'bg-gray-200 text-gray-700'
                        }`}
                    >
                        Confirmadas
                    </button>
                    <button
                        onClick={() => setFiltroEstado('cancelada')}
                        className={`px-4 py-2 rounded-lg ${
                            filtroEstado === 'cancelada' 
                                ? 'bg-red-600 text-white' 
                                : 'bg-gray-200 text-gray-700'
                        }`}
                    >
                        Canceladas
                    </button>
                </div>
            </div>

            {/* Tabla de reservas */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Alojamiento</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fechas</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Personas</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {reservasFiltradas.map(reserva => (
                                <tr key={reserva.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm">#{reserva.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium">{reserva.nombre_cliente}</div>
                                        <div className="text-sm text-gray-500">{reserva.email_cliente}</div>
                                        {reserva.telefono_cliente && (
                                            <div className="text-sm text-gray-500">{reserva.telefono_cliente}</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm">{reserva.alquiler_nombre}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <div>{formatearFecha(reserva.fecha_entrada)}</div>
                                        <div>{formatearFecha(reserva.fecha_salida)}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm">{reserva.cantidad_personas}</td>
                                    <td className="px-6 py-4 text-sm font-semibold">
                                        ${reserva.total.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEstadoColor(reserva.estado)}`}>
                                            {reserva.estado}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm space-x-2">
                                        {reserva.estado === 'pendiente' && (
                                            <>
                                                <button
                                                    onClick={() => actualizarEstado(reserva.id, 'confirmada')}
                                                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                                >
                                                    Confirmar
                                                </button>
                                                <button
                                                    onClick={() => actualizarEstado(reserva.id, 'cancelada')}
                                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                                >
                                                    Cancelar
                                                </button>
                                            </>
                                        )}
                                        {reserva.estado === 'confirmada' && (
                                            <button
                                                onClick={() => actualizarEstado(reserva.id, 'cancelada')}
                                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                            >
                                                Cancelar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {reservasFiltradas.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No hay reservas {filtroEstado !== 'todos' && `en estado "${filtroEstado}"`}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;