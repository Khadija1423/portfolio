const Skill = require('../models/Skill');

const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({}).sort({ category: 1, displayOrder: 1, name: 1 });
    res.json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createSkill = async (req, res) => {
  try {
    const { name, level, category, displayOrder } = req.body;

    if (!name || !level || !category) {
        return res.status(400).json({ success: false, message: 'Name, level, and category are required' });
    }

    const skill = new Skill({
      name,
      level,
      category,
      displayOrder
    });

    await skill.save();
    res.status(201).json({ success: true, data: skill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }

    const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, data: updatedSkill });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }

    await skill.deleteOne();
    res.json({ success: true, message: 'Skill removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};
