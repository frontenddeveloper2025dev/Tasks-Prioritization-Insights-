import { useState } from 'react';
import { Brain, Plus, Calendar, Zap, BarChart3, Settings, LogOut, Sparkles, Send, Clock, Target, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/auth-store';

function HomePage() {
  const [naturalLanguageInput, setNaturalLanguageInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { user, logout } = useAuthStore();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        description: "See you next time!",
      });
    } catch (error) {
      toast({
        title: "Logout failed",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  const handleProcessTask = async () => {
    if (!naturalLanguageInput.trim()) {
      toast({
        title: "Enter a task",
        description: "Please describe what you need to accomplish",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate AI processing for MVP
    setTimeout(() => {
      setIsProcessing(false);
      setNaturalLanguageInput('');
      toast({
        title: "Task processed!",
        description: "This feature will be available in a later phase",
      });
    }, 2000);
  };

  // Mock data for MVP demonstration
  const mockTasks = [
    {
      id: '1',
      title: 'Team meeting preparation',
      description: 'Prepare slides and agenda for the weekly team sync',
      category: 'work',
      priority: 'high',
      deadline: 'Today 2:00 PM',
      completed: false,
      aiGenerated: true
    },
    {
      id: '2',
      title: 'Grocery shopping',
      description: 'Buy ingredients for dinner and weekly essentials',
      category: 'life',
      priority: 'medium',
      deadline: 'Tonight',
      completed: false,
      aiGenerated: true
    },
    {
      id: '3',
      title: 'Morning workout routine',
      description: '30-minute cardio session at the gym',
      category: 'health',
      priority: 'medium',
      deadline: 'Tomorrow 7:00 AM',
      completed: true,
      aiGenerated: true
    }
  ];

  const mockStats = {
    todayCompleted: 3,
    todayTotal: 8,
    weekStreak: 5,
    aiSuggestions: 12
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-chart-4 text-white';
      case 'low': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'work': return 'bg-primary text-primary-foreground';
      case 'life': return 'bg-accent text-accent-foreground';
      case 'health': return 'bg-secondary text-secondary-foreground';
      case 'study': return 'bg-chart-3 text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">TaskMind AI</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {user?.name || user?.email?.split('@')[0] || 'User'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={() => toast({ title: "Settings", description: "This feature will be available in a later phase" })}>
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Natural Language Input */}
        <Card className="border-2 border-dashed border-accent/30 bg-gradient-to-r from-card/80 to-accent/5 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <CardTitle className="text-lg">What's on your mind?</CardTitle>
            </div>
            <CardDescription>
              Describe your tasks in natural language. AI will organize them intelligently.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <Input
                  placeholder="e.g., 'Call dentist tomorrow morning, gym at 6 PM, finish project report by Friday'"
                  value={naturalLanguageInput}
                  onChange={(e) => setNaturalLanguageInput(e.target.value)}
                  className="pr-12 h-12 text-base bg-background/50"
                  disabled={isProcessing}
                  onKeyDown={(e) => e.key === 'Enter' && handleProcessTask()}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Zap className="w-4 h-4 text-accent" />
                </div>
              </div>
              <Button 
                onClick={handleProcessTask}
                disabled={isProcessing || !naturalLanguageInput.trim()}
                className="h-12 px-6 bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90"
              >
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    <span>Processing</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Process with AI</span>
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-secondary/20 to-secondary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Today's Progress</p>
                  <p className="text-2xl font-bold text-secondary">
                    {mockStats.todayCompleted}/{mockStats.todayTotal}
                  </p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-chart-4/20 to-chart-4/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Week Streak</p>
                  <p className="text-2xl font-bold text-chart-4">{mockStats.weekStreak} days</p>
                </div>
                <Target className="w-8 h-8 text-chart-4" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/20 to-accent/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">AI Suggestions</p>
                  <p className="text-2xl font-bold text-accent">{mockStats.aiSuggestions}</p>
                </div>
                <Brain className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/20 to-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Focus Time</p>
                  <p className="text-2xl font-bold text-primary">4.2h</p>
                </div>
                <Clock className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Task List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="w-5 h-5" />
                      <span>Your Tasks</span>
                    </CardTitle>
                    <CardDescription>
                      AI-organized and prioritized tasks
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toast({ title: "Add Task", description: "This feature will be available in a later phase" })}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockTasks.map((task) => (
                  <div 
                    key={task.id}
                    className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                      task.completed 
                        ? 'bg-secondary/10 border-secondary/30' 
                        : 'bg-card hover:bg-accent/5'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`w-5 h-5 p-0 rounded-full border-2 ${
                              task.completed
                                ? 'bg-secondary border-secondary text-secondary-foreground'
                                : 'border-muted-foreground hover:border-secondary'
                            }`}
                            onClick={() => toast({ title: "Task completion", description: "This feature will be available in a later phase" })}
                          >
                            {task.completed && <CheckCircle2 className="w-3 h-3" />}
                          </Button>
                          <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </h3>
                          {task.aiGenerated && (
                            <Badge variant="secondary" className="text-xs">
                              <Sparkles className="w-3 h-3 mr-1" />
                              AI
                            </Badge>
                          )}
                        </div>
                        <p className={`text-sm ${task.completed ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                          {task.description}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(task.priority)} variant="secondary">
                            {task.priority}
                          </Badge>
                          <Badge className={getCategoryColor(task.category)} variant="secondary">
                            {task.category}
                          </Badge>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="w-3 h-3 mr-1" />
                            {task.deadline}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-6 border rounded-lg bg-muted/30">
                  <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-sm text-muted-foreground">
                    This feature will be available in a later phase
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "Daily Review", description: "This feature will be available in a later phase" })}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Daily Review
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "Weekly Report", description: "This feature will be available in a later phase" })}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Weekly Report
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={() => toast({ title: "AI Suggestions", description: "This feature will be available in a later phase" })}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Suggestions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage 