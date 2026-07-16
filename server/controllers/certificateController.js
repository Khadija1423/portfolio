const Certificate = require('../models/Certificate');

const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({}).sort({ issueDate: -1 });
    res.json({ success: true, data: certificates });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createCertificate = async (req, res) => {
  try {
    const { title, issuer, credentialUrl, issueDate, imageUrl } = req.body;

    if (!title || !issuer || !issueDate) {
        return res.status(400).json({ success: false, message: 'Title, issuer, and issueDate are required' });
    }

    const certificate = new Certificate({
      title,
      issuer,
      credentialUrl,
      issueDate,
      imageUrl
    });

    await certificate.save();
    res.status(201).json({ success: true, data: certificate });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }

    const updatedCertificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, data: updatedCertificate });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ success: false, message: 'Certificate not found' });
    }

    await certificate.deleteOne();
    res.json({ success: true, message: 'Certificate removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
};
