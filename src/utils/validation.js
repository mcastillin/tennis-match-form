export function validateScore(score) {
  const pattern = /^(\d+[\u2013-]\d+)(\s+\d+[\u2013-]\d+)*$/
  return pattern.test(score.trim())
}

export function isNumeric(value) {
  return /^\d+$/.test(value)
}
