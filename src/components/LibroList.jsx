import React, { useState, useEffect } from 'react';
import LibroService from '../services/LibroService'; // Asegúrate de la ruta correcta

function LibroList({ onEdit, onLibroDeleted }) {
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para obtener los libros del backend
    const fetchLibros = async () => {
        try {
            setLoading(true); // Indica que la carga está en progreso
            const response = await LibroService.getAllLibros();
            setLibros(response.data); // Actualiza el estado con los libros recibidos
            setError(null); // Limpia cualquier error anterior
        } catch (err) {
            console.error("Error al obtener libros:", err);
            setError("No se pudieron cargar los libros. Asegúrate de que el backend esté funcionando.");
            setLibros([]); // Limpia la lista en caso de error para evitar renderizados incorrectos
        } finally {
            setLoading(false); // La carga ha terminado
        }
    };

    // Se ejecuta una vez al montar el componente y cada vez que onLibroDeleted se llama (a través de la clave en App.jsx)
    useEffect(() => {
        fetchLibros();
    }, [onLibroDeleted]); // Dependencia para recargar cuando un libro es eliminado

    // Maneja la eliminación de un libro
    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que quieres eliminar este libro?")) {
            try {
                await LibroService.deleteLibro(id);
                onLibroDeleted(); // Notifica al componente padre que se ha eliminado un libro, para forzar la recarga
                fetchLibros(); // Recarga la lista después de eliminar
            } catch (error) {
                console.error("Error al eliminar el libro:", error);
                alert("Hubo un error al eliminar el libro. Revisa la consola para más detalles.");
            }
        }
    };

    // Renderizado condicional basado en el estado
    if (loading) return <p>Cargando libros...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
    if (libros.length === 0) return <p>No hay libros registrados.</p>;

    return (
        <div style={{ marginTop: '30px' }}>
            <h3>Lista de Libros</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
                <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Título</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Autor</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Año</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>ISBN</th>
                    <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {libros.map(libro => (
                    <tr key={libro.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{libro.id}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{libro.titulo}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{libro.autor}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{libro.anioPublicacion}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{libro.isbn}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                            <button
                                onClick={() => onEdit(libro)}
                                style={{ padding: '8px 12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '5px' }}
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(libro.id)}
                                style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default LibroList;