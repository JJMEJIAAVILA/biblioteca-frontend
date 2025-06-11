import React, { useState } from 'react';
import LibroList from './components/LibroList';
import LibroForm from './components/LibroForm';
import './App.css'; // Si tienes estilos CSS, asegúrate de que exista o coméntalo.

function App() {
    const [libroToEdit, setLibroToEdit] = useState(null); // Estado para el libro que se está editando
    const [refreshList, setRefreshList] = useState(0);    // Estado para forzar la recarga de la lista

    // Función para pasar al LibroForm cuando se edita un libro
    const handleEdit = (libro) => {
        setLibroToEdit(libro);
    };

    // Función para llamar después de guardar un libro (crear/actualizar)
    const handleSave = () => {
        setLibroToEdit(null);             // Limpiar el formulario de edición
        setRefreshList(prev => prev + 1); // Incrementar para forzar que LibroList se remonte y recargue
    };

    // Función para llamar después de eliminar un libro
    const handleLibroDeleted = () => {
        setRefreshList(prev => prev + 1); // Forzar recarga de la lista
    }

    return (
        <div className="App" style={{ fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '20px auto', padding: '20px', border: '1px solid #eee', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Gestión de Libros</h1>
            <section>
                <LibroForm libroToEdit={libroToEdit} onSave={handleSave} />
            </section>
            <section>
                {/* Usar 'key' es una forma de forzar que un componente se remonte cuando la clave cambia,
                    lo cual es útil para forzar la recarga de datos en este caso. */}
                <LibroList onEdit={handleEdit} onLibroDeleted={handleLibroDeleted} key={refreshList} />
            </section>
        </div>
    );
}

export default App;