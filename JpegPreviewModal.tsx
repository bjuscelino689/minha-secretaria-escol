import React from 'react';
import { X, Download, Check, Image as ImageIcon } from 'lucide-react';

interface JpegPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  documentTitle: string;
  studentName: string;
}

export const JpegPreviewModal: React.FC<JpegPreviewModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  documentTitle,
  studentName,
}) => {
  if (!isOpen || !imageUrl) return null;

  const fileName = `${documentTitle.replace(/\s+/g, '_')}_${(studentName || 'aluno').replace(/\s+/g, '_')}.jpg`;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col">
        {/* Topo do Modal */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-100 text-emerald-900 rounded-lg">
              <ImageIcon size={18} />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-950">
                Documento Convertido para Imagem JPEG
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Alta resolução pronta para envio por WhatsApp, e-mail ou arquivamento.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Pré-visualização da imagem gerada */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-100 flex items-center justify-center">
          <div className="border border-slate-300 shadow-md rounded-lg overflow-hidden max-w-full bg-white">
            <img
              src={imageUrl}
              alt="Documento Escolar em JPEG"
              className="max-h-[60vh] object-contain mx-auto"
            />
          </div>
        </div>

        {/* Rodapé com Ações */}
        <div className="p-4 border-t border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-[11px] text-slate-500 italic">
            * Dica: Você também pode clicar com o botão direito na imagem e escolher "Salvar imagem como..."
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-semibold transition-colors"
            >
              Fechar
            </button>
            <button
              onClick={handleDownload}
              className="px-5 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download size={14} />
              <span>Baixar Arquivo JPEG</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
