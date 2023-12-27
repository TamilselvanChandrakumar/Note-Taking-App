import React, { useEffect, useState } from "react";
import axios from "axios";

const Note = () => {
  const [note, setNote] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newDate, setNewDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    axios.get(" http://localhost:5000/notes").then((response) => {
      setNote(response.data);
    });
  }, []);
  const addnote = () => {};
  return (
    <>
      <h1>Note</h1>
      <div>
        <input
          type="text"
          placeholder="Title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Note Content..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        ></input>
        <input
          type="data"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        ></input>
        <button type="submit" onClick={addnote}>
          Add
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Serach by title.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
      </div>
    </>
  );
};

export default Note;
