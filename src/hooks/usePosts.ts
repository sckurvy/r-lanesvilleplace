import { useState, useEffect, useCallback } from 'react';
import { Post, ServerStatus } from '@/types/post';
import { API_ENDPOINTS } from '@/config/api';

export const usePosts = (onServerStatusChange: (status: ServerStatus) => void) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      onServerStatusChange('waking');
      const response = await fetch(API_ENDPOINTS.POSTS);
      
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
        onServerStatusChange('online');
      } else {
        throw new Error('Failed to fetch posts');
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts. Server may be offline.');
      onServerStatusChange('offline');
    } finally {
      setLoading(false);
    }
  }, [onServerStatusChange]);

  useEffect(() => {
    fetchPosts();
    
    // Check server status periodically
    const interval = setInterval(() => {
      fetch(API_ENDPOINTS.POSTS)
        .then((res) => {
          if (res.ok) {
            onServerStatusChange('online');
          } else {
            onServerStatusChange('offline');
          }
        })
        .catch(() => {
          onServerStatusChange('offline');
        });
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [fetchPosts, onServerStatusChange]);

  return { posts, loading, error, refetch: fetchPosts };
};
