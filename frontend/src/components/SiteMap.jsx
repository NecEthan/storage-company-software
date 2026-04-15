import { useEffect, useMemo, useState } from 'react'
import sitePlanImage from '../assets/siteplan.png'

const PLAN_WIDTH = 2339
const PLAN_HEIGHT = 1654

const LEFT_ROWS = [
  ['A16', 'A02'],
  ['A17', 'A54'],
  ['A18', 'A53'],
  ['A19', 'A52'],
  ['A20', 'A51'],
  ['A40', 'A50'],
  ['A41', 'A49'],
  ['A42', 'A48'],
  ['A43', 'A47'],
  ['A44', 'A46'],
]

const MID_ROWS = [
  ['A21', 'A39'],
  ['A22', 'A38'],
  ['A1', 'A37'],
  ['A2', 'A3'],
  ['A35', 'A5'],
  ['A36', 'A4'],
  ['A23', 'A33'],
  ['A24', 'A34'],
  ['A27', 'A25'],
  ['A32', 'A31'],
]

const MID_RIGHT_ROWS = [
  ['A6', 'B15'],
  ['A7', 'B14'],
  ['A8', 'B13'],
  ['A9', 'B12'],
  ['A14', 'B11'],
  ['A13', 'B10'],
  ['A12', 'B9'],
  ['A26', 'B18'],
  ['A15', 'B19'],
]

const RIGHT_C_ROWS = [
  ['C17', 'C25'],
  ['C18', 'C24'],
  ['C19', 'C23'],
  ['C1', 'C22'],
  ['C2', 'C21'],
  ['C3', 'C20'],
  ['C4', 'C16'],
  ['C5', 'C15'],
  ['C6', 'C14'],
  ['C7', 'C13'],
  ['C8', 'C12'],
  ['C9', 'C11'],
]

const B_BLOCK_ROWS = [
  ['B4', 'B3', 'B2', 'B1'],
  ['B8', 'B7', 'B6', 'B5'],
]

const LOWER_RIGHT_A_ROWS = [
  ['A01', 'A10'],
  ['A11', 'A29'],
  ['A30', 'A28'],
]

function normalizeContainerId(id) {
  if (!id) return ''
  const match = String(id).trim().toUpperCase().match(/^([A-Z]+)0*(\d+)$/)
  if (!match) return String(id).trim().toUpperCase()
  return `${match[1]}${String(parseInt(match[2], 10)).padStart(3, '0')}`
}

function toPct(value, total) {
  return `${(value / total) * 100}%`
}

function buildHotspots() {
  const spots = []

  const add = (label, x, y, w, h) => {
    spots.push({
      label,
      normalized: normalizeContainerId(label),
      left: toPct(x, PLAN_WIDTH),
      top: toPct(y, PLAN_HEIGHT),
      width: toPct(w, PLAN_WIDTH),
      height: toPct(h, PLAN_HEIGHT),
    })
  }

  const left = { x: 170, y: 156, w: 444, rowH: 88, smallRowH: 83 }
  // First 7 rows at full height, last 3 rows + split row at reduced height
  LEFT_ROWS.forEach((row, rowIndex) => {
    const rH = rowIndex >= 7 ? left.smallRowH : left.rowH
    const y = rowIndex < 7
      ? left.y + rowIndex * left.rowH
      : left.y + 7 * left.rowH + (rowIndex - 7) * left.smallRowH
    row.forEach((label, colIndex) => {
      add(label, left.x + colIndex * (left.w / 2), y, left.w / 2, rH)
    })
  })
  // Last row (split): same reduced height
  const lastY = left.y + 7 * left.rowH + 3 * left.smallRowH
  add('A45', left.x,                  lastY, left.w / 2, left.smallRowH)
  add('B16', left.x + left.w / 2,     lastY, left.w / 4, left.smallRowH)
  add('B17', left.x + left.w * 3 / 4, lastY, left.w / 4, left.smallRowH)

  const mid = { x: 844, y: 136, w: 444, rowH: 88 }
  MID_ROWS.forEach((row, rowIndex) => {
    row.forEach((label, colIndex) => {
      add(label, mid.x + colIndex * (mid.w / 2), mid.y + rowIndex * mid.rowH, mid.w / 2, mid.rowH)
    })
  })

  const midRight = { x: 1348, y: 136, leftW: 220, gapW: 66, rightW: 154, rowH: 88 }
  MID_RIGHT_ROWS.forEach((row, rowIndex) => {
    add(row[0], midRight.x, midRight.y + rowIndex * midRight.rowH, midRight.leftW, midRight.rowH)
    add(
      row[1],
      midRight.x + midRight.leftW + midRight.gapW,
      midRight.y + rowIndex * midRight.rowH,
      midRight.rightW,
      midRight.rowH
    )
  })

  const rightC = { x: 1949, y: 136, colW: 111, rowH: 87 }
  RIGHT_C_ROWS.forEach((row, rowIndex) => {
    row.forEach((label, colIndex) => {
      add(label, rightC.x + colIndex * rightC.colW, rightC.y + rowIndex * rightC.rowH, rightC.colW, rightC.rowH)
    })
  })

  const bBlock = { x: 844, y: 1218, colW: 111, rowH: 159 }
  B_BLOCK_ROWS.forEach((row, rowIndex) => {
    row.forEach((label, colIndex) => {
      add(label, bBlock.x + colIndex * bBlock.colW, bBlock.y + rowIndex * bBlock.rowH, bBlock.colW, bBlock.rowH)
    })
  })

  const lowerRight = { x: 1851, y: 1218, colW: 166, rowH: 106 }
  LOWER_RIGHT_A_ROWS.forEach((row, rowIndex) => {
    row.forEach((label, colIndex) => {
      add(label, lowerRight.x + colIndex * lowerRight.colW, lowerRight.y + rowIndex * lowerRight.rowH, lowerRight.colW, lowerRight.rowH)
    })
  })

  return spots
}

