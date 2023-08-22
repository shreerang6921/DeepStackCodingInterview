import React, { useState } from "react";

export default function UpdateNotes({
  noteToUpdate,
  getData,
  setUpdateClicked,
}) {
  const [updateValue, setUpdateValue] = useState("");

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    console.log(noteToUpdate, updateValue);
    const res = await fetch("http://localhost:8000/api/notes", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: noteToUpdate.title,
        note: updateValue,
      }),
    });
    const data = await res.json();
    console.log(data);
    getData();
    setUpdateClicked(false);
  };
  return (
    <form onSubmit={handleUpdateSubmit} className="m-6 p-6">
      <input
        className=" border-black border-2 rounded-md m-2 p-2"
        value={updateValue}
        onChange={(e) => {
          setUpdateValue(e.target.value);
        }}
      />
      <input
        type="submit"
        value="update note"
        className="border-2 border-green-500  rounded-md m-2 p-2"
      />
    </form>
  );
}
