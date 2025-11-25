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
            <div className="text-white py-16" style={{backgroundColor: '#656B5B'}}>
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
                                    <h3 className="font-bold text-lg mb-1">Teléfono / WhatsApp</h3>
                                    <a 
                                        href="https://wa.me/5493834946767" 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-green-600 hover:text-green-700"
                                    >
                                        +54 9 383 494-6767
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="text-3xl mr-4">✉️</div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Email</h3>
                                    <a 
                                        href="mailto:info@vistamontana.com"
                                        className="text-green-600 hover:text-green-700"
                                    >
                                        info@vistamontana.com
                                    </a>
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

                        {/* Redes Sociales */}
                        <div className="mt-8">
                            <h3 className="font-bold text-lg mb-4">Seguinos en Redes</h3>
                            <div className="flex space-x-4">
                                <a 
                                    href="https://www.facebook.com/profile.php?id=61556534558118" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition"
                                    aria-label="Facebook"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </a>
                                <a 
                                    href="https://www.instagram.com/vistamontanahospedaje/" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white p-3 rounded-full transition"
                                    aria-label="Instagram"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </a>
                                <a 
                                    href="https://wa.me/5493834946767" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition"
                                    aria-label="WhatsApp"
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                    </svg>
                                </a>
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
                                        placeholder="+54 9 383 494-6767"
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