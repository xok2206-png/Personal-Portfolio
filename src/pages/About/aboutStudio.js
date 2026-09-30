export const studioRoom = '/assets/production/images/about-studio/terrace-workroom-v2.webp'

// Coordinates refer to terrace-workroom-v2 (1672 × 941), including floor stops.
export const aboutObjects = [
  { id: 'profile', title: 'PROFILE', korean: '프로필', label: '노트북', x: 26.2, y: 54.1, width: 6, height: 8, stop: { x: 37, y: 72 } },
  { id: 'journey', title: 'JOURNEY', korean: '여정', label: '책', x: 68.7, y: 46.5, width: 10, height: 23, stop: { x: 64, y: 62 } },
  { id: 'process', title: 'PROCESS', korean: '작업 과정', label: '작업 노트', x: 31.7, y: 55, width: 5, height: 6, stop: { x: 42, y: 66 } },
  { id: 'values', title: 'VALUES', korean: '작업 기준', label: '보드', x: 49.1, y: 40.3, width: 10, height: 13, stop: { x: 49, y: 60 } },
  { id: 'archive', title: 'ARCHIVE', korean: '기록과 관심사', label: '보관 상자', x: 86, y: 61.8, width: 9, height: 11, stop: { x: 78, y: 68 } },
]

// The terrace widens in the middle, then narrows between the foreground planters.
// Reuses the gallery walker without changing its other consumers.
export function constrainStudioFloor(point) {
  const y = Math.max(60, Math.min(80, point.y))
  const middle = Math.min(1, (y - 60) / 8)
  const front = Math.max(0, (y - 68) / 12)
  const left = 44 - middle * 7 - front
  const right = 62 + middle * 17 - front * 16
  return { x: Math.max(left, Math.min(right, point.x)), y }
}
