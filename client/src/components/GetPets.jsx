import { useEffect, useState } from "react";

export default function GetPets() {
  const [pets, setPets] = useState();

  const handleGetPets = async () => {
    const resp = await fetch("http://localhost:8000/pets");
    const data = await resp.json();
    setPets(data);
  };

  useEffect(() => {
    handleGetPets();
  }, []);

  return (
    <>
      <button onClick={handleGetPets}>getPets</button>
      <ul>
        {pets &&
          pets.map((pet) => {
            return <li key={pet._id}>{pet.name}</li>;
          })}
      </ul>
    </>
  );
}
