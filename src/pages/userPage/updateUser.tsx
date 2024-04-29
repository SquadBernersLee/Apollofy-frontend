import React, { useState } from "react";
import Modal from "react-modal";
import { Toaster } from "sonner";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "30%",
    bottom: "auto",
    marginRight: "-70%",
    transform: "translate(-50%, -50%)",
  },
};

const UpdateUserComponent: React.FC = () => {
  const baseUrl = "http://localhost:4000/api/user/account";

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    rolId: null,
    first_name: "",
    last_name: "",
    email: "",
    city: "",
    password: "",
    gender: "",
    country: "",
    img: "",
    public_id_img: null,
    dateOfBirth: "",
    genreId: "",
    popularity: "",
  });
  const [showMessage, setShowMessage] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue: string | number = value;

    if (name === "genreId" || name === "popularity" || name === "rolId") {
      const parsedValue = parseInt(value);
      newValue = isNaN(parsedValue) ? value : parsedValue;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const id = 33;
    const url = `${baseUrl}/${id}`;

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Hubo un problema con la solicitud.");
      }

      const data = await response.json();
      console.log("Usuario nuevo:", data);
      setShowMessage(true);
      setFormData({
        rolId: null,
        first_name: "",
        last_name: "",
        email: "",
        city: "",
        password: "",
        gender: "",
        country: "",
        img: "",
        public_id_img: null,
        dateOfBirth: "",
        genreId: "",
        popularity: "",
      });
      setTimeout(() => {
        setModalIsOpen(false);
      }, 100);
      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    } catch (err) {
      console.error("Error al crear el usuario:");
    }
  };

  return (
    <div className="mt-4">
      <button className="text-xl" onClick={() => setModalIsOpen(true)}>
        <p className="text-btn">Change User Info</p>
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={customStyles}
        contentLabel="Change User Modal"
      >
        <h2 className="text-2xl font-bold mb-4">Change User Information</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-x-4">
            <label className="flex flex-col">
              <span className="mb-1">Name:</span>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </label>
            <label className="flex flex-col">
              <span className="mb-1">Second Name:</span>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <label className="flex flex-col">
              <span className="mb-1">Email:</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </label>
            <label className="flex flex-col">
              <span className="mb-1">City:</span>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <label className="flex flex-col">
              <span className="mb-1">password:</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </label>
            <label className="flex flex-col">
              <span className="mb-1">Gender:</span>
              <input
                type="text"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <label className="flex flex-col">
              <span className="mb-1">Country:</span>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </label>
            <label className="flex flex-col">
              <span className="mb-1">Image:</span>
              <input
                type="file"
                name="img"
                value={formData.img}
                onChange={handleInputChange}
                className=" px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <label className="flex flex-col">
              <span className="mb-1">Date of Birth:</span>
              <input
                type="text"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </label>
            <label className="flex flex-col">
              <span className="mb-1">Popularity:</span>
              <input
                type="text"
                name="popularity"
                value={formData.popularity}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-x-4">
            <label className="flex flex-col">
              <span className="mb-1">Género ID:</span>
              <input
                type="text"
                name="genreId"
                value={formData.genreId}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              />
            </label>
          </div>
          <Toaster />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Change
          </button>
        </form>
      </Modal>
      {/* Mostrar el mensaje si showMessage es true */}
      {showMessage && (
        <div className="bg-green-200 text-green-800 p-4 rounded-md mb-4">
          User has changed successfully!!
        </div>
      )}
    </div>
  );
};

export default UpdateUserComponent;
