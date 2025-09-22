import React from 'react';
import { PostType } from '@/types/post';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'videos', label: 'Videos' },
    { id: 'images', label: 'Images' },
    { id: 'text', label: 'Text Posts' },
  ];

  return (
    <nav className="bg-secondary border-b border-border px-4 py-2">
      <div className="max-w-6xl mx-auto flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              px-4 py-2 rounded-t-sm border border-border font-mono font-bold text-sm
              transition-colors cursor-pointer
              ${activeTab === tab.id 
                ? 'bg-background border-b-background text-foreground' 
                : 'bg-secondary text-secondary-foreground hover:bg-background/50'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default TabNavigation;