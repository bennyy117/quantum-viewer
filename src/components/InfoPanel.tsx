'use client'

import { MoleculeConfig } from '@/lib/molecules'
import { PDBData } from '@/lib/pdbParser'

interface InfoPanelProps {
  molecule: MoleculeConfig
  data: PDBData | null
}

function StatBox({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border border-white/10 rounded-lg px-4 py-3 bg-white/[0.03]">
      <div className="text-[10px] tracking-[0.18em] uppercase mb-1" style={{ color: 'var(--cyan)' }}>
        {label}
      </div>
      <div className="text-lg font-semibold font-mono">{value}</div>
    </div>
  )
}

export default function InfoPanel({ molecule, data }: InfoPanelProps) {
  const proteinAtoms = data?.atoms.filter(a => !a.isHetAtm).length ?? 0
  const ligandAtoms  = data?.atoms.filter(
    a => a.isHetAtm && a.resName !== 'HOH' && a.resName !== 'WAT'
  ).length ?? 0
  const totalAtoms = data?.atoms.length ?? 0

  return (
    <div
      className="flex flex-col gap-6 h-full overflow-y-auto"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* Header */}
      <div>
        <div
          className="text-[10px] tracking-[0.2em] uppercase font-medium mb-2"
          style={{ color: molecule.accentColor }}
        >
          PDB {molecule.id}
        </div>
        <h2 className="text-2xl font-semibold leading-tight">{molecule.subtitle}</h2>
        <div className="mt-1 text-sm text-white/50">{molecule.disease}</div>
      </div>

      {/* Drug badge */}
      <div
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm self-start"
        style={{
          background: `${molecule.accentColor}18`,
          border: `1px solid ${molecule.accentColor}33`,
          color: molecule.accentColor,
        }}
      >
        <span className="text-[10px] tracking-widest uppercase opacity-70">Ligand</span>
        <span className="font-medium">{molecule.drug}</span>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-white/60">
        {molecule.description}
      </p>

      {/* Stats grid */}
      {data && (
        <div className="grid grid-cols-2 gap-2">
          <StatBox label="Total Atoms"   value={totalAtoms.toLocaleString()} />
          <StatBox label="Protein Atoms" value={proteinAtoms.toLocaleString()} />
          <StatBox label="Ligand Atoms"  value={ligandAtoms} />
          <StatBox label="PDB ID"        value={molecule.id} />
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-white/[0.07]" />

      {/* Context note */}
      <div>
        <div
          className="text-[10px] tracking-[0.18em] uppercase mb-2"
          style={{ color: molecule.accentColor }}
        >
          Quantum Relevance
        </div>
        <p className="text-xs leading-relaxed text-white/40">
          VQE computes the binding energy between the ligand and protein active site.
          A sufficiently negative binding energy confirms the drug molecule will
          remain bound, inhibiting the target.
        </p>
      </div>

      {/* Interaction hint */}
      <div className="mt-auto text-[10px] text-white/20 tracking-wider uppercase">
        Drag to rotate · Scroll to zoom
      </div>
    </div>
  )
}
