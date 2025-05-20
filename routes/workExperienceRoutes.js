const express = require('express');
const router = express.Router();
const WorkExperience = require('../models/WorkExperience');

router.get('/getAllWorkExperience', async (req, res) => {
  const data = await WorkExperience.find();
  res.json({ status: true, data });
});

router.post('/getWorkExperience', async (req, res) => {
  try {
    const { id_user } = req.body;
    console.log(req.body);

    if (!id_user) {
      return res.status(400).json({ status: false, message: 'id_user is required' });
    }

    const data = await WorkExperience.find({ id_user });

    if (!data || data.length === 0) {
      return res.status(404).json({ status: false, message: 'No work experiences found for this user' });
    }

    res.json({ status: true, data });
  } catch (error) {
    console.error('Error fetching work experience:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
});

//insert data
// Auto-increment utility for id_user
async function getNextUserId() {
  const lastUser = await WorkExperience.findOne().sort({ id_user: -1 }).exec();
  const lastId = lastUser?.id_user ? parseInt(lastUser.id_user) : 0;
  return (lastId + 1).toString(); // Store as string
}

router.post('/insert', async (req, res) => {
  try {
    const { name, current_position, about, data_experiences } = req.body;

    // Validate input
    if (!name || !current_position || !about || !Array.isArray(data_experiences)) {
      return res.status(400).json({
        status: false,
        message: 'Invalid payload: "name", "current_position", "about" and "data_experiences" are required.',
      });
    }

    // Auto-generate id_user
    const id_user = await getNextUserId();

    const setWorkExp = new WorkExperience({
      id_user,
      name,
      current_position,
      about,
      data_experiences,
    });

    // Save to MongoDB
    await setWorkExp.save();

    // Success response
    res.status(200).json({
      status: true,
      message: `Berhasil Menambahkan Work Experience, dengan id_user = ${id_user}`,
      id_user
    });
  } catch (error) {
    console.error('Insert error:', error);
    res.status(500).json({
      status: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
});

//update data
router.put('/update/:id', async (req, res) => {
  try {
    const updated = await WorkExperience.findOneAndUpdate(
      { id_user: req.params.id }, // Filter by id_user
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ status: false, message: 'ID User Tidak Ditemukan' });
    }

    res.json({ status: true, message: 'Berhasil Mengupdate ID User' });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

//delete data
router.delete('/delete/:id', async (req, res) => {
  try {
    const deleted = await WorkExperience.findOneAndDelete({ id_user: req.params.id });

    if (!deleted) {
      return res.status(404).json({ status: false, message: 'ID User Tidak Ditemukan' });
    }

    res.json({ status: true, message: 'Berhasil Menghapus ID User' });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;
