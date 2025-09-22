import React from 'react';
import { Card } from '@/components/ui/card';
import { Post, PostType } from '@/types/post';
import { API_BASE } from '@/config/api';

interface PostListProps {
  posts: Post[];
  type: PostType;
  loading: boolean;
}

const PostList: React.FC<PostListProps> = ({ posts, type, loading }) => {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const filteredPosts = posts.filter(post => {
    if (type === 'videos') {
      // Check for video files with extensions OR posts with [videos] caption prefix
      return (post.file && (post.file.includes('.mp4') || post.file.includes('.webm') || post.file.includes('.ogg'))) ||
             (post.caption && post.caption.includes('[videos]') && post.file);
    } else if (type === 'images') {
      // Check for image files with extensions OR posts with [images] caption prefix
      return (post.file && (post.file.includes('.jpg') || post.file.includes('.jpeg') || post.file.includes('.png') || post.file.includes('.gif') || post.file.includes('.webp'))) ||
             (post.caption && post.caption.includes('[images]') && post.file && !post.caption.includes('[videos]'));
    } else if (type === 'text') {
      return !post.file && post.description;
    }
    return false;
  }).sort((a, b) => b.id - a.id);

  if (loading) {
    return (
      <div className="text-center py-8 text-muted-foreground font-mono">
        Loading posts...
      </div>
    );
  }

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground font-mono italic">
        No {type} posts yet. Be the first to share!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredPosts.map((post) => (
        <Card key={post.id} className="bg-background border-border p-4">
          <div className="space-y-3">
            {/* Post Header */}
            <div className="border-b border-border pb-2">
              {type !== 'text' && post.caption && (
                <h4 className="text-lg font-bold text-foreground mb-1">
                  {post.caption.replace(/\[(images|videos)\]\s*/, '')}
                </h4>
              )}
              <div className="flex flex-wrap gap-3 text-xs font-mono text-muted-foreground">
                <span className="text-accent font-bold">{post.name}</span>
                <span>No.{post.id}</span>
                <span>{formatTime(post.id)}</span>
              </div>
            </div>

            {/* Post Content */}
            <div className="space-y-3">
              {/* Text content */}
              {post.description && (
                <div className={`${type === 'text' ? 'bg-muted p-3 rounded border border-border' : ''}`}>
                  <p className="whitespace-pre-wrap font-mono text-sm text-foreground">
                    {post.description}
                  </p>
                </div>
              )}

              {/* Media content */}
              {post.file && (
                <div className="media-container">
                  {type === 'videos' ? (
                    <video 
                      controls 
                      className="w-full max-w-2xl rounded border border-border bg-black"
                      preload="metadata"
                    >
                      <source src={`${API_BASE}${post.file}`} type="video/mp4" />
                      <source src={`${API_BASE}${post.file}`} type="video/webm" />
                      <source src={`${API_BASE}${post.file}`} type="video/ogg" />
                      Your browser does not support video playback.
                    </video>
                  ) : type === 'images' ? (
                    <img 
                      src={`${API_BASE}${post.file}`} 
                      alt={post.caption || 'User uploaded image'}
                      className="max-w-full max-h-96 rounded border border-border cursor-pointer hover:opacity-90 transition-opacity"
                      loading="lazy"
                      onClick={() => window.open(`${API_BASE}${post.file}`, '_blank')}
                    />
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PostList;