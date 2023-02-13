import Note from "./Note";
import "../CSS/Note.css";
import CreateNote from "./CreateNote";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [inputText, setInputText] = useState("");

  const textHandler = (e) => {
    setInputText(e.target.value);
  };

  const saveHandler = () => {
    setNotes((prevState) => [
      ...prevState,
      {
        id: uuid(),
        text: inputText
      }
    ]);
    setInputText("");
  };

  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Notes"));
    if (!data) {
      return;
    }
    console.log("data", data);
    if (data.length > 0) {
      setNotes(data);
    }
  }, []);

  useEffect(() => {
    console.log("note", notes); //check saved note
    // saving data to local storage
    localStorage.setItem("Note", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="notes">
      {notes.map((note) => (
        <Note
          key={note.id}
          text={note.text}
          id={note.id}
          deleteNote={deleteNote}
        />
      ))}
      <Note />
      <Note />
      <Note />
      <CreateNote
        textHandler={textHandler}
        inputText={inputText}
        saveHandler={saveHandler}
      />
    </div>
  );
};

export default Notes;
