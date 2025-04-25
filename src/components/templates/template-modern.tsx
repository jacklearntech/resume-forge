import type { TemplateComponentProps } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone, MapPin, Linkedin, Link as LinkIcon, Briefcase, GraduationCap, Wrench, ExternalLink } from 'lucide-react';
import { Separator } from '../ui/separator';

export function TemplateModern({ data }: TemplateComponentProps) {
  const skillsArray = data.skills.split(',').map(skill => skill.trim()).filter(Boolean);
  const initials = data.name.split(' ').map(n => n[0]).join('');

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg rounded-lg overflow-hidden bg-card text-card-foreground font-sans flex">
      {/* Sidebar Section */}
      <div className="w-1/3 bg-secondary p-6 text-secondary-foreground">
        <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-primary">
           {/* Placeholder image, replace if user provides one */}
           <AvatarImage src={`https://picsum.photos/seed/${data.name}/100`} alt={data.name} />
          <AvatarFallback className="text-3xl">{initials}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold text-center mb-4">{data.name}</h1>

        <div className="space-y-3 text-sm">
          <h2 className="text-lg font-semibold text-primary border-b border-primary pb-1 mb-2">Contact</h2>
          <p className="flex items-center"><Mail className="mr-2 h-4 w-4 flex-shrink-0" /><span>{data.email}</span></p>
          <p className="flex items-center"><Phone className="mr-2 h-4 w-4 flex-shrink-0" /><span>{data.phone}</span></p>
          <p className="flex items-start"><MapPin className="mr-2 h-4 w-4 flex-shrink-0 mt-1" /><span>{data.address}</span></p>
           {/* Links moved to bottom */}
        </div>

        <div className="mt-6 space-y-3">
          <h2 className="text-lg font-semibold text-primary border-b border-primary pb-1 mb-2 flex items-center"><Wrench className="mr-2 h-4 w-4" />Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skillsArray.map((skill, index) => (
              <span key={index} className="bg-background text-foreground px-2 py-1 rounded text-xs">{skill}</span>
            ))}
          </div>
        </div>

      </div>

      {/* Main Content Section */}
      <div className="w-2/3 p-8">
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-primary mb-2 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z"></path><path d="m12 12-4 4"></path><path d="m16 8-4 4"></path></svg>
            Summary
          </h2>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </section>

        <section className="mb-6">
           <h2 className="text-xl font-semibold text-primary mb-3 flex items-center"><Briefcase className="mr-2 h-5 w-5" />Experience</h2>
          <div className="space-y-4 border-l-2 border-primary pl-4 relative">
             {/* Vertical line decoration */}
             <div className="absolute left-[-1px] top-0 bottom-0 w-0.5 bg-primary"></div>
            {data.experience.map((exp, index) => (
              <div key={exp.id} className="relative pl-6 before:absolute before:left-[-26px] before:top-1 before:h-3 before:w-3 before:rounded-full before:bg-primary before:border-2 before:border-background">
                <h3 className="font-semibold">{exp.position}</h3>
                <p className="text-sm font-medium text-muted-foreground">{exp.company}</p>
                <p className="text-xs text-muted-foreground mb-1">{exp.startDate} - {exp.endDate}</p>
                <ul className="list-disc list-inside text-sm space-y-1">
                    {exp.responsibilities.split('\n').map((resp, i) => resp.trim() && <li key={i}>{resp.trim()}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-primary mb-3 flex items-center"><GraduationCap className="mr-2 h-5 w-5" />Education</h2>
          <div className="space-y-4 border-l-2 border-primary pl-4 relative">
            {/* Vertical line decoration */}
            <div className="absolute left-[-1px] top-0 bottom-0 w-0.5 bg-primary"></div>
            {data.education.map((edu, index) => (
              <div key={edu.id} className="relative pl-6 before:absolute before:left-[-26px] before:top-1 before:h-3 before:w-3 before:rounded-full before:bg-primary before:border-2 before:border-background">
                <h3 className="font-semibold">{edu.degree}</h3>
                 <p className="text-sm font-medium text-muted-foreground">{edu.institution}</p>
                <p className="text-xs text-muted-foreground mb-1">{edu.startDate} - {edu.endDate}</p>
                {edu.description && <p className="text-sm italic">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>

         { (data.linkedin || data.portfolio) && (
            <section>
                 <h2 className="text-xl font-semibold text-primary mb-3 flex items-center"><ExternalLink className="mr-2 h-5 w-5" /> Links</h2>
                 <div className="space-y-2 text-sm pl-4">
                    {data.linkedin && (
                        <div className="flex items-center">
                            <Linkedin className="mr-2 h-4 w-4 text-muted-foreground" />
                            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline break-all">
                                LinkedIn Profile
                            </a>
                        </div>
                    )}
                    {data.portfolio && (
                        <div className="flex items-center">
                            <LinkIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                            <a href={data.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline break-all">
                                Portfolio Website
                            </a>
                        </div>
                    )}
                 </div>
            </section>
        )}

      </div>
    </Card>
  );
}
