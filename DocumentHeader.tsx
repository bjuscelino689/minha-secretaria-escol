import React from 'react';
import { InstitutionConfig } from '../types';
import { BrasaoEscola } from './BrasaoEscola';

interface DocumentHeaderProps {
  institution: InstitutionConfig;
  className?: string;
  isCompact?: boolean;
}

export const DocumentHeader: React.FC<DocumentHeaderProps> = ({
  institution,
  className = '',
  isCompact = false,
}) => {
  const mostrarBrasao = Boolean(institution.mostrarBrasao);
  const posicao = institution.brasaoPosicao || 'esquerda';
  const brasaoSize = isCompact ? 50 : 66;

  // Renderizador do Brasão Único (nunca renderiza mais de um)
  const renderBrasao = () => (
    <div className="shrink-0 flex items-center justify-center">
      <BrasaoEscola
        tipo={institution.brasaoTipo || 'maranhao'}
        customUrl={institution.customLogoUrl}
        size={brasaoSize}
      />
    </div>
  );

  return (
    <div className={`w-full border-b-2 border-slate-900 pb-3 mb-6 text-center select-none ${className}`}>
      {/* Opção Centro: Brasão único posicionado no topo centralizado */}
      {mostrarBrasao && posicao === 'centro' && (
        <div className="flex justify-center mb-2">
          {renderBrasao()}
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        {/* Brasão Único do Lado Esquerdo (Padrão Oficial) */}
        {mostrarBrasao && posicao === 'esquerda' && renderBrasao()}

        {/* Espaçador invisível à esquerda quando o brasão estiver à direita (mantém centralização perfeita) */}
        {mostrarBrasao && posicao === 'direita' && (
          <div
            style={{ width: `${brasaoSize}px`, minWidth: `${brasaoSize}px` }}
            className="shrink-0 pointer-events-none opacity-0 invisible hidden sm:block"
            aria-hidden="true"
          />
        )}

        {/* Textos Institucionais Centrais */}
        <div className="flex-1 text-center">
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-800">
            {institution.orgaoSuperior}
          </p>
          {institution.subOrgao && (
            <p className="text-[9px] sm:text-[9.5px] uppercase tracking-wide text-slate-600 font-medium">
              {institution.subOrgao}
            </p>
          )}
          <h1 className="text-sm sm:text-base font-extrabold uppercase tracking-tight text-slate-950 mt-0.5">
            {institution.nomeEscola}
          </h1>
          <p className="text-[8.5px] sm:text-[9px] text-slate-600 font-mono-code mt-0.5">
            CÓDIGO INEP/MEC: <strong className="text-slate-900">{institution.codigoInep}</strong> &nbsp;·&nbsp; CNPJ: <strong className="text-slate-900">{institution.cnpj}</strong>
          </p>
          <p className="text-[8px] sm:text-[8.5px] text-slate-500 italic mt-0.5 leading-tight">
            {institution.atoCriacao}
          </p>
        </div>

        {/* Brasão Único do Lado Direito */}
        {mostrarBrasao && posicao === 'direita' && renderBrasao()}

        {/* Espaçador invisível à direita quando o brasão estiver à esquerda (mantém centralização perfeita) */}
        {mostrarBrasao && posicao === 'esquerda' && (
          <div
            style={{ width: `${brasaoSize}px`, minWidth: `${brasaoSize}px` }}
            className="shrink-0 pointer-events-none opacity-0 invisible hidden sm:block"
            aria-hidden="true"
          />
        )}
      </div>

      <div className="mt-2 pt-1 border-t border-slate-300 flex items-center justify-between text-[8px] sm:text-[8.5px] text-slate-600">
        <span>{institution.endereco} · {institution.bairro} · {institution.cidade}/{institution.uf} · CEP {institution.cep}</span>
        <span className="font-mono-code font-medium">Tel: {institution.telefone} · {institution.email}</span>
      </div>
    </div>
  );
};
