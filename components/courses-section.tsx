"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Stars } from "@react-three/drei";
import { useRef, useState } from "react";

import {
  BookOpen,
  Globe,
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  Laptop,
  BarChart,
  Landmark,
  ScrollText,
} from "lucide-react";

/* SUBJECTS */
const subjects = [
  { name: "Tamil", icon: BookOpen },
  { name: "English", icon: BookOpen },
  { name: "French", icon: Globe },
  { name: "Hindi", icon: BookOpen },
  { name: "Maths", icon: Calculator },
  { name: "Physics", icon: Atom },
  { name: "Chemistry", icon: FlaskConical },
  { name: "Biology", icon: Dna },
  { name: "Computer Science", icon: Laptop },
  { name: "Statistics", icon: BarChart },
  { name: "Economics", icon: Landmark },
  { name: "Commerce", icon: Landmark },
  { name: "Accountancy", icon: ScrollText },
  { name: "History", icon: ScrollText },
  { name: "Geography", icon: Globe },
];

/* 🌐 WIDE SPHERE (ELLIPSE) */
function getSpherePosition(index: number, total: number, radius: number) {
  const phi = Math.acos(-1 + (2 * index) / total);
  const theta = Math.sqrt(total * Math.PI) * phi;

  const x = radius * Math.cos(theta) * Math.sin(phi) * 1.8; // width
  const y = radius * Math.sin(theta) * Math.sin(phi) * 0.7; // reduce height
  const z = radius * Math.cos(phi);

  return [x, y, z];
}

/* 🔄 FLOATING GROUP */
function FloatingGroup({ children }: any) {
  const ref = useRef<any>();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.2;
    ref.current.rotation.x = Math.sin(t * 0.25) * 0.08;
  });

  return <group ref={ref}>{children}</group>;
}

/* 🎯 SUBJECT NODE (ICON ONLY) */
function Subject({ position, label, icon, index }: any) {
  const ref = useRef<any>();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // floating motion
    ref.current.position.y =
      position[1] + Math.sin(t + index) * 0.2;

    // pulse + hover
    const scale = hovered ? 1.25 : 1 + Math.sin(t * 2 + index) * 0.05;
    ref.current.scale.set(scale, scale, scale);
  });

  const Icon = icon;

  return (
    <group
      ref={ref}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Html distanceFactor={8}>
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl 
        bg-white/10 backdrop-blur-md border border-white/20 
        shadow-lg transition hover:bg-white/20">
          
          <Icon size={20} className="text-yellow-400" />

          <span className="text-white text-sm font-semibold whitespace-nowrap">
            {label}
          </span>
        </div>
      </Html>
    </group>
  );
}

/* 🚀 MAIN COMPONENT */
export function CoursesSection() {
  return (
    <section className="h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col">

      {/* Title */}
      <h2 className="text-center text-4xl font-bold pt-6 mb-2">
        Subjects We Offer
      </h2>

      <div className="flex-1">
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
          
          {/* 🌟 Background */}
          <Stars
            radius={80}
            depth={60}
            count={5000}
            factor={4}
            fade
            speed={1}
          />

          {/* 💡 Lights */}
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={1.5} />

          {/* 🔄 Wide Layout */}
          <FloatingGroup>
            {subjects.map((sub, i) => {
              const position = getSpherePosition(
                i,
                subjects.length,
                3.8 // 👈 slightly bigger spread
              );

              return (
                <Subject
                  key={i}
                  position={position}
                  label={sub.name}
                  icon={sub.icon}
                  index={i}
                />
              );
            })}
          </FloatingGroup>

          {/* 🎮 Controls */}
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={0.3}
          />
        </Canvas>
      </div>
    </section>
  );
}
