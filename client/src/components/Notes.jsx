import React, { useEffect, useState } from "react";
import UpdateNotes from "./UpdateNotes";
import DisplayNotes from "./DisplayNotes";

export default function Notes() {
  const [notes, setNotes] = useState();
  const [newNote, setNewNote] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [updateClicked, setUpdateClicked] = useState(false);
  const [noteToUpdate, setNoteToUpdate] = useState("");

  const getData = async () => {
    const res = await fetch("http://localhost:8000/api/notes");
    const data = await res.json();
    console.log(data);
    setNotes(data);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleCreateNote = async (e) => {
    e.preventDefault();
    const duplicateNote = notes.filter((note) => note.title === newTitle);
    if (duplicateNote.length > 0) {
      return;
    }
    const res = await fetch("http://localhost:8000/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        note: newNote,
      }),
    });

    getData();
  };

  const handleDelete = async (note) => {
    const res = await fetch("http://localhost:8000/api/notes", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: note.title,
      }),
    });
    const data = await res.json();
    console.log(data);

    getData();
  };

  const handleUpdate = (note) => {
    setNoteToUpdate(note);
    setUpdateClicked(true);
  };

  return (
    <div className=" m-6 p-6">
      <DisplayNotes
        notes={notes}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />

      <form onSubmit={handleCreateNote}>
        <label htmlFor="title">title</label>
        <input
          className=" border-black border-2 rounded-md m-2 p-2"
          type="text"
          id="title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <label htmlFor="note">note</label>
        <input
          className=" border-black border-2 rounded-md m-2 p-2"
          type="text"
          id="note"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />

        <input
          type="submit"
          value="submit notes"
          className="border-2 border-green-500  rounded-md m-2 p-2"
        />
      </form>

      {updateClicked && (
        <UpdateNotes
          noteToUpdate={noteToUpdate}
          getData={getData}
          setUpdateClicked={setUpdateClicked}
        />
      )}
    </div>
  );
}
