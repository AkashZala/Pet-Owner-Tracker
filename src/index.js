import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

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
    pet = {...pet, owner_id: owner.id}
    const response = await axios.put(`/api/pets/${pet.id}`, pet);
    pet = response.data;
    setPets(pets.map(_pet => _pet.id === pet.id ? pet : _pet));
  }

  const removeOwner = async (pet) => {
    pet = {...pet, owner_id: null}
    const response = await axios.put(`/api/pets/${pet.id}`, pet);
    pet = response.data;
    setPets(pets.map(_pet => _pet.id === pet.id ? pet : _pet));
  }

  return (
    <div>
      <h1>Owner-Pet Tracker</h1>
      <main>
        <div>
          <h2>Owners ({owners.length})</h2>
          <ul>
            {
              owners.map(owner => {
                const ownedPets = pets.filter(pet => owner.id === pet.owner_id);
                return (
                  <li key={owner.id}>
                    {owner.name}
                    ({ownedPets.length})
                  </li>
                );
              })
            }
          </ul>
        </div>
        <div>
          <h2>Pets ({pets.length})</h2>
          <ul>
            {
              pets.map(pet => {
                return (
                  <li key={pet.id}>
                    {pet.name}
                    <ul>
                      {
                        owners.map(owner => {
                          return (
                            <li key={owner.id} className={owner.id === pet.owner_id ? 'owner' : ''}>
                              {`${owner.name} `}
                              {owner.id === pet.owner_id ? (
                                <button onClick={() => {removeOwner(pet)}}>
                                  Remove Owner
                                </button>
                              ) : (
                                <button onClick={() => {setOwner(owner, pet)}}>
                                  Set Owner
                                </button>
                              )}
                            </li>
                          );
                        })
                      }
                    </ul>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </main>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
