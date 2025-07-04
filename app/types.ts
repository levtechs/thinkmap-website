import { Vector3 } from "three";

export type Point = {
  id: number;
  position: Vector3;
  note: Note;
};

export type Note = {
  id: number
  name: string;
  content: string;
}

export type Embedding = number[];

export interface EmbeddingData {
  embeddings: Embedding[];
  points: Point[];
}