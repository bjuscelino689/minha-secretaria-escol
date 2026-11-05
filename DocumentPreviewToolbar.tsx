import React, { useState } from 'react';
import { 
  Printer, 
  BookmarkPlus, 
  ZoomIn, 
  ZoomOut, 
  Copy, 
  Check, 
  FileCheck, 
  FileDown, 
  Image as ImageIcon, 
  Loader2,
  Stamp,
  Shield,
  AlignLeft,
  AlignCenter,
  AlignRight,
  X
} from 'lucide-react';

interface PreviewToolbarProps {
  onPrint: () => void;
  onSaveJpeg: () => void;
  isGeneratingJpeg?: boolean;
  onSaveToRegistry: () => void;
  watermark: string;
  onSelectWatermark: (val: string) => void;
  studentName?: string;
  schoolName?: string;
  mostrarBrasao?: boolean;
  brasaoPosicao?: 'esquerda' | 'centro' | 'direita';
  onChangeBrasaoPosicao?: (pos: 'esquerda' | 'centro' | 'direita') => void;
  onToggleBrasao?: () => void;
  mostrarCarimbo?: boolean;
  onToggleCarimbo?: () => void;
  mostrarQrCode?: boolean;
  onToggleQrCode?: () => void;
  zoom: number;
  onZoomChange: (val: number) => void;
  protocolo: string;
  onCopyContent: () => void;
  isRegistered?: boolean;
}

