"use client";

import { useRef, useState } from "react";
import InfoPanel from "../components/info"; // if you want to nest the existing player

export default function VideoPanel() {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    return (
        <div
            className="fixed inset-0 flex flex-col justify-center items-center z-50"
        >
            <div
                className="border border-blue-300 rounded-2xl p-6"
                style={{ minWidth: 700 }}
            >
                <div className="flex flex-row items-center gap-4">
                    {/* Video Player */}
                    <video ref={videoRef} width="960" height="540" controls>
                        <source src="/demo.webm" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Another Component */}
                    <div className="max-w-md">
                        <DemoInfo />
                        <InfoPanel />
                    </div>
                </div>
                <p className="text-center mt-4">
                    <a
                        href="/"
                        className="font-bold underline"
                    >
                        Back to Home
                    </a>
                </p>
            </div>
        </div>
    );
}
function DemoInfo() {

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
                Demo Info
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
                    <p style={{marginBottom: 15}}>
                        In this video, a new note is added to a space with existing notes. You can see that the "Sentence transformer vs OpenAI Embeddings API" note is placed next to the "UMAP vs PCA" note, due to their semantic similarity. The video demonstrates how ThinkMap uses embeddings to position related notes closer together in 3D space, making it easier to visualize connections between ideas. You can also see other notes that have already been placed, naturally forming clusters based on their content.
                    </p>
                </div>
            )}
        </div>
    );
}
