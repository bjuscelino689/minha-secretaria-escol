import React from 'react';

interface WatermarkOverlayProps {
  text?: string;
  variant?: 'default' | 'certificate';
}

export const WatermarkOverlay: React.FC<WatermarkOverlayProps> = ({
  text,
  variant = 'default',
}) => {
  if (!text || text.trim() === '' || text.toUpperCase() === 'NENHUMA') {
    return null;
  }

  const cleanText = text.trim();
  const len = cleanText.length;

  // Ajusta o tamanho da fonte dinamicamente conforme o comprimento do nome/texto digitado
  let fontSizeClass = 'text-5xl sm:text-7xl tracking-widest';
  if (len > 35) {
    fontSizeClass = 'text-xl sm:text-2xl tracking-normal';
  } else if (len > 22) {
    fontSizeClass = 'text-2xl sm:text-3xl tracking-wide';
  } else if (len > 14) {
    fontSizeClass = 'text-3xl sm:text-5xl tracking-wider';
  }

  const colorClass =
    variant === 'certificate'
      ? 'text-amber-950/[0.06] border-amber-950/[0.06]'
      : 'text-slate-950/[0.06] border-slate-950/[0.06]';

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="rotate-[-32deg] max-w-[92%] flex flex-col items-center justify-center text-center p-4">
        {/* Faixa ou carimbo estilizado com borda pontilhada suave para dar ar de segurança documental */}
        <div
          className={`border-4 sm:border-6 border-dashed rounded-2xl py-3 px-6 sm:py-5 sm:px-10 flex flex-col items-center justify-center ${colorClass}`}
        >
          <span
            className={`font-black uppercase text-center break-words leading-tight ${fontSizeClass}`}
            style={{
              wordBreak: 'break-word',
              maxWidth: '100%',
            }}
          >
            {cleanText}
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono-code font-bold uppercase tracking-widest mt-1 opacity-70">
            AUTENTICAÇÃO DOCUMENTAL · MARCA D'ÁGUA
          </span>
        </div>
      </div>
    </div>
  );
};
