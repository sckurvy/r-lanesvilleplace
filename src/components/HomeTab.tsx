import React from 'react';
import { Card } from '@/components/ui/card';

const HomeTab: React.FC = () => {
  return (
    <Card className="bg-background border-border p-6">
      <h2 className="text-xl font-bold text-accent mb-4">Welcome to r/lanesvilleplace!</h2>
      
      <div className="space-y-4 text-sm">
        <div>
          <p className="font-bold mb-2">What is this place?</p>
          <p className="text-muted-foreground">
            This is your school's digital scrapbook - a place to share memories, moments, and experiences from your time here. 
            Think of it as a time capsule where everyone can contribute!
          </p>
        </div>
        
        <div>
          <p className="font-bold mb-2">How to use:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Choose your content type: Videos, Images, or Text posts</li>
            <li>Fill in your real name, a title, and description</li>
            <li>Upload your content or write your text</li>
            <li>Your post will appear with a timestamp for future nostalgia!</li>
          </ul>
        </div>
        
        <div>
          <p className="font-bold mb-2">What can you share?</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li><strong className="text-foreground">Videos:</strong> School events, funny moments, achievements</li>
            <li><strong className="text-foreground">Images:</strong> Photos from classes, sports, friends, campus life (GIFs supported!)</li>
            <li><strong className="text-foreground">Text:</strong> Stories, memories, thoughts, jokes, or anything you want to remember</li>
          </ul>
        </div>
        
        <div>
          <p className="font-bold mb-2">Rules:</p>
          <ul className="list-disc list-inside text-muted-foreground space-y-1">
            <li>Use your real name - this is for the school community</li>
            <li>Keep content school-appropriate</li>
            <li>Be respectful and kind</li>
            <li>Have fun and create lasting memories!</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default HomeTab;