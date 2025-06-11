import axios from 'axios';

// ¡IMPORTANTE! Actualiza esta URL si tu backend no está en 8080 o la ruta base cambia.
// Pero según tu `image_d4cfbe.png`, la ruta es /api/libros y el puerto es 8080.
const API_URL = 'http://localhost:8080/api/libros';

const getAllLibros = () => {
    return axios.get(API_URL);
};

const getLibroById = (id) => {
    return axios.get(`<span class="math-inline">\{API\_URL\}/</span>{id}`);
};

const createLibro = (libro) => {
    return axios.post(API_URL, libro);
};

const updateLibro = (id, libro) => {
    return axios.put(`<span class="math-inline">\{API\_URL\}/</span>{id}`, libro);
};

const deleteLibro = (id) => {
    return axios.delete(`<span class="math-inline">\{API\_URL\}/</span>{id}`);
};

// Exporta todos los métodos para que puedan ser usados en otros componentes
export default {
    getAllLibros,
    getLibroById,
    createLibro,
    updateLibro,
    deleteLibro
};