"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  ListTodo,
  Sparkles,
} from "lucide-react";
import { supabase, type Database } from "@/lib/supabase";

type Todo = Database["public"]["Tables"]["todos"]["Row"];

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  // Load todos from Supabase
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTodos(data || []);
    } catch (error) {
      console.error("Error loading todos:", error);
      toast.error("Failed to load todos. Using demo mode.");
      // Demo mode with sample data
      setTodos([
        {
          id: "1",
          task: "Set up Supabase project",
          is_complete: false,
          created_at: new Date().toISOString(),
        },
        {
          id: "2",
          task: "Connect to your database",
          is_complete: false,
          created_at: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setAdding(true);
    try {
      const { data, error } = await supabase
        .from("todos")
        .insert([{ task: newTask.trim() }])
        .select();

      if (error) throw error;

      if (data) {
        setTodos((prev) => [data[0], ...prev]);
        setNewTask("");
        toast.success("Todo added!");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
      // Demo mode - add locally
      const newTodo: Todo = {
        id: Date.now().toString(),
        task: newTask.trim(),
        is_complete: false,
        created_at: new Date().toISOString(),
      };
      setTodos((prev) => [newTodo, ...prev]);
      setNewTask("");
      toast.success("Todo added! (Demo mode)");
    } finally {
      setAdding(false);
    }
  };

  const toggleTodo = async (id: string, is_complete: boolean) => {
    try {
      const { error } = await supabase
        .from("todos")
        .update({ is_complete: !is_complete })
        .eq("id", id);

      if (error) throw error;

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, is_complete: !is_complete } : todo
        )
      );
      toast.success(is_complete ? "Todo marked as active" : "Todo completed!");
    } catch (error) {
      console.error("Error updating todo:", error);
      // Demo mode - update locally
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, is_complete: !is_complete } : todo
        )
      );
      toast.success(
        is_complete ? "Todo marked as active! (Demo)" : "Todo completed! (Demo)"
      );
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const { error } = await supabase.from("todos").delete().eq("id", id);

      if (error) throw error;

      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      toast.success("Todo deleted!");
    } catch (error) {
      console.error("Error deleting todo:", error);
      // Demo mode - delete locally
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      toast.success("Todo deleted! (Demo mode)");
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.is_complete;
    if (filter === "completed") return todo.is_complete;
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.is_complete).length,
    completed: todos.filter((t) => t.is_complete).length,
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          Loading todos...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center gap-2 rounded-full border border-border/50 bg-background/50 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-sm">
              <Sparkles size={12} />
              <span>Next.js + Supabase</span>
            </div>
          </div>
          <h1 className="font-serif text-4xl font-light tracking-tight mb-2 sm:text-5xl">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Todo
            </span>{" "}
            <span className="text-foreground">App</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            A full-stack todo application with real-time updates
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-primary">
                {stats.total}
              </div>
              <div className="text-sm text-muted-foreground">Total Tasks</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-500">
                {stats.active}
              </div>
              <div className="text-sm text-muted-foreground">Active</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-500">
                {stats.completed}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Todo Interface */}
        <Card className="backdrop-blur-sm bg-background/80 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListTodo className="h-5 w-5" />
              Your Tasks
            </CardTitle>
            <CardDescription>
              Add, complete, and manage your daily tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add Todo Form */}
            <form onSubmit={addTodo} className="flex gap-2">
              <Input
                placeholder="What needs to be done?"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="flex-1"
                disabled={adding}
              />
              <Button type="submit" disabled={adding || !newTask.trim()}>
                {adding ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                Add
              </Button>
            </form>

            {/* Filter Tabs */}
            <Tabs
              value={filter}
              onValueChange={(v) => setFilter(v as typeof filter)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
                <TabsTrigger value="active">
                  Active ({stats.active})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({stats.completed})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={filter} className="mt-6">
                {filteredTodos.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <ListTodo className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">No tasks found</p>
                    <p className="text-sm">
                      {filter === "all"
                        ? "Add your first task to get started!"
                        : filter === "active"
                        ? "All your tasks are completed! 🎉"
                        : "No completed tasks yet."}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredTodos.map((todo) => (
                      <div
                        key={todo.id}
                        className="flex items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors group">
                        <Checkbox
                          checked={todo.is_complete}
                          onCheckedChange={() =>
                            toggleTodo(todo.id, todo.is_complete)
                          }
                          className="flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p
                            className={`${
                              todo.is_complete
                                ? "line-through text-muted-foreground"
                                : "text-foreground"
                            } transition-all`}>
                            {todo.task}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(todo.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {todo.is_complete ? (
                            <Badge
                              variant="outline"
                              className="text-green-600 border-green-200">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Done
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="text-orange-600 border-orange-200">
                              <Circle className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteTodo(todo.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Toaster />
    </div>
  );
}
