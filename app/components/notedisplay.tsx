import React, { useState } from "react";

import { Note } from "../types";

interface NoteDisplayParams {
    note: Note | null;
}

export default function NoteDisplay({ note }: NoteDisplayParams) {
    return (
        <div
            style={{
            padding: "10px 16px",
            backgroundColor: "rgba(147, 197, 253, 0.2)",
            color: "white",
            border: "1px solid rgba(147, 197, 253, 0.5)",
            borderRadius: 6,
            width: "300px",
            transition: "background-color 0.2s, transform 0.2s",
            display: "flex", flexDirection: "column", gap: "12px", margin: "auto"
        }}>
            <h1
                style={{
                    padding: 8,
                    fontSize: 24,
                }}
            >
                {note ? note.name : "No Note Selected"}
            </h1>
    
            <p
                style={{
                    padding: 8,
                    fontSize: 16,
                    resize: "vertical",
                    fontFamily: "inherit",
                }}
            >
                { note ? note.content : "Select a note to view its content." }
            </p>
            <p
                style={{
                    padding: 8,
                    fontSize: 12,
                    resize: "vertical",
                    fontFamily: "inherit",
                }}
            >
                { note ? note.id : "" }
            </p>
        </div>

    )
}