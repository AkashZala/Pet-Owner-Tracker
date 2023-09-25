import React from "react";

const Owners = ({ owners, pets }) => {
    return (
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
    );
}

export default Owners;