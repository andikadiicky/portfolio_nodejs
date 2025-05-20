const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

router.get('/getAllPortfolio', async (req, res) => {
  const data = await Portfolio.find();
  res.json({ status: true, data });
});

router.post('/getPortfolio', async (req, res) => {
  try {
    const { id_user } = req.body;
    console.log(req.body);

    if (!id_user) {
      return res.status(400).json({ status: false, message: 'id_user is required' });
    }

    const data = await Portfolio.find({ id_user });

    if (!data || data.length === 0) {
      return res.status(404).json({ status: false, message: 'No Portfolios found for this user' });
    }

    res.json({ status: true, data });
  } catch (error) {
    console.error('Error fetching Portfolio:', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
});

//insert data
// Auto-increment utility for id_user
async function getNextUserId() {
  const lastUser = await Portfolio.findOne().sort({ id_user: -1 }).exec();
  const lastId = lastUser?.id_user ? parseInt(lastUser.id_user) : 0;
  return (lastId + 1).toString(); // Store as string
}

router.post('/insert', async (req, res) => {
  try {
    const { data_portfolios } = req.body;
    // Validate input
    if (!Array.isArray(data_portfolios)) {
      return res.status(400).json({
        status: false,
        message: 'Invalid payload: "data_portfolios" are required.',
      });
    }

    // Auto-generate id_user
    const id_user = await getNextUserId();

    const newPortfolio = new Portfolio({
      id_user, data_portfolios
    });
    await newPortfolio.save();

    // Success response
    res.status(200).json({
      status: true,
      message: `Berhasil Menambahkan Portfolio, dengan id_user = ${id_user}`,
      id_user
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
});

//update data
router.put('/update/:id', async (req, res) => {
  try {
    const updated = await Portfolio.findOneAndUpdate(
      { id_user: req.params.id }, // Filter by id_user
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ status: false, message: 'Portfolio Tidak Ditemukan' });
    }

    res.json({ status: true, message: 'Berhasil Mengupdate Portfolio' });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

//delete data
router.delete('/delete/:id', async (req, res) => {
  try {
    const deleted = await Portfolio.findOneAndDelete({ id_user: req.params.id });

    if (!deleted) {
      return res.status(404).json({ status: false, message: 'Portfolio not found' });
    }

    res.json({ status: true, message: 'Portfolio deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;
