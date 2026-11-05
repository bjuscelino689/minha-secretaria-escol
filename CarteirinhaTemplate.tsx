import React from 'react';
import { InstitutionConfig, Student, DocumentDefinition } from '../../types';
import { BrasaoEscola } from '../BrasaoEscola';
import { WatermarkOverlay } from '../WatermarkOverlay';
import { User } from 'lucide-react';

interface CarteirinhaProps {
  docDef: DocumentDefinition;
  institution: InstitutionConfig;
  student: Student;
  formData: Record<string, any>;
  protocolo: string;
  codigoAutenticidade: string;
  watermark?: string;
}

export const CarteirinhaTemplate: React.FC<CarteirinhaProps> = ({
  institution,
  student,
  formData,
  protocolo,
  codigoAutenticidade,
  watermark,
}) => {
  return (
    <div className="relative sheet-a4 p-8 sm:p-12 flex flex-col justify-start items-center text-slate-900 bg-white">
      <WatermarkOverlay text={watermark} />
      {/* Guia explicativa de recorte */}
      <div className="w-full max-w-xl text-center mb-6 border-b border-dashed border-slate-300 pb-3 no-print">
        <h3 className="font-bold text-sm text-slate-800 uppercase">
          Carteira de Estudante Provisória / Identidade Escolar
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Folha de impressão em papel formato A4. Recorte na linha pontilhada e dobre ao meio para plastificação.
        </p>
      </div>

      {/* Cartão Estudantil - Frente e Verso Lado a Lado (Padrão CR80 / 85x54mm) */}
      <div className="border-2 border-dashed border-slate-400 p-4 rounded-lg bg-slate-50/50 flex flex-wrap gap-6 items-center justify-center">
        {/* FRENTE DA CARTEIRINHA */}
        <div className="w-[340px] h-[216px] bg-gradient-to-br from-blue-900 via-blue-950 to-slate-950 text-white rounded-xl shadow-md p-3.5 flex flex-col justify-between relative overflow-hidden border border-blue-800">
          {/* Marca d'água de fundo (apenas se brasão estiver ativado) */}
          {institution.mostrarBrasao && (
            <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none">
              <BrasaoEscola tipo={institution.brasaoTipo || 'maranhao'} size={160} />
            </div>
          )}

          {/* Topo: Brasão SEDUC-MA (se ativado) + Nome da Escola */}
          <div className="flex items-center gap-2 border-b border-blue-400/30 pb-2 relative z-10">
            {institution.mostrarBrasao && (
              <div className="p-0.5 bg-white/20 rounded-full backdrop-blur-xs shrink-0">
                <BrasaoEscola tipo={institution.brasaoTipo || 'maranhao'} size={28} className="text-white" />
              </div>
            )}
            <div className="leading-tight overflow-hidden">
              <span className="text-[7.5px] uppercase tracking-wider text-blue-200 block truncate">
                {institution.orgaoSuperior}
              </span>
              <span className="text-[9.5px] font-bold uppercase tracking-tight text-white block truncate">
                {institution.nomeEscola}
              </span>
            </div>
          </div>

          {/* Meio: Foto 3x4 + Dados Principais */}
          <div className="flex gap-3 items-center relative z-10 my-1">
            {/* Foto 3x4 Placeholder */}
            <div className="w-16 h-20 bg-slate-800 border-2 border-white/60 rounded flex flex-col items-center justify-center text-slate-400 shrink-0">
              <User size={28} />
              <span className="text-[7px] uppercase mt-1 font-mono-code">FOTO 3x4</span>
            </div>

            {/* Dados do Aluno */}
            <div className="flex-1 text-[8.5px] space-y-0.5 leading-snug">
              <div>
                <span className="text-blue-300 text-[7px] uppercase block">Nome do Estudante:</span>
                <span className="font-bold text-white text-[10px] block truncate">{student.nomeCompleto}</span>
              </div>
              <div className="grid grid-cols-2 gap-1 pt-0.5">
                <div>
                  <span className="text-blue-300 text-[6.5px] uppercase block">RA:</span>
                  <span className="font-mono-code font-bold text-white">{student.ra}</span>
                </div>
                <div>
                  <span className="text-blue-300 text-[6.5px] uppercase block">Nascimento:</span>
                  <span className="font-mono-code">{student.dataNascimento.split('-').reverse().join('/')}</span>
                </div>
                <div>
                  <span className="text-blue-300 text-[6.5px] uppercase block">Curso/Série:</span>
                  <span className="truncate block font-semibold">{student.anoSerie}</span>
                </div>
                <div>
                  <span className="text-blue-300 text-[6.5px] uppercase block">Turno:</span>
                  <span>{student.turno}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rodapé: Validade e Meia Entrada */}
          <div className="flex items-center justify-between border-t border-blue-400/30 pt-1.5 relative z-10 text-[7.5px]">
            <span className="text-amber-300 font-bold tracking-wider uppercase">IDENTIDADE ESTUDANTIL</span>
            <span className="font-mono-code text-blue-200">
              VÁLIDA ATÉ: <strong className="text-white">{formData.validadeCartao || '31/03/2027'}</strong>
            </span>
          </div>
        </div>

        {/* VERSO DA CARTEIRINHA */}
        <div className="w-[340px] h-[216px] bg-white text-slate-900 rounded-xl shadow-md p-3.5 flex flex-col justify-between border border-slate-300">
          <div>
            <div className="flex justify-between items-center border-b border-slate-200 pb-1 text-[8px] font-mono-code text-slate-600">
              <span>MATRÍCULA: <strong className="text-slate-900">{student.matricula}</strong></span>
              <span>RH: <strong className="text-red-700">{formData.fatorRh || 'O+'}</strong></span>
              <span>VIA: <strong>{formData.viaNumero || '1ª Via'}</strong></span>
            </div>

            <div className="grid grid-cols-2 gap-1 text-[8px] my-2 text-slate-700">
              <div>
                <span className="text-slate-500 text-[6.5px] uppercase block">RG:</span>
                <span className="font-mono-code font-semibold">{student.rg}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[6.5px] uppercase block">CPF:</span>
                <span className="font-mono-code font-semibold">{student.cpf}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 text-[6.5px] uppercase block">Filiação:</span>
                <span className="truncate block">{student.nomeMae}</span>
              </div>
            </div>
          </div>

          {/* Código de barras simulado em SVG */}
          <div className="my-1 text-center">
            <svg viewBox="0 0 200 24" className="w-full h-6 mx-auto">
              {Array.from({ length: 48 }).map((_, i) => (
                <rect
                  key={i}
                  x={i * 4 + (i % 3 === 0 ? 1 : 0)}
                  y="0"
                  width={i % 4 === 0 ? 2.5 : i % 2 === 0 ? 1.5 : 0.8}
                  height="24"
                  fill="black"
                />
              ))}
            </svg>
            <span className="font-mono-code text-[7px] text-slate-500 tracking-widest block">
              {formData.codigoBarrasSimulado || `2026${institution.codigoInep}${student.matricula.replace(/\D/g, '')}`}
            </span>
          </div>

          {/* Validação e Assinatura */}
          <div className="flex items-center justify-between border-t border-slate-200 pt-1.5 text-[7px] text-slate-600">
            <div className="font-mono-code text-[6.5px] leading-tight">
              <span className="text-slate-400">CHAVE DE AUTENTICIDADE:</span>
              <span className="block font-bold text-slate-800">{codigoAutenticidade.slice(0, 14)}</span>
            </div>
            <div className="text-right">
              <div className="w-24 border-b border-slate-400 mb-0.5"></div>
              <span className="font-bold text-[7px] text-slate-800 block truncate">{institution.diretorNome}</span>
              <span className="text-[6px] text-slate-500">Direção Geral</span>
            </div>
          </div>
        </div>
      </div>

      {/* Orientações Legais da Carteirinha */}
      <div className="w-full max-w-xl mt-8 pt-4 border-t border-slate-300 text-slate-600 text-[10px] space-y-1 text-justify font-serif-doc">
        <p>
          <strong>Fundamentação Legal:</strong> Documento de identificação estudantil expedido em consonância com a Lei Federal nº 12.852/2013 (Estatuto da Juventude) e Lei Federal nº 12.933/2013, garantindo o benefício de 50% de desconto (meia-entrada) em espetáculos artístico-culturais, esportivos e cinemas em todo o território nacional.
        </p>
        <p className="text-slate-500 text-[9px] italic">
          * Em caso de perda ou extravio, comunique imediatamente a Secretaria da Escola para cancelamento da chave digital e emissão da 2ª via.
        </p>
      </div>
    </div>
  );
};
