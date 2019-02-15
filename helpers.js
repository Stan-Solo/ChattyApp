module.exports = function genColor() {
  const colors = ["#FF0000", "#FFA500", "#FFFF00", "#008000", "#00FFFF", "#000080", "#FF00FF", "#FF1493", "#D2B48C", "#8B4513"]
  return colors[Math.floor(Math.random() * 10)];
}
