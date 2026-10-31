"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import type { Flavor } from "@/lib/data";

export type { Flavor };

export const palettes: Record<
  Flavor,
  {
    frosting: string;
    cream: string;
    drip: string;
    accent: string;
    macaron: string;
    macaronAlt: string;
  }
> = {
  vanilla: {
    frosting: "#f3e6d2",
    cream: "#fbf4e6",
    drip: "#f8eeda",
    accent: "#c99d8b",
    macaron: "#e9c3b3",
    macaronAlt: "#d9b183",
  },
  pistachio: {
    frosting: "#e4e6cc",
    cream: "#f7f6e6",
    drip: "#dbe0c4",
    accent: "#8f9f69",
    macaron: "#c7d2a5",
    macaronAlt: "#e7d3ae",
  },
  chocolate: {
    frosting: "#e7cdb3",
    cream: "#f8ecdb",
    drip: "#7c462e",
    accent: "#7a452d",
    macaron: "#8b5a3c",
    macaronAlt: "#d8b48e",
  },
};

/* A tiny procedural bump map so the buttercream reads as hand-worked rather
   than perfectly machined. Generated once, shared by every frosting material. */
let bumpTexture: THREE.CanvasTexture | null = null;

function getButtercreamBump() {
  if (typeof document === "undefined") return null;
  if (bumpTexture) return bumpTexture;

  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const image = ctx.createImageData(size, size);
  for (let i = 0; i < image.data.length; i += 4) {
    const value = 118 + Math.random() * 64;
    image.data[i] = value;
    image.data[i + 1] = value;
    image.data[i + 2] = value;
    image.data[i + 3] = 255;
  }
  ctx.putImageData(image, 0, 0);

  // Soft, cloudy pass over the grain.
  for (let i = 0; i < 700; i += 1) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = 3 + Math.random() * 14;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    const light = Math.random() > 0.5;
    gradient.addColorStop(0, light ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.anisotropy = 4;
  bumpTexture = texture;
  return texture;
}

function FrostingMaterial({
  color,
  roughness = 0.6,
  clearcoat = 0.12,
  bumpScale = 0.014,
}: {
  color: string;
  roughness?: number;
  clearcoat?: number;
  bumpScale?: number;
}) {
  const material = useRef<THREE.MeshPhysicalMaterial>(null);
  const [initial] = useState(color);
  const target = useMemo(() => new THREE.Color(color), [color]);
  const bump = useMemo(() => getButtercreamBump(), []);

  useFrame((_, delta) => {
    if (!material.current) return;
    material.current.color.lerp(target, Math.min(1, delta * 2.4));
  });

  return (
    <meshPhysicalMaterial
      ref={material}
      color={initial}
      bumpMap={bump ?? undefined}
      bumpScale={bumpScale}
      roughness={roughness}
      metalness={0}
      clearcoat={clearcoat}
      clearcoatRoughness={0.6}
      sheen={0.6}
      sheenColor="#fff2df"
      sheenRoughness={0.85}
    />
  );
}

function random(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function tierProfile(radius: number, height: number) {
  const bevel = Math.min(0.085, radius * 0.055);
  return [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(radius - bevel, 0),
    new THREE.Vector2(radius, bevel),
    new THREE.Vector2(radius, height - bevel),
    new THREE.Vector2(radius - bevel, height),
    new THREE.Vector2(0, height),
  ];
}

function Drips({
  radius,
  top,
  color,
  count = 22,
  seed = 1,
}: {
  radius: number;
  top: number;
  color: string;
  count?: number;
  seed?: number;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => {
    // A teardrop profile: narrow rounded tip at the bottom, wide where it
    // meets the tier's top edge, so the icing reads as a real buttercream drip.
    const profile = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0.016, 0.012),
      new THREE.Vector2(0.034, 0.048),
      new THREE.Vector2(0.046, 0.135),
      new THREE.Vector2(0.053, 0.38),
      new THREE.Vector2(0.057, 0.72),
      new THREE.Vector2(0.058, 1),
    ];
    return new THREE.LatheGeometry(profile, 10);
  }, []);
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color,
        roughness: 0.46,
        clearcoat: 0.3,
        clearcoatRoughness: 0.4,
        sheen: 0.45,
        sheenColor: "#fff1de",
      }),
    [color],
  );

  useLayoutEffect(() => {
    const instanced = mesh.current;
    if (!instanced) return;
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2;
      const noise = random(i + seed * 17);
      const length = 0.22 + noise * 0.46;
      const width = 0.85 + random(i + seed * 31) * 0.3;
      const r = radius * 0.995;

      dummy.position.set(
        Math.cos(angle) * r,
        top - length + 0.02,
        Math.sin(angle) * r,
      );
      dummy.rotation.set(0, -angle, 0);
      dummy.scale.set(width, length, width);
      dummy.updateMatrix();
      instanced.setMatrixAt(i, dummy.matrix);
    }

    instanced.instanceMatrix.needsUpdate = true;
  }, [count, radius, top, seed]);

  return (
    <instancedMesh
      ref={mesh}
      args={[geometry, material, count]}
      castShadow
      receiveShadow
    />
  );
}

