const Project = require('../models/Project');

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

const getProjects = async (req, res) => {
  try {
    const filters = {};
    if (req.query.category) {
      filters.category = req.query.category;
    }

    const projects = await Project.find(filters).sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createProject = async (req, res) => {
  try {
    const { title, summary, description, thumbnailUrl, galleryUrls, githubUrl, liveUrl, technologies, category, featured } = req.body;

    if (!title) {
        return res.status(400).json({ success: false, message: 'Title is required' });
    }

    const slug = generateSlug(title);

    // Check if slug exists
    const existingProject = await Project.findOne({ slug });
    if (existingProject) {
        return res.status(400).json({ success: false, message: 'Project with this title already exists' });
    }

    const project = new Project({
      title,
      slug,
      summary,
      description,
      thumbnailUrl,
      galleryUrls,
      githubUrl,
      liveUrl,
      technologies,
      category,
      featured,
    });

    await project.save();
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const updates = req.body;

    if (updates.title) {
        updates.slug = generateSlug(updates.title);

        // check for conflicts if slug changes
        if (updates.slug !== project.slug) {
            const existingProject = await Project.findOne({ slug: updates.slug });
            if (existingProject) {
                return res.status(400).json({ success: false, message: 'Project with this title already exists' });
            }
        }
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    res.json({ success: true, data: updatedProject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    await project.deleteOne();
    res.json({ success: true, message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
