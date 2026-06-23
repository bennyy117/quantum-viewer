'use client'

import { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { PDBData, atomColor, atomRadius } from '@/lib/pdbParser'

interface MoleculeRendererProps {
  data: PDBData | null
  accentColor: number
  loading: boolean
}

export default function MoleculeRenderer({ data, accentColor, loading }: MoleculeRendererProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const moleculeGroupRef = useRef<THREE.Group | null>(null)
  const orbitRingsRef = useRef<THREE.Mesh[]>([])
  const frameRef = useRef<number>(0)
  const isDragging = useRef(false)
  const lastMouse = useRef({ x: 0, y: 0 })
  const autoRotate = useRef(true)

  // Init Three.js once
  useEffect(() => {
    if (!mountRef.current) return
    const el = mountRef.current

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x050810, 1)
    renderer.setSize(el.clientWidth, el.clientHeight)
    el.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(45, el.clientWidth / el.clientHeight, 0.1, 500)
    camera.position.set(0, 0, 60)
    cameraRef.current = camera

    // Lights
    scene.add(new THREE.AmbientLight(0x112244, 3))
    const key = new THREE.DirectionalLight(accentColor, 4)
    key.position.set(10, 10, 10)
    scene.add(key)
    const fill = new THREE.DirectionalLight(0x7b2fff, 2)
    fill.position.set(-10, -5, -10)
    scene.add(fill)
    const rim = new THREE.PointLight(0xffffff, 1.5, 200)
    rim.position.set(0, -20, -10)
    scene.add(rim)

    // Star field
    const starGeo = new THREE.BufferGeometry()
    const starPos = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000 * 3; i++) starPos[i] = (Math.random() - 0.5) * 400
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    const starMat = new THREE.PointsMaterial({ color: 0x0ff4f0, size: 0.15, transparent: true, opacity: 0.35 })
    scene.add(new THREE.Points(starGeo, starMat))

    // Molecule group placeholder
    const group = new THREE.Group()
    scene.add(group)
    moleculeGroupRef.current = group

    // Resize
    const onResize = () => {
      if (!el) return
      renderer.setSize(el.clientWidth, el.clientHeight)
      camera.aspect = el.clientWidth / el.clientHeight
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    // Animate
    let t = 0
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)
      t += 0.005
      if (autoRotate.current && group) group.rotation.y += 0.003
      orbitRingsRef.current.forEach((ring, i) => {
        ring.rotation.y = t * (0.3 + i * 0.12)
        ring.rotation.x += 0.0015 * (i % 2 === 0 ? 1 : -1)
      })
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Rebuild molecule when data changes
  useEffect(() => {
    const group = moleculeGroupRef.current
    const scene = sceneRef.current
    if (!group || !scene) return

    // Clear old
    while (group.children.length) {
      const child = group.children[0] as THREE.Mesh
      if (child.geometry) child.geometry.dispose()
      group.remove(child)
    }
    orbitRingsRef.current = []

    if (!data || data.atoms.length === 0) return

    // Compute centroid
    const center = new THREE.Vector3()
    data.atoms.forEach(a => center.add(new THREE.Vector3(a.x, a.y, a.z)))
    center.divideScalar(data.atoms.length)

    // Compute bounding radius for camera distance
    let maxR = 0
    data.atoms.forEach(a => {
      const d = new THREE.Vector3(a.x - center.x, a.y - center.y, a.z - center.z).length()
      if (d > maxR) maxR = d
    })
    const camDist = Math.max(maxR * 2.5, 20)
    if (cameraRef.current) cameraRef.current.position.set(0, 0, camDist)

    // Separate protein atoms and ligand (HETATM, non-water)
    const proteinAtoms = data.atoms.filter(a => !a.isHetAtm)
    const ligandAtoms  = data.atoms.filter(
      a => a.isHetAtm && a.resName !== 'HOH' && a.resName !== 'WAT'
    )

    // Protein — render as low-opacity small spheres (performance: instanced)
    const instanceCount = Math.min(proteinAtoms.length, 3000)
    const iGeo = new THREE.SphereGeometry(0.28, 8, 8)
    const iMat = new THREE.MeshPhongMaterial({
      color: 0x334466,
      transparent: true,
      opacity: 0.55,
      shininess: 20,
    })
    const iMesh = new THREE.InstancedMesh(iGeo, iMat, instanceCount)
    const dummy = new THREE.Object3D()
    for (let i = 0; i < instanceCount; i++) {
      const a = proteinAtoms[i]
      dummy.position.set(a.x - center.x, a.y - center.y, a.z - center.z)
      dummy.updateMatrix()
      iMesh.setMatrixAt(i, dummy.matrix)
    }
    iMesh.instanceMatrix.needsUpdate = true
    group.add(iMesh)

    // Ligand — render as bright ball-and-stick
    const ligandSerial = new Set(ligandAtoms.map(a => a.serial))
    const ligandBonds = data.bonds.filter(b => ligandSerial.has(b.from) && ligandSerial.has(b.to))
    const serialMap = new Map(data.atoms.map(a => [a.serial, a]))

    ligandAtoms.forEach(atom => {
      const pos = new THREE.Vector3(atom.x - center.x, atom.y - center.y, atom.z - center.z)
      const color = atomColor(atom.element)
      const radius = atomRadius(atom.element) * 1.4

      const geo = new THREE.SphereGeometry(radius, 20, 20)
      const mat = new THREE.MeshPhongMaterial({
        color,
        emissive: new THREE.Color(color).multiplyScalar(0.2),
        shininess: 100,
        specular: 0xffffff,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.copy(pos)
      group.add(mesh)

      // Glow
      const glowGeo = new THREE.SphereGeometry(radius * 2, 12, 12)
      const glowMat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.05 })
      const glow = new THREE.Mesh(glowGeo, glowMat)
      glow.position.copy(pos)
      group.add(glow)
    })

    ligandBonds.forEach(bond => {
      const a = serialMap.get(bond.from)
      const b = serialMap.get(bond.to)
      if (!a || !b) return
      const va = new THREE.Vector3(a.x - center.x, a.y - center.y, a.z - center.z)
      const vb = new THREE.Vector3(b.x - center.x, b.y - center.y, b.z - center.z)
      const dir = vb.clone().sub(va)
      const len = dir.length()
      const mid = va.clone().add(dir.clone().multiplyScalar(0.5))
      const geo = new THREE.CylinderGeometry(0.08, 0.08, len, 8)
      const mat = new THREE.MeshPhongMaterial({ color: accentColor, transparent: true, opacity: 0.8 })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.copy(mid)
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize())
      group.add(mesh)
    })

    // Orbit rings
    const ringConfigs = [
      { r: maxR * 0.9,  tiltX: Math.PI / 3,  tiltZ: 0 },
      { r: maxR * 1.1,  tiltX: Math.PI / 6,  tiltZ: Math.PI / 4 },
      { r: maxR * 1.25, tiltX: Math.PI / 2,  tiltZ: Math.PI / 3 },
    ]
    ringConfigs.forEach(cfg => {
      const geo = new THREE.TorusGeometry(cfg.r, 0.08, 8, 120)
      const mat = new THREE.MeshBasicMaterial({ color: accentColor, transparent: true, opacity: 0.18 })
      const ring = new THREE.Mesh(geo, mat)
      ring.rotation.x = cfg.tiltX
      ring.rotation.z = cfg.tiltZ
      group.add(ring)
      orbitRingsRef.current.push(ring)
    })

    group.rotation.set(0, 0, 0)
  }, [data, accentColor])

  // Mouse / touch drag
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true
    autoRotate.current = false
    lastMouse.current = { x: e.clientX, y: e.clientY }
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !moleculeGroupRef.current) return
    const dx = e.clientX - lastMouse.current.x
    const dy = e.clientY - lastMouse.current.y
    moleculeGroupRef.current.rotation.y += dx * 0.007
    moleculeGroupRef.current.rotation.x += dy * 0.007
    lastMouse.current = { x: e.clientX, y: e.clientY }
  }, [])

  const onMouseUp = useCallback(() => {
    isDragging.current = false
    setTimeout(() => { autoRotate.current = true }, 2000)
  }, [])

  const onWheel = useCallback((e: React.WheelEvent) => {
    if (!cameraRef.current) return
    cameraRef.current.position.z = Math.max(5, Math.min(200, cameraRef.current.position.z + e.deltaY * 0.05))
  }, [])

  return (
    <div
      ref={mountRef}
      className="w-full h-full cursor-grab active:cursor-grabbing"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onWheel={onWheel}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs tracking-widest text-cyan-400 uppercase">Loading structure</p>
          </div>
        </div>
      )}
    </div>
  )
}
