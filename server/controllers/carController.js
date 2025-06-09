const db = require('../config/db');
const cloudinary = require('../config/cloudinary');


const getCars = (req, res) => {
db.query('SELECT * FROM cars ORDER BY VehicleID DESC', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};
const addCar = async (req, res) => {
  const { model, Status, dailyRate, fuel, Mark, doors } = req.body;
  const imageFile = req.file; // uploaded file info

  console.log('Body:', req.body);
  console.log('File:', imageFile);

  if (imageFile) {
    try {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        stream.end(imageFile.buffer);
      });
      insertCar(uploadResult.secure_url, uploadResult.public_id);
    } catch (err) {
      return res.status(500).send('Upload failed');
    }
  } else {
    insertCar('', '');
  }

  function insertCar(imageUrl, publicId) {
    console.log('Inserting car with image URL:', imageUrl, 'and publicId:', publicId);
    const insertQuery = `
      INSERT INTO cars (Model, Status, DailyRate, ImageURL, PublicID, fuel, Mark, doors)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(insertQuery, [model, Status, dailyRate, imageUrl, publicId, fuel, Mark, doors], (err, results) => {
      if (err) {
        console.error('Insert car error:', err);
        return res.status(500).send(err);
      }
      console.log('Insert results:', results);

      const selectQuery = `SELECT * FROM cars WHERE VehicleID = ?`;
      db.query(selectQuery, [results.insertId], (err, rows) => {
        if (err) {
          console.error('Select inserted car error:', err);
          return res.status(500).send(err);
        }
        console.log('Inserted car:', rows[0]);
        res.json({ car: rows[0] });
      });
    });
  }
};

const addLikedCar = async(req,res)=>{
 const { CustomerID, VehicleID } = req.body;

  if (!CustomerID || !VehicleID) {
    return res.status(400).json({ message: 'CustomerID and VehicleID are required' });
  }

  const checkQuery = 'SELECT * FROM savedcar WHERE CustomerID = ? AND VehicleID = ?';
  db.query(checkQuery, [CustomerID, VehicleID], (err, results) => {
    if (err) {
      console.error('Error checking like:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length > 0) {
      // Already liked → remove it
      const deleteQuery = 'DELETE FROM savedcar WHERE CustomerID = ? AND VehicleID = ?';
      db.query(deleteQuery, [CustomerID, VehicleID], (err) => {
        if (err) {
          console.error('Error unliking:', err);
          return res.status(500).json({ message: 'Database error' });
        }
        return res.status(200).json({ message: 'Unliked' });
      });
    } else {
     
      const insertQuery = 'INSERT INTO savedcar (CustomerID, VehicleID) VALUES (?, ?)';
      db.query(insertQuery, [CustomerID, VehicleID], (err) => {
        if (err) {
          console.error('Error liking:', err);
          return res.status(500).json({ message: 'Database error' });
        }
        return res.status(201).json({ message: 'Liked' });
      });
    }
  });
};
const removeLikedCar = async(req,res)=>{
 const { CustomerID, VehicleID } = req.body;

  if (!CustomerID || !VehicleID) {
    return res.status(400).json({ message: 'CustomerID and VehicleID are required' });
  }
  const checkQuery = 'SELECT * FROM savedcar WHERE CustomerID = ? AND VehicleID = ?';
  db.query(checkQuery, [CustomerID, VehicleID], (err, results) => {
    if (err) {
      console.error('Error checking like:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length > 0) {
      // Already liked → remove it
      const deleteQuery = 'DELETE FROM savedcar WHERE CustomerID = ? AND VehicleID = ?';
      db.query(deleteQuery, [CustomerID, VehicleID], (err) => {
        if (err) {
          console.error('Error unliking:', err);
          return res.status(500).json({ message: 'Database error' });
        }
        return res.status(200).json({ message: 'Unliked' });
      });
    } else {
      return res.status(200).json({ message: 'car not saved not exist' });
    }
  });

};
const deleteCar = async (req, res) => {
  const VehicleID = req.params.id;

  // First, get the PublicID of the car image from DB
  const getPublicIdQuery = 'SELECT PublicID FROM cars WHERE VehicleID = ?';
  db.query(getPublicIdQuery, [VehicleID], async (err, results) => {
    if (err) {
      console.error('Error fetching PublicID:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const publicId = results[0].PublicID;

    // Delete image from Cloudinary if PublicID exists
    if (publicId) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        // Optional: continue deleting car from DB even if image deletion fails
      }
    }

    // Now delete the car record from DB
    const deleteQuery = 'DELETE FROM cars WHERE VehicleID = ?';
    db.query(deleteQuery, [VehicleID], (err, result) => {
      if (err) {
        console.error('Error deleting car:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Car not found' });
      }
      res.status(200).json({ message: 'Car deleted successfully' });
    });
  });
};

const editCar = async (req, res) => {
  const vehicleId = req.params.id;
  const { model, Status, dailyRate,oldPublicId } = req.body;
  const imageFile = req.file; // multer puts uploaded file here if exists
  console.log(imageFile);
  
  try {
    let imageUrl = null;

    if (imageFile) {
       if (oldPublicId) {
        await cloudinary.uploader.destroy(oldPublicId);
      }
      // Upload new image to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(imageFile.buffer);
      });
      imageUrl = uploadResult.secure_url;
    }

    // Build SQL query and params dynamically based on whether imageUrl exists
    let sql, params;

    if (imageUrl) {
      sql = `
        UPDATE cars
        SET Model = ?, ImageURL = ?, Status = ?, DailyRate = ?
        WHERE VehicleID = ?
      `;
      params = [model, imageUrl, Status, dailyRate, vehicleId];
    } else {
      sql = `
        UPDATE cars
        SET Model = ?, Status = ?, DailyRate = ?
        WHERE VehicleID = ?
      `;
      params = [model, Status, dailyRate, vehicleId];
    }

    db.query(sql, params, (err, result) => {
      if (err) {
        console.error('Error updating car:', err);
        return res.status(500).json({ message: 'Database error' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Car not found' });
      }
      res.json({ message: 'Car updated successfully' });
    });
  } catch (err) {
    console.error('Error uploading image:', err);
    res.status(500).json({ message: 'Image upload failed' });
  }
};

const isCarLiked = (req, res) => {
  const { CustomerID, VehicleID } = req.query;
  const checkQuery = 'SELECT * FROM savedcar WHERE CustomerID = ? AND VehicleID = ?';
  db.query(checkQuery, [CustomerID, VehicleID], (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });

    const liked = results.length > 0;
    res.status(200).json({ liked });
  });
};
const getLikedCars = (req, res) => {
  const { CustomerID } = req.params;

  const query = `
    SELECT v.*, lc.savedAt
    FROM savedcar lc
    JOIN cars v ON lc.VehicleID = v.VehicleID
    WHERE lc.CustomerID = ?
  `;

  db.query(query, [CustomerID], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(200).json(results);
  });
};

module.exports = { editCar,deleteCar , getCars , addCar ,addLikedCar,isCarLiked,removeLikedCar ,getLikedCars};