function Pearls({
  radius,
  y,
  count = 26,
  color,
}: {
  radius: number;
  y: number;
  count?: number;
  color: string;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => new THREE.SphereGeometry(0.052, 12, 12), []);
  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color,
        roughness: 0.36,
        clearcoat: 0.4,
        clearcoatRoughness: 0.35,
        sheen: 0.55,
        sheenColor: "#fff2e0",
      }),
    [color],
  );

  useLayoutEffect(() => {
    const instanced = mesh.current;
    if (!instanced) return;
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2;
      dummy.position.set(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius,
      );
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      instanced.setMatrixAt(i, dummy.matrix);
    }
    instanced.instanceMatrix.needsUpdate = true;
  }, [count, radius, y]);

  return (
    <instancedMesh
      ref={mesh}
      args={[geometry, material, count]}
      castShadow
      receiveShadow
    />
  );
}

export function Dollop({
  color,
  position,
  scale = 1,
  rotation = 0,
}: {
  color: string;
  position: [number, number, number];
  scale?: number;
  rotation?: number;
}) {
  const geometry = useMemo(() => {
    const points = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0.13, 0.005),
      new THREE.Vector2(0.156, 0.07),
      new THREE.Vector2(0.136, 0.15),
      new THREE.Vector2(0.082, 0.222),
      new THREE.Vector2(0.026, 0.268),
      new THREE.Vector2(0, 0.278),
    ];
    return new THREE.LatheGeometry(points, 24);
  }, []);

  return (
    <mesh
      geometry={geometry}
      position={position}
      rotation={[0, rotation, 0]}
      scale={scale}
      castShadow
      receiveShadow
    >
      <FrostingMaterial color={color} roughness={0.64} bumpScale={0.02} />
    </mesh>
  );
}

export function Strawberry({
  position,
  scale = 1,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh castShadow scale={[1, 1.18, 1]} position={[0, 0.16, 0]}>
        <sphereGeometry args={[0.2, 24, 20]} />
        <meshPhysicalMaterial
          color="#9e1f2a"
          roughness={0.34}
          clearcoat={0.5}
          clearcoatRoughness={0.28}
          sheen={0.45}
          sheenColor="#ff8f86"
        />
      </mesh>
      <mesh position={[0, 0.36, 0]} castShadow>
        <coneGeometry args={[0.19, 0.15, 6]} />
        <meshStandardMaterial color="#4b6238" roughness={0.72} />
      </mesh>
      <mesh position={[0, 0.46, 0]} castShadow>
        <cylinderGeometry args={[0.016, 0.024, 0.13, 6]} />
        <meshStandardMaterial color="#3d5030" roughness={0.82} />
      </mesh>
    </group>
  );
}

