import React, { useState, useEffect } from 'react';
import { InstitutionConfig } from '../types';
import { BrasaoEscola } from './BrasaoEscola';
import { School, Check, RotateCcw, Save, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { defaultInstitution } from '../data/mockData';

interface InstitutionSettingsProps {
  institution: InstitutionConfig;
  onUpdateInstitution: (updated: InstitutionConfig) => void;
}

export const InstitutionSettings: React.FC<InstitutionSettingsProps> = ({
  institution,
  onUpdateInstitution,
}) => {
  const [form, setForm] = useState<InstitutionConfig>(institution);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    if (institution) {
      setForm(institution);
    }
  }, [institution]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      localStorage.setItem('mse_institution', JSON.stringify(form));
    } catch (err) {
      console.warn('Erro ao salvar no localStorage:', err);
    }
    onUpdateInstitution(form);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3500);
  };

  const handleResetDefaults = () => {
    setForm(defaultInstitution);
    try {
      localStorage.setItem('mse_institution', JSON.stringify(defaultInstitution));
    } catch (err) {
      console.warn(err);
    }
    onUpdateInstitution(defaultInstitution);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2">
            <School size={20} className="text-blue-900" />
            <span>Dados Oficiais do Estabelecimento de Ensino</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Estas informações compõem o papel timbrado, cabeçalho oficial, chancelas e rodapé de todos os documentos emitidos.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetDefaults}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw size={13} />
          <span>Restaurar Padrão</span>
        </button>
      </div>

      {savedNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-900 text-xs font-semibold flex items-center gap-2">
          <Check size={16} />
          <span>Dados institucionais da escola salvos com sucesso! Todos os documentos foram atualizados.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-6 text-xs">
        {/* Escolha do Brasão: Sem Brasão por Padrão ou Brasão SEDUC-MA */}
        <div className="space-y-3 pb-5 border-b border-slate-200">
          <label className="font-bold text-slate-900 uppercase text-[11px] block">
            Brasão Oficial do Papel Timbrado e Documentos
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Opção 1: Sem Brasão */}
            <button
              type="button"
              onClick={() => setForm({ ...form, mostrarBrasao: false })}
              className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer text-left ${
                !form.mostrarBrasao
                  ? 'border-blue-900 bg-blue-50/70 ring-2 ring-blue-900/20'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 font-bold text-xs shrink-0">
                ∅
              </div>
              <div>
                <span className="font-bold text-slate-950 block text-xs">
                  Sem Brasão (Excluir Brasões)
                </span>
                <span className="text-[10.5px] text-slate-500 block">
                  Documento limpo e direto com identificação textual da escola.
                </span>
              </div>
            </button>

            {/* Opção 2: Brasão Oficial SEDUC - Maranhão */}
            <button
              type="button"
              onClick={() => setForm({ ...form, mostrarBrasao: true, brasaoTipo: 'maranhao' })}
              className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer text-left ${
                form.mostrarBrasao && form.brasaoTipo === 'maranhao'
                  ? 'border-blue-900 bg-blue-50/70 ring-2 ring-blue-900/20'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="shrink-0">
                <BrasaoEscola tipo="maranhao" size={44} />
              </div>
              <div>
                <span className="font-bold text-slate-950 block text-xs">
                  Brasão Oficial SEDUC - Maranhão
                </span>
                <span className="text-[10.5px] text-slate-500 block">
                  Secretaria de Estado da Educação do Maranhão (Símbolo Oficial).
                </span>
              </div>
            </button>
          </div>

          {/* Configuração de Posição do Brasão (Esquerda, Centro, Direita) */}
          {form.mostrarBrasao && (
            <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-slate-900 block text-xs">
                    Posição do Brasão no Cabeçalho
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Exibe exatamente 1 (um) brasão na posição escolhida.
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, brasaoPosicao: 'esquerda' })}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      (form.brasaoPosicao || 'esquerda') === 'esquerda'
                        ? 'bg-blue-900 text-white border-blue-900 shadow-2xs font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <AlignLeft size={13} />
                    <span>Esquerda (Padrão)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, brasaoPosicao: 'centro' })}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      form.brasaoPosicao === 'centro'
                        ? 'bg-blue-900 text-white border-blue-900 shadow-2xs font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <AlignCenter size={13} />
                    <span>Centro</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, brasaoPosicao: 'direita' })}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                      form.brasaoPosicao === 'direita'
                        ? 'bg-blue-900 text-white border-blue-900 shadow-2xs font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <AlignRight size={13} />
                    <span>Direita</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Identificação Geral da Instituição */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="font-semibold text-slate-700 block mb-1">Nome Completo da Escola *</label>
            <input
              type="text"
              required
              value={form.nomeEscola}
              onChange={(e) => setForm({ ...form, nomeEscola: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-950 font-bold uppercase"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Órgão Superior Mantenedor *</label>
            <input
              type="text"
              required
              value={form.orgaoSuperior}
              onChange={(e) => setForm({ ...form, orgaoSuperior: e.target.value })}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 uppercase"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Sub-Órgão / Diretoria Regional de Ensino</label>
            <input
              type="text"
              value={form.subOrgao}
              onChange={(e) => setForm({ ...form, subOrgao: e.target.value })}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 uppercase"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Código INEP / MEC *</label>
            <input
              type="text"
              required
              value={form.codigoInep}
              onChange={(e) => setForm({ ...form, codigoInep: e.target.value })}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono-code text-slate-900"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">CNPJ</label>
            <input
              type="text"
              value={form.cnpj}
              onChange={(e) => setForm({ ...form, cnpj: e.target.value })}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono-code text-slate-900"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-semibold text-slate-700 block mb-1">Ato de Criação / Autorização de Funcionamento</label>
            <input
              type="text"
              value={form.atoCriacao}
              onChange={(e) => setForm({ ...form, atoCriacao: e.target.value })}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="font-semibold text-slate-700 block mb-1">Logradouro e Número</label>
            <input
              type="text"
              value={form.endereco}
              onChange={(e) => setForm({ ...form, endereco: e.target.value })}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Bairro</label>
            <input
              type="text"
              value={form.bairro}
              onChange={(e) => setForm({ ...form, bairro: e.target.value })}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Cidade *</label>
              <input
                type="text"
                required
                value={form.cidade}
                onChange={(e) => setForm({ ...form, cidade: e.target.value })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">UF *</label>
              <input
                type="text"
                required
                maxLength={2}
                value={form.uf}
                onChange={(e) => setForm({ ...form, uf: e.target.value.toUpperCase() })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 uppercase font-mono-code"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Telefone da Secretaria</label>
            <input
              type="text"
              value={form.telefone}
              onChange={(e) => setForm({ ...form, telefone: e.target.value })}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono-code text-slate-900"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">E-mail Institucional</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
            />
          </div>
        </div>

        {/* Gestores e Assinaturas */}
        <div className="pt-4 border-t border-slate-200 space-y-4">
          <span className="font-bold text-slate-900 uppercase text-[11px] block">
            Responsáveis Legais pelas Assinaturas dos Documentos
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-blue-900 block text-[11px]">Secretário(a) Escolar</span>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={form.secretarioNome}
                  onChange={(e) => setForm({ ...form, secretarioNome: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded text-slate-900"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Cargo e Registro CEE / Matrícula</label>
                <input
                  type="text"
                  value={form.secretarioCargo}
                  onChange={(e) => setForm({ ...form, secretarioCargo: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded text-slate-900"
                />
              </div>
            </div>

            <div className="space-y-3 p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="font-bold text-blue-900 block text-[11px]">Diretor(a) de Escola</span>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={form.diretorNome}
                  onChange={(e) => setForm({ ...form, diretorNome: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded text-slate-900"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Cargo e RG / MASP</label>
                <input
                  type="text"
                  value={form.diretorCargo}
                  onChange={(e) => setForm({ ...form, diretorCargo: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded text-slate-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Botão de Gravar e Feedback Imediato */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
          <div className="text-xs">
            {savedNotice ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-800 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-300">
                <Check size={16} className="text-emerald-600" />
                ✓ Configurações salvas e aplicadas em todos os documentos!
              </span>
            ) : (
              <span className="text-slate-500">
                Todas as alterações são salvas e refletidas imediatamente em todos os documentos.
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleSubmit()}
            className={`px-6 py-3 rounded-lg font-bold text-xs transition-all shadow-md flex items-center gap-2 cursor-pointer ${
              savedNotice
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-2 ring-emerald-300'
                : 'bg-blue-900 hover:bg-blue-800 text-white active:scale-95'
            }`}
          >
            {savedNotice ? <Check size={18} /> : <Save size={18} />}
            <span>{savedNotice ? '✓ Configurações Salvas!' : 'Salvar Configurações da Escola'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
