import React from 'react';
import { InstitutionConfig, Student, DocumentDefinition } from '../../types';
import { BrasaoEscola } from '../BrasaoEscola';
import { WatermarkOverlay } from '../WatermarkOverlay';

interface CertificadoHonraProps {
  docDef: DocumentDefinition;
  institution: InstitutionConfig;
  student: Student;
  formData: Record<string, any>;
  protocolo: string;
  codigoAutenticidade: string;
  watermark?: string;
}

export const CertificadoHonraTemplate: React.FC<CertificadoHonraProps> = ({
  docDef,
  institution,
  student,
  formData,
  protocolo,
  codigoAutenticidade,
  watermark,
}) => {
  const isParticipacao = docDef.id === 'cert-participacao';

  return (
    <div className="relative sheet-a4 p-8 sm:p-12 flex flex-col justify-between text-slate-900 bg-white">
      {/* Moldura de Honra com friso duplo moderno */}
      <div className="absolute inset-4 sm:inset-6 border-2 border-blue-900 pointer-events-none z-0">
        <div className="absolute inset-1 border border-blue-600/40"></div>
      </div>

      <WatermarkOverlay text={watermark} />

      {/* Cabeçalho */}
      <div className="relative z-10 px-6 pt-4 text-center">
        {institution.mostrarBrasao && (
          <div className="flex justify-center mb-3">
            <BrasaoEscola tipo={institution.brasaoTipo || 'maranhao'} customUrl={institution.customLogoUrl} size={68} />
          </div>
        )}

        <p className="text-[10.5px] font-bold uppercase tracking-widest text-slate-800">
          {institution.orgaoSuperior}
        </p>
        <h3 className="text-base font-extrabold uppercase tracking-tight text-slate-950 mt-1 font-serif-doc">
          {institution.nomeEscola}
        </h3>

        {/* Título */}
        <div className="my-8">
          <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-widest text-blue-950 font-certificate">
            {isParticipacao ? 'CERTIFICADO DE PARTICIPAÇÃO' : (formData.tituloDestaque || 'CERTIFICADO DE HONRA AO MÉRITO')}
          </h1>
          <div className="w-24 h-0.5 bg-blue-900 mx-auto mt-2"></div>
        </div>

        {/* Corpo do texto */}
        <div className="text-justify font-serif-doc text-[13.5px] leading-relaxed text-slate-800 max-w-2xl mx-auto space-y-4">
          <p>
            A Direção e a Coordenação Pedagógica da <strong className="uppercase text-slate-950">{institution.nomeEscola}</strong> têm a honra de conferir este certificado ao(à) estudante:
          </p>

          <div className="text-center my-4 py-2 border-y border-blue-900/20">
            <span className="text-xl sm:text-2xl font-bold font-certificate uppercase text-blue-950">
              {student.nomeCompleto}
            </span>
          </div>

          {isParticipacao ? (
            <p>
              pela destacada participação e engajamento no(a) <strong>"{formData.nomeEvento || 'Semana Cultural'}"</strong>, 
              apresentando o trabalho intitulado <em>{formData.tituloProjeto || 'Projeto Pedagógico'}</em>, 
              com carga horária total de <strong className="font-mono-code">{formData.cargaHorariaTotal || '40 horas'}</strong>, 
              realizado no período {formData.periodoEvento || 'no presente ano letivo'}.
            </p>
          ) : (
            <p>
              {formData.motivoHomenagem || 'pelo brilhante rendimento acadêmico, liderança e exemplar postura ética demonstrados nas atividades escolares ao longo do ano letivo.'}
            </p>
          )}

          <p className="text-center text-xs text-slate-600 italic pt-2">
            "A educação é a arma mais poderosa que você pode usar para mudar o mundo."
          </p>
        </div>
      </div>

      {/* Assinaturas */}
      <div className="relative z-10 px-6 pb-4">
        <p className="text-center text-xs font-serif-doc mb-8 text-slate-800">
          {institution.cidade} - {institution.uf}, {formData.dataEvento || new Date().toLocaleDateString('pt-BR')}.
        </p>

        <div className="grid grid-cols-2 gap-8 text-center text-xs mb-8">
          <div className="flex flex-col items-center">
            <div className="w-52 border-b border-slate-900 mb-1.5 h-8"></div>
            <span className="font-bold uppercase text-[10px] text-slate-950">{institution.diretorNome}</span>
            <span className="text-[9px] text-slate-600">{institution.diretorCargo}</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-52 border-b border-slate-900 mb-1.5 h-8"></div>
            <span className="font-bold uppercase text-[10px] text-slate-950">{institution.secretarioNome}</span>
            <span className="text-[9px] text-slate-600">{institution.secretarioCargo}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[8.5px] font-mono-code text-slate-700">
          <span>REGISTRO PROTOCOLAR: <strong>{protocolo}</strong></span>
          <span>AUTENTICIDADE: <strong>{codigoAutenticidade}</strong></span>
        </div>
      </div>
    </div>
  );
};
