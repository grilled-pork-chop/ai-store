import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px]">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-2">404</h1>
      <p className="text-2xl text-gray-600 dark:text-gray-400 mb-8">Page Not Found</p>
      <Link to="/">
        <Button size="lg">Go Home</Button>
      </Link>
    </div>
  );
}
