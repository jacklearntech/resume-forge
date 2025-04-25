"use client";

import type { z } from 'zod';
import type { UseFormReturn } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid'; // Ensure uuid is installed or use crypto.randomUUID()

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, PlusCircle } from 'lucide-react';
import { resumeSchema, initialResumeData } from '@/lib/schema';
import type { ResumeData } from '@/lib/types';

interface ResumeFormProps {
  onSubmit: (values: ResumeData) => void;
  defaultValues?: ResumeData;
}

export function ResumeForm({ onSubmit, defaultValues = initialResumeData }: ResumeFormProps) {
  const form = useForm<ResumeData>({
    resolver: zodResolver(resumeSchema),
    defaultValues,
    mode: 'onChange', // Validate on change for better UX
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control: form.control,
    name: "experience",
  });

  const handleFormSubmit = (values: ResumeData) => {
    onSubmit(values);
  };

  const addEducationEntry = () => {
    appendEducation({
      id: crypto.randomUUID(), // Use built-in crypto for UUID generation
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  };

  const addExperienceEntry = () => {
    appendExperience({
      id: crypto.randomUUID(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      responsibilities: '',
    });
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                        <Input placeholder="(123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, Anytown, USA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField
                    control={form.control}
                    name="linkedin"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>LinkedIn Profile URL (Optional)</FormLabel>
                        <FormControl>
                            <Input placeholder="https://linkedin.com/in/johndoe" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="portfolio"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Portfolio URL (Optional)</FormLabel>
                        <FormControl>
                            <Input placeholder="https://johndoe.dev" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Summary</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A brief summary about your professional background..." {...field} />
                  </FormControl>
                   <FormDescription>
                    Min 10 characters. Briefly highlight your key skills and experience.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                 <CardTitle>Education</CardTitle>
                 <Button type="button" variant="outline" size="sm" onClick={addEducationEntry}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Education
                </Button>
            </CardHeader>
            <CardContent className="space-y-6">
                 {educationFields.map((field, index) => (
                    <div key={field.id} className="space-y-4 p-4 border rounded-md relative">
                         <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeEducation(index)}
                            className="absolute top-2 right-2 h-6 w-6"
                            aria-label="Remove education entry"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <FormField
                            control={form.control}
                            name={`education.${index}.institution`}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Institution</FormLabel>
                                <FormControl>
                                    <Input placeholder="University Name" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`education.${index}.degree`}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Degree/Major</FormLabel>
                                <FormControl>
                                    <Input placeholder="B.S. in Computer Science" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name={`education.${index}.startDate`}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start Date</FormLabel>
                                    <FormControl>
                                    <Input type="month" placeholder="YYYY-MM" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name={`education.${index}.endDate`}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>End Date</FormLabel>
                                    <FormControl>
                                    <Input type="month" placeholder="YYYY-MM or Present" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                         <FormField
                            control={form.control}
                            name={`education.${index}.description`}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Description (Optional)</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Relevant coursework, achievements, GPA..." {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         {index < educationFields.length - 1 && <Separator />}
                    </div>
                ))}
                {form.formState.errors.education && !form.formState.errors.education.root && educationFields.length === 0 && (
                    <p className="text-sm font-medium text-destructive">Please add at least one education entry.</p>
                )}
                 {form.formState.errors.education?.root && (
                    <p className="text-sm font-medium text-destructive">{form.formState.errors.education.root.message}</p>
                )}
            </CardContent>
        </Card>

         <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                 <CardTitle>Work Experience</CardTitle>
                 <Button type="button" variant="outline" size="sm" onClick={addExperienceEntry}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Experience
                </Button>
            </CardHeader>
            <CardContent className="space-y-6">
                 {experienceFields.map((field, index) => (
                    <div key={field.id} className="space-y-4 p-4 border rounded-md relative">
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => removeExperience(index)}
                            className="absolute top-2 right-2 h-6 w-6"
                             aria-label="Remove experience entry"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <FormField
                            control={form.control}
                            name={`experience.${index}.company`}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                    <Input placeholder="Tech Corp" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name={`experience.${index}.position`}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Position</FormLabel>
                                <FormControl>
                                    <Input placeholder="Software Engineer" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <FormField
                                control={form.control}
                                name={`experience.${index}.startDate`}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start Date</FormLabel>
                                    <FormControl>
                                    <Input type="month" placeholder="YYYY-MM" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`experience.${index}.endDate`}
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>End Date</FormLabel>
                                    <FormControl>
                                    <Input type="month" placeholder="YYYY-MM or Present" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name={`experience.${index}.responsibilities`}
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Responsibilities</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Describe your responsibilities and achievements. Use bullet points (one per line)." {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter each responsibility or achievement on a new line.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         {index < experienceFields.length - 1 && <Separator />}
                    </div>
                ))}
                {form.formState.errors.experience && !form.formState.errors.experience.root && experienceFields.length === 0 && (
                    <p className="text-sm font-medium text-destructive">Please add at least one experience entry.</p>
                )}
                {form.formState.errors.experience?.root && (
                     <p className="text-sm font-medium text-destructive">{form.formState.errors.experience.root.message}</p>
                )}
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                 <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
                 <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Skills</FormLabel>
                        <FormControl>
                            <Input placeholder="JavaScript, React, Node.js, Project Management" {...field} />
                        </FormControl>
                         <FormDescription>
                            Enter skills separated by commas.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
            </CardContent>
        </Card>

        <Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isValid}>
          {form.formState.isSubmitting ? 'Generating...' : 'Generate Resume'}
        </Button>
      </form>
    </Form>
  );
}
