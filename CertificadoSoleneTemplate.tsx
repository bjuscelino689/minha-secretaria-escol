import React from 'react';
import { InstitutionConfig, Student, DocumentDefinition } from '../../types';
import { BrasaoEscola } from '../BrasaoEscola';
import { WatermarkOverlay } from '../WatermarkOverlay';

interface CertificadoSoleneProps {
  docDef: DocumentDefinition;
  institution: InstitutionConfig;
  student: Student;
  formData: Record<string, any>;
  protocolo: string;
  codigoAutenticidade: string;
  watermark?: string;
}

export const CertificadoSoleneTemplate: React.FC<CertificadoSoleneProps> = ({
  institution,
  student,
  formData,
  protocolo,
  codigoAutenticidade,
  watermark,
}) => {
  return (
    <div className="relative sheet-a4 p-8 sm:p-12 flex flex-col justify-between text-slate-900 bg-[#fdfcf7]">
      {/* Moldura Solene Clássica com Linhas Duplas e Cantos Ornamentais */}
      <div className="absolute inset-4 sm:inset-6 border-4 border-amber-800/80 pointer-events-none z-0">
        <div className="absolute inset-1.5 border border-amber-900/40"></div>
        {/* Cantos estilizados */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-amber-900 -translate-x-1 -translate-y-1"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-amber-900 translate-x-1 -translate-y-1"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-amber-900 -translate-x-1 translate-y-1"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-amber-900 translate-x-1 translate-y-1"></div>
      </div>

      <WatermarkOverlay text={watermark} variant="certificate" />

      {/* Conteúdo Central */}
      <div className="relative z-10 px-4 sm:px-8 pt-4 text-center">
        {/* Brasão Oficial SEDUC-MA (se ativado pelo usuário) */}
        {institution.mostrarBrasao && (
          <div className="flex justify-center mb-3">
            <BrasaoEscola tipo={institution.brasaoTipo || 'maranhao'} customUrl={institution.customLogoUrl} size={72} />
          </div>
        )}

        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-800 font-certificate">
          {institution.orgaoSuperior}
        </p>
        <p className="text-[9.5px] uppercase tracking-wide text-slate-600 font-medium">
          {institution.subOrgao}
        </p>
        <h3 className="text-sm font-extrabold uppercase tracking-tight text-slate-950 mt-1 font-certificate">
          {institution.nomeEscola}
        </h3>
        <p className="text-[8.5px] text-slate-500 italic mt-0.5">
          {institution.atoCriacao} &nbsp;·&nbsp; INEP: {institution.codigoInep}
        </p>

        {/* Título Solene */}
        <div className="my-8">
          <h1 className="text-3xl sm:text-4xl font-bold uppercase tracking-widest text-amber-950 font-certificate drop-shadow-2xs">
            CERTIFICADO
          </h1>
          <p className="text-xs uppercase tracking-widest text-amber-900/80 font-certificate font-semibold mt-1">
            DE CONCLUSÃO DA EDUCAÇÃO BÁSICA
          </p>
        </div>

        {/* Texto do Certificado */}
        <div className="text-justify font-serif-doc text-[13px] sm:text-[14px] leading-loose text-slate-900 max-w-2xl mx-auto space-y-4">
          <p>
            O Diretor da <strong className="font-bold text-slate-950 uppercase">{institution.nomeEscola}</strong>, 
            no uso de suas atribuições legais e nos termos da Lei de Diretrizes e Bases da Educação Nacional (Lei Federal nº 9.394/1996), 
            confere o presente <strong>CERTIFICADO DE CONCLUSÃO</strong> a:
          </p>

          <div className="text-center my-4 py-2 border-y border-amber-900/30">
            <span className="text-xl sm:text-2xl font-bold font-certificate uppercase text-slate-950 tracking-wider">
              {student.nomeCompleto}
            </span>
          </div>

          <p>
            nascido(a) aos <strong className="font-mono-code">{student.dataNascimento.split('-').reverse().join('/')}</strong>, 
            natural de <strong>{student.naturalidade}</strong>, 
            nacionalidade <strong>{student.nacionalidade}</strong>, 
            portador(a) do RG nº <span className="font-mono-code font-bold">{student.rg}</span> e CPF nº <span className="font-mono-code font-bold">{student.cpf}</span>, 
            Registro do Aluno (RA) nº <span className="font-mono-code font-bold">{student.ra}</span>, 
            por haver concluído no Ano Letivo de <strong className="font-mono-code">{formData.anoConclusao || 2025}</strong> os estudos correspondentes ao{' '}
            <strong className="text-slate-950 uppercase">{formData.cursoConcluido || student.curso}</strong>, 
            fazendo jus às prerrogativas conferidas pela legislação educacional brasileira.
          </p>
        </div>
      </div>

      {/* Bloco de Assinaturas e Registro de Chancela */}
      <div className="relative z-10 px-4 sm:px-8 pb-4">
        {/* Local e Data */}
        <p className="text-center text-xs font-serif-doc mb-8 text-slate-800">
          {institution.cidade} - {institution.uf}, {formData.dataColacao || '18 de Dezembro de 2025'}.
        </p>

        {/* Assinaturas */}
        <div className="grid grid-cols-3 gap-6 text-center text-xs mb-8">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-[170px] border-b border-slate-900 mb-1.5 h-8"></div>
            <span className="font-bold uppercase text-[10px] text-slate-950">{student.nomeCompleto}</span>
            <span className="text-[9px] text-slate-600">Diplomado(a)</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-full max-w-[170px] border-b border-slate-900 mb-1.5 h-8"></div>
            <span className="font-bold uppercase text-[10px] text-slate-950">{institution.secretarioNome}</span>
            <span className="text-[9px] text-slate-600">{institution.secretarioCargo}</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-full max-w-[170px] border-b border-slate-900 mb-1.5 h-8"></div>
            <span className="font-bold uppercase text-[10px] text-slate-950">{institution.diretorNome}</span>
            <span className="text-[9px] text-slate-600">{institution.diretorCargo}</span>
          </div>
        </div>

        {/* Livro de Registro e Autenticação */}
        <div className="pt-3 border-t border-amber-900/30 flex items-center justify-between text-[8.5px] font-mono-code text-slate-700">
          <div>
            <span>REGISTRO: <strong>{formData.livroRegistro || 'Livro 14'}</strong> &nbsp;|&nbsp; </span>
            <span>FOLHA: <strong>{formData.folhaRegistro || '88'}</strong> &nbsp;|&nbsp; </span>
            <span>TERMO: <strong>{formData.termoRegistro || 'Nº 1.209'}</strong></span>
          </div>
          <div>
            <span>PROTOCOLO: <strong>{protocolo}</strong></span>
            <span className="mx-2 text-slate-400">|</span>
            <span>AUTENTICIDADE: <strong>{codigoAutenticidade}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
