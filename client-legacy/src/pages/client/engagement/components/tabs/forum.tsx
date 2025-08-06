import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, ThumbsUp } from "lucide-react";
import CommentSectionDialog from "../dialogs/comment-section";
import { CreatePostDialog } from "../dialogs/create-post";
// import DeletePostDialog from "../dialogs/delete-post";
import { EditPostDialog } from "../dialogs/edit-post";

export default function ForumTab() {
  const posts = [
    {
      id: 1,
      author: "Sophia Wonderland",
      timestamp: "Apr 11, 2024 at 04:31 PM",
      title: "How I Became the Top Referral: My Strategy & Tips",
      likes: 100,
      comments: 104,
    },
    {
      id: 2,
      author: "Sophia Wonderland",
      timestamp: "Apr 11, 2024 at 04:31 PM",
      title: "How I Became the Top Referral: My Strategy & Tips",
      likes: 100,
      comments: 104,
    },
    {
      id: 3,
      author: "Sophia Wonderland",
      timestamp: "Apr 11, 2024 at 04:31 PM",
      title: "How I Became the Top Referral: My Strategy & Tips",
      likes: 100,
      comments: 104,
    },
  ];

  return (
    <div className=" bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded p-4">
      <div className="max-w-2xl mx-auto space-y-4 ">
        {/* Create Post Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src="/placeholder.svg?height=40&width=40"
                alt="User avatar"
              />
              <AvatarFallback className="bg-purple-300 text-purple-800">
                U
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Input
                placeholder="Let's share what's going on your mind..."
                className="bg-white/90 border-0 rounded-full px-4 py-2 text-gray-700 placeholder:text-gray-500"
              />
            </div>
            <CreatePostDialog />
          </div>
        </div>

        {/* Posts Feed */}
        <ScrollArea className="h-[38rem] px-2">
          {[
            ...posts,
            {
              id: 5,
              author: "Sophia Wonderland",
              timestamp: "Apr 11, 2024 at 04:31 PM",
              title: "How I Became the Top Referral: My Strategy & Tips",
              likes: 100,
              comments: 104,
            },
          ].map((post) => (
            <div
              key={post.id}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 relative my-2  "
            >
              {/* Heart Icon */}
              <div className="absolute top-4 right-4 flex gap-2 items-center">
                <EditPostDialog oldTitle={post.title} oldContent={""} />
                {/* <DeletePostDialog /> */}
                <Heart className="w-6 h-6 text-white/70 hover:text-red-400 cursor-pointer transition-colors" />
              </div>

              {/* Post Header */}
              <div className="flex items-start gap-3 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src="/placeholder.svg?height=48&width=48"
                    alt={post.author}
                  />
                  <AvatarFallback className="bg-purple-300 text-purple-800">
                    SW
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    {post.author}
                  </h3>
                  <p className="text-white/70 text-sm">{post.timestamp}</p>
                </div>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <h2 className="text-white text-xl font-semibold mb-2">
                  {post.title}
                </h2>
              </div>

              {/* Post Stats */}
              <div className="flex items-center gap-6 text-white/80">
                <Button
                  variant={"ghost"}
                  className="flex items-center gap-2 hover:text-purple-400"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{post.likes} Likes</span>
                </Button>
                <CommentSectionDialog count={post.comments} />
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
