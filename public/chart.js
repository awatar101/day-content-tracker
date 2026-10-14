let chartInstance = null;

document.getElementById("drawChartBtn").addEventListener("click", async () => {
  const res = await fetch("/data")
  const data = await res.json()

  const labels = data.map(d => d.date)
  const values = data.map(d => Number(d.temperature_c))
  // "date"
  // "weekday"
  // "weather_type"
  // "temperature_c"
  // "sleep_hours"
  // "work_hours"
  // "distractions_count"
  // "mood_level"
  // "productivity_level"


  if (chartInstance) {
    chartInstance.destroy()
  }

  // new Chart(document.getElementById("chartCanvas"), {
  chartInstance = new Chart(document.getElementById("chartCanvas"), {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Lämpötila",
        data: values,
        borderColor: chartColor()
      }]
    }
  })
})
