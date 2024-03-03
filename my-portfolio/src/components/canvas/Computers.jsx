//This is the 3d model of the hero page

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber"; // Import Canvas component from react-three/fiber for WebGL rendering
import { OrbitControls, Preload, useGLTF } from "@react-three/drei"; // Import OrbitControls, Preload, and useGLTF hooks from drei for additional functionality

import CanvasLoader from "../Loader"; // Import Loader component

// Define Computers component
const Computers = ({ isMobile }) => {
  // Load 3D model using useGLTF hook
  const computer = useGLTF("./desktop_pc/scene.gltf"); //PC model

  return (
    // Render scene with lights and 3D model
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' /> {/* Add hemisphere light */}
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      /> {/* Add spot light for shadows */}
      <pointLight intensity={1} /> {/* Add point light */}
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75} // Scale the 3D model based on device type
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]} // Position the 3D model based on device type
        rotation={[-0.01, -0.2, -0.1]} // Rotate the 3D model
      />
    </mesh>
  );
};

// Define ComputersCanvas component
const ComputersCanvas = () => {
  // State to track whether the device is mobile or not
  const [isMobile, setIsMobile] = useState(false);

  // Effect to detect changes in screen size and update isMobile state accordingly
  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  // Render Canvas with 3D scene and controls
  return (
    <Canvas
      frameloop='demand' // Use 'demand' frameloop mode for better performance
      shadows // Enable shadows
      dpr={[1, 2]} // Set device pixel ratio for better rendering quality
      camera={{ position: [20, 3, 5], fov: 25 }} // Set camera position and field of view
      gl={{ preserveDrawingBuffer: true }} // Preserve drawing buffer for screenshot functionality
    >
      {/* Suspense for fallback loading state */}
      <Suspense fallback={<CanvasLoader />}>
        {/* OrbitControls for camera navigation */}
        <OrbitControls
          enableZoom={false} // Disable zooming
          maxPolarAngle={Math.PI / 2} // Limit vertical rotation angle
          minPolarAngle={Math.PI / 2} // Limit vertical rotation angle
        />
        {/* Render Computers component */}
        <Computers isMobile={isMobile} />
      </Suspense>

      {/* Preload assets */}
      <Preload all />
    </Canvas>
  );
};

// Export ComputersCanvas component
export default ComputersCanvas;
