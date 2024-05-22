import { useState, useEffect } from "react"
import api from "../api"
import Note from "../components/note"
import "../styles/home.css"


function Home(){
    
    const [notes, setNotes] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    // Query o request a bd

    useEffect(() => {
        getNotes();
    }, [])

    const getNotes = () => {
        api.get("/api/notes/")
        .then((res) => res.data)
        .then((data => { setNotes(data), console.log(data)}))
        .catch((error) => console.log(error))
        
    }

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    };
    
    return <div> 
            <div>
                <h2>Notes: </h2>

                {notes.map((note) => <Note note = {note} onDelete={deleteNote} key = {note.id}/>)}
                
                <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
            
            </div>

        </div>  

}



export default Home