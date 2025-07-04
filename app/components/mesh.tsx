"use client";

import { useState } from "react";
import { Vector3 } from "three";
import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { MeshBasicMaterial } from "three";

import { Point } from "../types";

import { radius } from "../globals";

interface SpherePointsParams {
  points: Point[]
  numLabeled: number
  clickHandler: (id: number) => void;
}

export default function SpherePoints({ points , numLabeled, clickHandler}: SpherePointsParams) {

  const { camera } = useThree();
  const [visibleIds, setVisibleIds] = useState<Set<number>>(new Set());

  useFrame(() => {
    // Camera forward vector
    const camForward = new Vector3(0, 0, -1).applyQuaternion(camera.quaternion);

    // Find points in front, sorted by distance, show closest 5
    const visible = points
      .map(({ id, position }) => {
        const toPoint = position.clone().sub(camera.position).normalize();
        const dot = toPoint.dot(camForward);
        const dist = position.distanceTo(camera.position);
        return { id, position, dot, dist };
      })
      .filter(p => p.dot > 0.85)
      .sort((a, b) => a.dist - b.dist)
      .slice(0, numLabeled);

    const newVisibleIds = new Set(visible.map(p => p.id));

    // Update state only if changed
    const changed =
      newVisibleIds.size !== visibleIds.size ||
      [...newVisibleIds].some(id => !visibleIds.has(id));
    if (changed) setVisibleIds(newVisibleIds);
  });

  return (
    <group scale={radius*1.8}>
      {/* Translucent sphere surface for visual context */}
      <mesh>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="gray"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
      {points.map(({ id, position, note }) => (
        <group key={id} position={position}>
          <mesh
            onClick={() => clickHandler(id)}
            castShadow
            receiveShadow
          >
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="skyblue" />
          </mesh>

          {visibleIds.has(id) && (
            <Html distanceFactor={10} position={[0.08, 0.08, 0]}>
              <div
                style={{
                  background: "rgba(128, 128, 128, 0.8)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#000",
                  boxShadow: "0 0 4px rgba(0,0,0,0.5)",
                  pointerEvents: "none",
                  userSelect: "none",
                  whiteSpace: "nowrap",
                }}
              >
                {note.name}
              </div>
            </Html>
          )}
        </group>
      ))}
    </group>
  );
}
