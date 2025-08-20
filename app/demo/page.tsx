"use client";

import { useRef } from "react";
import InfoPanel from "../components/info";
import Link from "next/link";

export default function VideoPanel() {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    return (
        <div className="fixed inset-0 flex flex-col justify-center items-center z-50 p-4">
            <div className="border border-blue-300 rounded-2xl p-6 w-full max-w-[1200px] overflow-y-auto">
                {/* Use flex-col by default, flex-row on medium+ screens */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                    {/* Video Player */}
                    <video ref={videoRef} width="100%" height="auto" controls className="md:w-[960px] md:h-[540px] rounded">
                        <source src="/demo.webm" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Another Component */}
                    <div className="w-full md:max-w-md">
                        <InfoPanel
                            title="Demo info"
                            content={
                                <div className="flex flex-col gap-4">
                                    <p className="mb-4 text-sm">
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
