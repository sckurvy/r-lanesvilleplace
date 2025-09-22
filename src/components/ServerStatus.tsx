import React from 'react';
import { ServerStatus } from '@/types/post';
import { Circle } from 'lucide-react';

interface ServerStatusProps {
  status: ServerStatus;
}

const ServerStatusComponent: React.FC<ServerStatusProps> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return 'text-green-600';
      case 'waking':
        return 'text-yellow-600';
      case 'offline':
        return 'text-red-600';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'waking':
        return 'Waking Up';
      case 'offline':
        return 'Offline';
    }
  };

  return (
    <div className="fixed top-4 left-4 z-50 bg-card border border-border rounded-md px-3 py-2 shadow-lg">
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono text-foreground">Server Status:</span>
        <div className="flex items-center gap-1">
          <Circle 
            className={`w-3 h-3 ${getStatusColor()} ${status === 'online' ? 'animate-pulse' : ''}`} 
            fill="currentColor"
          />
          <span className={`text-sm font-mono font-bold ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ServerStatusComponent;