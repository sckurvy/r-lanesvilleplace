export interface Post {
  id: number;
  name: string;
  caption: string;
  description: string;
  file: string | null;
  timestamp?: number;
}

export type PostType = 'videos' | 'images' | 'text';

export type ServerStatus = 'offline' | 'waking' | 'online';
