import React, { useState } from 'react';
import { Sparkles, X, Check, FileCheck, Wand2 } from 'lucide-react';

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  fieldKey: string;
  contextPrompt: string;
  onApplyText: (text: string) => void;
}

const OFFICIAL_PRESETS: { title: string; text: string; category: string }[] = [
  {
    title: 'Comprovação para Estágio e Jovem Aprendiz',
    category: 'Finalidade',
    text: 'A presente declaração destina-se expressamente à comprovação de escolaridade regular e compatibilidade de turno para fins de admissão em Programa de Aprendizagem / Estágio Curricular Supervisionado, nos termos da Lei Federal nº 11.788/2008.',
  },
  {
    title: 'Passe Livre e Transporte Coletivo',
    category: 'Finalidade',
    text: 'Comprovação de vínculo estudantil presencial para requisição e cadastramento do benefício de passe livre / gratuidade nos transportes públicos municipais e metropolitanos no exercício corrente.',
  },
  {
    title: 'Programas Sociais (Bolsa Família / Pé-de-Meia)',
    category: 'Finalidade',
    text: 'Comprovação formal de matrícula ativa e frequência escolar mínima de 85% para fins de manutenção e acompanhamento das condicionalidades do Programa Bolsa Família e Programa Pé-de-Meia do Governo Federal.',
  },
  {
    title: 'Matrícula Universitária / Vestibular',
    category: 'Finalidade',
    text: 'Comprovação provisória de conclusão do Ensino Médio para instrução de matrícula acadêmica definitiva em instituição de ensino superior até a emissão e expedição do Histórico Escolar oficial.',
  },
  {
    title: 'Comunicação Formal de Infrequência ao Conselho Tutelar',
    category: 'Ofícios',
    text: 'Comunicamos a Vossa Senhoria que, esgotadas todas as tentativas de mediação pedagógica, contatos telefônicos e visitas domiciliares sem retorno dos responsáveis, o menor acumula faltas consecutivas injustificadas, ensejando a intervenção protetiva desse zeloso órgão com fulcro no Art. 56, II da Lei 8.069/1990.',
  },
  {
    title: 'Advertência por Uso Indevido de Aparelho Eletrônico',
    category: 'Disciplinar',
    text: 'Constatado o descumprimento das orientações do docente e do Regimento Comum Escolar quanto ao uso indevido de aparelho celular em sala durante momento de avaliação acadêmica, aplica-se a medida educativa de advertência escrita com imediata ciência aos responsáveis legais.',
  },
];

export const AiAssistantModal: React.FC<AiAssistantModalProps> = ({
  isOpen,
  onClose,
  fieldKey,
  contextPrompt,
  onApplyText,
}) => {
  const [selectedText, setSelectedText] = useState('');
  const [customInput, setCustomInput] = useState('');

  if (!isOpen) return null;

  const handleApply = (text: string) => {
    onApplyText(text);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 space-y-5 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-50 text-blue-900 rounded-lg">
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-950">
                Assistente de Redação Oficial Escolar
              </h3>
              <p className="text-[11px] text-slate-500">
                Modelos de frases e justificativas com fé pública segundo o Manual de Redação Oficial.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Sugestões Prontas da Secretaria */}
        <div className="space-y-3">
          <span className="font-bold text-slate-900 uppercase text-[10.5px] block">
            Fórmulas Oficiais Pré-Aprovadas (Clique para Usar)
          </span>

          <div className="space-y-2.5">
            {OFFICIAL_PRESETS.map((preset, i) => (
              <div
                key={i}
                className="p-3 border border-slate-200 rounded-lg hover:border-blue-900/40 hover:bg-blue-50/30 transition-all cursor-pointer group"
                onClick={() => setSelectedText(preset.text)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900 group-hover:text-blue-950">
                    {preset.title}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {preset.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {preset.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pré-visualização ou Edição do Texto Escolhido */}
        {selectedText && (
          <div className="pt-3 border-t border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 block text-[11px]">
              Texto Selecionado para Inserção:
            </span>
            <textarea
              rows={3}
              value={selectedText}
              onChange={(e) => setSelectedText(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => handleApply(selectedText)}
                className="px-4 py-2 bg-blue-900 text-white rounded-lg font-bold text-xs hover:bg-blue-800 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Check size={14} />
                <span>Inserir no Documento</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
