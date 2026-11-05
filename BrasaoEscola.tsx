import React from 'react';

interface BrasaoProps {
  tipo?: 'maranhao' | 'custom' | 'nenhum' | 'brasil' | 'educacao' | 'estadual' | 'monograma';
  customUrl?: string;
  className?: string;
  size?: number;
}

export const BrasaoEscola: React.FC<BrasaoProps> = ({
  tipo = 'maranhao',
  customUrl,
  className = '',
  size = 64,
}) => {
  if (tipo === 'nenhum') {
    return null;
  }

  if (tipo === 'custom' && customUrl) {
    return (
      <img
        src={customUrl}
        alt="Brasão da Instituição"
        className={`object-contain ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  // BRASÃO OFICIAL DA SECRETARIA DE ESTADO DA EDUCAÇÃO DO MARANHÃO (SEDUC - MA)
  // Contém: Sol nascente dourado, Escudo com a Estrela de Prata (Beta Scorpii) sobre campo azul,
  // faixas heráldicas diagonais em vermelho, branco e preto, e ramos de louro cívicos.
  return (
    <svg
      viewBox="0 0 120 120"
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Brasão Oficial - Secretaria de Estado da Educação do Maranhão (SEDUC-MA)</title>
      <defs>
        {/* Gradiente Solar */}
        <radialGradient id="solMaranhao" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="70%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#CA8A04" />
        </radialGradient>
        {/* Gradiente Azul Celeste */}
        <linearGradient id="azulMaranhao" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
        {/* Gradiente Dourado da Borda */}
        <linearGradient id="ouroBorda" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
      </defs>

      {/* Resplendor e Raios Solares do Topo (Sol Nascente) */}
      <g stroke="#EAB308" strokeWidth="1.5" strokeLinecap="round">
        <line x1="60" y1="12" x2="60" y2="4" />
        <line x1="48" y1="15" x2="42" y2="8" />
        <line x1="72" y1="15" x2="78" y2="8" />
        <line x1="38" y1="21" x2="30" y2="16" />
        <line x1="82" y1="21" x2="90" y2="16" />
        <line x1="30" y1="30" x2="22" y2="27" />
        <line x1="90" y1="30" x2="98" y2="27" />
      </g>
      {/* Meio Sol Dourado */}
      <path
        d="M 46 22 A 14 14 0 0 1 74 22 Z"
        fill="url(#solMaranhao)"
        stroke="#B45309"
        strokeWidth="1"
      />

      {/* Ramos Laterais de Louro (Verde e Dourado) */}
      <g stroke="#15803D" fill="none" strokeWidth="1.6" strokeLinecap="round">
        {/* Ramo Esquerdo */}
        <path d="M 60 106 C 24 104 12 78 18 42 C 20 34 25 26 34 22" />
        {/* Folhas Esquerdas */}
        <path d="M 22 40 Q 14 36 18 48" fill="#16A34A" stroke="#15803D" strokeWidth="0.8" />
        <path d="M 18 56 Q 10 54 16 64" fill="#16A34A" stroke="#15803D" strokeWidth="0.8" />
        <path d="M 20 72 Q 14 74 22 82" fill="#16A34A" stroke="#15803D" strokeWidth="0.8" />
        <path d="M 28 88 Q 24 94 36 96" fill="#16A34A" stroke="#15803D" strokeWidth="0.8" />

        {/* Ramo Direito */}
        <path d="M 60 106 C 96 104 108 78 102 42 C 100 34 95 26 86 22" />
        {/* Folhas Direitas */}
        <path d="M 98 40 Q 106 36 102 48" fill="#16A34A" stroke="#15803D" strokeWidth="0.8" />
        <path d="M 102 56 Q 110 54 104 64" fill="#16A34A" stroke="#15803D" strokeWidth="0.8" />
        <path d="M 100 72 Q 106 74 98 82" fill="#16A34A" stroke="#15803D" strokeWidth="0.8" />
        <path d="M 92 88 Q 96 94 84 96" fill="#16A34A" stroke="#15803D" strokeWidth="0.8" />
      </g>

      {/* Borda Externa Dourada do Escudo Central */}
      <circle cx="60" cy="60" r="37" fill="#FFFFFF" stroke="url(#ouroBorda)" strokeWidth="3" />
      <circle cx="60" cy="60" r="34.5" fill="none" stroke="#0F172A" strokeWidth="0.8" />

      {/* Faixa Circular com o Texto Oficial SEDUC - MARANHÃO */}
      <circle cx="60" cy="60" r="33" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="0.5" />
      
      {/* Escudo Interno Heráldico do Maranhão */}
      <g clipPath="url(#clipEscudoInterno)">
        <clipPath id="clipEscudoInterno">
          <circle cx="60" cy="60" r="28" />
        </clipPath>

        {/* Parte Superior: Céu Azul do Maranhão */}
        <rect x="30" y="30" width="60" height="28" fill="url(#azulMaranhao)" />

        {/* Estrela de Prata de 5 Pontas (Graffias / Maranhão) */}
        <polygon
          points="60,34 62.5,41.5 70,41.5 64,46 66,53.5 60,49 54,53.5 56,46 50,41.5 57.5,41.5"
          fill="#FFFFFF"
          stroke="#E0F2FE"
          strokeWidth="0.5"
        />

        {/* Linha Divisória de Ouro */}
        <line x1="30" y1="58" x2="90" y2="58" stroke="#CA8A04" strokeWidth="1.2" />

        {/* Parte Inferior: Faixas Diagonais Tradicionais (Vermelho, Branco e Preto) */}
        <rect x="30" y="58" width="60" height="32" fill="#DC2626" />
        
        {/* Faixa Branca Central Inclinada */}
        <polygon points="30,68 90,58 90,66 30,76" fill="#FFFFFF" />
        {/* Faixa Preta Central Inclinada */}
        <polygon points="30,76 90,66 90,74 30,84" fill="#0F172A" />
        {/* Faixa Branca Inferior */}
        <polygon points="30,84 90,74 90,80 30,90" fill="#FFFFFF" />
      </g>

      {/* Borda do Escudo Interno */}
      <circle cx="60" cy="60" r="28" fill="none" stroke="#0F172A" strokeWidth="1.2" />

      {/* Faixa Dourada com Inscrição na Base */}
      <g>
        {/* Laço e Dobras da Faixa */}
        <path
          d="M 28 100 Q 60 108 92 100 L 94 107 Q 60 115 26 107 Z"
          fill="url(#ouroBorda)"
          stroke="#78350F"
          strokeWidth="0.8"
        />
        {/* Pontas dobradas do laço */}
        <polygon points="26,107 20,103 22,111 28,109" fill="#B45309" />
        <polygon points="94,107 100,103 98,111 92,109" fill="#B45309" />
        {/* Texto da Faixa */}
        <text
          x="60"
          y="106"
          textAnchor="middle"
          fontSize="4.5"
          fontFamily="sans-serif"
          fontWeight="900"
          fill="#FFFFFF"
          letterSpacing="0.6"
        >
          SEDUC · MARANHÃO
        </text>
      </g>
    </svg>
  );
};

export const CarimboSecretaria: React.FC<{
  textoPrincipal?: string;
  subtexto?: string;
  data?: string;
  responsavel?: string;
  className?: string;
}> = ({
  textoPrincipal = 'SECRETARIA ESCOLAR',
  subtexto = 'CONFERE COM O ORIGINAL',
  data = new Date().toLocaleDateString('pt-BR'),
  responsavel = 'VISTO DO SECRETÁRIO',
  className = '',
}) => {
  return (
    <div
      className={`inline-flex flex-col items-center justify-center p-2.5 border-2 border-dashed border-blue-900/70 text-blue-900/80 rounded rotate-[-2deg] select-none uppercase tracking-wider text-center ${className}`}
      style={{ minWidth: '170px' }}
    >
      <span className="text-[10px] font-extrabold tracking-widest">{textoPrincipal}</span>
      <div className="w-full h-[1px] bg-blue-900/40 my-1"></div>
      <span className="text-[9px] font-bold">{subtexto}</span>
      <span className="text-[8px] font-mono-code font-semibold mt-0.5">{data}</span>
      <span className="text-[7px] text-blue-900/70 mt-1 italic">{responsavel}</span>
    </div>
  );
};

export const QrCodeAutenticidade: React.FC<{
  codigo: string;
  protocolo: string;
  className?: string;
}> = ({ codigo, protocolo, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 text-slate-700 ${className}`}>
      {/* SVG simulando visualmente QR Code seguro de validação */}
      <div className="p-1 border border-slate-300 bg-white rounded shadow-2xs shrink-0">
        <svg viewBox="0 0 29 29" width="46" height="46" className="fill-slate-900">
          {/* Marcador Canto Sup Esq */}
          <rect x="0" y="0" width="7" height="7" fill="black" />
          <rect x="1" y="1" width="5" height="5" fill="white" />
          <rect x="2" y="2" width="3" height="3" fill="black" />
          {/* Marcador Canto Sup Dir */}
          <rect x="22" y="0" width="7" height="7" fill="black" />
          <rect x="23" y="1" width="5" height="5" fill="white" />
          <rect x="24" y="2" width="3" height="3" fill="black" />
          {/* Marcador Canto Inf Esq */}
          <rect x="0" y="22" width="7" height="7" fill="black" />
          <rect x="1" y="23" width="5" height="5" fill="white" />
          <rect x="2" y="24" width="3" height="3" fill="black" />
          {/* Padrão interno determinístico */}
          <rect x="9" y="2" width="2" height="2" />
          <rect x="13" y="1" width="2" height="2" />
          <rect x="17" y="3" width="2" height="2" />
          <rect x="9" y="8" width="1" height="5" />
          <rect x="12" y="9" width="3" height="2" />
          <rect x="16" y="8" width="2" height="4" />
          <rect x="19" y="10" width="3" height="2" />
          <rect x="10" y="15" width="4" height="2" />
          <rect x="15" y="14" width="3" height="3" />
          <rect x="2" y="10" width="3" height="2" />
          <rect x="4" y="15" width="2" height="4" />
          <rect x="10" y="20" width="2" height="4" />
          <rect x="14" y="22" width="4" height="2" />
          <rect x="20" y="16" width="3" height="4" />
          <rect x="24" y="22" width="2" height="3" />
          <rect x="22" y="13" width="2" height="2" />
        </svg>
      </div>
      <div className="flex flex-col text-[8.5px] leading-tight text-slate-600 font-mono-code">
        <span className="font-bold text-slate-800">AUTENTICAÇÃO DIGITAL</span>
        <span>PROT: <strong className="text-slate-900">{protocolo}</strong></span>
        <span>CHAVE: <strong className="text-slate-900">{codigo}</strong></span>
        <span className="text-[7.5px] text-slate-500">Valide em: secretaria.gov.br/valida</span>
      </div>
    </div>
  );
};
