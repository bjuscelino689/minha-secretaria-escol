import React from 'react';
import { InstitutionConfig, Student, DocumentDefinition } from '../../types';
import { DocumentHeader } from '../DocumentHeader';
import { DocumentFooter } from '../DocumentFooter';
import { WatermarkOverlay } from '../WatermarkOverlay';

interface AtaOficialProps {
  docDef: DocumentDefinition;
  institution: InstitutionConfig;
  student?: Student;
  formData: Record<string, any>;
  protocolo: string;
  codigoAutenticidade: string;
  watermark?: string;
}

export const AtaOficialTemplate: React.FC<AtaOficialProps> = ({
  docDef,
  institution,
  student,
  formData,
  protocolo,
  codigoAutenticidade,
  watermark,
}) => {
  const formatarDataPorExtenso = (dataStr?: string) => {
    const d = dataStr ? new Date(dataStr + 'T12:00:00') : new Date();
    const meses = [
      'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
      'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ];
    return `aos ${d.getDate()} dias do mês de ${meses[d.getMonth()]} de ${d.getFullYear()}`;
  };

  const renderConteudoAta = () => {
    switch (docDef.id) {
      case 'ata-conselho':
        return (
          <div className="space-y-4 text-justify font-serif-doc text-[12.5px] leading-relaxed text-slate-800">
            <p>
              Às 14 horas e 30 minutos, {formatarDataPorExtenso(formData.dataReuniao)}, 
              nas dependências da <strong className="text-slate-950 uppercase">{institution.nomeEscola}</strong>, 
              reuniram-se sob a presidência da Direção e Coordenação Pedagógica os professores dos componentes curriculares para realização do{' '}
              <strong>{formData.periodoConselho || 'Conselho de Classe Deliberativo'}</strong>, 
              referente ao ano letivo em curso.
            </p>

            <p>
              <strong>PAUTA DA REUNIÃO:</strong>
            </p>
            <div className="p-3 bg-slate-50 border border-slate-300 rounded font-sans text-xs">
              <pre className="whitespace-pre-wrap font-sans text-slate-800 leading-relaxed">
                {formData.pauta || '1. Avaliação do rendimento acadêmico e assiduidade dos estudantes;\n2. Definição do plano de recuperação paralela contínua;\n3. Acompanhamento dos casos com defasagem de aprendizagem.'}
              </pre>
            </div>

            <p>
              <strong>DELIBERAÇÕES E ENCAMINHAMENTOS DO CONSELHO:</strong>
            </p>
            <div className="p-3 bg-slate-50 border border-slate-300 rounded font-sans text-xs">
              <p className="text-slate-800 leading-relaxed">
                {formData.deliberacoes || 'O colegiado docente aprovou por unanimidade a implementação do roteiro pedagógico complementar e a convocação dos pais dos educandos com rendimento abaixo da média regimental.'}
              </p>
            </div>

            <p>
              <strong>MEMBROS PARTICIPANTES:</strong> {formData.presentesLista || 'Direção Geral, Vice-Direção, Professor Coordenador Pedagógico e Professores da Unidade.'}
            </p>

            <p>
              Nada mais havendo a tratar, a presente ata foi lavrada por mim, Secretário(a) Escolar, que após lida e achada conforme, segue assinada pelos presentes.
            </p>
          </div>
        );

      case 'ata-pais':
        return (
          <div className="space-y-4 text-justify font-serif-doc text-[12.5px] leading-relaxed text-slate-800">
            <p>
              No dia e hora designados, {formatarDataPorExtenso(formData.dataReuniao)}, 
              no auditório da <strong className="text-slate-950 uppercase">{institution.nomeEscola}</strong>, 
              realizou-se a assembleia ordinária com pais e responsáveis legais de alunos, tendo como objeto principal:{' '}
              <strong>{formData.motivoReuniao || 'Encontro Pedagógico e Entrega de Boletins'}</strong>.
            </p>

            <p>
              <strong>EXPOSIÇÃO DOS TEMAS:</strong>
            </p>
            <div className="p-3 bg-slate-50 border border-slate-300 rounded font-sans text-xs leading-relaxed text-slate-800">
              {formData.conteudoApresentado || 'A equipe gestora apresentou os resultados do período letivo, ressaltando o cumprimento do plano de metas e projetos curriculares.'}
            </div>

            <p>
              <strong>COMPROMISSOS PACTUADOS:</strong>
            </p>
            <div className="p-3 bg-slate-50 border border-slate-300 rounded font-sans text-xs leading-relaxed text-slate-800">
              {formData.compromissosFirmados || 'Os pais acordaram em acompanhar com rigor a rotina diária de tarefas de casa e assiduidade escolar.'}
            </div>

            <p>
              Registrada a presença dos pais constantes no livro de assinaturas anexo a esta ata, encerra-se a reunião.
            </p>
          </div>
        );

      case 'ata-gremio':
        return (
          <div className="space-y-4 text-justify font-serif-doc text-[12.5px] leading-relaxed text-slate-800">
            <p>
              Em cumprimento ao disposto na Lei Federal nº 7.398/1985 e no Estatuto do Grêmio Estudantil desta unidade, 
              reuniram-se a Comissão Eleitoral Discente e a Direção Escolar para proclamar o resultado do pleito e dar posse aos membros eleitos da:{' '}
              <strong className="text-slate-950 uppercase">{formData.chapaEleita || 'Chapa Estudantil'}</strong>.
            </p>

            <div className="p-3 bg-slate-50 border border-slate-300 rounded font-sans text-xs space-y-1.5">
              <p><strong>Presidente Eleito(a):</strong> {formData.presidenteEleito || 'Nome do Estudante'}</p>
              <p><strong>Vice-Presidente:</strong> {formData.vicePresidente || 'Nome do Estudante'}</p>
              <p><strong>Mandato Institucional:</strong> {formData.mandato || 'Gestão 2026/2027'}</p>
              <p><strong>Resultado Eleitoral:</strong> {formData.totalVotantes || 'Total de votos válidos apurados'}</p>
            </div>

            <p>
              Os empossados prestaram solene compromisso de bem desempenhar o mandato, defendendo os interesses democráticos dos estudantes em harmonia com a comunidade escolar.
            </p>
          </div>
        );

      case 'ata-descarte':
      default:
        return (
          <div className="space-y-4 text-justify font-serif-doc text-[12.5px] leading-relaxed text-slate-800">
            <p>
              Reunida a Comissão de Avaliação e Descarte de Documentos Escolares instituída pela{' '}
              <strong>{formData.comissaoPortaria || 'Portaria da Direção Escolar'}</strong>, 
              procedeu-se à conferência dos papéis e registros que atingiram o prazo prescricional de temporalidade documental.
            </p>

            <div className="p-3 bg-slate-50 border border-slate-300 rounded font-sans text-xs space-y-2">
              <p><strong>Documentos Destinados ao Descarte:</strong> {formData.documentosDescartados || 'Diários de classe antigos que ultrapassaram o prazo legal de guarda temporária.'}</p>
              <p><strong>Preservação do Acervo Permanente:</strong> {formData.garantiaPreservacao || 'Certifica-se a guarda perene de todos os históricos escolares e registros de matrículas.'}</p>
            </div>

            <p>
              O descarte será realizado por meio de fragmentação mecânica que assegura a completa destruição de dados sensíveis em estrito cumprimento à LGPD (Lei nº 13.709/2018).
            </p>
          </div>
        );
    }
  };

  return (
    <div className="relative sheet-a4 p-8 sm:p-12 flex flex-col justify-between text-slate-900">
      <WatermarkOverlay text={watermark} />

      <div className="relative z-10">
        <DocumentHeader institution={institution} />

        <div className="my-6 text-center border-y border-slate-900 py-2">
          <h2 className="text-base font-extrabold uppercase tracking-wide text-slate-950 font-serif-doc">
            {docDef.title}
          </h2>
          <p className="text-[10px] font-mono-code text-slate-500 uppercase mt-0.5">
            LIVRO DE ATAS DA SECRETARIA &nbsp;|&nbsp; PROTOCOLO: <strong>{protocolo}</strong>
          </p>
        </div>

        {renderConteudoAta()}
      </div>

      <div className="relative z-10">
        <DocumentFooter
          institution={institution}
          dataEmissao={formData.dataReuniao}
          protocolo={protocolo}
          codigoAutenticidade={codigoAutenticidade}
          mostrarCarimbo={institution.mostrarCarimbo}
          mostrarQrCode={institution.mostrarQrCode}
        />
      </div>
    </div>
  );
};
