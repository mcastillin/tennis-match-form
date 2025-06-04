export function validateScore(score) {
  const pattern = /^(\d+[\u2013-]\d+)(\s+\d+[\u2013-]\d+)*$/
  return pattern.test(score.trim())
}

export function isNumeric(value) {
  return /^\d+$/.test(value)
}

export function parsePoints(text) {
  const lines = text
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean)
  const result = []
  for (let i = 0; i < lines.length; i += 2) {
    const header = lines[i]
    const pointsLine = lines[i + 1] || ''
    if (!header) continue
    const spaceIndex = header.indexOf(' ')
    if (spaceIndex === -1) {
      result.push({ score: header, player: '', points: [] })
      continue
    }
    const score = header.slice(0, spaceIndex)
    const player = header.slice(spaceIndex + 1)
    const points = pointsLine
      .split(',')
      .map((p) => p.trim())
      .filter(Boolean)
    result.push({ score, player, points })
  }
  return result
}
