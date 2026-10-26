"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Key3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 4000);
    camera.position.set(0, 8, 70);
    camera.lookAt(0, 14, -80);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffb884, 0.35));
    const sunLight = new THREE.DirectionalLight(0xffb070, 0.85);
    sunLight.position.set(-30, 30, -40);
    scene.add(sunLight);

    const groundGeo = new THREE.PlaneGeometry(6000, 6000, 128, 128);
    const gp = groundGeo.attributes.position;
    for (let i = 0; i < gp.count; i++) {
      const gx = gp.getX(i), gy = gp.getY(i);
      const gd = Math.sqrt(gx * gx + gy * gy);
      const gh = Math.sin(gx * 0.005) * Math.cos(gy * 0.005) * 4.0 + Math.sin(gx * 0.017 + gy * 0.009) * 1.6;
      gp.setZ(i, gh * Math.max(0, 1 - gd / 2000));
    }
    groundGeo.computeVertexNormals();
    const ground = new THREE.Mesh(groundGeo, new THREE.MeshStandardMaterial({ color: 0x6a4a2a, roughness: 1.0 }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -6;
    scene.add(ground);

    const buildPyramid = (x: number, z: number, size: number, height: number, edgeColor: number) => {
      const bodyGeo = new THREE.CylinderGeometry(0, size, height, 4);
      const body = new THREE.Mesh(bodyGeo, new THREE.MeshStandardMaterial({ color: 0x8a6a44, roughness: 0.92, flatShading: true }));
      body.rotation.y = Math.PI / 4;
      body.position.set(x, height / 2 - 6, z);
      scene.add(body);

      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(bodyGeo),
        new THREE.LineBasicMaterial({ color: edgeColor, transparent: true, opacity: 0.55 })
      );
      edges.rotation.y = Math.PI / 4;
      edges.position.copy(body.position);
      scene.add(edges);
    };

    buildPyramid(-95, -175, 50, 45, 0x4f7bff);
    buildPyramid(-10, -140, 42, 38, 0xa04fff);
    buildPyramid(85, -155, 26, 22, 0x4ff0ff);

    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (8 + (-mouseY * 2.5) - camera.position.y) * 0.05;
      camera.lookAt(0, 16, -90);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />;
}