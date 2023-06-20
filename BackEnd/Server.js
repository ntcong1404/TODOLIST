import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
});

app.get("/", (request, response) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, result) => {
    if (err) return response.json({ Message: "Error inside server" });
    return response.json(result);
  });
});

app.post("/student", (request, response) => {
  const sql = "INSERT INTO student (`Name`,`Email`) VALUES (?)";
  const values = [request.body.name, request.body.email];

  db.query(sql, [values], (err, result) => {
    if (err) {
      return response.json(err);
    }
    return response.json(result);
  });
});

app.get("/read/:id", (request, response) => {
  const sql = "SELECT * FROM student WHERE ID = ?";
  const id = request.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) return response.json({ Message: "Error inside server" });
    return response.json(result);
  });
});

app.put("/edit/:id", (request, response) => {
  const sql = "UPDATE student SET `Name`=?, `Email`= ? WHERE ID = ?";
  const id = request.params.id;

  db.query(sql, [request.body.name, request.body.email, id], (err, result) => {
    if (err) return response.json({ Message: "Error inside server" });
    return response.json(result);
  });
});

app.delete("/delete/:id", (request, response) => {
  const sql = "DELETE FROM student WHERE ID = ?";
  const id = request.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) return response.json({ Message: "Error inside server" });
    return response.json(result);
  });
});

app.listen(8081, () => {
  console.log("Listening on");
});
