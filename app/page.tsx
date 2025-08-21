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
    const [isServerAwake, setServerAwake] = useState<boolean>(false);

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                const iSA = await TestServer();
                if (!iSA) {
                    console.error("Server is asleep");
                    setLoading(false);
                    setServerAwake(false);
                    return;
                }
            } catch {
                console.error("No environment variable for server URL");
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
        if (point && point.note) setSelectedNote(point.note);
        else console.warn("Note not found for ID:", id);
    };

    return (
        <main className="w-screen h-screen bg-black text-white relative overflow-hidden flex flex-col justify-center items-center">
            {/* 3D Environment */}
            <div className="relative w-full h-full flex-1">
                <div
                    className={`w-full h-full transition-filter duration-300 ${
                        isLoading || !isServerAwake ? "blur-sm" : ""
                    }`}
                >
                    <Environment points={points} clickHandler={handleNoteClick} />
                </div>

                {/* Loading overlay */}
                {isLoading && (
                    <div className="absolute inset-0 flex justify-center items-center z-10 backdrop-blur-sm">
                        <LoadingPanel />
                    </div>
                )}

                {/* Server sleeping overlay */}
                {!isServerAwake && !isLoading && (
                    <div className="absolute inset-0 flex justify-center items-center z-10 backdrop-blur-sm">
                        <SleepingServerPanel />
                    </div>
                )}
            </div>

            {/* Header */}
            <div className="w-full absolute top-1 left-1/2 transform -translate-x-1/2 text-center z-10 flex flex-col items-center gap-2">
                {/* "How ThinkMap works" panel above the title */}
                <div className="md:hidden mb-2 w-max max-w-xs z-50 max-h-158 overflow-y-auto">
                    <InfoPanel />
                </div>

                <h1 className="text-5xl font-extrabold tracking-tight text-gray-400 drop-shadow-md">
                    ThinkMap
                </h1>
                <p className="mt-1 text-sm text-gray-400">Visualize your thoughts in 3D space</p>
            </div>

            {/* Landscape layout panels (desktop) */}
            <div className="hidden md:flex">
                {/* Top-right */}
                <div className="absolute top-6 right-6 z-10 flex flex-col items-start gap-3">
                    {!isPanelOpen && (
                        <Button text="+ New Note" onClick={() => setIsPanelOpen(true)} />
                    )}
                    {isPanelOpen && (
                        <NewNotePanel
                            submitNote={async (note: Note) => {
                                setLoading(true);
                                const response = await GetProjectedPoint(note, { points, embeddings });
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

                {/* Top-left */}
                <div className="absolute top-6 left-6 z-10 flex flex-col items-start gap-3">
                    <InfoPanel />
                </div>
            </div>

            {/* Portrait layout panels (mobile) */}
            <div className="md:hidden absolute bottom-0 bg-black/20 backdrop-blur-sm p-4 flex flex-col items-center gap-4 z-10 rounded-xl">
                {!isPanelOpen && (
                    <Button text="+ New Note" onClick={() => setIsPanelOpen(true)} />
                )}
                {isPanelOpen && (
                    <NewNotePanel
                        submitNote={async (note: Note) => {
                            setLoading(true);
                            const response = await GetProjectedPoint(note, { points, embeddings });
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

        </main>
    );
}
