"use client";

import { useEffect, useState } from "react";
import Environment from "./components/environment";
import NoteDisplay from "./components/notedisplay";
import NewNotePanel from "./components/newnote";
import InfoPanel from "./components/info";
import LoadingPanel from "./components/loading";
import SleepingServerPanel from "./components/seversleeping";

import Button from "./components/buttons";

import { Note, Point } from "./types";
import { GenerateBlankNote } from "./pointslogic/generate_point";
import { GetFirstPoint, GetProjectedPoint } from "./pointslogic/fetch_point";
import TestServer from "./pointslogic/test_server";

export default function Home() {
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const [points, setPoints] = useState<Point[]>([]);
    const [embeddings, setEmbeddings] = useState<number[][]>([]);

    const [isLoading, setLoading] = useState<boolean>(false);
    const [isServerAwake, setServerAwake] = useState<boolean>(false)

    // === On Mount: Embed the blank note ===
    useEffect(() => {
        const init = async () => {
            setLoading(true);

            try {
                const iSA = await TestServer();
                if (!iSA) {
                    console.error("Sever is asleep")
                    setLoading(false)
                    setServerAwake(false);
                    return;
                }
            }
            catch {
                console.error("No environment variable for sever URL")
                return;
            }

            setServerAwake(true);
            const blankNote = GenerateBlankNote();
            setSelectedNote(blankNote);
            const response = await GetFirstPoint(blankNote);
            setPoints([response.point]);
            setEmbeddings(response.embeddings);

            setLoading(false);
        };
        init();
    }, []);

    const handleNoteClick = (id: number) => {
        const point = points.find((p) => p.id === id);
        if (point && point.note) {
            setSelectedNote(point.note);
        } else {
            console.warn("Note not found for ID:", id);
        }
    };


    return (
        <main
            style={{
                width: "100vw",
                height: "100vh",
                backgroundColor: "black",
                color: "white",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* 3D environment background, centered */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                }}
            >
                {/* Environment (blurred when loading) */}
                <div
                    style={{
                        filter: (isLoading || !isServerAwake) ? "blur(3px)" : "none",
                        transition: "filter 0.3s ease",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <Environment points={points} clickHandler={handleNoteClick} />
                </div>

                {/* Loading overlay */}
                {isLoading && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 10,
                            backdropFilter: "blur(2px)", // optional extra blur
                        }}
                    >
                        <LoadingPanel />
                    </div>
                )}
                {/* server sleeping overlay */}
                {!isServerAwake && !isLoading && (
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: 10,
                            backdropFilter: "blur(2px)", // optional extra blur
                        }}
                    >
                        <SleepingServerPanel />
                    </div>
                )}
            </div>


            {/* Header over canvas, centered top */}
            <div
                style={{
                    position: "absolute",
                    top: 24,
                    left: "50%",
                    transform: "translateX(-50%)",
                    textAlign: "center",
                    zIndex: 10,
                }}
            >
                <h1
                    style={{
                        fontSize: "3rem",
                        fontWeight: "800",
                        letterSpacing: "-0.025em",
                        color: "rgba(156, 163, 175, 1)",
                        textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                        margin: 0,
                    }}
                >
          ThinkMap
                </h1>
                <p
                    style={{
                        fontSize: "0.875rem",
                        marginTop: 4,
                        color: "rgba(156, 163, 175, 1)",
                        marginBottom: 0,
                    }}
                >
          Visualize your thoughts in 3D space
                </p>
            </div>

            {/* Floating panel top-right */}
            <div
                style={{
                    position: "absolute",
                    top: 24,
                    right: 24,
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 12,
                }}
            >
                {!isPanelOpen && (
                    <Button text="+ New Note" onClick={() => setIsPanelOpen(true)} />
                )}

                {isPanelOpen && (
                    <NewNotePanel
                        submitNote={async (note: Note) => {
                            setLoading(true);
                            const response = await GetProjectedPoint(note, {points, embeddings});
                            setLoading(false);
                            setPoints(response.points);
                            setEmbeddings(response.embeddings);
                            setIsPanelOpen(false);
                        }}
                        closeNote={() => setIsPanelOpen(false)}
                    />
                )}
                <NoteDisplay note={selectedNote} />
            </div>

            {/* Floating panel top-left */}
            <div
                style={{
                    position: "absolute",
                    top: 24,
                    left: 24,  // <-- changed from right to left
                    zIndex: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 12,
                }}
            >
                <InfoPanel/>
            </div>

        </main>
    );
}
