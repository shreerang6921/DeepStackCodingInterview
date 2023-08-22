import React, { useEffect, useState } from "react";

export default function Notes() {
  const [notes, setNotes] = useState();

  const [newNote, setNewNote] = useState();
  const [newTitle, setNewTitle] = useState();
  const [updateClicked, setUpdateClicked] = useState();

  const [updateValue, setUpdateValue] = useState();
  const getData = async () => {
    const res = await fetch("http://localhost:8000/api/notes");
    const data = await res.json();
    console.log(data);
    setNotes(data);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

  const handleClick = async (note) => {
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

  const handleUpdate = () => {
    setUpdateClicked(true);
  };

  const handleUpdateSubmit = async (e, note) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/notes", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: note.title,
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
      <ul>
        {notes &&
          notes.map((note) => {
            return (
              <div key={note._id} className="flex gap-3">
                <button onClick={(note) => handleUpdate(note)}>update</button>

                {updateClicked && (
                  <form onSubmit={(note) => handleUpdateSubmit(note)}>
                    <input
                      value={updateValue}
                      onChange={(e) => {
                        setUpdateValue(e.target.value);
                      }}
                    />
                    <input type="submit" value="update note" />
                  </form>
                )}

                <li
                  onClick={() => {
                    handleClick(note);
                  }}
                >
                  {note.note}
                </li>
              </div>
            );
          })}
      </ul>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">title</label>
        <input
          type="text"
          id="title"
          value={newTitle}
          className=" border-2"
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <label htmlFor="note">note</label>
        <input
          type="text"
          id="note"
          value={newNote}
          className=" border-2"
          onChange={(e) => setNewNote(e.target.value)}
        />

        <input type="submit" value="submit notes" />
      </form>
    </div>
  );
}
