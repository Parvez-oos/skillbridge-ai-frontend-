'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { useMyRoadmaps, useMyResumeAnalyses, useMyRecommendations } from '@/features/ai/hooks/useAI';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Map,
  FileText,
  Lightbulb,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function AIDashboardPage() {
  const { data: roadmaps, isLoading: roadmapsLoading } = useMyRoadmaps();
  const { data: analyses, isLoading: analysesLoading } = useMyResumeAnalyses();
  const { data: recommendations, isLoading: recommendationsLoading } = useMyRecommendations();

  const isLoading = roadmapsLoading || analysesLoading || recommendationsLoading;

  if (isLoading) {
    return (
      <Container>
        <div className="space-y-6 py-8">
          <Skeleton className="h-8 w-48 rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-2xl" />
            ))}
          </div>
        </div>
      </Container>
    );
  }

  const features = [
    {
      title: 'Career Roadmap',
      description: 'Generate a personalized learning roadmap based on your career goals, current skills, and timeline.',
      icon: Map,
      href: '/ai/roadmap',
      color: 'text-primary',
      bg: 'bg-primary/10',
      border: 'border-primary/20',
      count: roadmaps?.length ?? 0,
    },
    {
      title: 'Resume Analyzer',
      description: 'Get your resume analyzed with ATS score, missing skills, and improvement suggestions.',
      icon: FileText,
      href: '/ai/resume',
      color: 'text-success',
      bg: 'bg-success/10',
      border: 'border-success/20',
      count: analyses?.length ?? 0,
    },
    {
      title: 'Learning Recommendations',
      description: 'Receive personalized course, project, and skill recommendations based on your goals.',
      icon: Lightbulb,
      href: '/ai/recommendations',
      color: 'text-warning',
      bg: 'bg-warning/10',
      border: 'border-warning/20',
      count: recommendations?.length ?? 0,
    },
  ];

  return (
    <Container>
      <div className="space-y-6 py-8">
        <div>
          <span className="font-overline text-primary mb-2 block">AI Tools</span>
          <h1 className="text-2xl md:text-3xl font-heading tracking-tight">AI Features</h1>
          <p className="text-muted-foreground mt-1 font-body">
            Leverage AI to accelerate your learning and career growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feature) => (
            <Link
              key={feature.title}
              href={feature.href}
              className={`p-6 rounded-2xl border ${feature.border} bg-card/50 hover:bg-card hover:shadow-xl hover:shadow-${feature.color === 'text-primary' ? 'primary' : feature.color === 'text-success' ? 'success' : 'warning'}/5 transition-all duration-300 group`}
            >
              <div className={`w-12 h-12 rounded-2xl ${feature.bg} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h2 className="font-semibold text-lg mb-2 font-heading">{feature.title}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed font-body">{feature.description}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                <span className="text-sm text-muted-foreground">
                  {feature.count} {feature.count === 1 ? 'item' : 'items'} created
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-medium group-hover:gap-2 transition-all duration-200">
                  Get Started <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="p-6 rounded-2xl border border-border/50 bg-card/50">
          <h2 className="font-semibold text-lg mb-4 font-heading">Recent Activity</h2>
          {(!roadmaps?.length && !analyses?.length && !recommendations?.length) ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7 text-muted-foreground/50" />
              </div>
              <p className="text-muted-foreground max-w-md mx-auto font-body">
                No AI activity yet. Start by generating a roadmap or analyzing your resume!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {roadmaps?.slice(0, 3).map((roadmap) => (
                <div key={roadmap.id} className="flex items-center gap-3 p-3.5 bg-muted/30 rounded-xl border border-border/30 hover:bg-muted/50 transition-colors">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Map className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Career Roadmap</p>
                    <p className="text-xs text-muted-foreground">{roadmap.careerGoal}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {new Date(roadmap.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
              {analyses?.slice(0, 3).map((analysis) => (
                <div key={analysis.id} className="flex items-center gap-3 p-3.5 bg-muted/30 rounded-xl border border-border/30 hover:bg-muted/50 transition-colors">
                  <div className="p-2 rounded-xl bg-success/10">
                    <FileText className="w-5 h-5 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Resume Analysis</p>
                    <p className="text-xs text-muted-foreground">ATS Score: {analysis.atsScore}%</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {new Date(analysis.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
              {recommendations?.slice(0, 3).map((rec) => (
                <div key={rec.id} className="flex items-center gap-3 p-3.5 bg-muted/30 rounded-xl border border-border/30 hover:bg-muted/50 transition-colors">
                  <div className="p-2 rounded-xl bg-warning/10">
                    <Lightbulb className="w-5 h-5 text-warning" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">Learning Recommendations</p>
                    <p className="text-xs text-muted-foreground">{rec.recommendedCourses.length} courses recommended</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {new Date(rec.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
