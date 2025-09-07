import React from "react";
import { Avatar, Button } from "@mantine/core";
import { MessageCircle, Share2, ArrowUp, ArrowDown } from "lucide-react";

interface BlogCardProps {
  subBlog: string;
  time: string;
  title: string;
  image: string;
  upvotes: number;
  comments: number;
  shares: number;
}

const BlogCard: React.FC<BlogCardProps> = ({
  subBlog,
  time,
  title,
  image,
  upvotes,
  comments,
  shares,
}) => {
  return (
    <div className="bg-gray-900 text-white rounded-xl p-4 w-full max-w-2xl shadow-md">
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar src="https://styles.Blogmedia.com/t5_2qh1s/styles/communityIcon_t5_2qh1s.png" size="sm" radius="xl" />
        <div>
          <p className="text-sm font-medium">{subBlog}</p>
          <p className="text-xs text-gray-400">{time}</p>
        </div>
        <Button size="xs" variant="light" color="blue" className="ml-auto">
          Join
        </Button>
      </div>

      {/* Title */}
      <h2 className="text-lg font-semibold mb-3">{title}</h2>

      {/* Image */}
      <div className="rounded-lg overflow-hidden mb-4">
        <img src={image} alt="Blog post" className="w-full object-cover" />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6 text-gray-400 text-sm">
        <div className="flex items-center gap-2">
          <ArrowUp className="w-4 h-4 cursor-pointer hover:text-white" />
          <span>{upvotes}</span>
          <ArrowDown className="w-4 h-4 cursor-pointer hover:text-white" />
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-white">
          <MessageCircle className="w-4 h-4" />
          <span>{comments}</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:text-white">
          <Share2 className="w-4 h-4" />
          <span>{shares}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
