import React from 'react';
import { InstitutionConfig, Student, DocumentDefinition } from '../types';
import { DeclaracaoTemplate } from './templates/DeclaracaoTemplate';
import { HistoricoEscolarTemplate } from './templates/HistoricoEscolarTemplate';
import { BoletimTemplate } from './templates/BoletimTemplate';
import { DiarioClasseTemplate } from './templates/DiarioClasseTemplate';
import { CertificadoSoleneTemplate } from './templates/CertificadoSoleneTemplate';
import { CertificadoHonraTemplate } from './templates/CertificadoHonraTemplate';
import { AtaOficialTemplate } from './templates/AtaOficialTemplate';
import { OficioTemplate } from './templates/OficioTemplate';
import { RequerimentoTemplate } from './templates/RequerimentoTemplate';
import { CarteirinhaTemplate } from './templates/CarteirinhaTemplate';

interface DocumentRendererProps {
  docDef: DocumentDefinition;
  institution: InstitutionConfig;
  student: Student;
  formData: Record<string, any>;
  protocolo: string;
  codigoAutenticidade: string;
  watermark: string;
}

export const DocumentRenderer: React.FC<DocumentRendererProps> = ({
  docDef,
  institution,
  student,
  formData,
  protocolo,
  codigoAutenticidade,
  watermark,
}) => {
  // Roteia para o template apropriado
  if (docDef.id === 'hist-escolar') {
    return (
      <HistoricoEscolarTemplate
        docDef={docDef}
        institution={institution}
        student={student}
        formData={formData}
        protocolo={protocolo}
        codigoAutenticidade={codigoAutenticidade}
        watermark={watermark}
      />
    );
  }

  if (docDef.id === 'boletim-escolar') {
    return (
      <BoletimTemplate
        docDef={docDef}
        institution={institution}
        student={student}
        formData={formData}
        protocolo={protocolo}
        codigoAutenticidade={codigoAutenticidade}
        watermark={watermark}
      />
    );
  }

  if (docDef.id === 'diario-classe') {
    return (
      <DiarioClasseTemplate
        docDef={docDef}
        institution={institution}
        student={student}
        formData={formData}
        protocolo={protocolo}
        codigoAutenticidade={codigoAutenticidade}
        watermark={watermark}
      />
    );
  }

  if (docDef.id === 'cert-conclusao') {
    return (
      <CertificadoSoleneTemplate
        docDef={docDef}
        institution={institution}
        student={student}
        formData={formData}
        protocolo={protocolo}
        codigoAutenticidade={codigoAutenticidade}
        watermark={watermark}
      />
    );
  }

  if (docDef.id === 'cert-honra' || docDef.id === 'cert-participacao') {
    return (
      <CertificadoHonraTemplate
        docDef={docDef}
        institution={institution}
        student={student}
        formData={formData}
        protocolo={protocolo}
        codigoAutenticidade={codigoAutenticidade}
        watermark={watermark}
      />
    );
  }

  if (docDef.category === 'atas') {
    return (
      <AtaOficialTemplate
        docDef={docDef}
        institution={institution}
        student={student}
        formData={formData}
        protocolo={protocolo}
        codigoAutenticidade={codigoAutenticidade}
        watermark={watermark}
      />
    );
  }

  if (docDef.category === 'oficios') {
    return (
      <OficioTemplate
        docDef={docDef}
        institution={institution}
        student={student}
        formData={formData}
        protocolo={protocolo}
        codigoAutenticidade={codigoAutenticidade}
        watermark={watermark}
      />
    );
  }

  if (docDef.id === 'carteirinha') {
    return (
      <CarteirinhaTemplate
        docDef={docDef}
        institution={institution}
        student={student}
        formData={formData}
        protocolo={protocolo}
        codigoAutenticidade={codigoAutenticidade}
        watermark={watermark}
      />
    );
  }

  if (docDef.category === 'termos' || docDef.id === 'ficha-individual') {
    return (
      <RequerimentoTemplate
        docDef={docDef}
        institution={institution}
        student={student}
        formData={formData}
        protocolo={protocolo}
        codigoAutenticidade={codigoAutenticidade}
        watermark={watermark}
      />
    );
  }

  // Declarações (dec-matricula, dec-frequencia, dec-transferencia, etc.)
  return (
    <DeclaracaoTemplate
      docDef={docDef}
      institution={institution}
      student={student}
      formData={formData}
      protocolo={protocolo}
      codigoAutenticidade={codigoAutenticidade}
      watermark={watermark}
    />
  );
};
