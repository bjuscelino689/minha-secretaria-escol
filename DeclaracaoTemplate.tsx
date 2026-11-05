import React from 'react';
import { InstitutionConfig, Student, DocumentDefinition } from '../../types';
import { DocumentHeader } from '../DocumentHeader';
import { DocumentFooter } from '../DocumentFooter';
import { WatermarkOverlay } from '../WatermarkOverlay';

interface DeclaracaoTemplateProps {
  docDef: DocumentDefinition;
  institution: InstitutionConfig;
  student: Student;
  formData: Record<string, any>;
  protocolo: string;
  codigoAutenticidade: string;
  watermark?: string;
}

export const DeclaracaoTemplate: React.FC<DeclaracaoTemplateProps> = ({
  docDef,
  institution,
  student,
  formData,
  protocolo,
  codigoAutenticidade,
  watermark,
}) => {
  // Gera o corpo oficial da declaração conforme o tipo de declaração
  const renderCorpoDeclaracao = () => {
    switch (docDef.id) {
      case 'dec-matricula':
        return (
          <div className="space-y-4 text-justify font-serif-doc text-[13px] leading-relaxed text-slate-800">
            <p>
              Declaramos para os devidos fins de direito que o(a) estudante{' '}
              <strong className="text-slate-950 font-bold uppercase">{student.nomeCompleto}</strong>, 
              portador(a) do RG nº <span className="font-mono-code font-semibold">{student.rg}</span>, 
              inscrito(a) no CPF sob o nº <span className="font-mono-code font-semibold">{student.cpf}</span>, 
              Registro do Aluno (RA) nº <span className="font-mono-code font-semibold">{student.ra}</span>, 
              nascido(a) em <span className="font-mono-code font-semibold">{student.dataNascimento.split('-').reverse().join('/')}</span>, 
              natural de <span className="font-semibold">{student.naturalidade}</span>, 
              filho(a) de <span className="font-semibold">{student.nomeMae}</span> e de <span className="font-semibold">{student.nomePai || 'Não Consta'}</span>, 
              está devidamente <strong>MATRICULADO(A) E FREQUENTANDO REGULARMENTE</strong> as aulas nesta instituição de ensino no Ano Letivo de{' '}
              <strong className="font-mono-code">{student.anoLetivo}</strong>, 
              no curso de <strong>{student.curso}</strong>, 
              cursando o(a) <strong>{student.anoSerie}</strong> ({student.turma}), 
              no período/turno <strong>{student.turno}</strong>, 
              sob o número de matrícula <span className="font-mono-code font-semibold">{student.matricula}</span>.
            </p>

            {formData.finalidade && (
              <p>
                <strong>Finalidade da Emissão:</strong> {formData.finalidade}
              </p>
            )}

            {formData.observacoes && (
              <p>
                <strong>Observações:</strong> {formData.observacoes}
              </p>
            )}

            <p className="pt-2">
              Por ser expressão da verdade e nos termos da legislação educacional vigente (Lei Federal nº 9.394/1996), 
              expede-se a presente declaração que possui validade de {formData.validadeDias || 30} (trinta) dias a contar da data de sua emissão.
            </p>
          </div>
        );

      case 'dec-frequencia':
        return (
          <div className="space-y-4 text-justify font-serif-doc text-[13px] leading-relaxed text-slate-800">
            <p>
              Atestamos e declaramos para os devidos fins comprobatórios que o(a) estudante{' '}
              <strong className="text-slate-950 font-bold uppercase">{student.nomeCompleto}</strong>, 
              RA nº <span className="font-mono-code font-semibold">{student.ra}</span>, 
              CPF nº <span className="font-mono-code font-semibold">{student.cpf}</span>, 
              regularmente matriculado(a) no(a) <strong>{student.anoSerie} ({student.turma})</strong> do <strong>{student.curso}</strong>, 
              apresentou no período de <strong>{formData.periodoReferencia || 'Semestre Letivo Atual'}</strong> a seguinte assiduidade escolar:
            </p>

            <div className="my-4 border border-slate-300 rounded p-4 bg-slate-50 font-sans">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="border-r border-slate-200 pr-2">
                  <span className="block text-xs text-slate-500 uppercase font-semibold">Total de Aulas</span>
                  <span className="text-lg font-bold font-mono-code text-slate-900">{formData.totalAulasDadas || 400}</span>
                </div>
                <div className="border-r border-slate-200 pr-2">
                  <span className="block text-xs text-slate-500 uppercase font-semibold">Presenças Efetivas</span>
                  <span className="text-lg font-bold font-mono-code text-emerald-800">{formData.totalPresencas || 382}</span>
                </div>
                <div>
                  <span className="block text-xs text-slate-500 uppercase font-semibold">Índice de Frequência</span>
                  <span className="text-lg font-bold font-mono-code text-blue-900">{formData.percentualFrequencia || '95,5%'}</span>
                </div>
              </div>
            </div>

            <p>
              O percentual de presença apurado atende plenamente à exigência mínima de 75% fixada pelo Artigo 24, Inciso VI da Lei de Diretrizes e Bases da Educação Nacional (LDB - Lei nº 9.394/1996).
            </p>

            {formData.finalidade && (
              <p>
                <strong>Destinação / Finalidade:</strong> {formData.finalidade}
              </p>
            )}
          </div>
        );

      case 'dec-transferencia':
        return (
          <div className="space-y-4 text-justify font-serif-doc text-[13px] leading-relaxed text-slate-800">
            <p>
              Declaramos a pedido do(a) interessado(a) e do(a) responsável legal que o(a) aluno(a){' '}
              <strong className="text-slate-950 font-bold uppercase">{student.nomeCompleto}</strong>, 
              RA nº <span className="font-mono-code font-semibold">{student.ra}</span>, 
              nascido(a) aos <span className="font-mono-code font-semibold">{student.dataNascimento.split('-').reverse().join('/')}</span>, 
              filho(a) de <span className="font-semibold">{student.nomeMae}</span>, 
              encontrava-se regularmente matriculado(a) nesta unidade escolar no <strong>{student.anoSerie}</strong> do <strong>{student.curso}</strong>, 
              tendo requerido sua <strong>TRANSFERÊNCIA ESCOLAR</strong> em <span className="font-mono-code font-semibold">{(formData.dataDesligamento || new Date().toISOString().split('T')[0]).split('-').reverse().join('/')}</span>.
            </p>

            <p>
              Certificamos que o(a) estudante encontra-se <strong>DESLIGADO(A) E APTO(A) PARA MATRÍCULA IMEDIATA</strong> em qualquer outro estabelecimento congênere de ensino, estando sua documentação acadêmica definitiva (Histórico Escolar Oficial) em fase de processamento e conferência na secretaria, com entrega garantida no prazo improrrogável de {formData.prazoExpedicaoHistorico || '30 (trinta) dias'}.
            </p>

            <p>
              <strong>Situação no momento da transferência:</strong> {formData.situacaoNaTransferencia || 'Cursando com aproveitamento e assiduidade regulares.'}
            </p>

            <p>
              <strong>Destino informado:</strong> {formData.destino || 'Estabelecimentos de ensino do território nacional.'}
            </p>
          </div>
        );

      case 'dec-conclusao':
        return (
          <div className="space-y-4 text-justify font-serif-doc text-[13px] leading-relaxed text-slate-800">
            <p>
              A Direção e a Secretaria da <strong className="text-slate-950 uppercase">{institution.nomeEscola}</strong> declaram que o(a) estudante{' '}
              <strong className="text-slate-950 font-bold uppercase">{student.nomeCompleto}</strong>, 
              portador(a) do RG nº <span className="font-mono-code font-semibold">{student.rg}</span> e CPF nº <span className="font-mono-code font-semibold">{student.cpf}</span>, 
              RA nº <span className="font-mono-code font-semibold">{student.ra}</span>, 
              <strong>CONCLUIU COM ÊXITO no Ano Letivo de {formData.anoConclusao || student.anoLetivo - 1}</strong> os estudos correspondentes ao{' '}
              <strong className="uppercase">{formData.cursoConcluido || student.curso}</strong>, 
              obtendo aprovação em todos os componentes curriculares da Base Nacional Comum e da Parte Diversificada.
            </p>

            <p>
              A presente declaração é expedida em caráter provisório com plena eficácia legal comprobatória enquanto tramitam os atos de registro e chancela do Histórico Escolar e do Diploma / Certificado definitivo no Sistema Estadual de Registro Escolar.
            </p>

            <p className="text-xs italic text-slate-600">
              {formData.amparoLegal || 'Amparo: Lei Federal nº 9.394/1996 e Resoluções do Conselho Estadual de Educação.'}
            </p>
          </div>
        );

      case 'dec-escolaridade':
        return (
          <div className="space-y-4 text-justify font-serif-doc text-[13px] leading-relaxed text-slate-800">
            <p>
              Declaramos para os devidos fins que o(a) estudante{' '}
              <strong className="text-slate-950 font-bold uppercase">{student.nomeCompleto}</strong>, 
              RA nº <span className="font-mono-code font-semibold">{student.ra}</span>, 
              CPF nº <span className="font-mono-code font-semibold">{student.cpf}</span>, 
              possui escolaridade de <strong>{student.anoSerie} do {student.curso}</strong>, 
              com aulas ministradas no turno <strong>{student.turno}</strong>, 
              no seguinte horário:
            </p>

            <div className="p-3 my-3 border border-slate-300 rounded bg-slate-50 text-center font-sans font-semibold text-slate-900 text-sm">
              {formData.horarioAulas || 'Das 07h15 às 12h35 (Segunda a Sexta-feira)'}
            </div>

            <p>
              {formData.compatibilidadeHorario || 'O turno e horário escolar acima indicados são compatíveis com atividades de estágio profissional ou programa de jovem aprendiz.'}
            </p>

            {formData.finalidade && (
              <p>
                <strong>Finalidade:</strong> {formData.finalidade}
              </p>
            )}
          </div>
        );

      case 'dec-quitacao':
        return (
          <div className="space-y-4 text-justify font-serif-doc text-[13px] leading-relaxed text-slate-800">
            <p>
              Declaramos para os devidos fins de direito que em relação ao(à) aluno(a){' '}
              <strong className="text-slate-950 font-bold uppercase">{student.nomeCompleto}</strong>, 
              matrícula nº <span className="font-mono-code font-semibold">{student.matricula}</span>, 
              cujo responsável legal e financeiro é{' '}
              <strong className="font-bold">{student.responsavelLegal || student.nomeMae}</strong>, 
              inscrito(a) no CPF nº <span className="font-mono-code">{student.cpf}</span>:
            </p>

            <p className="p-4 border border-emerald-300 bg-emerald-50/50 rounded text-emerald-950 font-medium">
              {formData.declaracaoTexto || 'Declaramos que não constam quaisquer débitos pecuniários, taxas de matrícula ou pendências contratuais vencidas em nome do responsável, estando todas as obrigações escolares integralmente adimplidas até a presente data.'}
            </p>

            <p>
              <strong>Período certificado:</strong> {formData.periodoQuitado || 'Ano Letivo Vigente e Exercícios Anteriores'}.
            </p>
          </div>
        );

      case 'dec-transporte':
        return (
          <div className="space-y-4 text-justify font-serif-doc text-[13px] leading-relaxed text-slate-800">
            <p>
              Declaramos perante as concessionárias de transporte público, órgãos municipais e secretarias competentes que o(a) estudante{' '}
              <strong className="text-slate-950 font-bold uppercase">{student.nomeCompleto}</strong>, 
              RA nº <span className="font-mono-code font-semibold">{student.ra}</span>, 
              CPF nº <span className="font-mono-code font-semibold">{student.cpf}</span>, 
              residente e domiciliado(a) no endereço{' '}
              <strong className="text-slate-900">{student.endereco}</strong>, 
              frequenta presencialmente as aulas nesta unidade escolar situada em {institution.endereco}, {institution.cidade}-{institution.uf}, 
              no turno <strong>{student.turno}</strong>, 
              no(a) <strong>{student.anoSerie} do {student.curso}</strong>.
            </p>

            <p>
              <strong>Itinerário / Trajeto regular:</strong> {formData.linhaTransporte || 'Deslocamento obrigatório diário residência-escola-residência.'}
            </p>
            <p>
              <strong>Distância aferida:</strong> {formData.distanciaAproximada || 'Superior a 2 km, fazendo jus ao benefício de passe livre estudantil.'}
            </p>
            <p>
              <strong>Frequência semanal:</strong> {formData.diasPresenciais || 'De Segunda a Sexta-feira em regime integral/regular.'}
            </p>
          </div>
        );

      case 'dec-guarda':
        return (
          <div className="space-y-4 text-justify font-serif-doc text-[13px] leading-relaxed text-slate-800">
            <p>
              Declaramos que consta nos registros oficiais e no prontuário de matrícula do(a) estudante{' '}
              <strong className="text-slate-950 font-bold uppercase">{student.nomeCompleto}</strong>, 
              nascido(a) em <span className="font-mono-code font-semibold">{student.dataNascimento.split('-').reverse().join('/')}</span>, 
              que a guarda e responsabilidade legal perante a instituição escolar são exercidas por{' '}
              <strong className="text-slate-950 font-bold uppercase">{student.responsavelLegal || student.nomeMae}</strong>.
            </p>

            <div className="p-4 border border-slate-300 rounded bg-slate-50">
              <span className="block text-xs font-bold uppercase text-slate-700 mb-2">Pessoas com Autorização Formal de Retirada na Portaria:</span>
              <pre className="font-sans text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                {formData.pessoasAutorizadas || '1) Responsável legal cadastrado;\n2) Familiares previamente autorizados por escrito.'}
              </pre>
            </div>

            <p className="text-xs text-slate-600 italic">
              {formData.restricoes || 'Sem ordens judiciais restritivas arquivadas nesta secretaria escolar.'}
            </p>
          </div>
        );

      case 'dec-domiciliar':
        return (
          <div className="space-y-4 text-justify font-serif-doc text-[13px] leading-relaxed text-slate-800">
            <p>
              Declaramos que ao(à) estudante{' '}
              <strong className="text-slate-950 font-bold uppercase">{student.nomeCompleto}</strong>, 
              RA nº <span className="font-mono-code font-semibold">{student.ra}</span>, 
              regularmente matriculado(a) no <strong>{student.anoSerie} do {student.curso}</strong>, 
              foi concedido o <strong>REGIME DE EXERCÍCIOS DOMICILIARES / ATENDIMENTO PEDAGÓGICO COMPENSATÓRIO</strong>, 
              com fulcro no Decreto-Lei nº 1.044/1969 e na Lei Federal nº 6.202/1975.
            </p>

            <div className="space-y-2 p-3 border border-slate-300 rounded bg-slate-50 text-xs">
              <p><strong>Atestado Médico / Laudo:</strong> {formData.numeroLaudo || 'Atestado Médico Homologado'}</p>
              <p><strong>Período de Afastamento Presencial:</strong> {formData.periodoAfastamento || 'Conforme prescrição médica'}</p>
              <p><strong>Acompanhamento Pedagógico:</strong> {formData.metodologiaAtendimento || 'Envio periódico de roteiros didáticos e avaliações adaptadas.'}</p>
            </div>

            <p>
              A escola assegura ao aluno o direito de cumprimento da carga horária e verificação de aprendizagem por meio de atividades domiciliares tuteladas pelos professores das disciplinas.
            </p>
          </div>
        );

      case 'dec-conduta':
      default:
        return (
          <div className="space-y-4 text-justify font-serif-doc text-[13px] leading-relaxed text-slate-800">
            <p>
              A Direção e o Corpo Pedagógico da <strong className="text-slate-950 uppercase">{institution.nomeEscola}</strong> declaram para os devidos fins de direito que o(a) estudante{' '}
              <strong className="text-slate-950 font-bold uppercase">{student.nomeCompleto}</strong>, 
              RA nº <span className="font-mono-code font-semibold">{student.ra}</span>, 
              portador(a) do RG nº <span className="font-mono-code font-semibold">{student.rg}</span> e CPF nº <span className="font-mono-code font-semibold">{student.cpf}</span>, 
              matriculado(a) nesta unidade escolar no <strong>{student.anoSerie} do {student.curso}</strong>:
            </p>

            <div className="p-4 border border-blue-200 bg-blue-50/40 rounded text-slate-900 leading-relaxed italic">
              "{formData.parecerDisciplinar || 'Manteve sempre conduta exemplar, pautada pela ética, assiduidade, responsabilidade acadêmica e respeito a todas as normas do Regimento Comum Escolar, não constando quaisquer registros ou ocorrências disciplinares que desabonem sua postura.'}"
            </div>

            <p>
              A presente declaração é expedida a pedido do interessado para instrução de processos seletivos, intercâmbios ou admissões onde se faça necessária a comprovação de conduta escolar.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="relative sheet-a4 p-8 sm:p-12 flex flex-col justify-between text-slate-900">
      {/* Marca d'água oficial personalizável */}
      <WatermarkOverlay text={watermark} />

      {/* Conteúdo principal */}
      <div className="relative z-10">
        <DocumentHeader institution={institution} />

        {/* Título Oficial do Documento */}
        <div className="my-8 text-center">
          <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-wide text-slate-950 font-serif-doc underline decoration-1 underline-offset-4">
            {docDef.title}
          </h2>
          <p className="text-[10px] font-mono-code text-slate-500 mt-1 uppercase">
            PROTOCOLO DE EXPEDIÇÃO: <strong>{protocolo}</strong>
          </p>
        </div>

        {/* Corpo Textual */}
        {renderCorpoDeclaracao()}
      </div>

      {/* Rodapé e Assinaturas */}
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
