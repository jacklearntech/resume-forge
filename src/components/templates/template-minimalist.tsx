import type { TemplateComponentProps } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin, Linkedin, Link as LinkIcon, ExternalLink } from 'lucide-react';

export function TemplateMinimalist({ data }: TemplateComponentProps) {
  const skillsArray = data.skills.split(',').map(skill => skill.trim()).filter(Boolean);

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-md rounded-lg overflow-hidden bg-card text-card-foreground font-sans">
      <CardContent className="p-10 space-y-8">
        {/* Header */}
        <header className="text-center border-b pb-4 border-border">
          <h1 className="text-4xl font-light tracking-wider mb-1">{data.name}</h1>
           <div className="flex justify-center items-center space-x-4 text-xs text-muted-foreground flex-wrap mt-2">
            <span className="flex items-center"><Mail className="mr-1 h-3 w-3" />{data.email}</span>
            <span className="flex items-center"><Phone className="mr-1 h-3 w-3" />{data.phone}</span>
            <span className="flex items-center"><MapPin className="mr-1 h-3 w-3" />{data.address}</span>
             {/* Links moved to bottom */}
            </div>
        </header>

        {/* Summary */}
        <section>
          {/* No explicit title for summary in minimalist style */}
          <p className="text-sm text-center leading-relaxed">{data.summary}</p>
        </section>

        {/* Experience */}
        <section>
          <h2 className="text-lg font-semibold text-primary tracking-wide mb-3 uppercase">Experience</h2>
          <div className="space-y-5">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-medium text-md">{exp.position}</h3>
                    <span className="text-xs text-muted-foreground">{exp.startDate} - {exp.endDate}</span>
                </div>
                 <p className="text-sm font-light text-muted-foreground mb-1">{exp.company}</p>
                <ul className="list-disc list-inside text-sm space-y-1 pl-4 font-light">
                  {exp.responsibilities.split('\n').map((resp, i) => resp.trim() && <li key={i}>{resp.trim()}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

         <Separator className="bg-border/50"/>

        {/* Education */}
        <section>
          <h2 className="text-lg font-semibold text-primary tracking-wide mb-3 uppercase">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                 <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-medium text-md">{edu.degree}</h3>
                    <span className="text-xs text-muted-foreground">{edu.startDate} - {edu.endDate}</span>
                 </div>
                 <p className="text-sm font-light text-muted-foreground mb-1">{edu.institution}</p>
                {edu.description && <p className="text-sm font-light italic">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>

        <Separator className="bg-border/50"/>

        {/* Skills */}
        <section>
          <h2 className="text-lg font-semibold text-primary tracking-wide mb-3 uppercase">Skills</h2>
          <p className="text-sm font-light leading-relaxed">
              {skillsArray.join(' · ')}
          </p>
        </section>

        { (data.linkedin || data.portfolio) && <Separator className="bg-border/50"/> }

         {/* Links Section */}
        {(data.linkedin || data.portfolio) && (
            <section>
            <h2 className="text-lg font-semibold text-primary tracking-wide mb-3 uppercase">Links</h2>
            <div className="space-y-2 text-sm font-light">
                 {data.linkedin && (
                    <div className="flex items-center">
                        <Linkedin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline break-all">
                            {data.linkedin}
                        </a>
                    </div>
                )}
                {data.portfolio && (
                     <div className="flex items-center">
                        <LinkIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        <a href={data.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline break-all">
                             {data.portfolio}
                        </a>
                    </div>
                )}
            </div>
            </section>
        )}
      </CardContent>
    </Card>
  );
}
