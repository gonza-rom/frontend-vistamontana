// src/config/api.js
// const API_BASE_URL = 'http://localhost/backendVistaMontana/index.php';
const API_BASE_URL = 'https://vistamontana.free.nf/backendVistaMontana/index.php';

export const apiClient = {
    get: async (endpoint) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Para enviar cookies de sesión
            });

            const data = await response.json();

            // Si el backend devuelve {success: true, data: ...}
            if (data.success) {
                return data;
            } else {
                throw new Error(data.error || 'Error en la petición');
            }
        } catch (error) {
            console.error('Error en GET:', error);
            throw error;
        }
    },

    post: async (endpoint, body) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (data.success) {
                return data;
            } else {
                throw new Error(data.error || 'Error en la petición');
            }
        } catch (error) {
            console.error('Error en POST:', error);
            throw error;
        }
    },

    put: async (endpoint, body) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (data.success) {
                return data;
            } else {
                throw new Error(data.error || 'Error en la petición');
            }
        } catch (error) {
            console.error('Error en PUT:', error);
            throw error;
        }
    },

    // Método para subir archivos (multipart/form-data)
    upload: async (endpoint, formData) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'POST',
                credentials: 'include',
                body: formData, // No establecer Content-Type, el navegador lo hace automáticamente
            });

            const data = await response.json();

            if (data.success) {
                return data;
            } else {
                throw new Error(data.error || 'Error al subir archivo');
            }
        } catch (error) {
            console.error('Error en UPLOAD:', error);
            throw error;
        }
    }
};

// Métodos específicos para autenticación
export const authAPI = {
    login: (username, password) => apiClient.post('/auth/login', { username, password }),
    logout: () => apiClient.post('/auth/logout', {}),
    verify: () => apiClient.get('/auth/verify'),
    me: () => apiClient.get('/auth/me'),
};

// Métodos específicos para pagos
export const paymentAPI = {
    uploadReceipt: (reservaId, file) => {
        const formData = new FormData();
        formData.append('comprobante', file);
        return apiClient.upload(`/reservas/${reservaId}/comprobante`, formData);
    },
    getReceipt: (reservaId) => apiClient.get(`/reservas/${reservaId}/comprobante`),
    verifyPayment: (reservaId) => apiClient.put(`/reservas/${reservaId}/verificar-pago`, {}),
    getPending: () => apiClient.get('/reservas/pendientes'),
};
