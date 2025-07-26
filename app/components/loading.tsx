import React, { useEffect, useState } from "react";

export default function LoadingPanel() {
    const [dots, setDots] = useState(".");

    // Animate dots in "Loading..." text
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
        }, 400);
        return () => clearInterval(interval);
    }, []);

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
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                margin: "auto",
                alignItems: "center",
            }}
        >
            <h1
                style={{
                    padding: 8,
                    fontSize: 24,
                }}
            >
                Loading{dots}
            </h1>

            <div style={{ display: "flex", gap: 8, margin: "8px 0" }}>
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        style={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor: "rgba(147, 197, 253, 0.8)",
                            animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                        }}
                    />
                ))}
            </div>

            <p
                style={{
                    padding: 8,
                    fontSize: 16,
                    fontFamily: "inherit",
                    textAlign: "center",
                }}
            >
                Preparing your embedding.
            </p>

            <p
                style={{
                    padding: 8,
                    fontSize: 12,
                    fontFamily: "inherit",
                    textAlign: "center",
                }}
            >
                ThinkMap is assembling your graph.
            </p>

            {/* Keyframes for animation */}
            <style>{`
                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.6;
                    }
                    50% {
                        transform: scale(1.4);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
}
