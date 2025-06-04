import React from 'react'

export default function PreviewPanel({ data }) {
  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
  }

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'match-report.json'
    link.click()
  }

  const totalGames = data.pointsPlayed?.length || 0
  const totalPoints = data.pointsPlayed?.reduce((sum, line) => sum + line.split(',').length, 0) || 0
  const winnerDiff = (parseInt(data.winnersA || 0) - parseInt(data.winnersB || 0))

  return (
    <div className="p-4 bg-white shadow rounded mt-4">
      <pre className="overflow-auto text-sm bg-gray-100 p-2 rounded max-h-60">{JSON.stringify(data, null, 2)}</pre>
      <div className="mt-2 space-y-1 text-sm">
        <p>Total Games: {totalGames}</p>
        <p>Total Points: {totalPoints}</p>
        <p>Winner Difference: {winnerDiff}</p>
      </div>
      <div className="mt-3 flex gap-2">
        <button onClick={copyJson} className="px-3 py-1 bg-blue-500 text-white rounded">Copy JSON to clipboard</button>
        <button onClick={downloadJson} className="px-3 py-1 bg-green-500 text-white rounded">Download JSON file</button>
      </div>
    </div>
  )
}
