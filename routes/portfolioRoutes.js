const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');

router.get('/getAllPortfolio', async (req, res) => {
  const data = await Portfolio.find();
  res.json({ status: true, data });
});

//insert data
router.post('/insert', async (req, res) => {
  try {
    // Check if portfolio_id already exists
    const exists = await Portfolio.findOne({ portfolio_id: req.body.portfolio_id });

    if (exists) {
      return res.status(400).json({
        status: false,
        message: 'portfolio_id Sudah Ada, Silahkan Gunakan portfolio_id Lain',
      });
    }

    const newPortfolio = new Portfolio(req.body);
    await newPortfolio.save();

    res.json({
      status: true,
      message: 'Berhasil Menambahkan Work Experience',
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
      { portfolio_id: req.params.id }, // Filter by portfolio_id
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
    const deleted = await Portfolio.findOneAndDelete({ portfolio_id: req.params.id });

    if (!deleted) {
      return res.status(404).json({ status: false, message: 'Work experience not found' });
    }

    res.json({ status: true, message: 'Work experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
});

module.exports = router;
