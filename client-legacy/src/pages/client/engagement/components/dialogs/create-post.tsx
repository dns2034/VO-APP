import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export function CreatePostDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePost = () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Something went wrong. Try again", {
        description: "Oops! We couldn't publish your post",
      });
    } else {
      toast.success("Post Created Successfully", {
        description: "Your post has been published!",
      });
      setTitle("");
      setContent("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full">
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 gap-0">
        <DialogHeader className="bg-purple-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-medium">
              Create Post
            </DialogTitle>
          </div>
        </DialogHeader>
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Enter a post title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-medium">
              What's on your mind?
            </Label>
            <Textarea
              id="content"
              placeholder=""
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px] border-gray-300 resize-none"
            />
          </div>
          <Button
            onClick={handlePost}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2"
          >
            Post
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
