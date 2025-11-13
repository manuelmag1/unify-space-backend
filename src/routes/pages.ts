import { Router, Response } from 'express';
import Page from '../models/Page';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

// Get all pages for user (across all subjects)
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    // First, get all subjects for this user
    const Subject = require('../models/Subject').default;
    const userSubjects = await Subject.find({ usuario_id: req.userId });
    const subjectIds = userSubjects.map((s: any) => s._id);

    // Then get all pages for those subjects
    const pages = await Page.find({
      materia_id: { $in: subjectIds }
    }).sort({ position: 1 });
    
    const normalizedPages = pages.map(p => ({
      id: p._id,
      title: p.titulo,
      subject_id: p.materia_id,
      created_at: p.fecha_creacion,
      icon: p.icon,
      tags: p.tags,
      position: p.position
    }));
    res.json({ pages: normalizedPages });
  } catch (error) {
    console.error('Get all pages error:', error);
    res.status(500).json({ error: 'Error fetching pages' });
  }
});

// Get all pages for a subject
router.get('/subject/:subjectId', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const pages = await Page.find({
      materia_id: req.params.subjectId,
    }).sort({ position: 1 });
    const normalizedPages = pages.map(p => ({
      id: p._id,
      title: p.titulo,
      subject_id: p.materia_id,
      created_at: p.fecha_creacion,
      icon: p.icon,
      tags: p.tags,
      position: p.position
    }));
    res.json({ pages: normalizedPages });
  } catch (error) {
    console.error('Get pages error:', error);
    res.status(500).json({ error: 'Error fetching pages' });
  }
});

// Get single page
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const page = await Page.findOne({
      _id: req.params.id,
    });

    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }

    const normalized = {
      id: page._id,
      title: page.titulo,
      subject_id: page.materia_id,
      created_at: page.fecha_creacion,
      icon: page.icon,
      tags: page.tags,
      position: page.position
    };
    res.json({ page: normalized });
  } catch (error) {
    console.error('Get page error:', error);
    res.status(500).json({ error: 'Error fetching page' });
  }
});

// Create page
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { title, icon, tags, position, subjectId } = req.body;

    const page = new Page({
      titulo: title || 'Sin título',
      materia_id: subjectId,
      fecha_creacion: new Date(),
      icon,
      tags,
      position: position || 0,
    });

    await page.save();
    const normalized = {
      id: page._id,
      title: page.titulo,
      subject_id: page.materia_id,
      created_at: page.fecha_creacion,
      icon: page.icon,
      tags: page.tags,
      position: page.position
    };
    res.status(201).json({ page: normalized });
  } catch (error) {
    console.error('Create page error:', error);
    res.status(500).json({ error: 'Error creating page' });
  }
});

// Update page
router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { title, icon, tags, position } = req.body;
    const updateData: any = { icon, tags, position };
    if (title) updateData.titulo = title;

    const page = await Page.findOneAndUpdate(
      { _id: req.params.id },
      updateData,
      { new: true }
    );

    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }

    const normalized = {
      id: page._id,
      title: page.titulo,
      subject_id: page.materia_id,
      created_at: page.fecha_creacion,
      icon: page.icon,
      tags: page.tags,
      position: page.position
    };
    res.json({ page: normalized });
  } catch (error) {
    console.error('Update page error:', error);
    res.status(500).json({ error: 'Error updating page' });
  }
});// Delete page
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const page = await Page.findOneAndDelete({
      _id: req.params.id,
    });

    if (!page) {
      return res.status(404).json({ error: 'Page not found' });
    }

    res.json({ message: 'Page deleted successfully' });
  } catch (error) {
    console.error('Delete page error:', error);
    res.status(500).json({ error: 'Error deleting page' });
  }
});

export default router;
