import type { TemplateComponentProps } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin, Linkedin, Link as LinkIcon } from 'lucide-react';

export function TemplateClassic({ data }: TemplateComponentProps) {
  const skillsArray = data.skills.split(',').map(skill => skill.trim()).filter(Boolean);

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg rounded-lg overflow-hidden bg-card text-card-foreground font-serif">
      <CardHeader className="bg-secondary p-6 text-center">
        <CardTitle className="text-3xl font-bold tracking-tight mb-2">{data.name}</CardTitle>
        <div className="flex justify-center items-center space-x-4 text-sm text-muted-foreground flex-wrap">
          <span className="flex items-center"><Mail className="mr-1 h-4 w-4" />{data.email}</span>
          <span className="flex items-center"><Phone className="mr-1 h-4 w-4" />{data.phone}</span>
          <span className="flex items-center"><MapPin className="mr-1 h-4 w-4" />{data.address}</span>
          {/* Links moved to bottom */}
        </div>
      </CardHeader>
      <CardContent className="p-8 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-primary mb-3 border-b pb-1">Summary</h2>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </section>

        <Separator />

        <section>
          <h2 className="text-xl font-semibold text-primary mb-3 border-b pb-1">Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <h3 className="font-semibold">{exp.position} at {exp.company}</h3>
                <p className="text-xs text-muted-foreground mb-1">{exp.startDate} - {exp.endDate}</p>
                <ul className="list-disc list-inside text-sm space-y-1 pl-4">
                  {exp.responsibilities.split('\n').map((resp, i) => resp.trim() && <li key={i}>{resp.trim()}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-xl font-semibold text-primary mb-3 border-b pb-1">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <h3 className="font-semibold">{edu.degree} - {edu.institution}</h3>
                <p className="text-xs text-muted-foreground mb-1">{edu.startDate} - {edu.endDate}</p>
                {edu.description && <p className="text-sm italic">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>

        <Separator />

        <section>
          <h2 className="text-xl font-semibold text-primary mb-3 border-b pb-1">Skills</h2>
           <div className="flex flex-wrap gap-2">
              {skillsArray.map((skill, index) => (
                <span key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">{skill}</span>
              ))}
            </div>
        </section>

        { (data.linkedin || data.portfolio) && <Separator /> }

        {/* Links Section */}
        <section>
          <h2 className="text-xl font-semibold text-primary mb-3 border-b pb-1">Links</h2>
          <div className="space-y-2 text-sm">
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

      </CardContent>
    </Card>
  );
}
