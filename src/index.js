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
  },[]);

  useEffect(() => {
    const fetchPets = async () => {
      const response = await axios.get('/api/pets');
      setPets(response.data);
    }
    fetchPets();
  }, []);
  
  return (
    <div>
      <h1>Owner-Pet Tracker</h1>
      <main>
        <div>
          <h2>Owners ({ owners.length })</h2>
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
          <h2>Pets ({ pets.length })</h2>
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
                            <li key={owner.id} className={ owner.id === pet.owner_id ? 'owner' : ''}>
                              {owner.name}
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
