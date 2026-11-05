import React from 'react';
import { InstitutionConfig, Student, DocumentDefinition } from '../../types';
import { DocumentHeader } from '../DocumentHeader';
import { DocumentFooter } from '../DocumentFooter';
import { WatermarkOverlay } from '../WatermarkOverlay';

interface RequerimentoTemplateProps {
  docDef: DocumentDefinition;
  institution: InstitutionConfig;
  student: Student;
  formData: Record<string, any>;
  protocolo: string;
  codigoAutenticidade: string;
  watermark?: string;
}

export const RequerimentoTemplate: React.FC<RequerimentoTemplateProps> = ({
  docDef,
  institution,
  student,
  formData,
  protocolo,
  codigoAutenticidade,
  watermark,
}) => {
  const renderCorpoRequerimento = () => {
    switch (docDef.id) {
      case 'req-secretaria':
        return (
          <div className="space-y-4 text-justify font-serif-doc text-[12.5px] leading-relaxed text-slate-800">
            <p>
              Ao(À) Ilustríssimo(a) Senhor(a) Diretor(a) / Secretário(a) da <strong className="text-slate-950 uppercase">{institution.nomeEscola}</strong>:
            </p>

            <p>
              Eu, <strong className="text-slate-950 uppercase">{student.responsavelLegal || student.nomeCompleto}</strong>, 
              portador(a) do RG nº <span className="font-mono-code font-bold">{student.rg}</span> e CPF nº <span className="font-mono-code font-bold">{student.cpf}</span>, 
              residente em {student.endereco}, telefone {student.telefoneResponsavel}, na qualidade de {student.responsavelLegal ? 'responsável legal pelo(a) aluno(a)' : 'estudante'}{' '}
              <strong className="text-slate-950 uppercase">{student.nomeCompleto}</strong>, 
              RA nº <span className="font-mono-code font-bold">{student.ra}</span>, 
              turma <strong>{student.anoSerie} - {student.turma}</strong>, 
              venho respeitosamente à presença de Vossa Senhoria <strong>REQUERER</strong>:
            </p>

            <div className="p-3 bg-slate-50 border border-slate-300 rounded font-sans text-xs space-y-2">
              <p className="font-bold text-slate-900 uppercase">Objeto da Solicitação:</p>
              <p className="text-blue-900 font-bold text-sm">{formData.tipoSolicitacao || 'Segunda via de documento escolar'}</p>
              <p><strong>Justificativa do Pedido:</strong> {formData.justificativa || 'Para fins de instrução de processo pessoal/acadêmico.'}</p>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-[11px] text-slate-600">
                <span>Prazo Regimental: <strong>{formData.prazoRetiradaEstimado || '3 a 5 dias úteis'}</strong></span>
                <span>Custas: <strong>{formData.taxaExpedicao || 'Gratuito'}</strong></span>
              </div>
            </div>

            <p>
              Nestes termos, pede e aguarda deferimento.
            </p>
          </div>
        );

      case 'req-matricula':
        return (
          <div className="space-y-3 font-serif-doc text-[11px] leading-relaxed text-slate-800">
            <p className="text-justify">
              Requeiro a <strong>MATRÍCULA / RENOVAÇÃO DE MATRÍCULA</strong> do(a) educando(a) abaixo qualificado(a) no Ano Letivo de <strong className="font-mono-code">{formData.anoLetivoMatricula || student.anoLetivo}</strong> nesta unidade escolar:
            </p>

            {/* Ficha Cadastral Completa */}
            <div className="border border-slate-400 p-2.5 rounded-sm bg-slate-50 font-sans space-y-2 text-[10px]">
              <div className="grid grid-cols-12 gap-1.5">
                <div className="col-span-8"><strong>Nome Aluno:</strong> {student.nomeCompleto}</div>
                <div className="col-span-4"><strong>RA:</strong> {student.ra}</div>
                <div className="col-span-4"><strong>Nascimento:</strong> {student.dataNascimento.split('-').reverse().join('/')}</div>
                <div className="col-span-4"><strong>RG:</strong> {student.rg}</div>
                <div className="col-span-4"><strong>CPF:</strong> {student.cpf}</div>
                <div className="col-span-6"><strong>Mãe:</strong> {student.nomeMae}</div>
                <div className="col-span-6"><strong>Pai:</strong> {student.nomePai || 'Não Consta'}</div>
                <div className="col-span-8"><strong>Endereço:</strong> {student.endereco}</div>
                <div className="col-span-4"><strong>Telefone Emergência:</strong> {student.telefoneResponsavel}</div>
                <div className="col-span-6"><strong>Etapa/Curso:</strong> {student.curso}</div>
                <div className="col-span-6"><strong>Série/Turno:</strong> {student.anoSerie} ({student.turno})</div>
              </div>
            </div>

            <div className="p-2.5 border border-slate-300 rounded font-sans text-[10px] space-y-1">
              <p><strong>Condições de Saúde / Alergias:</strong> {formData.condicoesSaude || 'Sem restrições declaradas'}</p>
              <p><strong>Contato Secundário:</strong> {formData.contatoEmergencia || 'Familiares cadastrados'}</p>
            </div>

            <p className="text-[10.5px] italic text-justify">
              {formData.declaracaoAceite || 'Declaro estar ciente e de acordo com o Regimento Escolar, obrigando-me a zelar pela assiduidade e conduta do aluno sob minha responsabilidade.'}
            </p>
          </div>
        );

      case 'termo-compromisso':
        return (
          <div className="space-y-4 text-justify font-serif-doc text-[12.5px] leading-relaxed text-slate-800">
            <p>
              Pelo presente instrumento, nós, abaixo assinados, responsável e estudante{' '}
              <strong className="text-slate-950 uppercase">{student.nomeCompleto}</strong>, 
              RA nº <span className="font-mono-code font-bold">{student.ra}</span>, 
              matriculado(a) no <strong>{student.anoSerie} ({student.turma})</strong>, 
              firmamos perante a Direção da <strong className="text-slate-950 uppercase">{institution.nomeEscola}</strong> solene compromisso de honrar as seguintes diretrizes regimentais:
            </p>

            <div className="p-4 bg-slate-50 border border-slate-300 rounded font-sans text-xs">
              <pre className="whitespace-pre-wrap font-sans text-slate-800 leading-relaxed">
                {formData.itensCompromisso || '1. Cumprimento pontual dos horários escolares;\n2. Uso do uniforme obrigatório;\n3. Respeito ao patrimônio e aos profissionais da educação;\n4. Assiduidade superior ao mínimo legal de 75%.'}
              </pre>
            </div>

            <p>
              Estamos cientes de que a inobservância das normas disciplinares e regimentais sujeitará o infrator às medidas educativas previstas na legislação de ensino e no Estatuto da Criança e do Adolescente.
            </p>
          </div>
        );

      case 'termo-imagem':
        return (
          <div className="space-y-4 text-justify font-serif-doc text-[12.5px] leading-relaxed text-slate-800">
            <p>
              Em estrita conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018) e o Art. 17 do Estatuto da Criança e do Adolescente (Lei nº 8.069/1990):
            </p>

            <p>
              Eu, <strong className="text-slate-950 uppercase">{student.responsavelLegal || student.nomeMae}</strong>, 
              inscrito(a) no CPF nº <span className="font-mono-code font-bold">{student.cpf}</span>, 
              na qualidade de responsável legal pelo(a) menor{' '}
              <strong className="text-slate-950 uppercase">{student.nomeCompleto}</strong>, 
              <strong>AUTORIZO A TÍTULO GRATUITO</strong> a <strong className="text-slate-950 uppercase">{institution.nomeEscola}</strong> a captar, fixar e utilizar imagens fotográficas, registros em vídeo e produções artísticas do estudante.
            </p>

            <div className="p-3 bg-slate-50 border border-slate-300 rounded font-sans text-xs space-y-1.5">
              <p><strong>Finalidade Exclusiva:</strong> {formData.finalidadeUso || 'Divulgação educacional, projetos pedagógicos, feiras e memórias da escola.'}</p>
              <p><strong>Meios de Veiculação:</strong> {formData.veiculosDivulgacao || 'Murais internos, impressos pedagógicos e redes sociais institucionais.'}</p>
              <p><strong>Vigência:</strong> {formData.validadeTermo || 'Durante todo o período letivo de matrícula do estudante.'}</p>
            </div>

            <p className="text-xs text-slate-600 italic">
              Fica expressamente vedada a utilização para quaisquer fins comerciais ou econômicos, resguardada a dignidade do educando.
            </p>
          </div>
        );

      case 'guia-transferencia':
      default:
        return (
          <div className="space-y-4 text-justify font-serif-doc text-[12.5px] leading-relaxed text-slate-800">
            <p>
              À Secretaria da Escola Destino:{' '}
              <strong className="text-slate-950 uppercase">{formData.escolaDestino || 'Escola de Destino'}</strong>, 
              situada no município de <strong>{formData.cidadeDestino || 'São Paulo/SP'}</strong>.
            </p>

            <p>
              Encaminhamos anexo a este expediente a pasta individual de assentamentos escolares do(a) estudante{' '}
              <strong className="text-slate-950 uppercase">{student.nomeCompleto}</strong>, 
              RA nº <span className="font-mono-code font-bold">{student.ra}</span>, 
              transferido(a) a pedido de sua família.
            </p>

            <div className="p-3 bg-slate-50 border border-slate-300 rounded font-sans text-xs space-y-2">
              <p><strong>Motivo da Transferência:</strong> {formData.motivoTransferencia || 'Mudança residencial dos responsáveis.'}</p>
              <p><strong>Documentos Integrantes da Pasta:</strong></p>
              <pre className="whitespace-pre-wrap font-sans text-slate-800 leading-relaxed text-[11px]">
                {formData.documentosAnexos || '1) Histórico Escolar Oficial em duas vias chanceladas;\n2) Ficha Individual de frequência e notas;\n3) Cópias de certidão, CPF e carteira de vacinação.'}
              </pre>
            </div>

            <p>
              Solicitamos a gentileza de acusar o recebimento da presente guia e prontuário no protocolo anexo.
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
            EXPEDIENTE SECRETARIA &nbsp;|&nbsp; PROTOCOLO: <strong>{protocolo}</strong>
          </p>
        </div>

        {renderCorpoRequerimento()}
      </div>

      <div className="relative z-10">
        <DocumentFooter
          institution={institution}
          dataEmissao={formData.dataEmissao}
          protocolo={protocolo}
          codigoAutenticidade={codigoAutenticidade}
          includeResponsibleSignature={true}
          responsibleName={student.responsavelLegal || student.nomeMae}
          responsibleRole="Requerente / Responsável Legal"
          includeStudentSignature={docDef.id === 'termo-compromisso'}
          studentName={student.nomeCompleto}
          mostrarCarimbo={institution.mostrarCarimbo}
          mostrarQrCode={institution.mostrarQrCode}
        />
      </div>
    </div>
  );
};
