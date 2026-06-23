'use client'

import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { MOLECULES, MoleculeConfig } from '@/lib/molecules'
import { parsePDB, PDBData } from '@/lib/pdbParser'
import InfoPanel from '@/components/InfoPanel'

// Three.js renderer must be client-only (no SSR)
const MoleculeRenderer = dynamic(() => import('@/components/MoleculeRenderer'), { ssr: false })

export default function Home() {
  const [activeMol, setActiveMol] = useState<MoleculeConfig>(MOLECULES[0])
  const [pdbData, setPdbData] = useState<PDBData | null>(null)
  const [loading, setLoading] = useState(true)

  const loadPDB = useCallback(async (mol: MoleculeConfig) => {
    setLoading(true)
    setPdbData(null)
    try {
      const res = await fetch(mol.pdbFile)
      if (!res.ok) throw new Error(`Failed to fetch ${mol.pdbFile}`)
      const text = await res.text()
      const parsed = parsePDB(text)
      setPdbData(parsed)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadPDB(activeMol)
  }, [activeMol, loadPDB])

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#050810]">

      {/* Corner brackets */}
      {['top-4 left-4 border-t border-l', 'top-4 right-4 border-t border-r',
        'bottom-4 left-4 border-b border-l', 'bottom-4 right-4 border-b border-r']
        .map((cls, i) => (
          <div
            key={i}
            className={`absolute w-5 h-5 ${cls} pointer-events-none`}
            style={{ borderColor: 'rgba(15,244,240,0.3)' }}
          />
        ))}

      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(15,244,240,0.25), transparent)',
          animation: 'scan 5s linear infinite',
        }}
      />
      <style>{`
        @keyframes scan {
          0%   { top: 0;    opacity: 0; }
          5%   { opacity: 1; }
          95%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

      {/* Top bar */}
      <header className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 pt-6 z-10 pointer-events-none">
        <div>
          <div className="text-[10px] tracking-[0.25em] uppercase font-medium text-cyan-400">
            Quantum Chemistry Portal
          </div>
          <h1 className="text-xl font-semibold mt-0.5">Molecular Structure Viewer</h1>
        </div>
        <div className="text-right font-mono">
          <div className="text-[10px] tracking-[0.15em] uppercase text-cyan-400">
            Active Structure
          </div>
          <div className="text-2xl font-semibold mt-0.5">{activeMol.id}</div>
        </div>
      </header>

      {/* 3D Canvas — full bleed */}
      <div className="absolute inset-0">
        <MoleculeRenderer
          data={pdbData}
          accentColor={activeMol.threeColor}
          loading={loading}
        />
      </div>

      {/* Right info panel */}
      <aside
        className="absolute right-0 top-0 bottom-0 w-80 flex flex-col p-8 z-10 pointer-events-auto"
        style={{
          background: 'linear-gradient(to left, rgba(5,8,16,0.92) 70%, transparent)',
          borderLeft: '1px solid rgba(15,244,240,0.08)',
        }}
      >
        {/* Spacer for top bar */}
        <div className="h-16 shrink-0" />
        <InfoPanel molecule={activeMol} data={pdbData} />
      </aside>

      {/* Bottom molecule selector */}
      <nav
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10"
        style={{ transform: 'translateX(calc(-50% - 160px))' }}
      >
        {MOLECULES.map(mol => {
          const isActive = mol.id === activeMol.id
          return (
            <button
              key={mol.id}
              onClick={() => setActiveMol(mol)}
              className="relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: isActive ? `${mol.accentColor}18` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${isActive ? mol.accentColor : 'rgba(255,255,255,0.12)'}`,
                color: isActive ? mol.accentColor : 'rgba(255,255,255,0.5)',
                boxShadow: isActive ? `0 0 20px ${mol.accentColor}22` : 'none',
              }}
            >
              <span className="font-mono font-semibold">{mol.id}</span>
              <span className="ml-2 text-xs opacity-60 hidden sm:inline">{mol.disease}</span>
            </button>
          )
        })}
      </nav>

      {/* Large ghost molecule label */}
      <div
        className="absolute bottom-24 left-8 pointer-events-none select-none"
        style={{ transform: 'translateX(0)' }}
      >
        <div
          className="text-[80px] font-bold leading-none tracking-tight opacity-[0.06]"
          style={{ color: activeMol.accentColor }}
        >
          {activeMol.id}
        </div>
        <div
          className="text-xs tracking-[0.2em] uppercase mt-1 opacity-40"
          style={{ color: activeMol.accentColor }}
        >
          {activeMol.subtitle}
        </div>
      </div>

    </main>
  )
}
