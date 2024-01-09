import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Note.css";
const Note = () => {
  const [notes, setNotes] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newDate, setNewDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  useEffect(() => {
    axios.get(" http://localhost:5000/notes").then((response) => {
      setNotes(response.data);
      console.log(response);
      console.log(response.data);
    });
  }, []);
  const addnote = () => {
    axios
      .post("http://localhost:5000/notes", {
        title: newTitle,
        content: newNote,
        date: newDate,
      })
      .then((response) => {
        setNotes([...notes, response.data]);
        setNewTitle("");
        setNewNote("");
        setNewDate("");
      });
  };
  const deletenote = (id) => {
    axios.delete("http://localhost:5000/notes/" + id).then(() => {
      const updateNotes = notes.filter((note) => note.id !== id);
      setNotes(updateNotes);
    });
  };
  const updateNote = (id) => {
    axios
      .patch("http://localhost:5000/notes/" + id, { content: editedContent })
      .then(() => {
        const updatedNotes = [...notes];
        const notesIndex = updatedNotes.findIndex((note) => note.id === id);
        updatedNotes[notesIndex].content = editedContent;
        setNotes(updatedNotes);
        setEditMode(null);
      });
  };
  const filterNotes = searchTerm
    ? notes.filter(
        (note) =>
          note.title &&
          note.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      )
    : notes;
  return (
    <>
      <h1 className="header-title">Note</h1>
      <div className="header-container">
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
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        ></input>
        <button type="submit" onClick={addnote}>
          Add
        </button>
      </div>
      <div className="details-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Serach by title.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
        </div>
        <div className="card-container">
          {filterNotes.map((note) => (
            <div className="individual-card">
              <div key={note.id}>
                <h3>{note.title}</h3>
                {editMode === note.id ? (
                  <div>
                    <input
                      type="text"
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                    ></input>
                    <button onClick={() => updateNote(note.id)}>update</button>
                  </div>
                ) : (
                  <p>{note.content}</p>
                )}
                <p>{note.date}</p>
                <div className="cardfooter">
                  {editMode !== note.id ? (
                    <div className="editfooter">
                      <button
                        className="editbtn "
                        onClick={(e) => setEditMode(note.id)}
                      >
                        Edit
                      </button>
                    </div>
                  ) : null}
                  <div className="deletebtn">
                    <button
                      className="deletebtn"
                      onClick={() => deletenote(note.id)}
                    >
                      delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Note;
