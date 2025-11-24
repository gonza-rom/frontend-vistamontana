// src/pages/Turismo.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { apiClient } from '../config/api';
import L from 'leaflet';

// Fix para los iconos de Leaflet en React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Iconos personalizados por tipo
const getIconByType = (tipo) => {
    const iconColors = {
        cascada: '🌊',
        mirador: '👁️',
        sendero: '🥾',
        cumbre: '⛰️',
        rio: '💧',
        otro: '📍'
    };
    
    return L.divIcon({
        html: `<div style="font-size: 24px;">${iconColors[tipo] || iconColors.otro}</div>`,
        className: 'custom-marker',
        iconSize: [30, 30]
    });
};

const Turismo = () => {
    const [lugares, setLugares] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tipoFiltro, setTipoFiltro] = useState('todos');
    const [lugarSeleccionado, setLugarSeleccionado] = useState(null);

    // Centro del mapa (Balcozna, Catamarca)
    const centro = [-27.864023893909792, -65.72607652939269];

    useEffect(() => {
        cargarLugares();
    }, []);

    const cargarLugares = async () => {
        try {
            const response = await apiClient.get('/lugares');
            setLugares(response.data);
        } catch (error) {
            console.error('Error al cargar lugares:', error);
        } finally {
            setLoading(false);
        }
    };

    const lugaresFiltrados = tipoFiltro === 'todos' 
        ? lugares 
        : lugares.filter(l => l.tipo === tipoFiltro);

    const tiposUnicos = [...new Set(lugares.map(l => l.tipo))];

    const getDificultadColor = (dificultad) => {
        switch(dificultad) {
            case 'facil': return 'bg-green-100 text-green-800';
            case 'moderado': return 'bg-yellow-100 text-yellow-800';
            case 'dificil': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getDificultadText = (dificultad) => {
        switch(dificultad) {
            case 'facil': return 'Fácil';
            case 'moderado': return 'Moderado';
            case 'dificil': return 'Difícil';
            default: return dificultad;
        }
    };

    if (loading) {
        return <div className="text-center py-20">Cargando lugares turísticos...</div>;
    }

    return (
        <div>
            {/* Header */}
            <div className="bg-green-700 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4">
                        Lugares para Visitar
                    </h1>
                    <p className="text-xl">
                        Descubrí los tesoros naturales de Balcozna y sus alrededores
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Filtros */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4">Filtrar por tipo:</h3>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setTipoFiltro('todos')}
                            className={`px-4 py-2 rounded-lg transition ${
                                tipoFiltro === 'todos' 
                                    ? 'bg-green-600 text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            Todos
                        </button>
                        {tiposUnicos.map(tipo => (
                            <button
                                key={tipo}
                                onClick={() => setTipoFiltro(tipo)}
                                className={`px-4 py-2 rounded-lg transition capitalize ${
                                    tipoFiltro === tipo 
                                        ? 'bg-green-600 text-white' 
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {tipo}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mapa */}
                <div className="mb-12">
                    <h2 className="text-3xl font-bold mb-6">Mapa de Atractivos</h2>
                    <div className="rounded-lg overflow-hidden shadow-lg" style={{ height: '500px' }}>
                        <MapContainer 
                            center={centro} 
                            zoom={12} 
                            style={{ height: '100%', width: '100%' }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            
                            {/* Marker del hospedaje */}
                            <Marker position={centro}>
                                <Popup>
                                    <div className="text-center">
                                        <strong className="text-lg">🏠 Hospedaje Vista Montaña</strong>
                                        <p className="text-sm">Tu punto de partida</p>
                                    </div>
                                </Popup>
                            </Marker>

                            {/* Markers de lugares turísticos */}
                            {lugaresFiltrados.map(lugar => (
                                <Marker 
                                    key={lugar.id}
                                    position={[parseFloat(lugar.latitud), parseFloat(lugar.longitud)]}
                                    icon={getIconByType(lugar.tipo)}
                                    eventHandlers={{
                                        click: () => setLugarSeleccionado(lugar)
                                    }}
                                >
                                    <Popup>
                                        <div className="max-w-xs">
                                            <h3 className="font-bold text-lg mb-2">{lugar.nombre}</h3>
                                            <p className="text-sm text-gray-600 mb-2">
                                                {lugar.descripcion.substring(0, 100)}...
                                            </p>
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                    📍 {lugar.distancia_km} km
                                                </span>
                                                <span className={`px-2 py-1 rounded ${getDificultadColor(lugar.dificultad)}`}>
                                                    {getDificultadText(lugar.dificultad)}
                                                </span>
                                            </div>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </div>

                {/* Listado de lugares */}
                <div>
                    <h2 className="text-3xl font-bold mb-6">Atractivos Turísticos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {lugaresFiltrados.map(lugar => (
                            <div 
                                key={lugar.id} 
                                className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer ${
                                    lugarSeleccionado?.id === lugar.id ? 'ring-4 ring-green-500' : ''
                                }`}
                                onClick={() => setLugarSeleccionado(lugar)}
                            >
                                <div className="h-56 bg-gray-300">
                                    {lugar.imagen ? (
                                        <img 
                                            src={`/images/${lugar.imagen}`}
                                            alt={lugar.nombre}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-6xl">
                                            {lugar.tipo === 'cascada' && '🌊'}
                                            {lugar.tipo === 'mirador' && '👁️'}
                                            {lugar.tipo === 'sendero' && '🥾'}
                                            {lugar.tipo === 'cumbre' && '⛰️'}
                                            {lugar.tipo === 'rio' && '💧'}
                                            {!['cascada', 'mirador', 'sendero', 'cumbre', 'rio'].includes(lugar.tipo) && '📍'}
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-2xl font-bold">{lugar.nombre}</h3>
                                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm capitalize">
                                            {lugar.tipo}
                                        </span>
                                    </div>
                                    
                                    <p className="text-gray-600 mb-4 leading-relaxed">
                                        {lugar.descripcion}
                                    </p>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center text-gray-700">
                                            <span className="mr-2">📍</span>
                                            <span><strong>Distancia:</strong> {lugar.distancia_km} km del hospedaje</span>
                                        </div>
                                        
                                        {lugar.duracion_visita && (
                                            <div className="flex items-center text-gray-700">
                                                <span className="mr-2">⏱️</span>
                                                <span><strong>Duración:</strong> {lugar.duracion_visita}</span>
                                            </div>
                                        )}

                                        <div className="flex items-center">
                                            <span className="mr-2">🎯</span>
                                            <span className={`px-3 py-1 rounded-full text-sm ${getDificultadColor(lugar.dificultad)}`}>
                                                <strong>Dificultad:</strong> {getDificultadText(lugar.dificultad)}
                                            </span>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(`https://www.google.com/maps/dir/?api=1&destination=${lugar.latitud},${lugar.longitud}`, '_blank');
                                        }}
                                        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                                    >
                                        Cómo llegar 🗺️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {lugaresFiltrados.length === 0 && (
                    <div className="text-center text-gray-500 py-12">
                        No hay lugares turísticos de este tipo
                    </div>
                )}

                {/* Información adicional */}
                <div className="mt-16 bg-blue-50 rounded-lg p-8">
                    <h3 className="text-2xl font-bold mb-4">Consejos para tu visita</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-bold mb-2">🎒 Qué llevar</h4>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                <li>Calzado cómodo para caminar</li>
                                <li>Protector solar y gorra</li>
                                <li>Agua suficiente</li>
                                <li>Cámara para las fotos</li>
                                <li>Ropa abrigada para la montaña</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-2">⚠️ Recomendaciones</h4>
                            <ul className="list-disc list-inside text-gray-700 space-y-1">
                                <li>Empezá temprano para aprovechar el día</li>
                                <li>Respetá la naturaleza y no dejes basura</li>
                                <li>Consultá el clima antes de salir</li>
                                <li>Algunos senderos requieren guía</li>
                                <li>Avisá a alguien tu itinerario</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Turismo;

// Nota: Para usar este componente necesitás instalar:
// npm install react-leaflet leaflet