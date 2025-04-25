"use client";

import React, { useState, useTransition } from 'react';
import { ResumeForm } from '@/components/resume-form';
import { TemplateClassic } from '@/components/templates/template-classic';
import { TemplateModern } from '@/components/templates/template-modern';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { initialResumeData } from '@/lib/schema';
import type { ResumeData, TemplateKey } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Download, Printer } from 'lucide-react';

const templates = {
  classic: TemplateClassic,
  modern: TemplateModern,
};

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('classic');
  const [isPending, startTransition] = useTransition();
  const [showPreview, setShowPreview] = useState(false);

  const handleFormSubmit = (values: ResumeData) => {
    startTransition(() => {
      setResumeData(values);
      setShowPreview(true); // Show preview once form is submitted
    });
  };

   const handlePrint = () => {
    // Basic print functionality
    // Might need more sophisticated library for better PDF generation look/feel
    const printContent = document.getElementById('resume-preview');
    if (printContent) {
        const originalTitle = document.title;
        document.title = `${resumeData?.name || 'Resume'} - ${selectedTemplate}`; // Set title for printing
        window.print();
        document.title = originalTitle; // Restore original title
    }
  };

  const TemplateComponent = templates[selectedTemplate];

  return (
    <main className="container mx-auto p-4 md:p-8 min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">ResumeForge</h1>
        <p className="text-lg text-muted-foreground">Craft your professional resume with ease.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form Section */}
        <div className={cn(
            "transition-all duration-500 ease-in-out",
            showPreview ? 'lg:col-span-1' : 'lg:col-span-2'
        )}>
          <Card>
            <CardHeader>
              <CardTitle>Enter Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ResumeForm onSubmit={handleFormSubmit} defaultValues={initialResumeData} />
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <div className={cn(
            "transition-opacity duration-500 ease-in-out lg:sticky lg:top-8 lg:self-start",
            showPreview ? 'opacity-100 lg:col-span-1' : 'opacity-0 lg:col-span-0 pointer-events-none h-0 overflow-hidden'
        )}>
           {resumeData && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                 <CardTitle className="text-lg font-medium">Preview & Actions</CardTitle>
                 <div className="flex items-center space-x-2">
                   <Select value={selectedTemplate} onValueChange={(value) => setSelectedTemplate(value as TemplateKey)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" onClick={handlePrint} aria-label="Print Resume">
                        <Printer className="h-4 w-4" />
                    </Button>
                    {/* Download button can be added later with PDF generation library */}
                    {/* <Button variant="outline" size="icon" aria-label="Download Resume">
                        <Download className="h-4 w-4" />
                    </Button> */}
                 </div>
              </CardHeader>
              <CardContent>
                <div id="resume-preview" className="mt-4 border rounded-lg p-4 bg-white shadow-inner overflow-auto max-h-[80vh]">
                    {isPending ? (
                       <div className="flex justify-center items-center h-96">
                         <p>Loading Preview...</p>
                       </div>
                    ) : (
                       TemplateComponent && <TemplateComponent data={resumeData} />
                    )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
        <footer className="text-center mt-12 text-sm text-muted-foreground">
            Built with Next.js and ShadCN UI. © {new Date().getFullYear()} ResumeForge.
        </footer>
    </main>
  );
}