export function Macaron({
  position,
  rotation = [0, 0, 0],
  color,
  filling,
  scale = 1,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  filling: string;
  scale?: number;
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh castShadow position={[0, 0.055, 0]}>
        <cylinderGeometry args={[0.2, 0.19, 0.075, 24]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.56}
          clearcoat={0.14}
          sheen={0.45}
          sheenColor="#fff2df"
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.186, 0.186, 0.055, 24]} />
        <meshStandardMaterial color={filling} roughness={0.62} />
      </mesh>
      <mesh castShadow position={[0, -0.055, 0]}>
        <cylinderGeometry args={[0.19, 0.2, 0.075, 24]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.56}
          clearcoat={0.14}
          sheen={0.45}
          sheenColor="#fff2df"
        />
      </mesh>
    </group>
  );
}

function GoldFlakes({ top, radius }: { top: number; radius: number }) {
  const flakes = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => {
        const angle = i * 2.39996;
        const r = radius * (0.25 + random(i + 3) * 0.6);
        return {
          position: [
            Math.cos(angle) * r,
            top + 0.03 + random(i + 9) * 0.02,
            Math.sin(angle) * r,
          ] as [number, number, number],
          rotation: [
            random(i + 1) * Math.PI,
            random(i + 2) * Math.PI,
            random(i + 4) * Math.PI,
          ] as [number, number, number],
          size: 0.028 + random(i + 7) * 0.05,
        };
      }),
    [top, radius],
  );

  return (
    <group>
      {flakes.map((flake, index) => (
        <mesh
          key={index}
          position={flake.position}
          rotation={flake.rotation}
          scale={[flake.size, flake.size * 0.6, flake.size]}
        >
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#c8a46d"
            metalness={1}
            roughness={0.24}
            side={THREE.DoubleSide}
            emissive="#c8a46d"
            emissiveIntensity={0.12}
          />
        </mesh>
      ))}
    </group>
  );
}

function Tier({
  radius,
  height,
  base,
  palette,
  drips,
  seed,
  pearls,
  dollops,
}: {
  radius: number;
  height: number;
  base: number;
  palette: (typeof palettes)[Flavor];
  drips?: number;
  seed: number;
  pearls?: number;
  dollops?: boolean;
}) {
  const points = useMemo(() => tierProfile(radius, height), [radius, height]);

  return (
    <group position={[0, base, 0]}>
      <mesh castShadow receiveShadow>
        <latheGeometry args={[points, 96]} />
        <FrostingMaterial color={palette.frosting} />
      </mesh>

      <Pearls
        radius={radius * 0.992}
        y={0.085}
        count={pearls ?? Math.round(radius * 15)}
        color={palette.cream}
      />

      <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[radius * 0.975, 0.016, 8, 96]} />
        <meshStandardMaterial
          color="#b8935f"
          metalness={0.9}
          roughness={0.3}
        />
      </mesh>

      {drips ? (
        <Drips
          radius={radius}
          top={height}
          color={palette.drip}
          count={drips}
          seed={seed}
        />
      ) : null}

      <mesh
        position={[0, height + 0.002, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[radius * 0.995, 72]} />
        <FrostingMaterial color={palette.cream} roughness={0.68} bumpScale={0.01} />
      </mesh>

      {dollops ? (
        <group position={[0, height, 0]}>
          {Array.from({ length: 8 }).map((_, index) => {
            const angle = (index / 8) * Math.PI * 2 + seed;
            const r = radius * 0.8;
            return (
              <Dollop
                key={index}
                color={palette.cream}
                position={[Math.cos(angle) * r, 0, Math.sin(angle) * r]}
                rotation={angle}
                scale={0.72}
              />
            );
          })}
        </group>
      ) : null}
    </group>
  );
}

