import { Note, Point } from "../types";
import { Vector3 } from "three";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface AddNoteResponse {
  points: {
    id: number;
    x: number;
    y: number;
    z: number;
  }[];
  embeddings: number[][];
}

const GetNoteResponse = async (request: any) => {
    //console.log(request);
    console.log("Using BACKEND_URL:", BACKEND_URL);

    let response: Response | null = null;
    const urlVariants = [
        `${BACKEND_URL}add_note`,
        `${BACKEND_URL}/add_note`
    ];

    for (const url of urlVariants) {
        try {
            response = await fetch(url, request);
            if (response.ok) break; // Exit loop on success
        } catch (err) {
            console.warn(`Fetch failed for URL: ${url}`, err);
        }
    }

    if (!response || !response.ok) {
        console.error("Unable to fetch first point from any URL variant.");
        throw new Error(`API error: ${response?.statusText ?? "No response"}`);
    }
    return await response.json()
}

export const GetFirstPoint = async (note: Note): Promise<{ point: Point; embeddings: number[][] }> => {
    const note_to_send = {
        id: note.id,
        text: note.name,}
    console.log("Sending note:", note_to_send);
    const request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "note": note_to_send,
            "prev_embeds": [],
            "prev_points": [],
            "prev_ids": [],
        }),
    }

    const data: AddNoteResponse = await GetNoteResponse(request);

    const p = data.points[0];

    console.log("Received point:", p);
    return {
        point: {
            id: p.id,
            position: new Vector3(p.x, p.y, p.z),
            note,
        },
        embeddings: data.embeddings,
    };
};

export const GetProjectedPoint = async (
    
    note: Note,
    previous: { points: Point[]; embeddings: number[][] }
): Promise<{ points: Point[]; embeddings: number[][] }> => {

    const note_to_send = {
        id: note.id,
        text: `name: ${note.name} content: ${note.content}`,  // Map frontend `name` to backend `text`
    };
    console.log("Sending note:", note_to_send);
    console.log("With previous embeddings:", previous.embeddings.length);

    const request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            note: note_to_send,
            prev_embeds: previous.embeddings,
            prev_points: previous.points.map((p) => [p.position.x, p.position.y, p.position.z]),
            prev_ids: previous.points.map((p) => p.id),
        }),
    }

    const data: AddNoteResponse = await GetNoteResponse(request);

    const points = data.points.map((p) => ({
        id: p.id,
        position: new Vector3(p.x, p.y, p.z),
        note: p.id === note.id ? note : previous.points.find((pt) => pt.id === p.id)?.note ?? {
            id: p.id,
            name: "Unknown",
            content: "",
        },
    }));
    console.log("Received number of entries:", data.points.length);

    return {
        points,
        embeddings: data.embeddings,
    };
};

