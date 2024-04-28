// import axios from 'axios';
import React, { useState } from 'react';
import Modal from 'react-modal';

// Modal de estilos
    const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
    };

    // Componente principal
    const CreateUserComponent: React.FC = () => {

        const baseUrl = 'http://localhost:4000/api/user/account/'

        const [modalIsOpen, setModalIsOpen] = useState(false);
        const [formData, setFormData] = useState({
            rolId: null,
            first_name: '',
            last_name: '',
            email: '',
            city: '',
            password: '',
            gender: '',
            country: '',
            img: '',
            public_id_img: null,
            dateOfBirth: '',
            genreId: '',	
            popularity: '',
        });
    
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value,
            });
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            let newValue: string | number = value; // Por defecto, se asume que el valor es una cadena
        
            // Convertir a número solo si se trata de genreId, popularity o rolId
            if (name === 'genreId' || name === 'popularity' || name === 'rolId') {
                const parsedValue = parseInt(value);
              newValue = isNaN(parsedValue) ? value : parsedValue; // Convertir a número si es posible
            }
        
            setFormData(prevState => ({
                ...prevState,
                [name]: newValue,
            }));
        };
    
        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            try {
                const response = await fetch(baseUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
        
                if (!response.ok) {
                    throw new Error('Hubo un problema con la solicitud.');
                }
        
                const data = await response.json();
                console.log('Usuario nuevo:', data);
                setModalIsOpen(false);
            } catch (err) {
                console.error("Error al crear el usuario:");
                // Puedes manejar el error de alguna manera, por ejemplo, mostrando un mensaje al usuario
            }
        };
        

    return (
        <div className='mt-4'>
        <button className="text-xl" onClick={() => setModalIsOpen(true)}>
            <p className="text-btn">Create User</p>
        </button>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={customStyles}
            contentLabel="Crear Usuario Modal"
        >
            <h2 className="text-2xl font-bold mb-4">Crear Usuario</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-x-4">
                    <label className="flex flex-col">
                        <span className="mb-1">Nombre:</span>
                        <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500" />
                    </label>
                    <label className="flex flex-col">
                        <span className="mb-1">Apellido:</span>
                        <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500" />
                        </label>
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                    <label className="flex flex-col">
                        <span className="mb-1">Email:</span>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500" />
                    </label>
                    <label className="flex flex-col">
                        <span className="mb-1">Ciudad:</span>
                        <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500" />
                    </label>
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                    <label className="flex flex-col">
                        <span className="mb-1">Contraseña:</span>
                        <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500" />
                    </label>
                    <label className="flex flex-col">
                        <span className="mb-1">Género:</span>
                        <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500" />
                    </label>
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                    <label className="flex flex-col">
                        <span className="mb-1">País:</span>
                        <input type="text" name="country" value={formData.country} onChange={handleInputChange} className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500" />
                    </label>
                    <label className="flex flex-col">
                        <span className="mb-1">Imagen:</span>
                        <input type="text" name="img" value={formData.img} onChange={handleInputChange} className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500" />
                    </label>
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                    <label className="flex flex-col">
                        <span className="mb-1">Fecha de Nacimiento:</span>
                        <input type="text" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500" />
                    </label>
                    <label className="flex flex-col">
                        <span className="mb-1">Popularidad:</span>
                        <input type="text" name="popularity" value={formData.popularity} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500" />
                    </label>
                </div>
                <div className="grid grid-cols-2 gap-x-4">
                    <label className="flex flex-col">
                        <span className="mb-1">Género ID:</span>
                        <input type="text" name="genreId" value={formData.genreId} onChange={handleChange} className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500" />
                    </label>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">Crear</button>
            </form>
        </Modal>
        </div>
    );
};

export default CreateUserComponent;