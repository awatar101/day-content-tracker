//public/chart-colors.js

function chartColor() {
  const theme = localStorage.getItem("theme")
  return theme === "dark" ? "white" : "blue"
}
