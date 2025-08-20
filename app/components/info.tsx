"use client";

import React, { useState } from "react";

interface InfoPanelProps {
    title?: string;
    content?: React.ReactNode;
}

export default function InfoPanel({ title, content }: InfoPanelProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full max-w-md mx-auto my-5 p-4 bg-gray-800 bg-opacity-20 text-white border border-blue-300 border-opacity-50 rounded-lg select-none font-sans">
            {/* Header */}
            <div
                onClick={() => setOpen(!open)}
                className="flex justify-between items-center p-2 rounded cursor-pointer font-semibold text-lg tracking-wide"
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                {title || "How ThinkMap works"}
                <span
                    className={`text-xl select-none transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
                >
                    ▼
                </span>
            </div>

            {/* Content */}
            {open && (
                <div className="mt-2 p-2 border-opacity-50 rounded overflow-y-auto">
                    {content || <DefaultInfoContents />}
                </div>
            )}
        </div>
    );
}

const DefaultInfoContents = () => {
    return (
        <div className="flex flex-col gap-4">
            <p>
                <a href="/demo" className="font-bold text-blue-400 underline">
                    watch demo
                </a>
            </p>
            <p>
                Source code -{" "}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/levtechs/thinkmap-website"
                    className="font-bold text-blue-400 underline"
                >
                    frontend
                </a>{" "}
                -{" "}
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/levtechs/thinkmap-backend"
                    className="font-bold text-blue-400 underline"
                >
                    backend
                </a>
                <span className="italic text-sm block mt-1">
                    (follow me on GitHub!)
                </span>
            </p>
            <hr className="my-2 border-blue-300 border-opacity-50" />
            <p className="mb-4 text-sm">
                ThinkMap is an advanced note-taking tool that visualizes your ideas in a dynamic 3D space. To use it, simply add notes by entering a title and some content. Each new note is automatically positioned on a 3D sphere based on its meaning, not just the words it contains. This is made possible through a sentence transformer: a neural network that generates semantic embeddings of your text. These embeddings are then projected using PCA and aligned to fit onto the sphere. As you add more notes, the system adjusts the positions of all points to reflect the new relationships, allowing similar ideas to naturally cluster together. For example, two notes about cartoons will appear near each other even if they use completely different vocabulary. You can continue adding notes one by one, watching your thought landscape evolve in real time.
            </p>
            <p className="italic text-sm font-light">
                Made by Lev Smolsky
            </p>
        </div>
    );
};
