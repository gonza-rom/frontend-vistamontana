// src/config/api.js
const API_BASE_URL = 'http://localhost/backendVistaMontana/index.php';

export const apiClient = {
    get: async (endpoint) => {
        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
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
    }
};