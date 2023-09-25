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
                                {pet.name}
                                <ul>
                                    {
                                        owners.map(owner => {
                                            return (
                                                <li key={owner.id} className={owner.id === pet.owner_id ? 'owner' : ''}>
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