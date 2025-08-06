import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

export default function CommentSectionDialog({
    count
}: {
        count: number;
}) {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");

  // Mock comment data - all identical as shown in the image
  const comments = Array(6).fill({
    id: 1,
    username: "Stephen Robertson",
    message: "Super inspiring! Thanks for sharing :)",
    avatar: "/placeholder.svg?height=40&width=40",
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex items-center gap-2 hover:text-purple-400"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm">{count} comments</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md p-0 gap-0 max-h-[600px]">
        <DialogHeader className="bg-purple-600 text-white p-4 rounded-t-lg">
          <DialogTitle className="text-lg font-medium text-center">
            Sophia Post
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-[500px]">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {comments.map((comment, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarImage
                    src={comment.avatar || "/placeholder.svg"}
                    alt={comment.username}
                  />
                  <AvatarFallback className="bg-orange-400 text-white text-sm">
                    SR
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-700 mb-1">
                    {comment.username}
                  </div>
                  <div className="bg-purple-600 text-white rounded-2xl px-4 py-2 inline-block max-w-full">
                    <p className="text-sm">{comment.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t p-4">
            <Input
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="border-gray-300"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
