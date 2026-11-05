import React from 'react';
import { InstitutionConfig, Student, DocumentDefinition } from '../../types';
import { DocumentHeader } from '../DocumentHeader';
import { WatermarkOverlay } from '../WatermarkOverlay';
import { BookOpen, CheckCircle, ShieldCheck } from 'lucide-react';

interface DiarioClasseTemplateProps {
  docDef: DocumentDefinition;
  institution: InstitutionConfig;
  student: Student;
  formData: Record<string, any>;
  protocolo: string;
  codigoAutenticidade: string;
  watermark?: string;
}

export const DiarioClasseTemplate: React.FC<DiarioClasseTemplateProps> = ({
  institution,
  student,
  formData,
  protocolo,
  codigoAutenticidade,
  watermark,
}) => {
  const professorNome = formData.professorNome || 'Prof. Marcos Vinicius Alencar Rodrigues';
  const professorMatricula = formData.professorMatricula || 'SEDUC-MA 394.102-1';
  const disciplina = formData.disciplina || 'Língua Portuguesa e Literatura';
  const anoLetivo = formData.anoLetivo || student.anoLetivo || 2026;
  const bimestre = formData.bimestre || '1º Bimestre';
  const etapaEnsino = formData.etapaEnsino || student.curso || 'Ensino Médio Regular';
  const turma = formData.turma || `${student.anoSerie} - ${student.turma}`;
  const turno = formData.turno || student.turno || 'Matutino';
  const cargaHorariaPrevista = formData.cargaHorariaPrevista || '80 h/a';
  const aulasMinistradas = formData.aulasMinistradas || 40;
  const dataEntregaSecretaria = formData.dataEntregaSecretaria || formData.dataEmissao || new Date().toISOString().split('T')[0];

  // Lista de alunos: garante que o primeiro reflita o aluno selecionado no editor
  const rawAlunos = formData.alunosRendimento || [];
  const alunos = rawAlunos.map((alu: any, idx: number) => {
    if (idx === 0 && student.nomeCompleto) {
      return {
        ...alu,
        nome: student.nomeCompleto,
        matricula: student.matricula || alu.matricula,
      };
    }
    return alu;
  });

  const aulasRegistradas = formData.aulasRegistradas || [];
  const resumo = formData.resumoEstatistico || {
    totalMatriculados: alunos.length || 8,
    totalAprovados: alunos.length || 8,
    totalRecuperacao: 0,
    percentualMedioFrequencia: '96.4%',
  };

  const formatarData = (dStr?: string) => {
    if (!dStr) return '';
    try {
      const [ano, mes, dia] = dStr.split('-');
      return `${dia}/${mes}/${ano}`;
    } catch {
      return dStr;
    }
  };

  return (
    <div className="relative sheet-a4 p-6 sm:p-8 flex flex-col justify-between text-slate-900 text-xs bg-white">
      <WatermarkOverlay text={watermark} />

      <div className="relative z-10 space-y-3">
        {/* Cabeçalho Oficial do Estabelecimento */}
        <DocumentHeader institution={institution} isCompact={true} />

        {/* Faixa Título Oficial do Diário de Classe */}
        <div className="text-center border-y-2 border-slate-950 py-1.5 bg-slate-100">
          <div className="flex items-center justify-center gap-2">
            <BookOpen size={15} className="text-blue-900" />
            <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-slate-950 font-serif-doc">
              DIÁRIO DE CLASSE DO PROFESSOR · ESCRITURAÇÃO PEDAGÓGICA
            </h2>
          </div>
          <p className="text-[9.5px] font-bold text-slate-700 uppercase tracking-wide">
            DOCUMENTO DE ENTREGA OBRIGATÓRIA NA SECRETARIA ESCOLAR · LEI FEDERAL Nº 9.394/1996 (LDBEN)
          </p>
          <div className="text-[9px] font-mono-code text-slate-600 mt-0.5">
            ANO LETIVO: <strong>{anoLetivo}</strong> &nbsp;|&nbsp; 
            PERÍODO: <strong>{bimestre}</strong> &nbsp;|&nbsp; 
            REGISTRO DE ENTREGA: <strong>{protocolo}</strong>
          </div>
        </div>

        {/* Bloco 1: Identificação da Cátedra e da Turma */}
        <div className="border border-slate-400 p-2 rounded-xs bg-white text-[10px]">
          <div className="grid grid-cols-12 gap-x-2 gap-y-1">
            <div className="col-span-12 sm:col-span-6">
              <span className="text-slate-500 uppercase text-[8.5px] block">Componente Curricular / Disciplina:</span>
              <strong className="text-slate-950 uppercase text-[11px] text-blue-950">{disciplina}</strong>
            </div>

            <div className="col-span-12 sm:col-span-6">
              <span className="text-slate-500 uppercase text-[8.5px] block">Professor(a) Regente / Titular:</span>
              <span className="font-bold text-slate-900 uppercase">{professorNome}</span>
              <span className="text-[9px] text-slate-500 font-mono-code ml-1.5">({professorMatricula})</span>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <span className="text-slate-500 uppercase text-[8.5px] block">Etapa / Modalidade:</span>
              <span className="font-medium text-slate-900">{etapaEnsino}</span>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <span className="text-slate-500 uppercase text-[8.5px] block">Ano / Série e Turma:</span>
              <span className="font-bold text-slate-900">{turma}</span>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <span className="text-slate-500 uppercase text-[8.5px] block">Turno de Funcionamento:</span>
              <span className="font-medium text-slate-900">{turno}</span>
            </div>

            <div className="col-span-6 sm:col-span-3">
              <span className="text-slate-500 uppercase text-[8.5px] block">Carga Horária (Prevista / Realizada):</span>
              <span className="font-mono-code font-bold text-slate-900">{cargaHorariaPrevista} &nbsp;/&nbsp; {aulasMinistradas} h/a dadas</span>
            </div>
          </div>
        </div>

        {/* Bloco 2: Mapa de Frequência e Rendimento Escolar (Notas e Faltas) */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1">
              <CheckCircle size={11} className="text-emerald-700" />
              <span>1. Registro de Assiduidade e Avaliações de Aprendizagem ({bimestre})</span>
            </span>
            <span className="text-[9px] text-slate-500 font-mono-code">Escala: 0,0 a 10,0 · Mínimo: 6,0</span>
          </div>

          <table className="w-full border-collapse border border-slate-900 text-[9.5px]">
            <thead>
              <tr className="bg-slate-200 text-slate-950 font-bold uppercase text-center border-b border-slate-900">
                <th className="border border-slate-900 p-0.5 w-7">Nº</th>
                <th className="border border-slate-900 p-0.5 text-left pl-2">Nome Completo do Aluno(a)</th>
                <th className="border border-slate-900 p-0.5 w-24">Matrícula</th>
                <th className="border border-slate-900 p-0.5 w-12 text-amber-900">Faltas</th>
                <th className="border border-slate-900 p-0.5 w-11 bg-slate-100">Aval 1</th>
                <th className="border border-slate-900 p-0.5 w-11 bg-slate-100">Aval 2</th>
                <th className="border border-slate-900 p-0.5 w-11 bg-slate-100">Ativ 3</th>
                <th className="border border-slate-900 p-0.5 w-14 bg-blue-100 text-blue-950 font-extrabold">Média</th>
                <th className="border border-slate-900 p-0.5 w-18">Situação</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((alu: any, idx: number) => (
                <tr key={idx} className="hover:bg-slate-50 text-center border-b border-slate-300">
                  <td className="border border-slate-400 p-0.5 font-mono-code font-bold text-slate-700">{alu.num || idx + 1}</td>
                  <td className="border border-slate-400 p-0.5 text-left pl-2 font-semibold text-slate-950 uppercase">
                    {alu.nome}
                  </td>
                  <td className="border border-slate-400 p-0.5 font-mono-code text-slate-600">{alu.matricula}</td>
                  <td className="border border-slate-400 p-0.5 font-mono-code text-amber-900 font-bold">{alu.faltas}</td>
                  <td className="border border-slate-400 p-0.5 font-mono-code">{alu.n1}</td>
                  <td className="border border-slate-400 p-0.5 font-mono-code">{alu.n2}</td>
                  <td className="border border-slate-400 p-0.5 font-mono-code">{alu.n3}</td>
                  <td className="border border-slate-400 p-0.5 font-mono-code font-bold bg-blue-50/60 text-slate-950">{alu.media}</td>
                  <td className="border border-slate-400 p-0.5 text-[8.5px] font-bold text-emerald-800">
                    {alu.situacao || 'Apto'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bloco 3: Registro de Aulas Ministradas e Conteúdos Desenvolvidos (BNCC) */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-900 block mb-1">
            2. Registro Sintético de Aulas Ministradas e Conteúdos Desenvolvidos
          </span>
          <table className="w-full border-collapse border border-slate-900 text-[9px]">
            <thead>
              <tr className="bg-slate-200 text-slate-950 font-bold uppercase text-center border-b border-slate-900">
                <th className="border border-slate-900 p-0.5 w-16">Data</th>
                <th className="border border-slate-900 p-0.5 w-10">Aulas</th>
                <th className="border border-slate-900 p-0.5 text-left pl-2">Objeto de Conhecimento / Habilidade Desenvolvida</th>
                <th className="border border-slate-900 p-0.5 text-left pl-2 w-52 hidden sm:table-cell">Metodologia e Recursos</th>
              </tr>
            </thead>
            <tbody>
              {aulasRegistradas.slice(0, 5).map((aula: any, idx: number) => (
                <tr key={idx} className="border-b border-slate-300">
                  <td className="border border-slate-400 p-0.5 text-center font-mono-code font-bold text-slate-800">
                    {aula.data}
                  </td>
                  <td className="border border-slate-400 p-0.5 text-center font-mono-code">{aula.qtd}</td>
                  <td className="border border-slate-400 p-0.5 pl-2 text-slate-900 leading-tight">
                    {aula.conteudo}
                  </td>
                  <td className="border border-slate-400 p-0.5 pl-2 text-slate-600 hidden sm:table-cell text-[8.5px]">
                    {aula.metodologia}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Resumo Estatístico */}
        <div className="grid grid-cols-4 gap-2 border border-slate-300 p-1.5 rounded-xs bg-slate-50 text-center text-[9px]">
          <div>
            <span className="text-slate-500 uppercase block text-[8px]">Total de Alunos:</span>
            <strong className="font-mono-code text-slate-900 text-xs">{resumo.totalMatriculados}</strong>
          </div>
          <div>
            <span className="text-slate-500 uppercase block text-[8px]">Aproveitamento Satisfatório:</span>
            <strong className="font-mono-code text-emerald-800 text-xs">{resumo.totalAprovados} ({((resumo.totalAprovados / (resumo.totalMatriculados || 1)) * 100).toFixed(0)}%)</strong>
          </div>
          <div>
            <span className="text-slate-500 uppercase block text-[8px]">Em Recuperação Paralela:</span>
            <strong className="font-mono-code text-amber-800 text-xs">{resumo.totalRecuperacao}</strong>
          </div>
          <div>
            <span className="text-slate-500 uppercase block text-[8px]">Frequência Global da Turma:</span>
            <strong className="font-mono-code text-blue-900 text-xs">{resumo.percentualMedioFrequencia}</strong>
          </div>
        </div>

        {/* TERMO LEGAL DE ENTREGA E RECEBIMENTO NA SECRETARIA ESCOLAR */}
        <div className="border-2 border-slate-900 p-2.5 rounded-xs bg-white text-[9.5px] space-y-2.5 mt-2">
          <div className="flex items-center gap-1.5 border-b border-slate-300 pb-1">
            <ShieldCheck size={14} className="text-blue-900" />
            <span className="font-bold uppercase tracking-wider text-slate-950 text-[10px]">
              Termo Oficial de Encerramento e Entrega na Secretaria Escolar
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* LADO DO PROFESSOR: DECLARAÇÃO DE FIDEDIGNIDADE */}
            <div className="flex flex-col justify-between border-r border-slate-200 pr-3 space-y-3">
              <div>
                <span className="font-bold text-blue-950 uppercase text-[9px] block mb-1">
                  I. Declaração do(a) Professor(a) Titular
                </span>
                <p className="text-slate-700 leading-tight text-[8.5px] text-justify italic">
                  "{formData.declaracaoDocente || 'Declaro, sob as penas da lei e em cumprimento ao Regimento Escolar, que os registros de frequência, conteúdos lecionados e notas constantes neste Diário de Classe correspondem à fiel realidade das atividades pedagógicas ministradas.'}"
                </p>
              </div>

              <div className="text-center pt-2">
                <div className="w-full border-b border-slate-900 mb-1 h-6"></div>
                <span className="font-bold text-slate-950 uppercase text-[10px] block">
                  {professorNome}
                </span>
                <span className="text-[8.5px] text-slate-600 block">
                  Professor(a) Regente · Matrícula {professorMatricula}
                </span>
                <span className="text-[8px] text-slate-500 font-mono-code mt-0.5 block">
                  Entregue em: {formatarData(dataEntregaSecretaria)}
                </span>
              </div>
            </div>

            {/* LADO DA SECRETARIA: CONFERÊNCIA, VISTO E ARQUIVO */}
            <div className="flex flex-col justify-between pl-1 space-y-3">
              <div>
                <span className="font-bold text-blue-950 uppercase text-[9px] block mb-1">
                  II. Visto e Conferência da Secretaria Escolar
                </span>
                <p className="text-slate-700 leading-tight text-[8.5px] text-justify italic">
                  "{formData.termoSecretaria || 'Atesto que o presente Diário de Classe foi protocolado e conferido pela Secretaria Escolar e Coordenação Pedagógica nesta data, constando com todas as notas, frequência e registros de aulas devidamente lançados nos assentamentos escolares regimentais.'}"
                </p>
              </div>

              <div className="text-center pt-2">
                <div className="w-full border-b border-slate-900 mb-1 h-6"></div>
                <span className="font-bold text-slate-950 uppercase text-[10px] block">
                  {institution.secretarioNome}
                </span>
                <span className="text-[8.5px] text-slate-600 block">
                  {institution.secretarioCargo}
                </span>
                <span className="text-[8px] text-slate-500 font-mono-code mt-0.5 block">
                  Protocolo de Recebimento: {protocolo} · Visto da Secretaria
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé Oficial do Diário de Classe */}
      <div className="relative z-10 pt-2 border-t border-slate-300 mt-2 flex flex-wrap items-center justify-between text-[8px] font-mono-code text-slate-600">
        <div>
          <span>ESTABELECIMENTO: {institution.nomeEscola}</span> &nbsp;|&nbsp; 
          <span>INEP: {institution.codigoInep}</span>
        </div>
        <div>
          <span>AUTENTICAÇÃO: {codigoAutenticidade}</span> &nbsp;|&nbsp; 
          <span>PROTOCOLO: {protocolo}</span>
        </div>
      </div>
    </div>
  );
};
