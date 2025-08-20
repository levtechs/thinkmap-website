import React, { useState } from "react";

export default function InfoPanel() {
    const [open, setOpen] = useState(false);

    return (
        <div
            style={{
                width: 400,
                margin: "20px auto",
                padding: "12px 16px",
                backgroundColor: "rgba(147, 197, 253, 0.2)",
                color: "white",
                border: "1px solid rgba(147, 197, 253, 0.5)",
                borderRadius: 6,
                userSelect: "none",
                fontFamily: "inherit",
                position: "relative",
            }}
        >
            <div
                onClick={() => setOpen(!open)}
                style={{
                    cursor: "pointer",
                    padding: "8px 12px",
                    borderRadius: 4,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontWeight: "600",
                    fontSize: 18,
                    letterSpacing: "0.02em",
                }}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                How Thinkmap Works
                <span
                    style={{
                        transform: open ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                        fontSize: 20,
                        lineHeight: 1,
                        userSelect: "none",
                    }}
                >
          ▼
                </span>
            </div>

            {open && (
                <div
                    style={{
                        marginTop: 8,
                        padding: 10,
                        listStyle: "none",
                        overflowY: "auto",
                        backgroundColor: "rgba(147, 197, 253, 0.3)",
                        border: "1px solid rgba(147, 197, 253, 0.5)",
                        borderRadius: 6,
                    }}
                >
                    <p>
                        <a href="/demo" className="font-bold text-lightblue underline">
                            watch demo
                        </a>
                    </p>
                    <p className="mt-4">
                        Source code -{" "}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/levtechs/thinkmap-website"
                            className="font-bold text-lightblue underline"
                        >
                            frontend
                        </a>
                        {" "}-{" "}
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/levtechs/thinkmap-backend"
                            className="font-bold text-lightblue underline"
                        >
                            backend
                        </a>
                        <span className="italic text-sm" style={{ display: "block" }}>
                            (follow me on GitHub!)
                        </span>
                    </p>
                    <hr className="mt-4 mb-4"/>
                    <p style={{ marginBottom: 15 }}>
                        ThinkMap is an advanced note-taking tool that visualizes your ideas in a dynamic 3D space. To use it, simply add notes by entering a title and some content. Each new note is automatically positioned on a 3D sphere based on its meaning, not just the words it contains. This is made possible through a sentence transformer: a neural network that generates semantic embeddings of your text. These embeddings are then projected using PCA and aligned to fit onto the sphere. As you add more notes, the system adjusts the positions of all points to reflect the new relationships, allowing similar ideas to naturally cluster together. For example, two notes about cartoons will appear near each other even if they use completely different vocabulary. You can continue adding notes one by one, watching your thought landscape evolve in real time.
                    </p>
                    <p style={{ fontStyle: "italic", fontSize: "15px", fontWeight: "lighter"}}>
                        Made by Lev Smolsky
                    </p>

                </div>

            )}
        </div>
    );
}
