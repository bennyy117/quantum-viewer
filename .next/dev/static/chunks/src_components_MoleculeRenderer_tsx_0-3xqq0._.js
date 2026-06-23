(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/MoleculeRenderer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MoleculeRenderer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.module.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pdbParser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/pdbParser.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function MoleculeRenderer({ data, accentColor, loading }) {
    _s();
    const mountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sceneRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cameraRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rendererRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const moleculeGroupRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const orbitRingsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const frameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const isDragging = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const lastMouse = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 0
    });
    const autoRotate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(true);
    // Init Three.js once
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MoleculeRenderer.useEffect": ()=>{
            if (!mountRef.current) return;
            const el = mountRef.current;
            const renderer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WebGLRenderer"]({
                antialias: true,
                alpha: false
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setClearColor(0x050810, 1);
            renderer.setSize(el.clientWidth, el.clientHeight);
            el.appendChild(renderer.domElement);
            rendererRef.current = renderer;
            const scene = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Scene"]();
            sceneRef.current = scene;
            const camera = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerspectiveCamera"](45, el.clientWidth / el.clientHeight, 0.1, 500);
            camera.position.set(0, 0, 60);
            cameraRef.current = camera;
            // Lights
            scene.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AmbientLight"](0x112244, 3));
            const key = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DirectionalLight"](accentColor, 4);
            key.position.set(10, 10, 10);
            scene.add(key);
            const fill = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DirectionalLight"](0x7b2fff, 2);
            fill.position.set(-10, -5, -10);
            scene.add(fill);
            const rim = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointLight"](0xffffff, 1.5, 200);
            rim.position.set(0, -20, -10);
            scene.add(rim);
            // Star field
            const starGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferGeometry"]();
            const starPos = new Float32Array(2000 * 3);
            for(let i = 0; i < 2000 * 3; i++)starPos[i] = (Math.random() - 0.5) * 400;
            starGeo.setAttribute('position', new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BufferAttribute"](starPos, 3));
            const starMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointsMaterial"]({
                color: 0x0ff4f0,
                size: 0.15,
                transparent: true,
                opacity: 0.35
            });
            scene.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Points"](starGeo, starMat));
            // Molecule group placeholder
            const group = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            scene.add(group);
            moleculeGroupRef.current = group;
            // Resize
            const onResize = {
                "MoleculeRenderer.useEffect.onResize": ()=>{
                    if (!el) return;
                    renderer.setSize(el.clientWidth, el.clientHeight);
                    camera.aspect = el.clientWidth / el.clientHeight;
                    camera.updateProjectionMatrix();
                }
            }["MoleculeRenderer.useEffect.onResize"];
            window.addEventListener('resize', onResize);
            // Animate
            let t = 0;
            const animate = {
                "MoleculeRenderer.useEffect.animate": ()=>{
                    frameRef.current = requestAnimationFrame(animate);
                    t += 0.005;
                    if (autoRotate.current && group) group.rotation.y += 0.003;
                    orbitRingsRef.current.forEach({
                        "MoleculeRenderer.useEffect.animate": (ring, i)=>{
                            ring.rotation.y = t * (0.3 + i * 0.12);
                            ring.rotation.x += 0.0015 * (i % 2 === 0 ? 1 : -1);
                        }
                    }["MoleculeRenderer.useEffect.animate"]);
                    renderer.render(scene, camera);
                }
            }["MoleculeRenderer.useEffect.animate"];
            animate();
            return ({
                "MoleculeRenderer.useEffect": ()=>{
                    cancelAnimationFrame(frameRef.current);
                    window.removeEventListener('resize', onResize);
                    renderer.dispose();
                    if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
                }
            })["MoleculeRenderer.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["MoleculeRenderer.useEffect"], []);
    // Rebuild molecule when data changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MoleculeRenderer.useEffect": ()=>{
            const group = moleculeGroupRef.current;
            const scene = sceneRef.current;
            if (!group || !scene) return;
            // Clear old
            while(group.children.length){
                const child = group.children[0];
                if (child.geometry) child.geometry.dispose();
                group.remove(child);
            }
            orbitRingsRef.current = [];
            if (!data || data.atoms.length === 0) return;
            // Compute centroid
            const center = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            data.atoms.forEach({
                "MoleculeRenderer.useEffect": (a)=>center.add(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](a.x, a.y, a.z))
            }["MoleculeRenderer.useEffect"]);
            center.divideScalar(data.atoms.length);
            // Compute bounding radius for camera distance
            let maxR = 0;
            data.atoms.forEach({
                "MoleculeRenderer.useEffect": (a)=>{
                    const d = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](a.x - center.x, a.y - center.y, a.z - center.z).length();
                    if (d > maxR) maxR = d;
                }
            }["MoleculeRenderer.useEffect"]);
            const camDist = Math.max(maxR * 2.5, 20);
            if (cameraRef.current) cameraRef.current.position.set(0, 0, camDist);
            // Separate protein atoms and ligand (HETATM, non-water)
            const proteinAtoms = data.atoms.filter({
                "MoleculeRenderer.useEffect.proteinAtoms": (a)=>!a.isHetAtm
            }["MoleculeRenderer.useEffect.proteinAtoms"]);
            const ligandAtoms = data.atoms.filter({
                "MoleculeRenderer.useEffect.ligandAtoms": (a)=>a.isHetAtm && a.resName !== 'HOH' && a.resName !== 'WAT'
            }["MoleculeRenderer.useEffect.ligandAtoms"]);
            // Protein — render as low-opacity small spheres (performance: instanced)
            const instanceCount = Math.min(proteinAtoms.length, 3000);
            const iGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](0.28, 8, 8);
            const iMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhongMaterial"]({
                color: 0x334466,
                transparent: true,
                opacity: 0.55,
                shininess: 20
            });
            const iMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InstancedMesh"](iGeo, iMat, instanceCount);
            const dummy = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Object3D"]();
            for(let i = 0; i < instanceCount; i++){
                const a = proteinAtoms[i];
                dummy.position.set(a.x - center.x, a.y - center.y, a.z - center.z);
                dummy.updateMatrix();
                iMesh.setMatrixAt(i, dummy.matrix);
            }
            iMesh.instanceMatrix.needsUpdate = true;
            group.add(iMesh);
            // Ligand — render as bright ball-and-stick
            const ligandSerial = new Set(ligandAtoms.map({
                "MoleculeRenderer.useEffect": (a)=>a.serial
            }["MoleculeRenderer.useEffect"]));
            const ligandBonds = data.bonds.filter({
                "MoleculeRenderer.useEffect.ligandBonds": (b)=>ligandSerial.has(b.from) && ligandSerial.has(b.to)
            }["MoleculeRenderer.useEffect.ligandBonds"]);
            const serialMap = new Map(data.atoms.map({
                "MoleculeRenderer.useEffect": (a)=>[
                        a.serial,
                        a
                    ]
            }["MoleculeRenderer.useEffect"]));
            ligandAtoms.forEach({
                "MoleculeRenderer.useEffect": (atom)=>{
                    const pos = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](atom.x - center.x, atom.y - center.y, atom.z - center.z);
                    const color = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pdbParser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["atomColor"])(atom.element);
                    const radius = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$pdbParser$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["atomRadius"])(atom.element) * 1.4;
                    const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](radius, 20, 20);
                    const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhongMaterial"]({
                        color,
                        emissive: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Color"](color).multiplyScalar(0.2),
                        shininess: 100,
                        specular: 0xffffff
                    });
                    const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](geo, mat);
                    mesh.position.copy(pos);
                    group.add(mesh);
                    // Glow
                    const glowGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SphereGeometry"](radius * 2, 12, 12);
                    const glowMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                        color,
                        transparent: true,
                        opacity: 0.05
                    });
                    const glow = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](glowGeo, glowMat);
                    glow.position.copy(pos);
                    group.add(glow);
                }
            }["MoleculeRenderer.useEffect"]);
            ligandBonds.forEach({
                "MoleculeRenderer.useEffect": (bond)=>{
                    const a = serialMap.get(bond.from);
                    const b = serialMap.get(bond.to);
                    if (!a || !b) return;
                    const va = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](a.x - center.x, a.y - center.y, a.z - center.z);
                    const vb = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](b.x - center.x, b.y - center.y, b.z - center.z);
                    const dir = vb.clone().sub(va);
                    const len = dir.length();
                    const mid = va.clone().add(dir.clone().multiplyScalar(0.5));
                    const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CylinderGeometry"](0.08, 0.08, len, 8);
                    const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshPhongMaterial"]({
                        color: accentColor,
                        transparent: true,
                        opacity: 0.8
                    });
                    const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](geo, mat);
                    mesh.position.copy(mid);
                    mesh.quaternion.setFromUnitVectors(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0), dir.normalize());
                    group.add(mesh);
                }
            }["MoleculeRenderer.useEffect"]);
            // Orbit rings
            const ringConfigs = [
                {
                    r: maxR * 0.9,
                    tiltX: Math.PI / 3,
                    tiltZ: 0
                },
                {
                    r: maxR * 1.1,
                    tiltX: Math.PI / 6,
                    tiltZ: Math.PI / 4
                },
                {
                    r: maxR * 1.25,
                    tiltX: Math.PI / 2,
                    tiltZ: Math.PI / 3
                }
            ];
            ringConfigs.forEach({
                "MoleculeRenderer.useEffect": (cfg)=>{
                    const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TorusGeometry"](cfg.r, 0.08, 8, 120);
                    const mat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshBasicMaterial"]({
                        color: accentColor,
                        transparent: true,
                        opacity: 0.18
                    });
                    const ring = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](geo, mat);
                    ring.rotation.x = cfg.tiltX;
                    ring.rotation.z = cfg.tiltZ;
                    group.add(ring);
                    orbitRingsRef.current.push(ring);
                }
            }["MoleculeRenderer.useEffect"]);
            group.rotation.set(0, 0, 0);
        }
    }["MoleculeRenderer.useEffect"], [
        data,
        accentColor
    ]);
    // Mouse / touch drag
    const onMouseDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MoleculeRenderer.useCallback[onMouseDown]": (e)=>{
            isDragging.current = true;
            autoRotate.current = false;
            lastMouse.current = {
                x: e.clientX,
                y: e.clientY
            };
        }
    }["MoleculeRenderer.useCallback[onMouseDown]"], []);
    const onMouseMove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MoleculeRenderer.useCallback[onMouseMove]": (e)=>{
            if (!isDragging.current || !moleculeGroupRef.current) return;
            const dx = e.clientX - lastMouse.current.x;
            const dy = e.clientY - lastMouse.current.y;
            moleculeGroupRef.current.rotation.y += dx * 0.007;
            moleculeGroupRef.current.rotation.x += dy * 0.007;
            lastMouse.current = {
                x: e.clientX,
                y: e.clientY
            };
        }
    }["MoleculeRenderer.useCallback[onMouseMove]"], []);
    const onMouseUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MoleculeRenderer.useCallback[onMouseUp]": ()=>{
            isDragging.current = false;
            setTimeout({
                "MoleculeRenderer.useCallback[onMouseUp]": ()=>{
                    autoRotate.current = true;
                }
            }["MoleculeRenderer.useCallback[onMouseUp]"], 2000);
        }
    }["MoleculeRenderer.useCallback[onMouseUp]"], []);
    const onWheel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MoleculeRenderer.useCallback[onWheel]": (e)=>{
            if (!cameraRef.current) return;
            cameraRef.current.position.z = Math.max(5, Math.min(200, cameraRef.current.position.z + e.deltaY * 0.05));
        }
    }["MoleculeRenderer.useCallback[onWheel]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: mountRef,
        className: "w-full h-full cursor-grab active:cursor-grabbing",
        onMouseDown: onMouseDown,
        onMouseMove: onMouseMove,
        onMouseUp: onMouseUp,
        onMouseLeave: onMouseUp,
        onWheel: onWheel,
        children: loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "absolute inset-0 flex items-center justify-center pointer-events-none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"
                    }, void 0, false, {
                        fileName: "[project]/src/components/MoleculeRenderer.tsx",
                        lineNumber: 261,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs tracking-widest text-cyan-400 uppercase",
                        children: "Loading structure"
                    }, void 0, false, {
                        fileName: "[project]/src/components/MoleculeRenderer.tsx",
                        lineNumber: 262,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/MoleculeRenderer.tsx",
                lineNumber: 260,
                columnNumber: 11
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/MoleculeRenderer.tsx",
            lineNumber: 259,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/MoleculeRenderer.tsx",
        lineNumber: 249,
        columnNumber: 5
    }, this);
}
_s(MoleculeRenderer, "6PIfbzBoi05MTWsLcECgUW8v1hc=");
_c = MoleculeRenderer;
var _c;
__turbopack_context__.k.register(_c, "MoleculeRenderer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/MoleculeRenderer.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/MoleculeRenderer.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_components_MoleculeRenderer_tsx_0-3xqq0._.js.map