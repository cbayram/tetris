import fs from "fs";

// Quick dirty script to generate a single file solution with some strong assumptions
const indexHTML = fs.readFileSync("public/index.html", "utf-8");
const indexJS = fs.readFileSync("public/index.js", "utf-8");
fs.writeFileSync(
  "public/index.all.html",
  indexHTML.replace(
    '<script type="module" src="./index.js" defer></script>',
    `<script type="module" defer>${indexJS}</script>`
  )
);
