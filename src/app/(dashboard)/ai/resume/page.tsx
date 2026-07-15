'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { useAnalyzeResume, useMyResumeAnalyses, useDeleteResumeAnalysis } from '@/features/ai/hooks/useAI';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  FileText,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Download,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function ResumeAnalyzerPage() {
  const [showForm, setShowForm] = useState(true);
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [industry, setIndustry] = useState('');

  const { data: analyses, isLoading: analysesLoading } = useMyResumeAnalyses();
  const analyzeMutation = useAnalyzeResume();
  const deleteMutation = useDeleteResumeAnalysis();

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onError: (error) => {
        const message = error instanceof Error ? error.message : 'Failed to delete analysis';
        toast.error(message);
      },
      onSuccess: () => {
        toast.success('Analysis deleted');
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await analyzeMutation.mutateAsync({
        resumeText,
        targetRole: targetRole || undefined,
        industry: industry || undefined,
      });
      if (result) {
        setShowForm(false);
        toast.success('Resume analyzed successfully!');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to analyze resume';
      toast.error(message);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <Container>
      <div className="space-y-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-overline text-primary mb-2 block">AI Resume</span>
            <h1 className="text-2xl md:text-3xl font-heading tracking-tight">Resume Analyzer</h1>
            <p className="text-muted-foreground font-body">
              Get your resume analyzed with ATS score and improvement suggestions.
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'View History' : 'Analyze New'}
          </Button>
        </div>

        {showForm ? (
          <div className="rounded-2xl border border-border/50 bg-card/50 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Resume Content
                  <span className="text-muted-foreground ml-2">(Paste your resume text)</span>
                </label>
                <Textarea
                  placeholder="Paste your resume content here..."
                  className="h-48"
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Target Role (Optional)</label>
                  <Input
                    placeholder="e.g., Frontend Developer"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Industry (Optional)</label>
                  <Input
                    placeholder="e.g., Technology"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" loading={analyzeMutation.isPending} disabled={!resumeText.trim()}>
                  Analyze Resume
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            {analysesLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <Skeleton key={i} className="h-64 rounded-2xl" />
                ))}
              </div>
            ) : !analyses || analyses.length === 0 ? (
              <div className="text-center py-12 rounded-2xl border border-border/50 bg-card/50">
                <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-7 h-7 text-muted-foreground/50" />
                </div>
                <h3 className="text-lg font-semibold mb-2 font-heading">No Analyses Yet</h3>
                <p className="text-muted-foreground mb-4 font-body">
                  Analyze your first resume to get started.
                </p>
                <Button onClick={() => setShowForm(true)}>Analyze Resume</Button>
              </div>
            ) : (
              analyses.map((analysis) => (
                <div key={analysis.id} className="rounded-2xl border border-border/50 bg-card/50 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold font-heading">Resume Analysis</h2>
                      <p className="text-sm text-muted-foreground font-body">
                        Analyzed on {new Date(analysis.createdAt).toLocaleDateString()}
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
                        onClick={() => handleDelete(analysis.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-muted/30 rounded-xl border border-border/30">
                      <p className={cn('text-3xl font-bold', getScoreColor(analysis.atsScore))}>
                        {analysis.atsScore}%
                      </p>
                      <p className="text-sm text-muted-foreground">ATS Score</p>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-xl border border-border/30">
                      <p className={cn('text-3xl font-bold', getScoreColor(analysis.overallScore))}>
                        {analysis.overallScore}%
                      </p>
                      <p className="text-sm text-muted-foreground">Overall Score</p>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-xl border border-border/30">
                      <p className="text-3xl font-bold text-info">{analysis.industryMatch}%</p>
                      <p className="text-sm text-muted-foreground">Industry Match</p>
                    </div>
                    <div className="text-center p-4 bg-muted/30 rounded-xl border border-border/30">
                      <p className="text-3xl font-bold text-primary">{analysis.roleMatch}%</p>
                      <p className="text-sm text-muted-foreground">Role Match</p>
                    </div>
                  </div>

                  <div className="p-4 bg-info/10 border border-info/20 rounded-xl mb-6">
                    <p className="text-sm font-body">{analysis.summary}</p>
                  </div>

                  {analysis.missingSkills.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3 flex items-center gap-2 font-heading">
                        <AlertCircle className="w-5 h-5 text-warning" />
                        Missing Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {analysis.missingSkills.map((skill, i) => (
                          <Badge key={i} variant="warning">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {analysis.keywords.missing.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3 font-heading">Missing Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {analysis.keywords.missing.map((keyword, i) => (
                          <Badge key={i} variant="outline">{keyword}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {analysis.weakSections.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-3 font-heading">Weak Sections</h3>
                      <div className="space-y-3">
                        {analysis.weakSections.map((section, i) => (
                          <div key={i} className="p-3 bg-muted/30 rounded-xl border border-border/30">
                            <p className="font-medium text-sm">{section.section}</p>
                            <p className="text-xs text-destructive mb-1">{section.issue}</p>
                            <p className="text-xs text-success">{section.suggestion}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {analysis.grammarSuggestions.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 font-heading">Grammar Suggestions</h3>
                      <div className="space-y-2">
                        {analysis.grammarSuggestions.slice(0, 5).map((suggestion, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                            <div>
                              <span className="line-through text-muted-foreground">{suggestion.original}</span>
                              <span className="mx-2">→</span>
                              <span className="text-success">{suggestion.corrected}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Container>
  );
}
