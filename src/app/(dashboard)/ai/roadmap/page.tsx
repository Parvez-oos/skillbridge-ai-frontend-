'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { useGenerateCareerRoadmap, useMyRoadmaps, useDeleteCareerRoadmap } from '@/features/ai/hooks/useAI';
import { CareerRoadmapInput } from '@/features/ai/types';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import toast from 'react-hot-toast';
import {
  Map,
  Trash2,
  ChevronDown,
  ChevronUp,
  Calendar,
  Target,
  BookOpen,
  Briefcase,
  Download,
} from 'lucide-react';

export default function CareerRoadmapPage() {
  const [showForm, setShowForm] = useState(true);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const [formData, setFormData] = useState<CareerRoadmapInput>({
    careerGoal: '',
    currentSkills: [],
    experience: 'entry',
    studyHoursPerWeek: 10,
    preferredStyle: 'mixed',
    timeline: '6months',
  });
  const [skillInput, setSkillInput] = useState('');

  const { data: roadmaps, isLoading: roadmapsLoading } = useMyRoadmaps();
  const generateMutation = useGenerateCareerRoadmap();
  const deleteMutation = useDeleteCareerRoadmap();

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onError: (error) => {
        const message = error instanceof Error ? error.message : 'Failed to delete roadmap';
        toast.error(message);
      },
      onSuccess: () => {
        toast.success('Roadmap deleted');
      },
    });
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.currentSkills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        currentSkills: [...prev.currentSkills, skillInput.trim()],
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      currentSkills: prev.currentSkills.filter((s) => s !== skill),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await generateMutation.mutateAsync(formData);
      if (result) {
        setShowForm(false);
        toast.success('Roadmap generated successfully!');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to generate roadmap';
      toast.error(message);
    }
  };

  const selectClass = 'w-full h-10 rounded-xl border border-border bg-muted/50 px-4 py-2 text-sm text-foreground shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

  return (
    <Container>
      <div className="space-y-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-overline text-primary mb-2 block">AI Roadmap</span>
            <h1 className="text-2xl md:text-3xl font-heading tracking-tight">Career Roadmap Generator</h1>
            <p className="text-muted-foreground font-body">
              Generate a personalized learning roadmap for your career goals.
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'View History' : 'Generate New'}
          </Button>
        </div>

        {showForm ? (
          <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Career Goal</label>
                <Input
                  placeholder="e.g., Senior Frontend Developer"
                  value={formData.careerGoal}
                  onChange={(e) => setFormData((prev) => ({ ...prev, careerGoal: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Current Skills</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a skill and press Enter"
                    className="flex-1"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddSkill}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.currentSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="gap-1">
                      {skill}
                      <button type="button" onClick={() => handleRemoveSkill(skill)}>×</button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Experience Level</label>
                  <select
                    className={selectClass}
                    value={formData.experience}
                    onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value as CareerRoadmapInput['experience'] }))}
                  >
                    <option value="entry">Entry Level</option>
                    <option value="mid">Mid Level</option>
                    <option value="senior">Senior Level</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Study Hours per Week</label>
                  <Input
                    type="number"
                    min="1"
                    max="40"
                    value={formData.studyHoursPerWeek}
                    onChange={(e) => setFormData((prev) => ({ ...prev, studyHoursPerWeek: parseInt(e.target.value) || 10 }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Learning Style</label>
                  <select
                    className={selectClass}
                    value={formData.preferredStyle}
                    onChange={(e) => setFormData((prev) => ({ ...prev, preferredStyle: e.target.value as CareerRoadmapInput['preferredStyle'] }))}
                  >
                    <option value="visual">Visual</option>
                    <option value="reading">Reading</option>
                    <option value="hands-on">Hands-on</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Timeline</label>
                  <select
                    className={selectClass}
                    value={formData.timeline}
                    onChange={(e) => setFormData((prev) => ({ ...prev, timeline: e.target.value as CareerRoadmapInput['timeline'] }))}
                  >
                    <option value="3months">3 Months</option>
                    <option value="6months">6 Months</option>
                    <option value="1year">1 Year</option>
                    <option value="2years">2 Years</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" loading={generateMutation.isPending}>
                  Generate Roadmap
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            {roadmapsLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="h-64 rounded-2xl" />
                ))}
              </div>
            ) : !roadmaps || roadmaps.length === 0 ? (
              <div className="text-center py-12 rounded-2xl border border-border/50 bg-card/50">
                <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Map className="w-7 h-7 text-muted-foreground/50" />
                </div>
                <h3 className="text-lg font-semibold mb-2 font-heading">No Roadmaps Yet</h3>
                <p className="text-muted-foreground mb-4 font-body">
                  Generate your first career roadmap to get started.
                </p>
                <Button onClick={() => setShowForm(true)}>Generate Roadmap</Button>
              </div>
            ) : (
              roadmaps.map((roadmap) => (
                <div key={roadmap.id} className="rounded-2xl border border-border/50 bg-card/50 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold font-heading">{roadmap.careerGoal}</h2>
                      <p className="text-sm text-muted-foreground font-body">
                        Generated on {new Date(roadmap.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => handleDelete(roadmap.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-muted/30 rounded-xl border border-border/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="font-medium text-sm">Timeline</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{roadmap.timeline}</p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-xl border border-border/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="w-5 h-5 text-success" />
                        <span className="font-medium text-sm">Missing Skills</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {roadmap.skillGapAnalysis.missingSkills.length} skills to learn
                      </p>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-xl border border-border/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="w-5 h-5 text-warning" />
                        <span className="font-medium text-sm">Projects</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {roadmap.projectRecommendations.length} projects recommended
                      </p>
                    </div>
                  </div>

                  <h3 className="font-semibold mb-3 font-heading">Weekly Plan</h3>
                  <div className="space-y-2">
                    {roadmap.weeklyPlan.slice(0, 8).map((week) => (
                      <div key={week.week} className="border border-border/50 rounded-xl">
                        <button
                          onClick={() => setExpandedWeek(expandedWeek === week.week ? null : week.week)}
                          className="flex items-center justify-between w-full p-3 text-left hover:bg-muted/30 transition-colors"
                        >
                          <span className="font-medium">
                            Week {week.week}: {week.title}
                          </span>
                          {expandedWeek === week.week ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                        {expandedWeek === week.week && (
                          <div className="p-3 pt-0 border-t border-border/50">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                              <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1 font-overline">TOPICS</p>
                                <ul className="text-sm space-y-1">
                                  {week.topics.map((topic, i) => (
                                    <li key={i}>• {topic}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1 font-overline">PROJECTS</p>
                                <ul className="text-sm space-y-1">
                                  {week.projects.map((project, i) => (
                                    <li key={i}>• {project}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-muted-foreground mb-1 font-overline">RESOURCES</p>
                                <ul className="text-sm space-y-1">
                                  {week.resources.map((resource, i) => (
                                    <li key={i}>• {resource}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Container>
  );
}
