import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { UserPlus, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [showPasswordMeter, setShowPasswordMeter] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    setShowPasswordMeter(e.target.value.length > 0);
  }

  function handleConfirmPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signUp(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to create an account');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg">
        <div className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-gray-900" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Create your account</h2>
          <p className="text-gray-600 text-sm">Join us today! It takes only a few minutes.</p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {isPasswordValid ? (
                <CheckCircle className="absolute right-10 top-3 text-green-500" size={20} />
              ) : (
                password && <XCircle className="absolute right-10 top-3 text-red-500" size={20} />
              )}
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {confirmPassword && (
                passwordError ? (
                  <XCircle className="absolute right-10 top-3 text-red-500" size={20} />
                ) : (
                  <CheckCircle className="absolute right-10 top-3 text-green-500" size={20} />
                )
              )}
            </div>
          </div>

          {showPasswordMeter && (
            <PasswordStrengthMeter password={password} setIsValid={setIsPasswordValid} />
          )}
          {passwordError && (
            <p className="text-sm text-red-500 mt-1">{passwordError}</p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading || !isPasswordValid || password !== confirmPassword}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </Button>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
