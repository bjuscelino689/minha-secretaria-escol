import React from 'react';
import { InstitutionConfig, Student, DocumentDefinition } from '../../types';
import { DocumentHeader } from '../DocumentHeader';
import { DocumentFooter } from '../DocumentFooter';
import { WatermarkOverlay } from '../WatermarkOverlay';

interface HistoricoTemplateProps {
  docDef: DocumentDefinition;
  institution: InstitutionConfig;
  student: Student;
  formData: Record<string, any>;
  protocolo: string;
  codigoAutenticidade: string;
  watermark?: string;
}

export const HistoricoEscolarTemplate: React.FC<HistoricoTemplateProps> = ({
  institution,
  student,
  formData,
  protocolo,
  codigoAutenticidade,
  watermark,
}) => {
  const curricular = formData.baseCurricular || [];

  return (
    <div className="relative sheet-a4 p-6 sm:p-10 flex flex-col justify-between text-slate-900 text-xs">
      <WatermarkOverlay text={watermark} />

      <div className="relative z-10">
        <DocumentHeader institution={institution} isCompact={true} />

        <div className="text-center my-3 border-y border-slate-900 py-1 bg-slate-100">
          <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-slate-950 font-serif-doc">
            HISTÓRICO ESCOLAR OFICIAL DO {student.curso.toUpperCase()}
          </h2>
          <p className="text-[9px] font-mono-code text-slate-600 uppercase">
            LIVRO Nº <strong className="text-slate-900">{formData.numeroLivro || '48-B'}</strong> &nbsp;|&nbsp; 
            FOLHA Nº <strong className="text-slate-900">{formData.numeroFolha || '112'}</strong> &nbsp;|&nbsp; 
            REGISTRO Nº <strong className="text-slate-900">{formData.numeroRegistro || '1.492/2025'}</strong> &nbsp;|&nbsp;
            SISTEMA GDAE/PRODESP
          </p>
        </div>

        {/* Quadro de Identificação do Educando */}
        <div className="border border-slate-400 p-2.5 rounded-sm bg-white mb-3 text-[10.5px] leading-relaxed">
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-8">
              <span className="text-slate-500 uppercase text-[9px] block">Nome do Aluno(a):</span>
              <strong className="text-slate-950 uppercase text-xs">{student.nomeCompleto}</strong>
            </div>
            <div className="col-span-4">
              <span className="text-slate-500 uppercase text-[9px] block">Registro do Aluno (RA):</span>
              <span className="font-mono-code font-bold">{student.ra}</span>
            </div>

            <div className="col-span-3">
              <span className="text-slate-500 uppercase text-[9px] block">Data Nasc.:</span>
              <span className="font-mono-code">{student.dataNascimento.split('-').reverse().join('/')}</span>
            </div>
            <div className="col-span-3">
              <span className="text-slate-500 uppercase text-[9px] block">Naturalidade/UF:</span>
              <span>{student.naturalidade}</span>
            </div>
            <div className="col-span-3">
              <span className="text-slate-500 uppercase text-[9px] block">RG:</span>
              <span className="font-mono-code">{student.rg}</span>
            </div>
            <div className="col-span-3">
              <span className="text-slate-500 uppercase text-[9px] block">CPF:</span>
              <span className="font-mono-code">{student.cpf}</span>
            </div>

            <div className="col-span-6">
              <span className="text-slate-500 uppercase text-[9px] block">Filiação Materna:</span>
              <span>{student.nomeMae}</span>
            </div>
            <div className="col-span-6">
              <span className="text-slate-500 uppercase text-[9px] block">Filiação Paterna:</span>
              <span>{student.nomePai || 'Não Declarado'}</span>
            </div>
          </div>
        </div>

        {/* Matriz Curricular e Rendimento */}
        <div className="overflow-x-auto mb-3">
          <table className="w-full border-collapse border border-slate-900 text-[10px]">
            <thead>
              <tr className="bg-slate-200 text-slate-900 font-bold uppercase text-center border-b border-slate-900">
                <th className="border border-slate-900 p-1.5 text-left w-64">Componentes Curriculares (BNCC)</th>
                <th className="border border-slate-900 p-1 w-14">1ª Série</th>
                <th className="border border-slate-900 p-1 w-14">2ª Série</th>
                <th className="border border-slate-900 p-1 w-14">3ª Série</th>
                <th className="border border-slate-900 p-1 w-16">C.H. Anual</th>
                <th className="border border-slate-900 p-1 w-20">Situação</th>
              </tr>
            </thead>
            <tbody>
              {curricular.map((disc: any, index: number) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="border border-slate-400 px-2 py-1 font-medium text-slate-900">
                    {disc.disciplina}
                  </td>
                  <td className="border border-slate-400 p-1 text-center font-mono-code">{disc.nota1 || '-'}</td>
                  <td className="border border-slate-400 p-1 text-center font-mono-code">{disc.nota2 || '-'}</td>
                  <td className="border border-slate-400 p-1 text-center font-mono-code font-bold text-slate-950">{disc.nota3 || '-'}</td>
                  <td className="border border-slate-400 p-1 text-center font-mono-code text-slate-600">{disc.ch || '80h'}</td>
                  <td className="border border-slate-400 p-1 text-center text-[9px] font-semibold text-emerald-800">
                    {disc.situacao || 'Aprovado'}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 font-bold text-slate-900 text-center border-t-2 border-slate-900">
                <td className="border border-slate-900 p-1.5 text-left">TOTAL DE DIAS LETIVOS E CARGA HORÁRIA</td>
                <td className="border border-slate-900 p-1 font-mono-code">200 d</td>
                <td className="border border-slate-900 p-1 font-mono-code">200 d</td>
                <td className="border border-slate-900 p-1 font-mono-code">200 d</td>
                <td className="border border-slate-900 p-1 font-mono-code">{formData.totalCargaHoraria || '1.000h'}</td>
                <td className="border border-slate-900 p-1 text-emerald-900 font-bold">CONCLUÍDO</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Parecer de Conclusão e Fundamentação */}
        <div className="border border-slate-400 p-2.5 rounded-sm bg-slate-50 text-[10px] space-y-1">
          <p>
            <strong>CERTIFICADO DE CONCLUSÃO:</strong> Certificamos que o(a) aluno(a) acima qualificado(a) <strong>CONCLUIU</strong> os estudos do <strong>{student.curso}</strong> no Ano Letivo de <strong>{formData.anoLetivoReferencia || 2025}</strong>, de acordo com o Art. 24 da Lei Federal nº 9.394/1996 e Regimento Escolar Homologado, estando apto(a) a prosseguir seus estudos em nível superior.
          </p>
          <p className="text-slate-600 italic text-[9px]">
            {formData.resultadoFinalGeral || 'Escala de Avaliação de 0,0 a 10,0, sendo 5,0 a média mínima regimental para aprovação.'}
          </p>
        </div>
      </div>

      <div className="relative z-10">
        <DocumentFooter
          institution={institution}
          dataEmissao={formData.dataEmissao}
          protocolo={protocolo}
          codigoAutenticidade={codigoAutenticidade}
          mostrarCarimbo={institution.mostrarCarimbo}
          mostrarQrCode={institution.mostrarQrCode}
        />
      </div>
    </div>
  );
};
