document.getElementById("predictBtn").addEventListener("click", async () => {
  const key = document.getElementById("keySelect").value
  const res = await fetch("/data")
  const data = await res.json()

  if (data.length < 2) {
    document.getElementById("predictionResult").innerText =
      "Tarvitaan vähintään 2 päivää ennusteen tekemiseen."
    return
  }

  const y = data.map(d => Number(d[key]))
  const x = [...Array(y.length).keys()]

  const n = y.length
  const sumX = x.reduce((a,b)=>a+b,0)
  const sumY = y.reduce((a,b)=>a+b,0)
  const sumXY = x.map((xi,i)=>xi*y[i]).reduce((a,b)=>a+b,0)
  const sumX2 = x.map(xi=>xi*xi).reduce((a,b)=>a+b,0)

  const slope = (n*sumXY - sumX*sumY) / (n*sumX2 - sumX*sumX)
  const intercept = (sumY - slope*sumX) / n

  const nextX = n
  const prediction = slope * nextX + intercept

  document.getElementById("predictionResult").innerText =
    `Ennuste seuraavalle päivälle (${key}): ${prediction.toFixed(2)}`
})
