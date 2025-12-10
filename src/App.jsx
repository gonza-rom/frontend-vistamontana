// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Alquileres from './pages/Alquileres';
import AlquilerDetalle from './pages/AlquilerDetalle';
import Turismo from './pages/Turismo';
import Contacto from './pages/Contacto';
import Galeria from './pages/Galeria';
import Login from './pages/Login';
import Admin from './pages/Admin';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-grow pt-20">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/alquileres" element={<Alquileres />} />
                            <Route path="/alquileres/:id" element={<AlquilerDetalle />} />
                            <Route path="/turismo" element={<Turismo />} />
                            <Route path="/galeria" element={<Galeria />} />
                            <Route path="/contacto" element={<Contacto />} />
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/admin"
                                element={
                                    <ProtectedRoute>
                                        <Admin />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </main>
                    <Footer />
                    <WhatsAppButton />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;