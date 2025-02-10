import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { createClient, User } from '@supabase/supabase-js';

// Ensure environment variables are available, otherwise use placeholder values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ;

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if Supabase is properly configured
    if (supabaseUrl === 'https://placeholder.supabase.co') {
      console.error('Supabase URL not configured. Please set up your environment variables.');
      setLoading(false);
      return;
    }

    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    if (supabaseUrl === 'https://placeholder.supabase.co') {
      throw new Error('Supabase not configured. Please set up your environment variables.');
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    if (supabaseUrl === 'https://placeholder.supabase.co') {
      throw new Error('Supabase not configured. Please set up your environment variables.');
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    if (supabaseUrl === 'https://placeholder.supabase.co') {
      throw new Error('Supabase not configured. Please set up your environment variables.');
    }
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}