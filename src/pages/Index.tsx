import React, { useState } from 'react';
import { PostType, ServerStatus } from '@/types/post';
import { usePosts } from '@/hooks/usePosts';
import Header from '@/components/Header';
import TabNavigation from '@/components/TabNavigation';
import HomeTab from '@/components/HomeTab';
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import ServerStatusComponent from '@/components/ServerStatus';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [serverStatus, setServerStatus] = useState<ServerStatus>('offline');
  const { posts, loading, refetch } = usePosts(setServerStatus);

  const renderTabContent = () => {
    if (activeTab === 'home') {
      return <HomeTab />;
    }

    const postType = activeTab as PostType;
    
    return (
      <div className="space-y-4">
        <PostForm 
          type={postType} 
          onPostCreated={refetch}
          onServerStatusChange={setServerStatus}
        />
        <PostList 
          posts={posts} 
          type={postType} 
          loading={loading}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <ServerStatusComponent status={serverStatus} />
      <Header />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-6xl mx-auto p-4">
        {renderTabContent()}
      </main>
    </div>
  );
};

export default Index;
