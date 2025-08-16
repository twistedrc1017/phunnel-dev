import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { QuestionRenderer } from './QuestionRenderer';
import { PlanSummary } from './PlanSummary';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { OnboardingSurvey, OnboardingSession, OnboardingNode } from '@/config/onboarding/schema';
import { matchTemplateAndWidgets } from '@/lib/onboarding/match';

interface SurveyContainerProps {
  survey: OnboardingSurvey;
  sessionId?: string;
  onComplete?: (result: any) => void;
}

export function SurveyContainer({ survey, sessionId, onComplete }: SurveyContainerProps) {
  const [currentNode, setCurrentNode] = useState<OnboardingNode | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [session, setSession] = useState<OnboardingSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  // Calculate progress
  const totalNodes = survey.nodes.filter(n => n.type === 'question').length;
  const answeredQuestions = Object.keys(answers).length;
  const progress = Math.round((answeredQuestions / totalNodes) * 100);

  useEffect(() => {
    initializeSession();
  }, []);

  useEffect(() => {
    if (session && survey) {
      const node = survey.nodes.find(n => n.key === session.cursor) || 
                   survey.nodes.find(n => n.key === survey.startNode);
      setCurrentNode(node || null);
    }
  }, [session, survey]);

  const initializeSession = async () => {
    try {
      if (sessionId) {
        // Load existing session
        const { data, error } = await supabase
          .from('onboarding_sessions')
          .select('*')
          .eq('id', sessionId)
          .single();
        
        if (error) throw error;
        
        setSession({
          id: data.id,
          userId: data.user_id,
          email: data.email,
          version: data.version,
          cursor: data.cursor,
          answers: data.answers as Record<string, any>,
          recommendedTemplate: data.recommended_template,
          recommendedWidgets: data.recommended_widgets,
          createdAt: data.created_at,
          updatedAt: data.updated_at
        });
        setAnswers((data.answers as Record<string, any>) || {});
      } else {
        // Create new session
        const { data: user } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from('onboarding_sessions')
          .insert({
            user_id: user.user?.id,
            version: survey.version,
            cursor: survey.startNode,
            answers: {}
          })
          .select()
          .single();
        
        if (error) throw error;
        setSession({
          id: data.id,
          userId: data.user_id,
          email: data.email,
          version: data.version,
          cursor: data.cursor,
          answers: data.answers as Record<string, any>,
          recommendedTemplate: data.recommended_template,
          recommendedWidgets: data.recommended_widgets,
          createdAt: data.created_at,
          updatedAt: data.updated_at
        });
      }
    } catch (error) {
      toast({
        title: "Error loading survey",
        description: "Please try refreshing the page.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = async (newAnswers: Record<string, any>, cursor: string) => {
    if (!session) return;

    try {
      const { error } = await supabase
        .from('onboarding_sessions')
        .update({
          answers: newAnswers,
          cursor,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const handleAnswer = (key: string, value: any) => {
    const newAnswers = { ...answers, [key]: value };
    setAnswers(newAnswers);
    
    if (session) {
      saveProgress(newAnswers, currentNode?.key || survey.startNode);
    }
  };

  const getNextNode = (node: OnboardingNode, answer?: any): string | null => {
    // Check for conditional next based on answer
    if (node.conditions && answer) {
      const condition = node.conditions.find(c => c.answer === answer);
      if (condition) return condition.next;
    }

    // Check for option-specific next
    if (node.options && answer) {
      const option = node.options.find(o => o.value === answer);
      if (option?.next) return option.next;
    }

    // Fork logic
    if (node.type === 'fork') {
      const industryAnswer = answers.industry;
      const condition = node.conditions?.find(c => c.answer === industryAnswer);
      return condition?.next || null;
    }

    return node.next || null;
  };

  const handleNext = async () => {
    if (!currentNode) return;

    const currentAnswer = answers[currentNode.key];
    
    // Validate required fields
    if (currentNode.required && !currentAnswer) {
      toast({
        title: "Answer required",
        description: "Please answer this question to continue.",
        variant: "destructive"
      });
      return;
    }

    const nextNodeKey = getNextNode(currentNode, currentAnswer);
    
    if (!nextNodeKey) {
      // End of survey - generate recommendations
      await completeOnboarding();
      return;
    }

    const nextNode = survey.nodes.find(n => n.key === nextNodeKey);
    if (nextNode) {
      setCurrentNode(nextNode);
      if (session) {
        await saveProgress(answers, nextNode.key);
        setSession({ ...session, cursor: nextNode.key });
      }
    }
  };

  const completeOnboarding = async () => {
    if (!session) return;

    setProcessing(true);
    try {
      // Generate recommendations
      const matchResult = matchTemplateAndWidgets({ answers });
      
      // Update session with recommendations
      const { error: sessionError } = await supabase
        .from('onboarding_sessions')
        .update({
          recommended_template: matchResult.templateKey,
          recommended_widgets: matchResult.widgets
        })
        .eq('id', session.id);

      if (sessionError) throw sessionError;

      // Create onboarding response
      const { error: responseError } = await supabase
        .from('onboarding_responses')
        .insert({
          session_id: session.id,
          business_name: answers.business_name,
          website: answers.website,
          industry: answers.industry,
          team_size: answers.team_size === '1' || answers.team_size === 'just_me' ? 1 : 
                   answers.team_size === '2_5' ? 3 :
                   answers.team_size === '6_10' ? 8 :
                   answers.team_size === '11_25' ? 18 : 30,
          monthly_ad_spend: parseInt(answers.monthly_ad_spend?.split('_')[0] || '0'),
          primary_goals: answers.primary_goals || [],
          pains: answers.pain_points || [],
          timeline: answers.timeline
        });

      if (responseError) throw responseError;

      // Navigate to end node with recommendations
      const endNode = survey.nodes.find(n => n.type === 'end');
      if (endNode) {
        setCurrentNode(endNode);
        setSession({
          ...session,
          cursor: endNode.key,
          recommendedTemplate: matchResult.templateKey,
          recommendedWidgets: matchResult.widgets
        });
      }

      if (onComplete) {
        onComplete({
          templateKey: matchResult.templateKey,
          widgets: matchResult.widgets,
          answers
        });
      }

    } catch (error) {
      toast({
        title: "Error completing survey",
        description: "Please try again.",
        variant: "destructive"
      });
      console.error('Onboarding completion error:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handlePrevious = () => {
    // Simple back navigation - could be enhanced with history stack
    const currentIndex = survey.nodes.findIndex(n => n.key === currentNode?.key);
    if (currentIndex > 0) {
      const prevNode = survey.nodes[currentIndex - 1];
      setCurrentNode(prevNode);
      if (session) {
        saveProgress(answers, prevNode.key);
        setSession({ ...session, cursor: prevNode.key });
      }
    }
  };

  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!currentNode) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Survey configuration error. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* Progress Bar */}
      {currentNode.type !== 'end' && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{currentNode.title}</CardTitle>
          {currentNode.body && (
            <p className="text-muted-foreground">{currentNode.body}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {currentNode.type === 'end' && session?.recommendedTemplate ? (
            <PlanSummary
              templateKey={session.recommendedTemplate}
              widgets={session.recommendedWidgets || []}
              answers={answers}
            />
          ) : (
            <QuestionRenderer
              node={currentNode}
              value={answers[currentNode.key]}
              onChange={(value) => handleAnswer(currentNode.key, value)}
            />
          )}

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentNode.key === survey.startNode}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentNode.type === 'end' ? (
              <Button 
                onClick={() => onComplete?.(session)}
                className="bg-primary text-primary-foreground"
              >
                Apply Setup
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={processing}
                className="bg-primary text-primary-foreground"
              >
                {processing ? 'Processing...' : 'Next'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}