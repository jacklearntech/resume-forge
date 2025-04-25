import { z } from 'zod';

export const educationEntrySchema = z.object({
  id: z.string().uuid(),
  institution: z.string().min(1, 'Institution name is required'),
  degree: z.string().min(1, 'Degree is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  description: z.string().optional(),
});

export const experienceEntrySchema = z.object({
  id: z.string().uuid(),
  company: z.string().min(1, 'Company name is required'),
  position: z.string().min(1, 'Position is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  responsibilities: z.string().min(1, 'Responsibilities are required'),
});

export const resumeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  linkedin: z.string().url('Invalid LinkedIn URL').optional().or(z.literal('')),
  portfolio: z.string().url('Invalid Portfolio URL').optional().or(z.literal('')),
  summary: z.string().min(10, 'Summary should be at least 10 characters'),
  education: z.array(educationEntrySchema).min(1, 'At least one education entry is required'),
  experience: z.array(experienceEntrySchema).min(1, 'At least one experience entry is required'),
  skills: z.string().min(1, 'Skills are required (comma-separated)'),
});

export const initialResumeData: z.infer<typeof resumeSchema> = {
  name: '',
  email: '',
  phone: '',
  address: '',
  linkedin: '',
  portfolio: '',
  summary: '',
  education: [],
  experience: [],
  skills: '',
};
