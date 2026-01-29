interface StatusStage {
  id: number;
  label: string;
  status: 'completed' | 'active' | 'pending';
}

interface StatusTimelineProps {
  orientation?: 'horizontal' | 'vertical';
}

export function StatusTimeline({ orientation = 'horizontal' }: StatusTimelineProps) {
  const stages: StatusStage[] = [
    { id: 1, label: 'ЗАКАЗ ПРИНЯТ', status: 'completed' },
    { id: 2, label: 'ГОТОВИТСЯ', status: 'completed' },
    { id: 3, label: 'В ПУТИ', status: 'active' },
    { id: 4, label: 'ДОСТАВЛЕН', status: 'pending' },
  ];

  if (orientation === 'vertical') {
    return (
      <div className="flex flex-col gap-6">
        {stages.map((stage, index) => (
          <div key={stage.id} className="flex items-start gap-4">
            {/* Circle indicator */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  stage.status === 'active'
                    ? 'bg-white border-2 border-[#7922e8] shadow-[0px_0px_8px_rgba(121,34,232,0.3)]'
                    : stage.status === 'completed'
                    ? 'bg-[#00af54] shadow-sm'
                    : 'bg-[#d9d9d9] opacity-40'
                }`}
              >
                {stage.status === 'completed' && (
                  <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {stage.status === 'active' && (
                  <div className="w-4 h-4 rounded-full bg-[#7922e8] animate-pulse" />
                )}
              </div>
              {/* Connecting line */}
              {index < stages.length - 1 && (
                <div className={`mt-1 w-0.5 h-12 ${stage.status === 'completed' ? 'bg-[#00af54]' : 'bg-[#d9d9d9]'}`} />
              )}
            </div>
            {/* Label */}
            <div className="pt-2">
              <p
                className={`uppercase tracking-wide text-sm ${
                  stage.status === 'pending' ? 'opacity-40' : ''
                } ${stage.status === 'active' ? 'font-bold' : ''}`}
                style={{ fontFamily: 'var(--font-stratos)' }}
              >
                {stage.label}
              </p>
              {stage.status === 'active' && (
                <p className="text-sm text-[#686868] mt-1">Курьер забрал заказ и едет к вам</p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between px-4 py-6">
      {stages.map((stage, index) => (
        <div key={stage.id} className="flex flex-col items-center flex-1 relative">
          {/* Connecting line */}
          {index < stages.length - 1 && (
            <div className="absolute top-5 left-1/2 w-full h-0.5 bg-[#d9d9d9]" />
          )}
          
          {/* Circle indicator */}
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-all ${
              stage.status === 'active'
                ? 'bg-white border-2 border-[#7922e8]'
                : stage.status === 'completed'
                ? 'bg-[#00af54]'
                : 'bg-[#d9d9d9] opacity-40'
            }`}
          >
            {stage.status === 'completed' && (
              <svg className="w-5 h-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {stage.status === 'active' && (
              <div className="w-4 h-4 rounded-full bg-[#7922e8]" />
            )}
          </div>
          
          {/* Label */}
          <p
            className={`text-xs mt-2 text-center uppercase tracking-wide ${
              stage.status === 'pending' ? 'opacity-40' : ''
            }`}
            style={{ fontFamily: 'var(--font-stratos)' }}
          >
            {stage.label}
          </p>
        </div>
      ))}
    </div>
  );
}