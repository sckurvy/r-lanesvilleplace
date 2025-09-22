import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-primary-foreground border-b-2 border-foreground">
      <div className="p-4 text-center">
        <pre className="ascii-title text-[10px] leading-tight mb-4 text-primary-foreground whitespace-pre overflow-x-auto">
{` ____      *     *___  *      *____ ____  *     *  *     *     _____ ____  *     *___  ____ _____
/  __\\  /\\/ \\   /  * \\/ \\  /|/  *_// ___\\/ \\ |\\/ \\/ \\   / \\   /  **//  **\\/ \\   /  * \\/   *Y  __/
|  \\/| / /| |   | / \\|| |\\ |||  \\  |    \\| | //| || |   | |   |  \\  |  \\/|| |   | / \\||  / |  \\  
|    // / | |_/\\| |-||| | \\|||  /_ \\___ || \\// | || |_/\\| |_/\\|  /_ |  __/| |_/\\| |-|||  \\_|  /_ 
\\_/\\_\\\\/  \\____/\\_/ \\|\\_/  \\|\\____\\\\____/\\__/  \\_/\\____/\\____/\\____\\\\_/   \\____/\\_/ \\|\\____|____\\`}
        </pre>
        <h1 className="text-2xl font-bold">Welcome to r/lanesvilleplace - Your School's Digital Scrapbook</h1>
      </div>
    </header>
  );
};

export default Header;