const HOTSPOTS = buildHotspots()

export default function SiteMap({ rows, onContainerClick, onAddClick }) {
  const [hoveredId, setHoveredId] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')

    const apply = (matches) => {
      setIsMobile(matches)
      setZoom(matches ? 1.45 : 1)
    }

    apply(mq.matches)
    const listener = (event) => apply(event.matches)
    mq.addEventListener('change', listener)

    return () => mq.removeEventListener('change', listener)
  }, [])

  const rowLookup = useMemo(() => {
    const map = {}
    rows.forEach((row) => {
      const normalized = normalizeContainerId(row.container)
      if (normalized) map[normalized] = row
    })
    return map
  }, [rows])

  const occupiedCount = HOTSPOTS.filter((spot) => {
    const row = rowLookup[spot.normalized]
    return row && row.status !== 'Empty'
  }).length

  const hoveredSpot = HOTSPOTS.find((spot) => spot.normalized === hoveredId)
  const hoveredRow = hoveredSpot ? rowLookup[hoveredSpot.normalized] : null
  const mobileMapWidth = Math.round(980 * zoom)

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between px-4 py-3 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-900">Site Map</h2>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <span className="text-xs text-gray-400">
            {HOTSPOTS.length} container{HOTSPOTS.length !== 1 ? 's' : ''} - {occupiedCount} occupied
          </span>
          <div className="flex items-center gap-3">
            <LegendDot color="bg-blue-500" label="Occupied" />
            <LegendDot color="bg-green-500" label="Available" />
          </div>
          {isMobile && (
            <div className="ml-auto flex items-center gap-1.5">
              <button
                type="button"
                className="px-2 py-1 text-xs font-semibold border border-gray-300 rounded bg-white"
                onClick={() => setZoom((z) => Math.max(1, Math.round((z - 0.2) * 10) / 10))}
                aria-label="Zoom out"
              >
                -
              </button>
              <span className="text-xs text-gray-500 min-w-10 text-center">{Math.round(zoom * 100)}%</span>
              <button
                type="button"
                className="px-2 py-1 text-xs font-semibold border border-gray-300 rounded bg-white"
                onClick={() => setZoom((z) => Math.min(2.6, Math.round((z + 0.2) * 10) / 10))}
                aria-label="Zoom in"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="px-4 pt-3">
        <div className="text-xs text-gray-500 min-h-5">
          {hoveredSpot
            ? `${hoveredSpot.label}: ${hoveredRow ? hoveredRow.customer : 'Available'}${hoveredRow ? ` (${hoveredRow.status})` : ''}`
            : isMobile
              ? 'Drag to move around the map and tap any container to open details.'
              : 'Hover a container to preview details. Click to open container info.'}
        </div>
      </div>

      <div className="p-4 pt-2">
        <div
          className={isMobile ? 'overflow-auto rounded-md border border-gray-200 bg-gray-50 p-1' : ''}
          style={isMobile ? { touchAction: 'pan-x pan-y' } : undefined}
        >
          <div
            className="relative mx-auto w-full max-w-[1400px]"
            style={
              isMobile
                ? { width: `${mobileMapWidth}px`, aspectRatio: `${PLAN_WIDTH} / ${PLAN_HEIGHT}` }
                : { aspectRatio: `${PLAN_WIDTH} / ${PLAN_HEIGHT}` }
            }
          >
          <img
            src={sitePlanImage}
            alt="U Store Sandhurst Site Plan"
            className="absolute inset-0 w-full h-full object-contain rounded-md"
            draggable={false}
          />

          {HOTSPOTS.map((spot) => {
            const row = rowLookup[spot.normalized]
            const isTaken = row && row.status !== 'Empty'

            return (
              <button
                key={spot.normalized}
                type="button"
                className={`absolute rounded-[3px] transition-all duration-150 border ${
                  isTaken
                    ? 'bg-blue-500/20 border-blue-600/50 hover:bg-blue-500/30'
                    : 'bg-green-400/15 border-green-600/35 hover:bg-green-400/30'
                } ${hoveredId === spot.normalized ? 'ring-2 ring-yellow-300' : ''}`}
                style={{ left: spot.left, top: spot.top, width: spot.width, height: spot.height }}
                onMouseEnter={() => setHoveredId(spot.normalized)}
                onMouseLeave={() => setHoveredId((current) => (current === spot.normalized ? null : current))}
                onTouchStart={() => setHoveredId(spot.normalized)}
                onClick={() => {
                  if (row) {
                    onContainerClick(row)
                    return
                  }
                  onAddClick()
                }}
                title={row ? `${spot.label} - ${row.customer}` : `${spot.label} - Available`}
                aria-label={row ? `${spot.label} occupied by ${row.customer}` : `${spot.label} available`}
              />
            )
          })}
          </div>
        </div>
      </div>
    </div>
  )
}

function LegendDot({ color, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
      <span className="text-xs text-gray-500">{label}</span>
    </div>
  )
}
