import { Router, Response } from 'express';
import Subject from '../models/Subject';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

// Get all subjects for user
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const subjects = await Subject.find({ usuario_id: req.userId }).sort({ position: 1 });
    const normalizedSubjects = subjects.map(s => ({
      id: s._id,
      name: s.nombre,
      codigo: s.codigo,
      icon: s.icon,
      color: s.color,
      position: s.position
    }));
    res.json({ subjects: normalizedSubjects });
  } catch (error) {
    console.error('Get subjects error:', error);
    res.status(500).json({ error: 'Error fetching subjects' });
  }
});

// Create subject
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { name, icon, color, position, codigo } = req.body;

    const subject = new Subject({
      nombre: name,
      codigo: codigo || 'MAT-' + Date.now(),
      icon,
      color,
      position: position || 0,
      usuario_id: req.userId,
    });

    await subject.save();
    const normalized = {
      id: subject._id,
      name: subject.nombre,
      codigo: subject.codigo,
      icon: subject.icon,
      color: subject.color,
      position: subject.position
    };
    res.status(201).json({ subject: normalized });
  } catch (error) {
    console.error('Create subject error:', error);
    res.status(500).json({ error: 'Error creating subject' });
  }
});

// Update subject
router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { name, icon, color, position, codigo } = req.body;
    const updateData: any = { icon, color, position };
    if (name) updateData.nombre = name;
    if (codigo) updateData.codigo = codigo;
    
    const subject = await Subject.findOneAndUpdate(
      { _id: req.params.id, usuario_id: req.userId },
      updateData,
      { new: true }
    );

    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' });
    }

    const normalized = {
      id: subject._id,
      name: subject.nombre,
      codigo: subject.codigo,
      icon: subject.icon,
      color: subject.color,
      position: subject.position
    };
    res.json({ subject: normalized });
  } catch (error) {
    console.error('Update subject error:', error);
    res.status(500).json({ error: 'Error updating subject' });
  }
});

// Delete subject
router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const subject = await Subject.findOneAndDelete({
      _id: req.params.id,
      usuario_id: req.userId,
    });

    if (!subject) {
      return res.status(404).json({ error: 'Subject not found' });
    }

    res.json({ message: 'Subject deleted successfully' });
  } catch (error) {
    console.error('Delete subject error:', error);
    res.status(500).json({ error: 'Error deleting subject' });
  }
});

export default router;