export const DocumentPreviewToolbar: React.FC<PreviewToolbarProps> = ({
  onPrint,
  onSaveJpeg,
  isGeneratingJpeg = false,
  onSaveToRegistry,
  watermark,
  onSelectWatermark,
  studentName,
  schoolName,
  mostrarBrasao = false,
  brasaoPosicao = 'esquerda',
  onChangeBrasaoPosicao,
  onToggleBrasao,
  mostrarCarimbo,
  onToggleCarimbo,
  mostrarQrCode,
  onToggleQrCode,
  zoom,
  onZoomChange,
  protocolo,
  onCopyContent,
  isRegistered = false,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopyContent();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isWatermarkActive = watermark && watermark !== 'NENHUMA' && watermark.trim() !== '';

  return (
    <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs no-print shadow-2xs z-20">
      {/* Lado Esquerdo: Identificador de Protocolo e Controles de Visualização */}
      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-md font-mono-code font-bold text-slate-800 text-[11px]">
          <span className="text-slate-400 font-normal">PROT:</span>
          <span>{protocolo}</span>
        </div>

        {/* Zoom */}
        <div className="hidden sm:flex items-center gap-1 border-l border-slate-200 pl-2.5">
          <button
            onClick={() => onZoomChange(Math.max(0.6, zoom - 0.1))}
            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors cursor-pointer"
            title="Reduzir Visualização"
          >
            <ZoomOut size={14} />
          </button>
          <span className="text-[11px] font-mono-code text-slate-600 w-9 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => onZoomChange(Math.min(1.4, zoom + 0.1))}
            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded transition-colors cursor-pointer"
            title="Aumentar Visualização"
          >
            <ZoomIn size={14} />
          </button>
        </div>

        {/* Digitar Nome para Marca d'Água */}
        <div className="flex items-center gap-1.5 border-l border-slate-200 pl-2.5">
          <span className="text-[11px] font-semibold text-slate-700 flex items-center gap-1">
            <Stamp size={13} className="text-blue-900" />
            <span className="hidden xl:inline">Marca d'Água:</span>
          </span>

          <div className="relative flex items-center">
            <input
              type="text"
              list="watermark-quick-presets"
              value={watermark === 'NENHUMA' ? '' : watermark}
              onChange={(e) => onSelectWatermark(e.target.value)}
              placeholder="Digitar nome da marca d'água..."
              className="w-40 sm:w-52 md:w-60 px-2 py-1 text-[11px] font-medium bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-900 focus:border-blue-900 transition-colors pr-6"
              title="Digite qualquer nome ou texto para aparecer como marca d'água no fundo do documento"
            />
            {isWatermarkActive ? (
              <button
                type="button"
                onClick={() => onSelectWatermark('NENHUMA')}
                className="absolute right-1 text-slate-400 hover:text-red-600 p-0.5 cursor-pointer rounded"
                title="Remover marca d'água"
              >
                <X size={12} />
              </button>
            ) : null}
          </div>

          <datalist id="watermark-quick-presets">
            {studentName && <option value={studentName.toUpperCase()}>Nome do Aluno: {studentName}</option>}
            {schoolName && <option value={schoolName.toUpperCase()}>Nome da Escola: {schoolName}</option>}
            <option value="2ª VIA">2ª VIA</option>
            <option value="CÓPIA AUTÊNTICA">CÓPIA AUTÊNTICA</option>
            <option value="DOCUMENTO OFICIAL">DOCUMENTO OFICIAL</option>
            <option value="CONFIDENCIAL">CONFIDENCIAL</option>
            <option value="SECRETARIA ESCOLAR">SECRETARIA ESCOLAR</option>
            <option value="RASCUNHO">RASCUNHO</option>
          </datalist>

          {/* Atalho rápido para colocar o nome do aluno com 1 clique */}
          {studentName && (
            <button
              type="button"
              onClick={() => onSelectWatermark(studentName.toUpperCase())}
              className="hidden lg:inline-flex items-center px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-900 font-semibold rounded text-[10px] border border-blue-200 transition-colors cursor-pointer"
              title={`Usar nome do aluno (${studentName}) na marca d'água`}
            >
              + Nome do Aluno
            </button>
          )}
        </div>
      </div>

      {/* Lado Direito: Ações de Cópia, Livro de Registros e Salvar em JPEG e PDF */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Toggle Brasão da Secretaria de Educação do Maranhão */}
        {onToggleBrasao && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onToggleBrasao}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                mostrarBrasao
                  ? 'bg-amber-100 text-amber-950 border border-amber-400 font-bold shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
              title={mostrarBrasao ? 'Clique para remover o brasão' : 'Clique para adicionar o Brasão da Secretaria de Educação do Maranhão'}
            >
              <Shield size={13} className={mostrarBrasao ? 'text-amber-800' : 'text-slate-500'} />
              <span>{mostrarBrasao ? 'Brasão SEDUC-MA' : '+ Adicionar Brasão'}</span>
            </button>

            {/* Seletor Rápido de Posição do Brasão (Esquerda, Centro, Direita) */}
            {mostrarBrasao && onChangeBrasaoPosicao && (
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                <button
                  type="button"
                  onClick={() => onChangeBrasaoPosicao('esquerda')}
                  title="Posicionar Brasão à Esquerda (Padrão)"
                  className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                    brasaoPosicao === 'esquerda'
                      ? 'bg-blue-900 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <AlignLeft size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => onChangeBrasaoPosicao('centro')}
                  title="Posicionar Brasão ao Centro"
                  className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                    brasaoPosicao === 'centro'
                      ? 'bg-blue-900 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <AlignCenter size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => onChangeBrasaoPosicao('direita')}
                  title="Posicionar Brasão à Direita"
                  className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                    brasaoPosicao === 'direita'
                      ? 'bg-blue-900 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <AlignRight size={13} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Copiar Texto */}
        <button
          onClick={handleCopy}
          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
          title="Copiar texto do documento"
        >
          {copied ? <Check size={14} className="text-emerald-700" /> : <Copy size={14} />}
        </button>

        {/* Salvar no Livro de Registros */}
        <button
          onClick={onSaveToRegistry}
          className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            isRegistered
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
          title="Gravar no Livro Permanente de Registros"
        >
          {isRegistered ? <FileCheck size={13} /> : <BookmarkPlus size={13} />}
          <span>{isRegistered ? 'No Livro' : 'Gravar no Livro'}</span>
        </button>

        {/* BOTÃO 1: SALVAR EM JPEG (IMAGEM) */}
        <button
          type="button"
          onClick={onSaveJpeg}
          disabled={isGeneratingJpeg}
          className="px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-700 active:scale-[0.98] rounded-lg transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer disabled:opacity-70"
          title="Salvar e baixar o documento em imagem JPEG"
        >
          {isGeneratingJpeg ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <ImageIcon size={14} />
          )}
          <span>{isGeneratingJpeg ? 'Gerando...' : 'Salvar em JPEG'}</span>
        </button>

        {/* BOTÃO 2: SALVAR EM PDF */}
        <button
          type="button"
          onClick={onPrint}
          className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 active:scale-[0.98] rounded-lg transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
          title="Imprimir ou Salvar diretamente em arquivo PDF (Ctrl+P)"
        >
          <FileDown size={14} />
          <span>Salvar em PDF</span>
        </button>
      </div>
    </div>
  );
};
