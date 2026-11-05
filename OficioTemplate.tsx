import React from 'react';
import { InstitutionConfig, Student, DocumentDefinition } from '../../types';
import { DocumentHeader } from '../DocumentHeader';
import { DocumentFooter } from '../DocumentFooter';
import { WatermarkOverlay } from '../WatermarkOverlay';

interface OficioTemplateProps {
  docDef: DocumentDefinition;
  institution: InstitutionConfig;
  student?: Student;
  formData: Record<string, any>;
  protocolo: string;
  codigoAutenticidade: string;
  watermark?: string;
}

export const OficioTemplate: React.FC<OficioTemplateProps> = ({
  docDef,
  institution,
  student,
  formData,
  protocolo,
  codigoAutenticidade,
  watermark,
}) => {
  const renderCorpoOficio = () => {
    switch (docDef.id) {
      case 'oficio-padrao':
        return (
          <div className="space-y-4 text-justify font-serif-doc text-[13px] leading-relaxed text-slate-800">
            {/* Destinatário */}
            <div className="mb-6 space-y-0.5 text-xs font-sans not-italic">
              <p>Ao(À) Excelentíssimo(a) Senhor(a)</p>
              <p className="font-bold text-slate-950 text-sm">{formData.destinatarioNome || 'Dirigente Regional de Ensino'}</p>
              <p className="text-slate-700">{formData.destinatarioCargo || 'Diretoria Regional de Ensino'}</p>
              <p className="text-slate-600">{formData.destinatarioOrgao || 'Secretaria de Estado da Educação'}</p>
            </div>

            <div className="p-2.5 bg-slate-100 border-l-2 border-slate-900 text-xs font-sans">
              <strong>ASSUNTO:</strong> {formData.assunto || 'Comunicação Oficial'}
            </div>

            <p className="font-bold">{formData.vocativo || 'Senhor(a) Dirigente,'}</p>

            <div className="space-y-4">
              <p className="whitespace-pre-wrap">{formData.corpoTexto || 'Texto do ofício formal.'}</p>
            </div>

            <p className="pt-4">{formData.fecho || 'Respeitosamente,'}</p>
          </div>
        );

      case 'oficio-tutelar':
        return (
          <div className="space-y-4 text-justify font-serif-doc text-[12.5px] leading-relaxed text-slate-800">
            <div className="mb-4 text-xs font-sans">
              <p>Ao Ilustríssimo Colegiado do</p>
              <p className="font-bold text-slate-950 text-sm">{formData.destinatarioNome || 'Conselho Tutelar da Comarca'}</p>
              <p className="text-slate-600">Assunto: COMUNICAÇÃO DE EVASÃO / INFREQUÊNCIA ESCOLAR REITERADA (Art. 56, II do ECA)</p>
            </div>

            <p>
              Senhores(as) Conselheiros(as) Tutelares,
            </p>

            <p>
              Cumprimentando-os cordialmente, vimos pelo presente, com fundamento no Artigo 56, Inciso II da Lei Federal nº 8.069/1990 (Estatuto da Criança e do Adolescente), comunicar formalmente a situação de infrequência escolar grave do(a) educando(a):
            </p>

            <div className="p-3 bg-slate-50 border border-slate-300 rounded font-sans text-xs space-y-1">
              <p><strong>Nome do Menor:</strong> {student?.nomeCompleto || 'Nome do Estudante'}</p>
              <p><strong>Filiação:</strong> {student?.nomeMae || 'Nome da Mãe'} / {student?.nomePai || 'Não Consta'}</p>
              <p><strong>Endereço Residencial:</strong> {student?.endereco || 'Endereço Completo'}</p>
              <p><strong>Turma / Série:</strong> {student?.anoSerie} - {student?.turma} ({student?.turno})</p>
              <p><strong>Quadro de Faltas:</strong> <span className="text-red-700 font-bold">{formData.faltasConsecutivas || 'Faltas reiteradas sem justificativa'}</span></p>
            </div>

            <p>
              <strong>MEDIDAS PEDAGÓGICAS E ADMINISTRATIVAS JÁ ADOTADAS PELA ESCOLA:</strong>
            </p>
            <div className="p-3 bg-slate-50 border border-slate-300 rounded font-sans text-xs">
              <pre className="whitespace-pre-wrap font-sans text-slate-800 leading-relaxed">
                {formData.medidasInternasAdotadas || '1) Contatos telefônicos frustrados;\n2) Notificação por carta;\n3) Tentativa de acolhimento pedagógico.'}
              </pre>
            </div>

            <p>
              {formData.pedidoTutelar || 'Esgotadas as providências internas desta unidade escolar, solicitamos a nobre e indispensável intervenção desse Conselho para a garantia e preservação do direito à educação.'}
            </p>
          </div>
        );

      case 'notif-convocacao':
        return (
          <div className="space-y-4 text-justify font-serif-doc text-[13px] leading-relaxed text-slate-800">
            <p>
              Aos Senhores Pais ou Responsáveis Legais pelo(a) estudante:{' '}
              <strong className="text-slate-950 uppercase">{student?.nomeCompleto || 'Estudante'}</strong>, 
              matriculado(a) no(a) <strong>{student?.anoSerie} ({student?.turma})</strong>:
            </p>

            <div className="p-4 bg-amber-50/70 border border-amber-300 rounded font-sans text-xs text-slate-900 space-y-2">
              <p className="text-center font-bold text-sm uppercase text-amber-950">CONVOCAÇÃO DE COMPARECIMENTO OBRIGATÓRIO</p>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-amber-200">
                <p><strong>Data:</strong> {formData.dataComparecimento ? formData.dataComparecimento.split('-').reverse().join('/') : 'A definir'}</p>
                <p><strong>Horário:</strong> {formData.horarioComparecimento || '10:00 horas'}</p>
                <p className="col-span-2"><strong>Local/Setor:</strong> {formData.setorAtendimento || 'Coordenação Pedagógica e Direção'}</p>
              </div>
            </div>

            <p>
              <strong>Motivo / Pauta do Atendimento:</strong> {formData.assuntoPauta || 'Alinhamento urgente sobre o rendimento e comportamento escolar do estudante.'}
            </p>

            <p className="text-xs text-slate-600 italic">
              {formData.alertaLegal || 'O comparecimento é indispensável para o acompanhamento da vida escolar de seu dependente nos termos do Art. 22 do Estatuto da Criança e do Adolescente.'}
            </p>
          </div>
        );

      case 'notif-disciplinar':
        return (
          <div className="space-y-4 text-justify font-serif-doc text-[12.5px] leading-relaxed text-slate-800">
            <p>
              Registra-se no prontuário disciplinar do(a) estudante{' '}
              <strong className="text-slate-950 uppercase">{student?.nomeCompleto || 'Estudante'}</strong>, 
              RA nº <span className="font-mono-code font-bold">{student?.ra}</span>, 
              turma <strong>{student?.anoSerie} ({student?.turma})</strong>, a ocorrência disciplinar formalizada nesta data:
            </p>

            <div className="p-3 bg-red-50/60 border border-red-300 rounded font-sans text-xs space-y-1.5 text-slate-900">
              <p><strong>Data do Fato:</strong> {(formData.dataOcorrencia || new Date().toISOString().split('T')[0]).split('-').reverse().join('/')}</p>
              <p><strong>Dispositivo Regimental Incorrido:</strong> {formData.artigoRegimento || 'Artigo do Regimento Escolar'}</p>
              <p><strong>Medida Educativa / Penalidade:</strong> <strong className="text-red-900">{formData.medidaAplicada || 'Advertência Escolar Escrita'}</strong></p>
            </div>

            <p>
              <strong>RELATO CIRCUNSTANCIADO DO FATO:</strong>
            </p>
            <div className="p-3 bg-slate-50 border border-slate-300 rounded font-sans text-xs leading-relaxed text-slate-800">
              {formData.descricaoFato || 'Relato da conduta incompatível com as normas regimentais da escola.'}
            </div>

            <p>
              O presente termo visa conscientizar o aluno sobre seus deveres de convivência harmônica e comunicar formalmente aos responsáveis legais a fim de alinhamento conjunto.
            </p>
          </div>
        );

      case 'comunicado-geral':
      default:
        return (
          <div className="space-y-4 text-justify font-serif-doc text-[13px] leading-relaxed text-slate-800">
            <div className="p-3 bg-slate-100 border border-slate-300 rounded text-center font-sans font-bold text-sm text-slate-900 uppercase">
              {formData.assunto || 'COMUNICADO OFICIAL À COMUNIDADE ESCOLAR'}
            </div>

            <div className="whitespace-pre-wrap font-serif-doc text-[13.5px] leading-relaxed text-slate-800 py-4">
              {formData.corpoTexto || 'Conteúdo do comunicado circular da escola.'}
            </div>

            <p className="text-right text-xs text-slate-600">
              Atenciosamente,<br />
              <strong className="text-slate-950 uppercase">{institution.nomeEscola}</strong>
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

        <div className="my-6 flex items-center justify-between border-b border-slate-900 pb-2">
          <div>
            <h2 className="text-base font-extrabold uppercase tracking-wide text-slate-950 font-serif-doc">
              {docDef.title}
            </h2>
            <p className="text-[10px] font-mono-code text-slate-600 mt-0.5">
              {formData.numeroOficio || formData.numeroCircular || `PROT: ${protocolo}`}
            </p>
          </div>
          <span className="text-xs font-mono-code text-slate-500 uppercase">
            REG. SECRETARIA
          </span>
        </div>

        {renderCorpoOficio()}
      </div>

      <div className="relative z-10">
        <DocumentFooter
          institution={institution}
          dataEmissao={formData.dataEmissao}
          protocolo={protocolo}
          codigoAutenticidade={codigoAutenticidade}
          includeResponsibleSignature={docDef.id === 'notif-convocacao' || docDef.id === 'notif-disciplinar'}
          responsibleName={student?.responsavelLegal || student?.nomeMae}
          responsibleRole="Responsável Legal (Ciência Expressa)"
          mostrarCarimbo={institution.mostrarCarimbo}
          mostrarQrCode={institution.mostrarQrCode}
        />
      </div>
    </div>
  );
};
