import React from "react";

const Pets = ({ owners, pets, setOwner, removeOwner }) => {
    return (
        <div>
            <h2>Pets ({pets.length})</h2>
            <ul>
                {
                    pets.map(pet => {
                        return (
                            <li key={pet.id}>
                                <h3>{pet.name}</h3>
                                <ul>
                                    {
                                        owners.map(owner => {
                                            return (
                                                <li key={owner.id} id='petOwners' className={owner.id === pet.owner_id ? 'owner' : ''}>
                                                    <h3>
                                                        {`${owner.name} `}
                                                        {owner.id === pet.owner_id ? (
                                                            <button onClick={() => { removeOwner(pet) }}>
                                                                Remove Owner
                                                            </button>
                                                        ) : (
                                                            <button onClick={() => { setOwner(owner, pet) }}>
                                                                Set Owner
                                                            </button>
                                                        )}
                                                    </h3>
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
    );
}

export default Pets;