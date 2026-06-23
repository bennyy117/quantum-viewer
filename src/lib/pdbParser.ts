export interface PDBAtom {
  serial: number
  name: string
  resName: string
  chainID: string
  resSeq: number
  x: number
  y: number
  z: number
  element: string
  isHetAtm: boolean
}

export interface PDBBond {
  from: number
  to: number
}

export interface PDBData {
  atoms: PDBAtom[]
  bonds: PDBBond[]
  title: string
}

export function parsePDB(text: string): PDBData {
  const atoms: PDBAtom[] = []
  const bonds: PDBBond[] = []
  const serialToIndex: Map<number, number> = new Map()
  let title = ''

  const lines = text.split('\n')

  // For NMR ensembles (multiple MODEL records, e.g. 1IYT) only the first
  // model represents one structure — skip later models so they aren't
  // overlaid into a smeared cloud.
  let modelCount = 0

  for (const line of lines) {
    const rec = line.slice(0, 6).trim()

    if (rec === 'TITLE') {
      title = line.slice(10).trim()
    }

    if (rec === 'MODEL') {
      modelCount++
    }

    if ((rec === 'ATOM' || rec === 'HETATM') && modelCount <= 1) {
      const serial = parseInt(line.slice(6, 11))
      const name   = line.slice(12, 16).trim()
      const resName = line.slice(17, 20).trim()
      const chainID = line.slice(21, 22).trim()
      const resSeq  = parseInt(line.slice(22, 26))
      const x = parseFloat(line.slice(30, 38))
      const y = parseFloat(line.slice(38, 46))
      const z = parseFloat(line.slice(46, 54))
      // Element is cols 76-78; fall back to first char of atom name
      const element = line.length >= 78
        ? line.slice(76, 78).trim()
        : name.replace(/[0-9]/g, '')[0]

      if (isNaN(x) || isNaN(y) || isNaN(z)) continue

      serialToIndex.set(serial, atoms.length)
      atoms.push({
        serial, name, resName, chainID, resSeq,
        x, y, z,
        element: element || name[0],
        isHetAtm: rec === 'HETATM',
      })
    }

    if (rec === 'CONECT') {
      const from = parseInt(line.slice(6, 11))
      const cols = [11, 16, 21, 26]
      for (const c of cols) {
        const toSerial = parseInt(line.slice(c, c + 5))
        if (!isNaN(toSerial) && toSerial > 0) {
          bonds.push({ from, to: toSerial })
        }
      }
    }
  }

  return { atoms, bonds, title }
}

// Atom color palette — CPK convention
const CPK_COLORS: Record<string, number> = {
  H:  0xe8e8e8,
  C:  0x444444,
  N:  0x4444ff,
  O:  0xff2200,
  S:  0xffcc00,
  P:  0xff8800,
  F:  0x00ff44,
  CL: 0x00cc44,
  BR: 0x992200,
  I:  0x770077,
  FE: 0xff6600,
  ZN: 0x888844,
  MG: 0x228822,
  CA: 0x888888,
  LI: 0xaa44ff,
  BE: 0x44ffaa,
}

export function atomColor(element: string): number {
  return CPK_COLORS[element.toUpperCase()] ?? 0x888888
}

// Atom VDW radii in Angstrom (scaled down for display)
const VDW: Record<string, number> = {
  H: 0.25, C: 0.40, N: 0.38, O: 0.35,
  S: 0.45, P: 0.45, F: 0.30, CL: 0.40,
  BR: 0.45, LI: 0.50, BE: 0.42, MG: 0.45,
  CA: 0.50, ZN: 0.40, FE: 0.45,
}

export function atomRadius(element: string): number {
  return VDW[element.toUpperCase()] ?? 0.35
}
