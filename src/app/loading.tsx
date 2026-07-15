export default function Loading() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background">
      <div className="absolute inset-0 grid-pattern opacity-[0.03]" />
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(ellipse at 50% 50%, var(--primary) 0%, transparent 50%)',
        opacity: 0.04,
      }} />
      <div className="relative flex flex-col items-center gap-6 animate-fade-in">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
            <svg className="w-8 h-8 text-white animate-spin-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L12 6M12 18L12 22M6 12L2 12M22 12L18 12" strokeLinecap="round" />
              <circle cx="12" cy="12" r="4" opacity="0.3" />
            </svg>
          </div>
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary to-accent opacity-20 blur-lg animate-pulse-glow" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-medium text-foreground tracking-wide">Loading</p>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
