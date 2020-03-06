const db = require("../config/mysql");

exports.index = (req, res) => {
  let sql = "SELECT id, title, description, isDone FROM tasks";
  let queryParam = "";
  const bind = [];
  if (req.query.title) {
    queryParam += "title like ?";
    bind.push(`%${req.query.title}%`);
  }
  if (req.query.status) {
    queryParam += "isDone = ?";
    if (req.query.status === "done") bind.push(true);
    else bind.push(false);
  }
  if (queryParam !== "") sql = `${sql} WHERE ${queryParam}`;

  db.connection.query(sql, bind, (err, rows, fields) => {
    if (err) console.log(err);
    res.json(rows);
  });

  // tasks = [{
  //   name: "task 1",
  //   description: "description task"
  // },
  // {
  //   name: "task 2",
  //   description: "description task"
  // }]

  // res.json( {'tasks': tasks} )
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
