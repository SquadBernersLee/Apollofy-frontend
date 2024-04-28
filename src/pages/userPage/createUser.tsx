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
        <div className='mt-40 '>
        <button onClick={() => setModalIsOpen(true)}>Crear Usuario</button>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={customStyles}
            contentLabel="Crear Usuario Modal"
        >
            <h2>Crear Usuario</h2>
            <form onSubmit={handleSubmit}>
            {/* <label>
                Rol ID:
                <input type="text" name="rolId" value={formData.rolId} onChange={handleChange} />
            </label> */}
            <label>
                Nombre:
                <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} />
            </label>
            <label>
                Apellido:
                <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
            </label>
            <label>
                Ciudad:
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
            </label>
            <label>
                Contraseña:
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
            </label>
            <label>
                Género:
                <input type="text" name="gender" value={formData.gender} onChange={handleInputChange} />
            </label>
            <label>
                País:
                <input type="text" name="country" value={formData.country} onChange={handleInputChange} />
            </label>
            <label>
                Imagen:
                <input type="text" name="img" value={formData.img} onChange={handleInputChange} />
            </label>
            <label>
                Fecha de Nacimiento:
                <input type="text" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} />
            </label>
            <label>
                popularidad:
                <input type="text" name="popularity" value={formData.popularity} onChange={handleChange} />
            </label>
            <label>
                genereId:
                <input type="text" name="genreId" value={formData.genreId} onChange={handleChange} />
            </label>
            <button type="submit">crear</button>
            </form>
        </Modal>
        </div>
    );
};

export default CreateUserComponent;
