import type { TemplateComponentProps } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin, Linkedin, Link as LinkIcon, Briefcase, GraduationCap, Sparkles, Paintbrush } from 'lucide-react';

export function TemplateCreative({ data }: TemplateComponentProps) {
  const skillsArray = data.skills.split(',').map(skill => skill.trim()).filter(Boolean);

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 text-foreground font-sans">
      <CardContent className="p-8 grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-1 space-y-6 border-r border-primary/30 pr-6">
           <div className="text-center">
             <h1 className="text-3xl font-bold text-primary tracking-tight mb-1">{data.name}</h1>
             {/* You could potentially add a title here if the schema supports it */}
             {/* <p className="text-lg text-muted-foreground">Job Title</p> */}
           </div>

            <Separator className="bg-primary/30"/>

            <div>
                <h2 className="text-lg font-semibold text-primary mb-2 flex items-center"><Paintbrush className="mr-2 h-4 w-4" /> Contact</h2>
                <div className="space-y-1 text-sm">
                    <p className="flex items-start"><Mail className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" /><span>{data.email}</span></p>
                    <p className="flex items-start"><Phone className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" /><span>{data.phone}</span></p>
                    <p className="flex items-start"><MapPin className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" /><span>{data.address}</span></p>
                     {data.linkedin && (
                        <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-start hover:text-primary">
                        <Linkedin className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" /><span>LinkedIn</span>
                        </a>
                    )}
                    {data.portfolio && (
                        <a href={data.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-start hover:text-primary">
                        <LinkIcon className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" /><span>Portfolio</span>
                        </a>
                    )}
                </div>
            </div>

            <Separator className="bg-primary/30"/>

            <div>
                <h2 className="text-lg font-semibold text-primary mb-2 flex items-center"><Sparkles className="mr-2 h-4 w-4" /> Skills</h2>
                <div className="flex flex-wrap gap-2">
                {skillsArray.map((skill, index) => (
                    <span key={index} className="bg-primary/20 text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">{skill}</span>
                ))}
                </div>
            </div>

        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-6 pl-6">
            <section>
                <h2 className="text-xl font-semibold text-primary mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>
                     About Me
                </h2>
                <p className="text-sm leading-relaxed italic bg-secondary/30 p-3 rounded-md">{data.summary}</p>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-primary mb-3 flex items-center"><Briefcase className="mr-2 h-5 w-5" /> Experience</h2>
                <div className="space-y-4">
                    {data.experience.map((exp) => (
                    <div key={exp.id} className="relative pl-5 before:absolute before:left-0 before:top-1 before:h-2 before:w-2 before:rounded-full before:bg-primary">
                        <h3 className="font-semibold">{exp.position}</h3>
                         <p className="text-sm font-medium text-muted-foreground">{exp.company} | {exp.startDate} - {exp.endDate}</p>
                        <ul className="list-disc list-inside text-sm space-y-1 mt-1 pl-3">
                        {exp.responsibilities.split('\n').map((resp, i) => resp.trim() && <li key={i}>{resp.trim()}</li>)}
                        </ul>
                    </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold text-primary mb-3 flex items-center"><GraduationCap className="mr-2 h-5 w-5" /> Education</h2>
                <div className="space-y-4">
                    {data.education.map((edu) => (
                    <div key={edu.id} className="relative pl-5 before:absolute before:left-0 before:top-1 before:h-2 before:w-2 before:rounded-full before:bg-primary">
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <p className="text-sm font-medium text-muted-foreground">{edu.institution} | {edu.startDate} - {edu.endDate}</p>
                        {edu.description && <p className="text-sm italic mt-1">{edu.description}</p>}
                    </div>
                    ))}
                </div>
            </section>

        </div>
      </CardContent>
    </Card>
  );
}
