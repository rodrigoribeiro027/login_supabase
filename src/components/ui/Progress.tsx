export function Progress({ value, className = "" }: { value: number; className?: string }) {
    return (
      <div className={`relative w-full bg-gray-200 rounded ${className}`}>
        <div
          className="h-2 rounded"
          style={{ width: `${value}%`, backgroundColor: className.includes('bg-') ? undefined : 'blue' }}
        ></div>
      </div>
    );
  }
  