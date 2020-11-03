import bmi from "./bmiCalculator";
import sport from "./exerciseCalculator";
import express = require("express");
const app = express();
app.use(express.json());

app.post("/exercises", (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!_req.body.days || !_req.body.target) {
    res.status(400).send({ error: "parameters missing" });
  }
  type bodytype = {
    days: Array<string | number>;
    target: string | number;
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body: bodytype = _req.body;

  const validNumbers: (string | number)[] = body.days.filter(
    (value: string | number) => !isNaN(Number(value))
  );
  if (
    validNumbers.length !== body.days.length ||
    isNaN(Number(body.target)) ||
    body.days.length === 0
  ) {
    res.status(400).send({ error: "malformatted parameters" });
  }
  console.log(body);

  const dayArray: number[] = body.days.map((day) => Number(day));
  const target = Number(body.target);

  const report = sport(dayArray, target);
  res.json(report);
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (_req, res) => {
  const responseJson = {
    weight: _req.query.weight,
    height: _req.query.height,
    bmi: bmi(Number(_req.query.weight), Number(_req.query.height) / 100),
  };
  if (
    isNaN(Number(_req.query.weight)) ||
    isNaN(Number(_req.query.height) / 100)
  ) {
    res.status(400).send({ error: "malformatted arguments" });
  }
  res.json(responseJson);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
