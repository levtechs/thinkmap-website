"use client";

import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from "@react-three/drei";
import { useEffect } from "react";
import { PerspectiveCamera } from "three";
import SpherePoints from "./mesh";
import { Point } from '../types';

function FixedOrbitControls() {
    return (
        <OrbitControls
            enableZoom={false}
            enablePan={false}
            minDistance={5}
            maxDistance={5}
        />
    );
}

function AutoFitCamera() {
    const { camera } = useThree();

    useEffect(() => {
        const radius = 2;
        const perspectiveCamera = camera as PerspectiveCamera;
        const fov = (perspectiveCamera.fov * Math.PI) / 180;
        const distance = radius / Math.sin(fov / 2);

        perspectiveCamera.position.set(0, 0, distance);
        perspectiveCamera.lookAt(0, 0, 0);
        perspectiveCamera.updateProjectionMatrix();
    }, [camera]);

    return null;
}

interface EnvironmentProps {
  points: Point[];
  clickHandler: (id: number) => void;
}

export default function Environment({ points, clickHandler}: EnvironmentProps) {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <AutoFitCamera />
            <FixedOrbitControls />
            <SpherePoints points={points} numLabeled={5} clickHandler={clickHandler}/>
        </Canvas>
    );
}
