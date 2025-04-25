import type { z } from 'zod';
import type { resumeSchema } from '@/lib/schema';

export type EducationEntry = {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  description?: string;
};

export type ExperienceEntry = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
};

export type ResumeData = z.infer<typeof resumeSchema>;

export type TemplateComponentProps = {
  data: ResumeData;
};

export type TemplateKey = 'classic' | 'modern' | 'creative' | 'minimalist';
