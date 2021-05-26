import { useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

function App() {

    const [notes, setNotes] = useState([]);

    const [activeNote, setActiveNote] = useState(false);

    // click button to add note
    const onAddNote = () => {

        let newNote = {
            id: uuid(),
            title: "untitled note",
            body: "",
            lastModified: Date.now(),
        };

        setNotes([newNote, ...notes]);
    };

    // click button to delete note
    const onDeleteNote = (idToDelete) => {
        setNotes(notes.filter((note) => note.id !== idToDelete))
    }

    // shows the current note on the preview page
    const getActiveNote = () => {
        return notes.find((note) => note.id === activeNote);
    }

    return (

        <div className="App">

            <Sidebar
            notes={notes}
            
            onAddNote={onAddNote}

            onDeleteNote={onDeleteNote}

            activeNote={activeNote}

            setActiveNote={setActiveNote}
             />

            <Main activeNote={getActiveNote()} />

        </div>
    )
}

export default App;