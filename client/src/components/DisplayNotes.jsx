import React from "react";

export default function DisplayNotes({ notes, handleUpdate, handleDelete }) {
  return (
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
  );
}
