"use client";

import { Suspense, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, Sparkles } from "@react-three/drei";
import CakeModel, {
  Dollop,
  Macaron,
  Strawberry,
  palettes,
  type Flavor,
} from "./CakeModel";

const floaters: {
  kind: "strawberry" | "macaron" | "dollop";
  position: [number, number, number];
  scale: number;
  rotation: [number, number, number];
  speed: number;
}[] = [
  { kind: "strawberry", position: [-3.5, 1.45, 0.9], scale: 1.25, rotation: [0.2, 0.6, 0.3], speed: 1.1 },
  { kind: "macaron", position: [3.3, 2.05, -0.4], scale: 1.05, rotation: [0.4, 0.2, -0.3], speed: 1.4 },
  { kind: "strawberry", position: [3.05, -0.55, 1.5], scale: 0.9, rotation: [-0.2, 1.4, 0.1], speed: 0.9 },
  { kind: "dollop", position: [-3.15, -0.75, 0.2], scale: 1.15, rotation: [0, 0.8, 0.2], speed: 1.25 },
  { kind: "macaron", position: [-2.35, 2.55, -1.3], scale: 0.85, rotation: [0.2, -0.5, 0.4], speed: 1.6 },
  { kind: "strawberry", position: [2.1, 2.9, 0.6], scale: 0.78, rotation: [0.3, 0.2, -0.2], speed: 1.0 },
  { kind: "dollop", position: [3.6, 0.85, -1.1], scale: 0.8, rotation: [0.1, 0.4, -0.3], speed: 1.35 },
];

function FloatingIngredients({ flavor }: { flavor: Flavor }) {
  const palette = palettes[flavor];

  return (
    <group>
      {floaters.map((item, index) => (
        <Float
          key={`${item.kind}-${index}`}
          speed={item.speed}
          rotationIntensity={0.55}
          floatIntensity={0.9}
          floatingRange={[-0.16, 0.16]}
        >
          {item.kind === "strawberry" ? (
            <Strawberry
              position={item.position}
              scale={item.scale}
              rotation={item.rotation}
            />
          ) : null}
          {item.kind === "macaron" ? (
            <Macaron
              position={item.position}
              scale={item.scale}
              rotation={item.rotation}
              color={index % 2 === 0 ? palette.macaron : palette.macaronAlt}
              filling={palette.cream}
            />
          ) : null}
          {item.kind === "dollop" ? (
            <Dollop
              color={palette.cream}
              position={item.position}
              scale={item.scale}
              rotation={item.rotation[1]}
            />
          ) : null}
        </Float>
      ))}
    </group>
  );
}

/* A soft-edged studio floor. The radial alpha ramp dissolves the rim so the
   canvas never shows a hard horizon line against the section background. */
function StageDisc() {
  const alphaMap = useMemo(() => {
    if (typeof document === "undefined") return null;

    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(0.4, "#ffffff");
    gradient.addColorStop(0.66, "#d2d2d2");
    gradient.addColorStop(0.85, "#5a5a5a");
    gradient.addColorStop(1, "#000000");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.NoColorSpace;
    return texture;
  }, []);

  return (
    <mesh position={[0, -1.605, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[8, 128]} />
      <meshStandardMaterial
        color="#24130c"
        roughness={0.94}
        metalness={0.05}
        alphaMap={alphaMap ?? undefined}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

function Rig() {
  useFrame((state, delta) => {
    const { camera } = state;
    const targetX = state.pointer.x * 0.55;
    const targetY = 2.05 + state.pointer.y * 0.3;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 2, delta);
    camera.lookAt(0, 0.05, 0);
  });

  return null;
}

function Scene({ flavor }: { flavor: Flavor }) {
  const { viewport } = useThree();
  const scale = useMemo(
    () => Math.max(0.5, Math.min(1, viewport.width / 7.2)),
    [viewport.width],
  );

  return (
    <group scale={scale}>
      <CakeModel flavor={flavor} />
      <FloatingIngredients flavor={flavor} />

      <StageDisc />

      <mesh position={[0, -1.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.16, 3.2, 128]} />
        <meshStandardMaterial
          color="#b8935f"
          metalness={0.9}
          roughness={0.35}
          transparent
          opacity={0.7}
        />
      </mesh>

      <Sparkles
        count={70}
        scale={[8, 5, 6]}
        position={[0, 0.3, 0]}
        size={1.6}
        speed={0.28}
        opacity={0.45}
        color="#f0cd9a"
        noise={1.4}
      />
    </group>
  );
}

export default function CakeScene({
  flavor,
  active = true,
}: {
  flavor: Flavor;
  active?: boolean;
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      shadows
      dpr={[1, 1.7]}
      camera={{ position: [0, 2.05, 9.4], fov: 33, near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 1.04;
      }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.32} color="#f7e6d0" />
        <directionalLight
          position={[5.5, 9, 6]}
          intensity={2.4}
          color="#fff3e0"
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0004}
          shadow-normalBias={0.02}
          shadow-camera-left={-7}
          shadow-camera-right={7}
          shadow-camera-top={7}
          shadow-camera-bottom={-7}
          shadow-camera-far={30}
        />
        <spotLight
          position={[-6, 5.5, 3.5]}
          angle={0.55}
          penumbra={1}
          intensity={120}
          color="#ffd9bd"
          distance={24}
        />
        <spotLight
          position={[6, 4, -4]}
          angle={0.6}
          penumbra={1}
          intensity={90}
          color="#d8a99a"
          distance={26}
        />
        <pointLight position={[0, -0.8, 4.5]} intensity={14} color="#ffcfa0" />

        <Environment resolution={256} frames={1}>
          <Lightformer
            form="rect"
            intensity={3.4}
            position={[0, 5, -5]}
            scale={[12, 8, 1]}
            color="#fff3e2"
          />
          <Lightformer
            form="circle"
            intensity={2.6}
            position={[-6, 2, 3]}
            scale={5}
            color="#ffd8bf"
          />
          <Lightformer
            form="ring"
            intensity={2.2}
            position={[6, 3, 2]}
            scale={4}
            color="#f5c88f"
          />
          <Lightformer
            form="rect"
            intensity={1.1}
            position={[0, -3, 2]}
            scale={[10, 4, 1]}
            color="#8a6a52"
          />
        </Environment>

        <Rig />
        <Scene flavor={flavor} />
      </Suspense>
    </Canvas>
  );
}
