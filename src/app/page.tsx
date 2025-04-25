// src/app/page.tsx
"use client";

import React, { useState, useTransition, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ResumeForm } from '@/components/resume-form';
import { TemplateClassic } from '@/components/templates/template-classic';
import { TemplateModern } from '@/components/templates/template-modern';
import { TemplateCreative } from '@/components/templates/template-creative';
import { TemplateMinimalist } from '@/components/templates/template-minimalist';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { initialResumeData } from '@/lib/schema';
import type { ResumeData, TemplateKey } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Download, Printer, FileText } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const templates = {
  classic: TemplateClassic,
  modern: TemplateModern,
  creative: TemplateCreative,
  minimalist: TemplateMinimalist,
};

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('classic');
  const [isPending, startTransition] = useTransition();
  const [isExporting, setIsExporting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleFormSubmit = (values: ResumeData) => {
    startTransition(() => {
      setResumeData(values);
      setShowPreview(true); // Show preview once form is submitted
    });
  };

   const handlePrint = () => {
    const printContent = previewRef.current;
    if (printContent) {
        const originalTitle = document.title;
        document.title = `${resumeData?.name || 'Resume'} - ${selectedTemplate}`;
        window.print();
        document.title = originalTitle;
    }
  };

   const handleExportPdf = async () => {
        if (!previewRef.current || !resumeData) return;
        setIsExporting(true);
        toast({
            title: "Generating PDF...",
            description: "Please wait while your resume is being exported.",
        });

        try {
            // Ensure the preview area is temporarily styled for optimal PDF generation
            const previewContainer = previewRef.current.parentElement; // Get the container
            if(previewContainer) {
                previewContainer.style.maxHeight = 'none'; // Remove max height temporarily
                previewContainer.style.overflow = 'visible'; // Show all content
            }
            previewRef.current.style.width = '210mm'; // Approximate A4 width for layout

            const canvas = await html2canvas(previewRef.current, {
                scale: 2, // Increase scale for better resolution
                useCORS: true, // Important if using external images like picsum
                backgroundColor: '#ffffff', // Explicit white background for PDF
                logging: false, // Disable logging for cleaner console
                width: previewRef.current.scrollWidth, // Use scroll width to capture full width
                height: previewRef.current.scrollHeight, // Use scroll height to capture full height
                windowWidth: previewRef.current.scrollWidth,
                windowHeight: previewRef.current.scrollHeight,
                 onclone: (document) => {
                    // Ensure styles are fully applied before rendering
                    // You might need to handle specific CSS issues here if they arise
                 }
            });

            // Restore original styles after canvas generation
            if(previewContainer) {
                previewContainer.style.maxHeight = ''; // Restore max height
                previewContainer.style.overflow = ''; // Restore overflow
            }
             previewRef.current.style.width = ''; // Restore original width


            const imgData = canvas.toDataURL('image/png');
            // Standard A4 dimensions in points (1pt = 1/72 inch)
            const pdfWidth = 595.28;
            const pdfHeight = 841.89;

            // Calculate image dimensions maintaining aspect ratio based on canvas size
             const imgProps = {width: canvas.width, height: canvas.height};
             const canvasRatio = imgProps.width / imgProps.height;

            // Calculate PDF page dimensions based on canvas aspect ratio to fit A4
            let pageImgWidth = pdfWidth;
            let pageImgHeight = pageImgWidth / canvasRatio;

             // If calculated height exceeds A4 height, scale based on height instead
            if (pageImgHeight > pdfHeight) {
                pageImgHeight = pdfHeight;
                pageImgWidth = pageImgHeight * canvasRatio;
             }

            const pdf = new jsPDF({
                orientation: pageImgWidth > pageImgHeight ? 'l' : 'p', // Auto orientation
                unit: 'pt',
                format: 'a4'
            });

             // Add image centered (optional, or just top-left)
            const xOffset = (pdf.internal.pageSize.getWidth() - pageImgWidth) / 2;
            const yOffset = 0; // Start from top

            pdf.addImage(imgData, 'PNG', xOffset, yOffset, pageImgWidth, pageImgHeight);

            // Save the PDF
            pdf.save(`${resumeData.name.replace(/\s+/g, '_')}_${selectedTemplate}_Resume.pdf`);

            toast({
                title: "PDF Exported Successfully!",
                description: "Your resume PDF has been downloaded.",
            });
        } catch (error) {
            console.error("Error generating PDF:", error);
             toast({
                variant: "destructive",
                title: "PDF Export Failed",
                description: "There was an error generating the PDF. Please check console for details.",
            });
        } finally {
            setIsExporting(false);
             // Ensure styles are restored even if there's an error
            const previewContainer = previewRef.current?.parentElement;
            if(previewContainer) {
                previewContainer.style.maxHeight = '';
                previewContainer.style.overflow = '';
            }
             if(previewRef.current) {
                 previewRef.current.style.width = '';
             }
        }
    };

  const TemplateComponent = templates[selectedTemplate];

  return (
    <main className="container mx-auto p-4 md:p-8 min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">一站式在线简历生产器</h1>
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
                        <SelectItem value="creative">Creative</SelectItem>
                        <SelectItem value="minimalist">Minimalist</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" onClick={handlePrint} aria-label="Print Resume">
                        <Printer className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleExportPdf} disabled={isExporting} aria-label="Export Resume as PDF">
                        <FileText className="h-4 w-4" />
                         {isExporting && <span className="sr-only">Exporting...</span>}
                    </Button>
                 </div>
              </CardHeader>
              <CardContent>
                <div id="resume-preview-container" className="mt-4 border rounded-lg p-4 bg-white shadow-inner overflow-auto max-h-[80vh]">
                   {/* The ref is now on the inner div which contains the actual template */}
                   {/* Added explicit bg-white and min-w-[210mm] for better PDF rendering */}
                   <div ref={previewRef} className="bg-white min-w-[210mm] p-0">
                     {isPending ? (
                       <div className="flex justify-center items-center h-96">
                         <p>Loading Preview...</p>
                       </div>
                    ) : (
                       TemplateComponent && <TemplateComponent data={resumeData} />
                    )}
                   </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
        <footer className="text-center mt-12 text-sm text-muted-foreground">
            Built with Next.js and ShadCN UI. © {new Date().getFullYear()} 一站式在线简历生产器.
        </footer>
    </main>
  );
}
