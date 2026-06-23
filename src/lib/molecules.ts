export interface MoleculeConfig {
  id: string
  pdbFile: string
  label: string
  subtitle: string
  disease: string
  drug: string
  description: string
  accentColor: string   // hex string for CSS
  threeColor: number    // 0x hex for Three.js
  energy?: string
  qubits?: string
}

export const MOLECULES: MoleculeConfig[] = [
  {
    id: '6LU7',
    pdbFile: '/pdb/6LU7.pdb',
    label: '6LU7',
    subtitle: 'SARS-CoV-2 Main Protease',
    disease: 'COVID-19',
    drug: 'N3 Inhibitor',
    description:
      'Main protease (Mpro) of SARS-CoV-2. The N3 inhibitor molecule binds covalently inside the active site, blocking viral replication. A primary target for anti-COVID drug design.',
    accentColor: '#0ff4f0',
    threeColor: 0x0ff4f0,
  },
  {
    id: '1M17',
    pdbFile: '/pdb/1M17.pdb',
    label: '1M17',
    subtitle: 'EGFR Kinase',
    disease: 'Lung Cancer',
    drug: 'Erlotinib (Tarceva)',
    description:
      'Epidermal Growth Factor Receptor kinase domain with Erlotinib (Tarceva) bound in the ATP pocket. Erlotinib inhibits uncontrolled cell division in non-small-cell lung cancer.',
    accentColor: '#7B2FFF',
    threeColor: 0x7b2fff,
  },
  {
    id: '1IYT',
    pdbFile: '/pdb/1IYT.pdb',
    label: '1IYT',
    subtitle: 'Amyloid Beta (18–35)',
    disease: "Alzheimer's",
    drug: 'No approved drug',
    description:
      'Amyloid Beta peptide fragment responsible for neurotoxic fibril formation in Alzheimer\'s disease. Quantum computing is being applied to model aggregation dynamics and identify inhibitors.',
    accentColor: '#ff6b35',
    threeColor: 0xff6b35,
  },
]
