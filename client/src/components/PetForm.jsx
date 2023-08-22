import { useState } from "react";

export default function PetForm() {
  const [petDetails, setPetDetails] = useState({
    name: "",
    type: "",
    age: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/pets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: petDetails.name,
        type: petDetails.type,
        age: petDetails.age,
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "5px",
          padding: "5px",
        }}
      >
        <h1>Add details for your Pet</h1>
        <input
          type="text"
          value={petDetails.name}
          placeholder="add name"
          onChange={(e) =>
            setPetDetails({ ...petDetails, name: e.target.value })
          }
        />
        <input
          type="text"
          value={petDetails.type}
          placeholder="add type"
          onChange={(e) =>
            setPetDetails({ ...petDetails, type: e.target.value })
          }
        />
        <input
          type="number"
          value={petDetails.age}
          placeholder="add age"
          onChange={(e) =>
            setPetDetails({ ...petDetails, age: e.target.value })
          }
        />
        <input type="submit" value="Create Pet" />
      </form>
    </>
  );
}
