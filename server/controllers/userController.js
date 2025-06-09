const db = require('../config/db');
const bcrypt = require('bcrypt');

const getUsers = (req, res) => {
db.query('select * from users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

const addUser = async (req, res) => {
  try {
    console.log('Request body:', req.body);

    const { firstName, lastName, password, confirmPassword, phoneNumber, email, age, city, zipCode, address } = req.body;

    if (!password) {
      return res.status(400).send("Password is required");
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Confirm password invalid");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (firstName, lastName, passwordHash, phoneNumber, email, age, adresse, city, zipCode)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [firstName, lastName, passwordHash, phoneNumber, email, age, address, city, zipCode],
      (err, results) => {
        if (err) {
          console.error("Database error:", err);
         return res.status(500).json({
            code: err.code,
            message: err.sqlMessage || err.message
          });
        }
        res.json(results);
      }
    );
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send(error.message);
  }
};
const updateUser = (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName, lastName,
      phoneNumber, age,email,
      city, zipCode, adresse
    } = req.body;

    const query = `
      UPDATE users SET
        firstName = ?, lastName = ?,
        phoneNumber = ?, age = ?,
        adresse = ?, city = ?, zipCode = ?
      WHERE CustomerID = ?
    `;

    const params = [
      firstName, lastName,
      phoneNumber, age,
      adresse, city, zipCode,
      id
    ];

    db.query(query, params, (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ code: err.code, message: err.message });
      }
      res.json({ message: "User updated successfully", updatedUser: {
    CustomerID:req.params.id,
   firstName, lastName,
      phoneNumber, age,email,
      city, zipCode, adresse
  }
 });
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send(error.message);
  }
};
const changePassword = async (req, res) => {
  try {
    console.log('Request body:', req.body);

    const { id } = req.params;
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).send("Current and new passwords are required");
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).send("Confirm password invalid");
    }

    const selectQuery = `SELECT passwordHash FROM users WHERE CustomerID = ?`;
    db.query(selectQuery, [id], async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ code: err.code, message: err.message });
      }
      if (results.length === 0) {
        return res.status(404).send("User not found");
      }

      const passwordHash = results[0].passwordHash;

      // Vérifier mot de passe actuel
      const match = await bcrypt.compare(currentPassword, passwordHash);
      if (!match) {
        return res.status(401).send("Current password is incorrect");
      }

      // Hasher le nouveau mot de passe
      const newPasswordHash = await bcrypt.hash(newPassword, 10);

      // Mettre à jour dans la BDD
      const updateQuery = `UPDATE users SET passwordHash = ? WHERE CustomerID = ?`;
      db.query(updateQuery, [newPasswordHash, id], (updateErr) => {
        if (updateErr) {
          console.error("Database error:", updateErr);
          return res.status(500).json({ code: updateErr.code, message: updateErr.message });
        }
        res.send("Password updated successfully");
      });
    });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send(error.message);
  }
};


const loginUser = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).send("Database error");
    if (results.length === 0) return res.status(404).send("User not found");

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) return res.status(401).send("Invalid credentials");
    const { password: _, passwordHash: __, ...data } = user;
    res.json({ message: "Login successful",data});
  });
};

module.exports = { getUsers ,updateUser, addUser, changePassword ,loginUser};
