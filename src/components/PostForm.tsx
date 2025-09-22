import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PostType, ServerStatus } from '@/types/post';
import { API_ENDPOINTS } from '@/config/api';
import { useToast } from '@/hooks/use-toast';

interface PostFormProps {
  type: PostType;
  onPostCreated: () => void;
  onServerStatusChange: (status: ServerStatus) => void;
}

const PostForm: React.FC<PostFormProps> = ({ type, onPostCreated, onServerStatusChange }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    caption: '',
    description: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load saved name from localStorage
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setFormData(prev => ({ ...prev, name: savedName }));
    }
  }, []);

  const handleNameChange = (name: string) => {
    setFormData(prev => ({ ...prev, name }));
    localStorage.setItem('userName', name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    onServerStatusChange('waking');

    const submitData = new FormData();
    submitData.append('name', formData.name);
    
    if (type === 'text') {
      submitData.append('caption', formData.description);
      submitData.append('description', formData.description);
    } else {
      // Add type prefix to caption to help with filtering when file extensions aren't preserved
      const captionWithType = `[${type}] ${formData.caption}`;
      submitData.append('caption', captionWithType);
      submitData.append('description', formData.description);
      if (file) {
        submitData.append('file', file);
      }
    }

    try {
      const response = await fetch(API_ENDPOINTS.UPLOAD, {
        method: 'POST',
        body: submitData,
      });

      if (response.ok) {
        const result = await response.json();
        onServerStatusChange('online');
        
        toast({
          title: "Success!",
          description: "Your post has been created successfully.",
        });

        // Reset form but keep name
        const savedName = formData.name;
        setFormData({
          name: savedName,
          caption: '',
          description: '',
        });
        setFile(null);
        
        onPostCreated();
      } else {
        throw new Error('Failed to create post');
      }
    } catch (error) {
      console.error('Error submitting post:', error);
      onServerStatusChange('offline');
      
      toast({
        title: "Error",
        description: "Failed to create post. The server may be offline or starting up. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      // Set to online after a delay if successful
      setTimeout(() => {
        onServerStatusChange('online');
      }, 2000);
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'videos':
        return 'Share a Video';
      case 'images':
        return 'Share an Image';
      case 'text':
        return 'Share a Text Post';
    }
  };

  const getFileAccept = () => {
    switch (type) {
      case 'videos':
        return 'video/*';
      case 'images':
        return 'image/*';
      default:
        return undefined;
    }
  };

  return (
    <Card className="bg-secondary border-border p-4 mb-4">
      <h3 className="text-lg font-bold text-accent mb-4">{getTitle()}</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-mono">
            Your Real Name *
          </Label>
          <Input
            id="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="font-mono"
            placeholder="Enter your real name"
          />
        </div>

        {type !== 'text' && (
          <div>
            <Label htmlFor="caption" className="text-sm font-mono">
              Title *
            </Label>
            <Input
              id="caption"
              type="text"
              required
              value={formData.caption}
              onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
              className="font-mono"
              placeholder={`Enter ${type === 'videos' ? 'video' : 'image'} title`}
            />
          </div>
        )}

        <div>
          <Label htmlFor="description" className="text-sm font-mono">
            {type === 'text' ? 'Your Message *' : 'Description'}
          </Label>
          <Textarea
            id="description"
            required={type === 'text'}
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="font-mono min-h-[100px]"
            placeholder={
              type === 'text' 
                ? 'Share your story, memory, or thoughts...'
                : `Tell us about this ${type === 'videos' ? 'video' : 'image'}...`
            }
          />
        </div>

        {type !== 'text' && (
          <div>
            <Label htmlFor="file" className="text-sm font-mono">
              {type === 'videos' ? 'Video' : 'Image'} File {type === 'images' && '(including GIFs)'} *
            </Label>
            <Input
              id="file"
              type="file"
              required
              accept={getFileAccept()}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="font-mono"
            />
          </div>
        )}

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-mono font-bold"
        >
          {isSubmitting ? 'Posting...' : `Post ${type === 'text' ? 'Text' : type === 'videos' ? 'Video' : 'Image'}`}
        </Button>
      </form>
    </Card>
  );
};

export default PostForm;
