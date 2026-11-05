import React, { useState } from 'react';
import { Printer, GraduationCap, Cloud, Download, ExternalLink, X, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  activeTab: 'editor' | 'students' | 'institution' | 'registry';
  onSelectTab: (tab: 'editor' | 'students' | 'institution' | 'registry') => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onPrint,
}) => {
  const [showDeployModal, setShowDeployModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-6 py-3.5 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center shadow-xs">
              <GraduationCap size={18} />
            </div>
            <button
              onClick={() => onSelectTab('editor')}
              className="text-base font-bold tracking-tight text-slate-950 whitespace-nowrap shrink-0 hover:text-blue-900 transition-colors text-left"
            >
              Minha Secretaria Escolar
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => onSelectTab('editor')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-slate-950 ${
                activeTab === 'editor'
                  ? 'text-blue-900 font-semibold border-b-2 border-blue-900'
                  : 'text-slate-600'
              }`}
            >
              Gerador de Documentos
            </button>
            <button
              onClick={() => onSelectTab('students')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-slate-950 ${
                activeTab === 'students'
                  ? 'text-blue-900 font-semibold border-b-2 border-blue-900'
                  : 'text-slate-600'
              }`}
            >
              Alunos Cadastrados
            </button>
            <button
              onClick={() => onSelectTab('registry')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-slate-950 ${
                activeTab === 'registry'
                  ? 'text-blue-900 font-semibold border-b-2 border-blue-900'
                  : 'text-slate-600'
              }`}
            >
              Livro de Registros
            </button>
            <button
              onClick={() => onSelectTab('institution')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-slate-950 ${
                activeTab === 'institution'
                  ? 'text-blue-900 font-semibold border-b-2 border-blue-900'
                  : 'text-slate-600'
              }`}
            >
              Dados da Escola
            </button>
          </nav>

          {/* Zone 3: Ações Principais */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Botão de Hospedar 24h na Vercel / Baixar ZIP */}
            <button
              onClick={() => setShowDeployModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-lg hover:bg-emerald-100 active:scale-[0.98] transition-all cursor-pointer"
              title="Como colocar no ar 24h na Vercel / Baixar arquivos do projeto"
            >
              <Cloud size={15} className="text-emerald-600" />
              <span>Colocar no Ar 24h (Vercel)</span>
            </button>

            {/* Botão Imprimir / PDF */}
            <button
              onClick={onPrint}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-900 rounded-lg hover:bg-blue-800 active:scale-[0.98] transition-all shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
              title="Imprimir ou Salvar em PDF (Ctrl+P)"
            >
              <Printer size={15} />
              <span>Imprimir / PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Modal Passo a Passo para Hospedar 24h na Vercel */}
      {showDeployModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs no-print">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Cloud size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Como colocar o Sistema no Ar 24 Horas (Vercel)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Gratuito, rápido (3 a 5 min) e não precisa de computador ligado!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDeployModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs text-slate-600 leading-relaxed">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-900">
                <strong className="block font-semibold mb-0.5">Por que o link temporário desliga?</strong>
                O link do editor do Google desliga assim que o computador fecha para economizar recursos. Na <strong>Vercel</strong>, ele fica ligado direto na internet 24h por dia para você e sua equipe acessarem de qualquer lugar.
              </div>

              {/* Passo 1 */}
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Baixe os arquivos do projeto</h4>
                  <p className="mb-2">Clique no botão abaixo para baixar o arquivo completo e compactado (.ZIP) com tudo pronto:</p>
                  <a
                    href="/projeto-secretaria-escolar.zip"
                    download="projeto-secretaria-escolar.zip"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors shadow-xs"
                  >
                    <Download size={14} />
                    <span>Baixar projeto-secretaria-escolar.zip</span>
                  </a>
                </div>
              </div>

              {/* Passo 2 */}
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Crie o repositório no seu GitHub</h4>
                  <p className="mb-2">Descompacte o arquivo zip no seu computador. Depois crie o repositório no seu GitHub e envie os arquivos:</p>
                  <a
                    href="https://github.com/new"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-700 font-semibold hover:underline"
                  >
                    <ExternalLink size={13} />
                    <span>Abrir github.com/new (Criar Repositório)</span>
                  </a>
                  <p className="mt-1 text-slate-500 text-[11px]">Dica: No GitHub, clique em <em>"uploading an existing file"</em> e arraste todos os arquivos da pasta para lá.</p>
                </div>
              </div>

              {/* Passo 3 */}
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">Conecte na Vercel e publique!</h4>
                  <p className="mb-2">Entre na Vercel, clique em <strong>Add New Project</strong> e selecione o repositório que você acabou de criar:</p>
                  <a
                    href="https://vercel.com/new"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-blue-700 font-semibold hover:underline"
                  >
                    <ExternalLink size={13} />
                    <span>Abrir vercel.com/new (Importar e Publicar)</span>
                  </a>
                  <div className="mt-2 flex items-center gap-1.5 text-emerald-700 font-medium text-[11px]">
                    <CheckCircle2 size={13} />
                    <span>O arquivo vercel.json já está incluído no zip, sem precisar configurar nada!</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowDeployModal(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-lg text-xs transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
