"use client";

import { useRef } from "react";
import InfoPanel from "../components/info"; // if you want to nest the existing player
import Link from "next/link";

export default function VideoPanel() {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    return (
        <div className="fixed inset-0 flex flex-col justify-center items-center z-50">
            <div className="border border-blue-300 rounded-2xl p-6" style={{ minWidth: 700 }}>
                <div className="flex flex-row items-center gap-4">
                    {/* Video Player */}
                    <video ref={videoRef} width="960" height="540" controls>
                        <source src="/demo.webm" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Another Component */}
                    <div className="max-w-md">
                        <InfoPanel
                            title="Demo info"
                            content={
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
                                    <p style={{ marginBottom: 15 }}>
                                        In this video, a new note is added to a space with existing notes. You can see that the &quot;Sentence transformer vs OpenAI Embeddings API&quot; note is placed next to the &quot;UMAP vs PCA&quot; note, due to their semantic similarity. The video demonstrates how ThinkMap uses embeddings to position related notes closer together in 3D space, making it easier to visualize connections between ideas. You can also see other notes that have already been placed, naturally forming clusters based on their content.
                                    </p>
                                </div>
                            }
                        />
                        <InfoPanel />
                    </div>
                </div>

                <div className="text-center mt-4">
                    <Link href="/" className="font-bold underline">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}