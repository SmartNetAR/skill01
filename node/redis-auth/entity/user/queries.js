module.exports = {
  insertUser: `
    INSERT INTO users SET ?;
  `,

  getUserByEmailPassword: `
    SELECT 
      id,
      email,
      fullname
    FROM 
      users
    WHERE
      email = ? AND password = ?;
  `,
};
