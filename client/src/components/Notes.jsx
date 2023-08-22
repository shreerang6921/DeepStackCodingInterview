import React, { useEffect, useState } from "react";

export default function Notes() {
  const [notes, setNotes] = useState();
  const [newNote, setNewNote] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [updateClicked, setUpdateClicked] = useState(false);
  const [updateValue, setUpdateValue] = useState("");
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
    <div className=" m-6 p-6">
      <ul className=" flex m-2 p-2 justify-start flex-col align-middle">
        {notes &&
          notes.map((note) => {
            return (
              <div key={note._id} className="flex gap-3 items-center">
                <button
                  className="border-2 border-black p-3 mt-2 rounded-md "
                  onClick={() => handleUpdate(note)}
                >
                  update
                </button>

                <li
                  className="border-black border-b-2"
                  onClick={() => {
                    handleDelete(note);
                  }}
                >
                  {note.note}
                </li>
              </div>
            );
          })}
      </ul>

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
      )}
    </div>
  );
}
