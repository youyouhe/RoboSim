import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Grid, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface SimulatorViewProps {
  jointAngles: { j1: number; j2: number; j3: number };
}

const RobotArm: React.FC<{ angles: { j1: number; j2: number; j3: number } }> = ({ angles }) => {
  const baseRef = useRef<THREE.Group>(null);
  const arm1Ref = useRef<THREE.Group>(null);
  const arm2Ref = useRef<THREE.Group>(null);
  const arm3Ref = useRef<THREE.Group>(null);

  useFrame(() => {
    // Smooth interpolation for visual fluidity
    if (baseRef.current) {
      baseRef.current.rotation.y = THREE.MathUtils.lerp(baseRef.current.rotation.y, THREE.MathUtils.degToRad(angles.j1 - 90), 0.1);
    }
    if (arm1Ref.current) {
      // Joint 2 (Shoulder)
      arm1Ref.current.rotation.z = THREE.MathUtils.lerp(arm1Ref.current.rotation.z, THREE.MathUtils.degToRad(angles.j2), 0.1);
    }
    if (arm2Ref.current) {
      // Joint 3 (Elbow)
      arm2Ref.current.rotation.z = THREE.MathUtils.lerp(arm2Ref.current.rotation.z, THREE.MathUtils.degToRad(angles.j3 - 90), 0.1);
    }
  });

  const material = useMemo(() => new THREE.MeshStandardMaterial({ color: '#e0e0e0', roughness: 0.3, metalness: 0.5 }), []);
  const jointMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#FF7A00', roughness: 0.5, metalness: 0.1 }), []);

  return (
    <group position={[0, 0, 0]}>
      {/* Base Pedestal */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow material={material}>
        <cylinderGeometry args={[1, 1.2, 2, 32]} />
      </mesh>

      {/* Rotating Base (Joint 1) */}
      <group ref={baseRef} position={[0, 2, 0]}>
        <mesh position={[0, 0.5, 0]} castShadow material={jointMaterial}>
          <cylinderGeometry args={[0.8, 0.8, 1, 32]} />
        </mesh>
        
        {/* Shoulder Structure */}
        <group position={[0, 1, 0]}>
          <mesh position={[0, 0.5, 0]} castShadow material={material}>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
          </mesh>

          {/* Arm 1 (Joint 2) */}
          <group ref={arm1Ref} position={[0, 0.5, 0]}>
             <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]} material={jointMaterial}>
                <cylinderGeometry args={[0.6, 0.6, 1.6, 32]} />
             </mesh>
             
             <group position={[0, 2.5, 0]}>
                <mesh position={[0, -1.25, 0]} castShadow material={material}>
                  <boxGeometry args={[0.8, 2.5, 0.8]} />
                </mesh>

                {/* Arm 2 (Joint 3) */}
                <group ref={arm2Ref} position={[0, 0, 0]}>
                   <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]} material={jointMaterial}>
                      <cylinderGeometry args={[0.5, 0.5, 1.6, 32]} />
                   </mesh>
                   
                   <group position={[0, 2, 0]}>
                      <mesh position={[0, -1, 0]} castShadow material={material}>
                        <boxGeometry args={[0.6, 2, 0.6]} />
                      </mesh>
                      
                      {/* End Effector */}
                      <group position={[0, 0, 0]}>
                        <mesh position={[0, 0.2, 0]} material={jointMaterial}>
                           <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
                        </mesh>
                        {/* Claws */}
                        <mesh position={[-0.2, 0.6, 0]} rotation={[0, 0, -0.2]} material={new THREE.MeshStandardMaterial({ color: '#333' })}>
                           <boxGeometry args={[0.1, 0.8, 0.3]} />
                        </mesh>
                        <mesh position={[0.2, 0.6, 0]} rotation={[0, 0, 0.2]} material={new THREE.MeshStandardMaterial({ color: '#333' })}>
                           <boxGeometry args={[0.1, 0.8, 0.3]} />
                        </mesh>
                      </group>
                   </group>
                </group>
             </group>
          </group>
        </group>
      </group>
    </group>
  );
};

const ConveyorBelt = () => {
  const beltRef = useRef<THREE.Mesh>(null);
  const box1Ref = useRef<THREE.Mesh>(null);
  const box2Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    // Animate texture offset for belt movement effect
    if (beltRef.current && Array.isArray(beltRef.current.material)) {
       // Simple color shift or we need a texture. 
       // For now, let's just animate the boxes.
    }
    
    const speed = 2;
    const limit = 6;
    const start = -6;

    if (box1Ref.current) {
      box1Ref.current.position.x -= speed * delta;
      if (box1Ref.current.position.x < start) box1Ref.current.position.x = limit;
    }
    if (box2Ref.current) {
      box2Ref.current.position.x -= speed * delta;
      if (box2Ref.current.position.x < start) box2Ref.current.position.x = limit;
    }
  });

  return (
    <group position={[0, 0, 3]}>
      {/* Belt Structure */}
      <mesh position={[0, 0.5, 0]} receiveShadow>
        <boxGeometry args={[14, 1, 3]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      {/* Legs */}
      <mesh position={[-6, -1, 0]}>
         <cylinderGeometry args={[0.2, 0.2, 3]} />
         <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[6, -1, 0]}>
         <cylinderGeometry args={[0.2, 0.2, 3]} />
         <meshStandardMaterial color="#333" />
      </mesh>

      {/* Moving Boxes */}
      <mesh ref={box1Ref} position={[2, 1.5, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#FF7A00" />
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
          <lineBasicMaterial color="black" />
        </lineSegments>
      </mesh>
      
      <mesh ref={box2Ref} position={[6, 1.5, 0]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#FF7A00" />
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
          <lineBasicMaterial color="black" />
        </lineSegments>
      </mesh>
    </group>
  );
};

export const SimulatorView: React.FC<SimulatorViewProps> = ({ jointAngles }) => {
  return (
    <div className="w-full h-full bg-[#E8E8E8]">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[8, 8, 8]} fov={50} />
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />
        
        {/* Lighting */}
        <ambientLight intensity={0.7} />
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        >
          <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
        </directionalLight>
        <pointLight position={[-10, 10, -10]} intensity={0.5} />

        {/* Environment */}
        <group position={[0, -2, 0]}>
          <Grid 
            infiniteGrid 
            fadeDistance={30} 
            sectionColor="#999" 
            cellColor="#ccc" 
            sectionSize={3} 
            cellSize={1} 
          />
          <RobotArm angles={jointAngles} />
          <ConveyorBelt />
          <ContactShadows opacity={0.4} scale={20} blur={2} far={4} resolution={256} color="#000000" />
        </group>
        
        {/* Post Processing / Environment Map */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};
