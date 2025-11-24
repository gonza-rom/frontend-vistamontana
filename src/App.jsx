// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Alquileres from './pages/Alquileres';
import AlquilerDetalle from './pages/AlquilerDetalle';
import Turismo from './pages/Turismo';
import Contacto from './pages/Contacto';
import AdminPanel from './pages/AdminPanel';

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/alquileres" element={<Alquileres />} />
                        <Route path="/alquileres/:id" element={<AlquilerDetalle />} />
                        <Route path="/turismo" element={<Turismo />} />
                        <Route path="/contacto" element={<Contacto />} />
                        <Route path="/admin" element={<AdminPanel />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;