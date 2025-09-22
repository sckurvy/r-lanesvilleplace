import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center p-8 bg-secondary rounded-lg border-2 border-border">
        <h1 className="mb-4 text-6xl font-bold font-mono text-accent">404</h1>
        <p className="mb-6 text-xl text-foreground font-mono">Page not found</p>
        <a 
          href="/" 
          className="inline-block px-6 py-2 bg-primary text-primary-foreground font-mono font-bold rounded hover:bg-primary/90 transition-colors"
        >
          Return to Board
        </a>
      </div>
    </div>
  );
};

export default NotFound;
