import React from 'react';
import { InstitutionConfig } from '../types';

interface DocumentFooterProps {
  institution: InstitutionConfig;
  dataEmissao?: string;
  protocolo?: string;
  codigoAutenticidade?: string;
  includeResponsibleSignature?: boolean;
  responsibleName?: string;
  responsibleRole?: string;
  includeStudentSignature?: boolean;
  studentName?: string;
  observacoesRodape?: string;
  mostrarCarimbo?: boolean;
  mostrarQrCode?: boolean;
}

export const DocumentFooter: React.FC<DocumentFooterProps> = ({
  institution,
  dataEmissao,
  protocolo = 'MSE-2026/0481',
  codigoAutenticidade = 'F94B-8812-C034-7719',
  includeResponsibleSignature = false,
  responsibleName = '',
  responsibleRole = 'Responsável Legal',
  includeStudentSignature = false,
  studentName = '',
  observacoesRodape,
}) => {
  // Data por extenso em Português
  const formatarDataPorExtenso = (dataStr?: string) => {
    const d = dataStr ? new Date(dataStr + 'T12:00:00') : new Date();
    const meses = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    return `${institution.cidade} - ${institution.uf}, ${d.getDate()} de ${meses[d.getMonth()]} de ${d.getFullYear()}.`;
  };

  return (
    <div className="w-full mt-8 pt-4 break-inside-avoid text-slate-800">
      {/* Local e Data */}
      <div className="text-right text-xs font-serif-doc mb-8">
        <p>{formatarDataPorExtenso(dataEmissao)}</p>
      </div>

      {/* Bloco de Assinaturas */}
      <div className="grid grid-cols-2 gap-8 text-center text-xs mt-6 mb-8">
        {/* Assinatura Secretário(a) */}
        <div className="flex flex-col items-center">
          <div className="w-48 sm:w-60 border-b border-slate-900 mb-1.5 h-10 flex items-end justify-center">
          </div>
          <span className="font-bold text-slate-950 uppercase text-[11px]">
            {institution.secretarioNome}
          </span>
          <span className="text-[10px] text-slate-600">
            {institution.secretarioCargo}
          </span>
        </div>

        {/* Assinatura Diretor(a) */}
        <div className="flex flex-col items-center">
          <div className="w-48 sm:w-60 border-b border-slate-900 mb-1.5 h-10 flex items-end justify-center">
          </div>
          <span className="font-bold text-slate-950 uppercase text-[11px]">
            {institution.diretorNome}
          </span>
          <span className="text-[10px] text-slate-600">
            {institution.diretorCargo}
          </span>
        </div>
      </div>

      {/* Assinatura Adicional de Responsável ou Aluno se solicitado */}
      {(includeResponsibleSignature || includeStudentSignature) && (
        <div className="grid grid-cols-2 gap-8 text-center text-xs mb-8">
          {includeResponsibleSignature && (
            <div className="flex flex-col items-center">
              <div className="w-48 sm:w-60 border-b border-slate-900 mb-1.5 h-8"></div>
              <span className="font-bold text-slate-950 text-[11px]">
                {responsibleName || 'Assinatura do Responsável'}
              </span>
              <span className="text-[10px] text-slate-600">{responsibleRole}</span>
            </div>
          )}
          {includeStudentSignature && (
            <div className="flex flex-col items-center">
              <div className="w-48 sm:w-60 border-b border-slate-900 mb-1.5 h-8"></div>
              <span className="font-bold text-slate-950 text-[11px]">
                {studentName || 'Assinatura do Aluno'}
              </span>
              <span className="text-[10px] text-slate-600">Estudante</span>
            </div>
          )}
        </div>
      )}

      {/* Rodapé Oficial (sem carimbos e sem QR Code) */}
      <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between text-[8.5px] font-mono-code text-slate-600">
        <div>
          <span>PROTOCOLO: <strong className="text-slate-900">{protocolo}</strong></span>
          <span className="mx-2 text-slate-300">|</span>
          <span>AUTENTICIDADE: <strong className="text-slate-900">{codigoAutenticidade}</strong></span>
        </div>
        <span className="text-[8px] text-slate-400">Documento Oficial Expedido Eletronicamente</span>
      </div>

      {observacoesRodape && (
        <p className="mt-2 text-[8px] text-slate-500 italic text-center">
          {observacoesRodape}
        </p>
      )}
    </div>
  );
};
