import e from "express";
import path from "path";
import { bootstrap } from "./app";

const app = e();
const PORT = process.env.PORT || 3000;

app.use(e.static(path.join(__dirname), { index: false }));

app.get("*", bootstrap);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
