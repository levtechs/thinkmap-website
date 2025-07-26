import { Note } from "../types";
import { Vector3 } from "three";
import { Point } from "../types";

export function getRandom4DigitId(): number {
    return Math.floor(10000 + Math.random() * 90000);
}

export const GenerateBlankNote = (): Note => {
    return {id: getRandom4DigitId(), name: "My first note", content: "click on the new note button to add a note!"}
}

export const GeneratePoint = (theta: number, phi: number, radius: number, note: Note) => {
    const id = getRandom4DigitId();
    const x = radius * Math.sin(theta) * Math.cos(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(theta);
    return {id: id, position: new Vector3(x, y, z), note: note}
}

export const GenerateRandomPoint = (radius: number, note: Note) => {
    const theta = Math.acos(2 * Math.random() - 1);
    const phi = 2 * Math.PI * Math.random();
    return GeneratePoint(theta, phi, radius, note)
}

export const GenerateRandomPoints = (radius: number, numPoints: number) =>{

    const pts: Point[] = [];
    for (let i = 0; i < numPoints; i++) {
        const id = getRandom4DigitId();
        pts.push(GenerateRandomPoint(radius, {id: id, name: id.toString(), content: `note: ${id.toString()}`}));
    }
    return pts;
}