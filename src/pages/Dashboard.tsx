import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { LogOut, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  console.log('uyser',user)
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b bg-white px-4 py-3 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-xl font-bold">PostCraft AI</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl p-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Your Posts</h2>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Post
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Post cards will go here */}
          <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-6 text-center">
            <div>
              <Plus className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Create your first post
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}