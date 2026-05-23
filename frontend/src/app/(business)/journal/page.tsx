"use client";

import { useEffect, useState } from "react";
import { activityService, Activity } from "@/services/activity-service";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, BookText as JournalIcon, Tag } from "lucide-react";

export default function JournalPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    fetchActivities();
  }, []);

  async function fetchActivities() {
    try {
      const data = await activityService.getActivities();
      setActivities(data);
    } catch (err) {
      toast.error("Failed to load journal entries");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddEntry() {
    if (!newTitle || !newContent) {
      toast.error("Please fill in both title and content");
      return;
    }

    try {
      await activityService.addActivity({
        title: newTitle,
        content: newContent,
        type: "JOURNAL",
        tags: ["personal"],
      });
      toast.success("Entry added successfully");
      setNewTitle("");
      setNewContent("");
      fetchActivities();
    } catch (err) {
      toast.error("Failed to add entry");
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>New Journal Entry</CardTitle>
          <CardDescription>Capture your thoughts, activities, or reflections.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input 
            placeholder="Title" 
            value={newTitle} 
            onChange={(e) => setNewTitle(e.target.value)}
            className="bg-white/5 border-white/10"
          />
          <Textarea 
            placeholder="What's on your mind?" 
            value={newContent} 
            onChange={(e) => setNewContent(e.target.value)}
            className="min-h-[150px] bg-white/5 border-white/10"
          />
          <Button onClick={handleAddEntry} className="w-full">
            <Plus className="mr-2 h-4 w-4" /> Save Entry
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-white">Previous Entries</h3>
        {loading ? (
          <p>Loading entries...</p>
        ) : activities.length === 0 ? (
          <p className="text-neutral-500">No entries yet. Start writing!</p>
        ) : (
          activities.map((activity) => (
            <Card key={activity.id} className="glass-card hover:bg-white/10 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-bold">{activity.title}</CardTitle>
                <span className="text-xs text-neutral-500">
                  {new Date(activity.createdAt).toLocaleDateString()}
                </span>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-400 whitespace-pre-wrap">{activity.content}</p>
                <div className="flex gap-2 mt-4">
                  {activity.tags.map((tag) => (
                    <span key={tag} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-400">
                      <Tag size={10} /> {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
