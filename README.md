# Quantum Molecule Viewer

Next.js 14 + Three.js — 3D protein structure viewer for quantum drug discovery demo.

## Setup

```bash
npm install
npm run dev
```

## Đặt file PDB

Copy 3 file PDB vào thư mục `public/pdb/`:

```
public/
  pdb/
    6LU7.pdb    ← SARS-CoV-2 Main Protease
    1M17.pdb    ← EGFR Kinase (Lung Cancer)
    1IYT.pdb    ← Amyloid Beta (Alzheimer's)
```

Tên file phải giữ nguyên chính xác (chữ hoa).

## Cấu trúc project

```
src/
  app/
    page.tsx          ← Main page
    layout.tsx
    globals.css
  components/
    MoleculeRenderer.tsx   ← Three.js 3D canvas
    InfoPanel.tsx          ← Right side info
  lib/
    pdbParser.ts      ← Parse file .pdb
    molecules.ts      ← Config 3 phân tử
```

## Tính năng

- Load file PDB thật từ RCSB
- Protein render dạng mờ, ligand (thuốc) nổi bật màu sắc CPK
- Orbit rings animate theo từng molecule
- Drag to rotate, scroll to zoom
- Switch giữa 6LU7 / 1M17 / 1IYT
