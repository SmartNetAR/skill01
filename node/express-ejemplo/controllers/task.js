const db = require("../config/mysql");

exports.index = (req, res) => {
  const sql =
    "SELECT id, title, description, isDone FROM tasks WHERE title like ? AND (isDone = ?)";
  const bindParams = [];

  const title = req.query.title || "";

  bindParams.push(`%${title}%`);

  let status = req.query.status || "0 OR 1";
  if (status === "done") status = 1;
  if (status === "todo") status = 0;

  bindParams.push(status);

  db.connection.query(sql, bindParams, (err, rows, fields) => {
    if (err) console.log(err);
    res.json(rows);
  });
};

exports.show = (req, res) => {
  tasks = {
    name: "task " + req.params.id,
    description: "description task"
  };
  res.json({ tasks: tasks });
};

exports.store = (req, res) => {
  const { title, description, isDone = false } = req.body;
  if (title && description) {
    db.connection.query(
      `INSERT INTO tasks ( title, description, isDone ) 
      VALUES ('${title}', '${description}', ${isDone})`,
      (err, row) => {
        if (err) {
          res
            .status(500)
            .json({ message: "Error al insertar los datos: " + err });
          throw err;
        }
        console.log(row);
        res.json({ message: `tarea creada con id  ${row.insertId}` });
      }
    );
  }
};
