import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import Owners from './Owners';
import Pets from './Pets';

const App = () => {
  const [owners, setOwners] = useState([]);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('/api/owners');
      setOwners(response.data);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPets = async () => {
      const response = await axios.get('/api/pets');
      setPets(response.data);
    }
    fetchPets();
  }, []);

  const setOwner = async (owner, pet) => {
    pet = { ...pet, owner_id: owner.id }
    const response = await axios.put(`/api/pets/${pet.id}`, pet);
    pet = response.data;
    setPets(pets.map(_pet => _pet.id === pet.id ? pet : _pet));
  }

  const removeOwner = async (pet) => {
    pet = { ...pet, owner_id: null }
    const response = await axios.put(`/api/pets/${pet.id}`, pet);
    pet = response.data;
    setPets(pets.map(_pet => _pet.id === pet.id ? pet : _pet));
  }

  return (
    <div>
      <h1>Owner-Pet Tracker</h1>
      <main>
        <Owners owners={owners} pets={pets} />
        <Pets owners={owners} pets={pets} setOwner={setOwner} removeOwner={removeOwner} />
      </main>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
