document.getElementById("dayForm").addEventListener("submit", async e => {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.target).entries())

  await fetch("/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  alert("Tallennettu!")
})
