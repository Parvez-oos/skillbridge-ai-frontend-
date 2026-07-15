'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import {
  useGetLearningRecommendations,
  useMyRecommendations,
  useDeleteRecommendation,
} from '@/features/ai/hooks/useAI';
import { LearningRecommendationInput } from '@/features/ai/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Lightbulb,
  Trash2,
  BookOpen,
  Code2,
  Wrench,
  ListOrdered,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function LearningRecommendationsPage() {
  const [showForm, setShowForm] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<LearningRecommendationInput>({
    goals: [],
    currentSkills: [],
    completedCourses: [],
    preferredDifficulty: 'intermediate',
    learningStyle: 'mixed',
  });
  const [goalInput, setGoalInput] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [courseInput, setCourseInput] = useState('');

  const { data: recommendations, isLoading: recommendationsLoading } = useMyRecommendations();
  const generateMutation = useGetLearningRecommendations();
  const deleteMutation = useDeleteRecommendation();

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onError: (error) => {
        const message = error instanceof Error ? error.message : 'Failed to delete recommendation';
        toast.error(message);
      },
      onSuccess: () => {
        toast.success('Recommendation deleted');
      },
    });
  };

  const handleAddItem = (
    field: 'goals' | 'currentSkills' | 'completedCourses',
    value: string,
    setter: (v: string) => void
  ) => {
    if (value.trim() && !formData[field].includes(value.trim())) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }));
      setter('');
    }
  };

  const handleRemoveItem = (field: 'goals' | 'currentSkills' | 'completedCourses', item: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((i) => i !== item),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await generateMutation.mutateAsync(formData);
      if (result) {
        setShowForm(false);
        toast.success('Recommendations generated successfully!');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to generate recommendations';
      toast.error(message);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'destructive';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'secondary';
    }
  };

  const selectClass = 'w-full h-10 rounded-xl border border-border bg-muted/50 px-4 py-2 text-sm text-foreground shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

  return (
    <Container>
      <div className="space-y-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-overline text-primary mb-2 block">AI Recommendations</span>
            <h1 className="text-2xl md:text-3xl font-heading tracking-tight">Learning Recommendations</h1>
            <p className="text-muted-foreground font-body">
              Get personalized course, project, and skill recommendations.
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'View History' : 'Get New Recommendations'}
          </Button>
        </div>

        {showForm ? (
          <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Learning Goals</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a goal and press Enter"
                    className="flex-1"
                    value={goalInput}
                    onChange={(e) => setGoalInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddItem('goals', goalInput, setGoalInput);
                      }
                    }}
                  />
                  <Button type="button" onClick={() => handleAddItem('goals', goalInput, setGoalInput)}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.goals.map((goal) => (
                    <Badge key={goal} variant="default" className="gap-1">
                      {goal}
                      <button type="button" onClick={() => handleRemoveItem('goals', goal)}>×</button>
                    </Badge>
                  ))}
                </div>
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
                        handleAddItem('currentSkills', skillInput, setSkillInput);
                      }
                    }}
                  />
                  <Button type="button" onClick={() => handleAddItem('currentSkills', skillInput, setSkillInput)}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.currentSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="gap-1">
                      {skill}
                      <button type="button" onClick={() => handleRemoveItem('currentSkills', skill)}>×</button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Completed Courses</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a course and press Enter"
                    className="flex-1"
                    value={courseInput}
                    onChange={(e) => setCourseInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddItem('completedCourses', courseInput, setCourseInput);
                      }
                    }}
                  />
                  <Button type="button" onClick={() => handleAddItem('completedCourses', courseInput, setCourseInput)}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.completedCourses.map((course) => (
                    <Badge key={course} variant="info" className="gap-1">
                      {course}
                      <button type="button" onClick={() => handleRemoveItem('completedCourses', course)}>×</button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Preferred Difficulty</label>
                  <select
                    className={selectClass}
                    value={formData.preferredDifficulty}
                    onChange={(e) => setFormData((prev) => ({ ...prev, preferredDifficulty: e.target.value as LearningRecommendationInput['preferredDifficulty'] }))}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Learning Style</label>
                  <select
                    className={selectClass}
                    value={formData.learningStyle}
                    onChange={(e) => setFormData((prev) => ({ ...prev, learningStyle: e.target.value as LearningRecommendationInput['learningStyle'] }))}
                  >
                    <option value="visual">Visual</option>
                    <option value="reading">Reading</option>
                    <option value="hands-on">Hands-on</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" loading={generateMutation.isPending}>
                  Get Recommendations
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            {recommendationsLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="h-64 rounded-2xl" />
                ))}
              </div>
            ) : !recommendations || recommendations.length === 0 ? (
              <div className="text-center py-12 rounded-2xl border border-border/50 bg-card/50">
                <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-7 h-7 text-muted-foreground/50" />
                </div>
                <h3 className="text-lg font-semibold mb-2 font-heading">No Recommendations Yet</h3>
                <p className="text-muted-foreground mb-4 font-body">
                  Get your first personalized recommendations.
                </p>
                <Button onClick={() => setShowForm(true)}>Get Recommendations</Button>
              </div>
            ) : (
              recommendations.map((rec) => (
                <div key={rec.id} className="rounded-2xl border border-border/50 bg-card/50 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold font-heading">Learning Recommendations</h2>
                      <p className="text-sm text-muted-foreground font-body">
                        Generated on {new Date(rec.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDelete(rec.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="p-4 bg-info/10 border border-info/20 rounded-xl mb-6">
                    <p className="text-sm font-body">{rec.personalizedInsights}</p>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-border/50 rounded-xl">
                      <button
                        onClick={() => setExpandedSection(expandedSection === 'courses' ? null : 'courses')}
                        className="flex items-center justify-between w-full p-4 text-left hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-primary" />
                          <span className="font-semibold font-heading">Recommended Courses ({rec.recommendedCourses.length})</span>
                        </div>
                        {expandedSection === 'courses' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      {expandedSection === 'courses' && (
                        <div className="p-4 pt-0 space-y-3">
                          {rec.recommendedCourses.map((course, i) => (
                            <div key={i} className="p-3 bg-muted/30 rounded-xl border border-border/30">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium">{course.title}</p>
                                  <p className="text-sm text-muted-foreground">{course.reason}</p>
                                </div>
                                <Badge variant={getDifficultyColor(course.difficulty) as 'success' | 'warning' | 'destructive' | 'secondary'}>
                                  {course.difficulty}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                {course.estimatedHours} hours • {course.category}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="border border-border/50 rounded-xl">
                      <button
                        onClick={() => setExpandedSection(expandedSection === 'projects' ? null : 'projects')}
                        className="flex items-center justify-between w-full p-4 text-left hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Code2 className="w-5 h-5 text-success" />
                          <span className="font-semibold font-heading">Recommended Projects ({rec.recommendedProjects.length})</span>
                        </div>
                        {expandedSection === 'projects' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      {expandedSection === 'projects' && (
                        <div className="p-4 pt-0 space-y-3">
                          {rec.recommendedProjects.map((project, i) => (
                            <div key={i} className="p-3 bg-muted/30 rounded-xl border border-border/30">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium">{project.title}</p>
                                  <p className="text-sm text-muted-foreground">{project.description}</p>
                                </div>
                                <Badge variant={getDifficultyColor(project.difficulty) as 'success' | 'warning' | 'destructive' | 'secondary'}>
                                  {project.difficulty}
                                </Badge>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {project.skills.map((skill, j) => (
                                  <Badge key={j} variant="outline" size="sm">{skill}</Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="border border-border/50 rounded-xl">
                      <button
                        onClick={() => setExpandedSection(expandedSection === 'skills' ? null : 'skills')}
                        className="flex items-center justify-between w-full p-4 text-left hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Wrench className="w-5 h-5 text-warning" />
                          <span className="font-semibold font-heading">Skills to Learn ({rec.recommendedSkills.length})</span>
                        </div>
                        {expandedSection === 'skills' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      {expandedSection === 'skills' && (
                        <div className="p-4 pt-0 space-y-3">
                          {rec.recommendedSkills.map((skill, i) => (
                            <div key={i} className="p-3 bg-muted/30 rounded-xl border border-border/30">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium">{skill.skill}</p>
                                  <p className="text-sm text-muted-foreground">{skill.reason}</p>
                                </div>
                                <Badge variant={getPriorityColor(skill.priority) as 'destructive' | 'warning' | 'success' | 'secondary'}>
                                  {skill.priority}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="border border-border/50 rounded-xl">
                      <button
                        onClick={() => setExpandedSection(expandedSection === 'queue' ? null : 'queue')}
                        className="flex items-center justify-between w-full p-4 text-left hover:bg-muted/30 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <ListOrdered className="w-5 h-5 text-info" />
                          <span className="font-semibold font-heading">Learning Queue ({rec.learningQueue.length})</span>
                        </div>
                        {expandedSection === 'queue' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      {expandedSection === 'queue' && (
                        <div className="p-4 pt-0">
                          <div className="space-y-2">
                            {rec.learningQueue.map((item, i) => (
                              <div key={i} className="flex items-center gap-3 p-2 bg-muted/30 rounded-xl border border-border/30">
                                <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary">
                                  {item.order}
                                </span>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{item.item}</p>
                                  <p className="text-xs text-muted-foreground">{item.type} • {item.estimatedTime}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
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
