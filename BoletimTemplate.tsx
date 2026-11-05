import React from 'react';
import { InstitutionConfig, Student, DocumentDefinition } from '../../types';
import { DocumentHeader } from '../DocumentHeader';
import { DocumentFooter } from '../DocumentFooter';
import { WatermarkOverlay } from '../WatermarkOverlay';

interface BoletimTemplateProps {
  docDef: DocumentDefinition;
  institution: InstitutionConfig;
  student: Student;
  formData: Record<string, any>;
  protocolo: string;
  codigoAutenticidade: string;
  watermark?: string;
}

export const BoletimTemplate: React.FC<BoletimTemplateProps> = ({
  institution,
  student,
  formData,
  protocolo,
  codigoAutenticidade,
  watermark,
}) => {
  const disciplinas = formData.disciplinas || [];

  return (
    <div className="relative sheet-a4 p-6 sm:p-10 flex flex-col justify-between text-slate-900 text-xs">
      <WatermarkOverlay text={watermark} />

      <div className="relative z-10">
        <DocumentHeader institution={institution} isCompact={true} />

        <div className="text-center my-3 border-y border-slate-900 py-1.5 bg-slate-100">
          <h2 className="text-base font-extrabold uppercase tracking-wider text-slate-950 font-serif-doc">
            BOLETIM ESCOLAR OFICIAL DE RENDIMENTO E FREQUÊNCIA
          </h2>
          <p className="text-[10px] font-mono-code text-slate-600 uppercase">
            ANO LETIVO: <strong>{formData.anoLetivo || student.anoLetivo}</strong> &nbsp;|&nbsp; 
            PERÍODO: <strong>{formData.periodoAtual || '2º Bimestre'}</strong> &nbsp;|&nbsp; 
            REGISTRO GDAE: <strong>{student.ra}</strong>
          </p>
        </div>

        {/* Dados do Estudante */}
        <div className="border border-slate-400 p-2.5 rounded-sm bg-white mb-3 text-[10.5px]">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-8">
              <span className="text-slate-500 uppercase text-[9px] block">Nome do Aluno:</span>
              <strong className="text-slate-950 uppercase text-xs">{student.nomeCompleto}</strong>
            </div>
            <div className="col-span-4">
              <span className="text-slate-500 uppercase text-[9px] block">Matrícula Escolar:</span>
              <span className="font-mono-code font-bold">{student.matricula}</span>
            </div>

            <div className="col-span-4">
              <span className="text-slate-500 uppercase text-[9px] block">Curso:</span>
              <span>{student.curso}</span>
            </div>
            <div className="col-span-4">
              <span className="text-slate-500 uppercase text-[9px] block">Série / Turma:</span>
              <span className="font-semibold">{student.anoSerie} - {student.turma}</span>
            </div>
            <div className="col-span-4">
              <span className="text-slate-500 uppercase text-[9px] block">Turno:</span>
              <span>{student.turno}</span>
            </div>
          </div>
        </div>

        {/* Tabela de 4 Bimestres */}
        <div className="overflow-x-auto mb-3">
          <table className="w-full border-collapse border border-slate-900 text-[10px]">
            <thead>
              <tr className="bg-slate-200 text-slate-900 font-bold uppercase text-center border-b border-slate-900">
                <th rowSpan={2} className="border border-slate-900 p-1 text-left w-48">Componente Curricular</th>
                <th colSpan={2} className="border border-slate-900 p-1 bg-slate-100">1º Bimestre</th>
                <th colSpan={2} className="border border-slate-900 p-1 bg-slate-100">2º Bimestre</th>
                <th colSpan={2} className="border border-slate-900 p-1 bg-slate-100">3º Bimestre</th>
                <th colSpan={2} className="border border-slate-900 p-1 bg-slate-100">4º Bimestre</th>
                <th rowSpan={2} className="border border-slate-900 p-1 w-14 bg-blue-50">Média Parcial</th>
                <th rowSpan={2} className="border border-slate-900 p-1 w-12">Total Faltas</th>
                <th rowSpan={2} className="border border-slate-900 p-1 w-16">Situação</th>
              </tr>
              <tr className="bg-slate-150 text-[9px] text-slate-700">
                <th className="border border-slate-900 p-0.5 w-10">Nota</th>
                <th className="border border-slate-900 p-0.5 w-8">F</th>
                <th className="border border-slate-900 p-0.5 w-10">Nota</th>
                <th className="border border-slate-900 p-0.5 w-8">F</th>
                <th className="border border-slate-900 p-0.5 w-10">Nota</th>
                <th className="border border-slate-900 p-0.5 w-8">F</th>
                <th className="border border-slate-900 p-0.5 w-10">Nota</th>
                <th className="border border-slate-900 p-0.5 w-8">F</th>
              </tr>
            </thead>
            <tbody>
              {disciplinas.map((disc: any, idx: number) => (
                <tr key={idx} className="hover:bg-slate-50 text-center">
                  <td className="border border-slate-400 px-2 py-1 text-left font-medium text-slate-900">
                    {disc.nome}
                  </td>
                  <td className="border border-slate-400 p-1 font-mono-code">{disc.b1}</td>
                  <td className="border border-slate-400 p-1 font-mono-code text-slate-500">{disc.f1}</td>
                  <td className="border border-slate-400 p-1 font-mono-code">{disc.b2}</td>
                  <td className="border border-slate-400 p-1 font-mono-code text-slate-500">{disc.f2}</td>
                  <td className="border border-slate-400 p-1 font-mono-code">{disc.b3}</td>
                  <td className="border border-slate-400 p-1 font-mono-code text-slate-500">{disc.f3}</td>
                  <td className="border border-slate-400 p-1 font-mono-code">{disc.b4}</td>
                  <td className="border border-slate-400 p-1 font-mono-code text-slate-500">{disc.f4}</td>
                  <td className="border border-slate-400 p-1 font-mono-code font-bold bg-blue-50/50 text-slate-950">{disc.media}</td>
                  <td className="border border-slate-400 p-1 font-mono-code text-slate-700">{disc.faltasTotal}</td>
                  <td className="border border-slate-400 p-1 text-[9px] font-semibold text-slate-800">{disc.situacao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Resumo de Frequência e Indicadores */}
        <div className="grid grid-cols-3 gap-3 border border-slate-400 p-2.5 rounded-sm bg-slate-50 text-center">
          <div>
            <span className="text-[9px] text-slate-500 uppercase font-semibold block">Média Geral do Período</span>
            <span className="text-base font-bold font-mono-code text-slate-950">{formData.mediaGlobal || '8.6'}</span>
          </div>
          <div>
            <span className="text-[9px] text-slate-500 uppercase font-semibold block">Total de Faltas Acumuladas</span>
            <span className="text-base font-bold font-mono-code text-amber-800">{formData.totalFaltasGeral || 9} faltas</span>
          </div>
          <div>
            <span className="text-[9px] text-slate-500 uppercase font-semibold block">Índice Geral de Assiduidade</span>
            <span className="text-base font-bold font-mono-code text-emerald-800">{formData.percentualGeralFrequencia || '97.2%'}</span>
          </div>
        </div>

        <p className="mt-2 text-[8.5px] text-slate-500 italic text-center">
          * Média mínima regimental para aprovação: 6,0 · Frequência mínima exigida por lei: 75% das aulas dadas.
        </p>
      </div>

      <div className="relative z-10">
        <DocumentFooter
          institution={institution}
          dataEmissao={formData.dataEmissao}
          protocolo={protocolo}
          codigoAutenticidade={codigoAutenticidade}
          includeResponsibleSignature={true}
          responsibleName={student.responsavelLegal || student.nomeMae}
          responsibleRole="Responsável Legal (Ciência do Rendimento)"
          mostrarCarimbo={institution.mostrarCarimbo}
          mostrarQrCode={institution.mostrarQrCode}
        />
      </div>
    </div>
  );
};
