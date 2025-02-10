import { useState, useEffect } from 'react';
import { Progress } from './ui/Progress';
import { CheckCircle, XCircle } from 'lucide-react';

const strengthLevels = [
  { label: 'Muito Fraca', color: 'bg-red-500', minScore: 0 },
  { label: 'Fraca', color: 'bg-orange-500', minScore: 1 },
  { label: 'Média', color: 'bg-yellow-500', minScore: 2 },
  { label: 'Forte', color: 'bg-green-500', minScore: 3 },
  { label: 'Muito Forte', color: 'bg-green-500', minScore: 4 },
];

function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 6) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

export default function PasswordStrengthMeter({
  password,
  setIsValid = () => {},
}: { password: string; setIsValid: (valid: boolean) => void }) {
  const [strength, setStrength] = useState(strengthLevels[0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!password) {
      setStrength(strengthLevels[0]);
      setProgress(0);
      setIsValid(false);
      return;
    }

    const strengthScore = getPasswordStrength(password);
    const selectedStrength =
      strengthLevels.find((level) => strengthScore === level.minScore) ||
      strengthLevels[0];

    setStrength(selectedStrength);
    setProgress((strengthScore / 4) * 100);
    setIsValid(strengthScore >= 2);
  }, [password, setIsValid]);

  return (
    <div className="mt-2 space-y-2 transition-all duration-300">
      <div className="flex items-center justify-between text-sm font-medium">
        <span className={`px-2 py-1 rounded-md text-white ${strength.color}`}>
          {strength.label}
        </span>
        {progress >= 50 ? (
          <CheckCircle className="text-green-500" size={18} />
        ) : (
          <XCircle className="text-red-500" size={18} />
        )}
      </div>
      <Progress value={progress} className={`h-2 rounded-full ${strength.color}`} />
    </div>
  );
}