function BerryRing({
  y,
  radius,
  count,
  palette,
  seed,
  macarons = true,
}: {
  y: number;
  radius: number;
  count: number;
  palette: (typeof palettes)[Flavor];
  seed: number;
  macarons?: boolean;
}) {
  return (
    <group position={[0, y, 0]}>
      {Array.from({ length: count }).map((_, index) => {
        const angle = (index / count) * Math.PI * 2 + seed;
        const wobble = 1 + (random(index + seed) - 0.5) * 0.05;
        return (
          <group key={index}>
            <Strawberry
              position={[
                Math.cos(angle) * radius * wobble,
                0.01,
                Math.sin(angle) * radius * wobble,
              ]}
              scale={0.52 + random(index + 4) * 0.12}
              rotation={[0, -angle + random(index) * 0.6, 0.06]}
            />
            {macarons && index % 2 === 0 ? (
              <Macaron
                position={[
                  Math.cos(angle + Math.PI / count) * radius * 1.02,
                  0.02,
                  Math.sin(angle + Math.PI / count) * radius * 1.02,
                ]}
                rotation={[0, -angle, 0]}
                color={index % 4 === 0 ? palette.macaron : palette.macaronAlt}
                filling={palette.cream}
                scale={0.5}
              />
            ) : null}
          </group>
        );
      })}
    </group>
  );
}

export default function CakeModel({ flavor }: { flavor: Flavor }) {
  const group = useRef<THREE.Group>(null);
  const palette = palettes[flavor];

  useFrame((state, delta) => {
    const cake = group.current;
    if (!cake) return;

    cake.rotation.y += delta * 0.1;

    const targetX = 0.015 + state.pointer.y * 0.045;
    const targetZ = -state.pointer.x * 0.03;

    cake.rotation.x = THREE.MathUtils.damp(cake.rotation.x, targetX, 2.2, delta);
    cake.rotation.z = THREE.MathUtils.damp(cake.rotation.z, targetZ, 2.2, delta);

    cake.position.y = -1.58 + Math.sin(state.clock.elapsedTime * 0.7) * 0.02;
  });

  return (
    <group ref={group} position={[0, -1.58, 0]}>
      {/* Cake board */}
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.98, 3.02, 0.12, 96]} />
        <meshPhysicalMaterial
          color="#241610"
          roughness={0.58}
          metalness={0.05}
          clearcoat={0.18}
          clearcoatRoughness={0.6}
          envMapIntensity={0.45}
        />
      </mesh>
      <mesh position={[0, 0.062, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.99, 0.012, 8, 128]} />
        <meshStandardMaterial
          color="#c8a46d"
          metalness={0.92}
          roughness={0.28}
        />
      </mesh>

      <Tier
        radius={2.26}
        height={1.16}
        base={0.12}
        palette={palette}
        drips={26}
        seed={1}
        pearls={34}
      />
      <BerryRing
        y={1.28}
        radius={1.96}
        count={14}
        palette={palette}
        seed={0.4}
      />

      <Tier
        radius={1.6}
        height={1.02}
        base={1.28}
        palette={palette}
        drips={20}
        seed={2}
        pearls={24}
      />
      <BerryRing
        y={2.3}
        radius={1.36}
        count={10}
        palette={palette}
        seed={1.1}
      />

      <Tier
        radius={1.0}
        height={0.92}
        base={2.3}
        palette={palette}
        drips={14}
        seed={3}
        pearls={16}
        dollops
      />

      {/* Crown */}
      <group position={[0, 3.22, 0]}>
        <Strawberry position={[0.2, 0.01, 0.1]} scale={1.02} rotation={[0, 0.3, 0.04]} />
        <Strawberry position={[-0.32, 0.01, 0.24]} scale={0.9} rotation={[0, 1.4, -0.08]} />
        <Strawberry position={[0.02, 0.01, -0.34]} scale={0.82} rotation={[0, 2.4, 0.1]} />
        <Macaron
          position={[-0.16, 0.03, -0.6]}
          rotation={[0, 0.3, 0]}
          color={palette.macaron}
          filling={palette.cream}
          scale={0.8}
        />
        <Macaron
          position={[0.58, 0.03, -0.28]}
          rotation={[0, -0.6, 0]}
          color={palette.macaronAlt}
          filling={palette.cream}
          scale={0.72}
        />
        <Dollop
          color={palette.cream}
          position={[-0.54, 0, 0.4]}
          rotation={1.2}
          scale={0.62}
        />
        <GoldFlakes top={0.02} radius={0.95} />
      </group>
    </group>
  );
}
