const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 80;

// Отдаём index.html и статические файлы (если появятся)
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Frontend server listening at http://localhost:${port}`);
});
