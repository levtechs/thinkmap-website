"use client";

import { useState } from "react";
import { Vector3, PerspectiveCamera } from "three";
import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import { Point } from "../types";
import { radius } from "../globals";

interface SpherePointsParams {
    points: Point[];
    numLabeled: number;
    clickHandler: (id: number) => void;
}

export default function SpherePoints({ points, numLabeled, clickHandler }: SpherePointsParams) {
    const { camera, size } = useThree();
    const [visibleIds, setVisibleIds] = useState<Set<number>>(new Set());

    // Cast camera to PerspectiveCamera
    const perspectiveCamera = camera as PerspectiveCamera;

    // Determine scale based on screen orientation
    const aspect = size.width / size.height;
    let sphereScale = radius * 1.8; // default for landscape

    if (aspect < 1) {
        // Portrait: fill ~90% of width
        const distance = perspectiveCamera.position.z;
        const fovRad = (perspectiveCamera.fov * Math.PI) / 180;
        const viewHeight = 2 * distance * Math.tan(fovRad / 2); // vertical height in 3D units
        const viewWidth = viewHeight * aspect;

        sphereScale = (viewWidth) * 0.9; // 0.9 to leave a margin
    }

    useFrame(() => {
        const camForward = new Vector3(0, 0, -1).applyQuaternion(camera.quaternion);

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
        const changed =
            newVisibleIds.size !== visibleIds.size ||
            [...newVisibleIds].some(id => !visibleIds.has(id));
        if (changed) setVisibleIds(newVisibleIds);
    });

    return (
        <group scale={sphereScale}>
            {/* Translucent sphere surface */}
            <mesh>
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial color="gray" wireframe transparent opacity={0.2} />
            </mesh>

            {points.map(({ id, position, note }) => (
                <group key={id} position={position}>
                    <mesh onClick={() => clickHandler(id)} castShadow receiveShadow>
                        <sphereGeometry args={[0.05, 16, 16]} />
                        <meshStandardMaterial color="skyblue" />
                    </mesh>

                    {visibleIds.has(id) && (
                        <Html distanceFactor={10} position={[0.08, 0.08, 0]}>
                            <div className="bg-gray-400/80 px-2 py-1 rounded text-xs font-bold text-black shadow-sm pointer-events-none select-none whitespace-nowrap">
                                {note.name}
                            </div>
                        </Html>
                    )}
                </group>
            ))}
        </group>
    );
}
