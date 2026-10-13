const themeToggle = document.getElementById("themeToggle")

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme)
  localStorage.setItem("theme", theme)
}

const savedTheme = localStorage.getItem("theme")
if (savedTheme) {
  applyTheme(savedTheme)
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
  applyTheme(prefersDark ? "dark" : "light")
}

themeToggle.addEventListener("click", () => {
  const current = localStorage.getItem("theme")
  const next = current === "dark" ? "light" : "dark"
  applyTheme(next)
})
