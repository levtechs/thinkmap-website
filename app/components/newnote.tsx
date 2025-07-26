import { useState } from "react";
import { Note } from "../types";
import Button from "./buttons";
import { getRandom4DigitId } from "../pointslogic/generate_point";

interface NewNotePanelParams {
  submitNote: (note: Note) => void; // optional cancel/done panel close
  closeNote: () => void; 
}

export default function NewNotePanel({ submitNote, closeNote}: NewNotePanelParams) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleDone = () => {
    //console.log("handling done")
        const finalTitle = title.trim() === "" ? "untitled" : title;
        const finalContent = content.trim() === "" ? "no content" : content;

        const note: Note = {
            id: getRandom4DigitId(),
            name: finalTitle,
            content: finalContent,
        };

        //console.log("Submitting note:", note);
        submitNote(note);
    
        // Reset fields
        setTitle("");
        setContent("");
    };

    const handleCancel = () => {
        setTitle("");
        setContent("");
        closeNote();
    };

    return (
        <div style={{ 
            padding: "10px 16px",
            backgroundColor: "rgba(147, 197, 253, 0.2)",
            color: "white",
            border: "1px solid rgba(147, 197, 253, 0.5)",
            borderRadius: 6,
            width: "300px",
            transition: "background-color 0.2s, transform 0.2s",
            display: "flex", flexDirection: "column", gap: "12px", margin: "auto"}}
        >
            {/* Buttons */}
            <div style={{ display: "flex", gap: 10 }}>
                <Button text="Done" onClick={handleDone}/>
                <Button text="Cancel" onClick={handleCancel}/>
            </div>
      
            <input
                type="text"
                placeholder="Note Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                    padding: 8,
                    fontSize: 16,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    outline: "none",
                }}
            />

            <textarea
                placeholder="Note Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
                style={{
                    padding: 8,
                    fontSize: 16,
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    outline: "none",
                    resize: "vertical",
                    fontFamily: "inherit",
                }}
            />
        </div>
    );
}
