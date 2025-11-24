// src/pages/Contacto.jsx
import React, { useState } from 'react';
import { apiClient } from '../config/api';

const Contacto = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: ''
    });
    const [enviando, setEnviando] = useState(false);
    const [exito, setExito] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEnviando(true);
        setError('');

        try {
            const response = await apiClient.post('/contacto', formData);
            
            if (response.success) {
                setExito(true);
                setFormData({ nombre: '', email: '', telefono: '', mensaje: '' });
                setTimeout(() => setExito(false), 5000);
            } else {
                setError(response.error);
            }
        } catch (err) {
            setError('Error al enviar el mensaje. Por favor, intentá de nuevo.');
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div>
            {/* Hero */}
            <div className="bg-green-700 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4">Contacto</h1>
                    <p className="text-xl">¿Tenés alguna pregunta? Nos encantaría ayudarte</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Información de contacto */}
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Hablemos</h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            Estamos disponibles para responder tus consultas sobre reservas, 
                            disponibilidad, lugares turísticos y todo lo que necesites saber 
                            sobre tu estadía en Balcozna.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="text-3xl mr-4">📍</div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Dirección</h3>
                                    <p className="text-gray-600">
                                        Balcozna, Catamarca<br />
                                        Argentina
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="text-3xl mr-4">📞</div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Teléfono</h3>
                                    <p className="text-gray-600">
                                        +54 9 383 494-6767
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="text-3xl mr-4">✉️</div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Email</h3>
                                    <p className="text-gray-600">
                                        info@vistamontana.com
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="text-3xl mr-4">⏰</div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Horarios</h3>
                                    <p className="text-gray-600">
                                        Lunes a Domingo: 8:00 - 20:00 hs
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Mapa de ubicación */}
                        <div className="mt-8">
                            <h3 className="font-bold text-lg mb-4">Nuestra Ubicación</h3>
                            <div className="rounded-lg overflow-hidden shadow-lg h-64">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9912.586978179852!2d-65.73406123891783!3d-27.86531221913398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9423f9e4c16cb9d3%3A0x701876b42168291d!2sHospedaje%20Vista%20Monta%C3%B1a!5e0!3m2!1ses-419!2sar!4v1763955128449!5m2!1ses-419!2sar"
                                    width="100%" 
                                    height="100%" 
                                    style={{ border: 0 }} 
                                    allowFullScreen="" 
                                    loading="lazy"
                                    title="Ubicación Hospedaje Vista Montaña"
                                ></iframe>
                            </div>
                        </div>
                    </div>

                    {/* Formulario de contacto */}
                    <div>
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <h2 className="text-3xl font-bold mb-6">Envianos un Mensaje</h2>

                            {exito && (
                                <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
                                    ✓ Mensaje enviado exitosamente. Te responderemos pronto!
                                </div>
                            )}

                            {error && (
                                <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Nombre completo *
                                    </label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="Tu nombre"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="tu@email.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Teléfono
                                    </label>
                                    <input
                                        type="tel"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="+54 9 XXX XXX-XXXX"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Mensaje *
                                    </label>
                                    <textarea
                                        name="mensaje"
                                        value={formData.mensaje}
                                        onChange={handleChange}
                                        required
                                        rows="6"
                                        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="Contanos en qué podemos ayudarte..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={enviando}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition disabled:bg-gray-400"
                                >
                                    {enviando ? 'Enviando...' : 'Enviar Mensaje'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacto;

