import React, { useState, useEffect } from 'react';
import LibroService from '../services/LibroService'; // Asegúrate de la ruta correcta

function LibroForm({ libroToEdit, onSave }) {
    const initialState = { titulo: '', autor: '', anioPublicacion: '', isbn: '' };
    const [libro, setLibro] = useState(initialState);

    // Se ejecuta cuando 'libroToEdit' cambia, para cargar los datos del libro a editar
    useEffect(() => {
        if (libroToEdit) {
            setLibro(libroToEdit);
        } else {
            setLibro(initialState); // Si no hay libroToEdit, limpia el formulario
        }
    }, [libroToEdit]);

    // Maneja cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLibro(prevLibro => ({
            ...prevLibro,
            [name]: name === "anioPublicacion" ? parseInt(value) : value // Convierte anioPublicacion a número
        }));
    };

    // Maneja el envío del formulario (crear o actualizar)
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar página)
        try {
            if (libro.id) {
                await LibroService.updateLibro(libro.id, libro); // Actualiza si hay un ID
            } else {
                await LibroService.createLibro(libro); // Crea si no hay ID
            }
            setLibro(initialState); // Limpia el formulario después de guardar
            onSave(); // Llama a la función onSave del componente padre para que recargue la lista
        } catch (error) {
            console.error("Error al guardar el libro:", error);
            alert("Hubo un error al guardar el libro. Revisa la consola para más detalles.");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h3>{libro.id ? 'Editar Libro' : 'Crear Nuevo Libro'}</h3>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    name="titulo"
                    placeholder="Título"
                    value={libro.titulo}
                    onChange={handleChange}
                    required
                    style={{ padding: '8px', width: 'calc(100% - 16px)' }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    name="autor"
                    placeholder="Autor"
                    value={libro.autor}
                    onChange={handleChange}
                    required
                    style={{ padding: '8px', width: 'calc(100% - 16px)' }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="number"
                    name="anioPublicacion"
                    placeholder="Año Publicación"
                    value={libro.anioPublicacion}
                    onChange={handleChange}
                    required
                    style={{ padding: '8px', width: 'calc(100% - 16px)' }}
                />
            </div>
            <div style={{ marginBottom: '10px' }}>
                <input
                    type="text"
                    name="isbn"
                    placeholder="ISBN"
                    value={libro.isbn}
                    onChange={handleChange}
                    required
                    style={{ padding: '8px', width: 'calc(100% - 16px)' }}
                />
            </div>
            <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                {libro.id ? 'Actualizar Libro' : 'Crear Libro'}
            </button>
            {libro.id && (
                <button
                    type="button"
                    onClick={() => setLibro(initialState)}
                    style={{ padding: '10px 15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}
                >
                    Cancelar Edición
                </button>
            )}
        </form>
    );
}

export default LibroForm;