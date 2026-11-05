import React, { useState } from 'react';
import { IssuedDocumentRecord, DocumentDefinition, Student } from '../types';
import { BookOpen, Search, Eye, Download, Trash2, Printer } from 'lucide-react';

interface EmittedRegistryProps {
  records: IssuedDocumentRecord[];
  onOpenRecord: (record: IssuedDocumentRecord) => void;
  onDeleteRecord: (id: string) => void;
  onExportRegistry: () => void;
}

export const EmittedRegistry: React.FC<EmittedRegistryProps> = ({
  records,
  onOpenRecord,
  onDeleteRecord,
  onExportRegistry,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = records.filter(
    (r) =>
      r.protocolo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.documentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.codigoAutenticidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Topo */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2">
            <BookOpen size={20} className="text-blue-900" />
            <span>Livro Oficial de Registros e Protocolos de Expedição</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Registro cronológico e comprobatório de todos os documentos escolares emitidos pela secretaria com fé pública.
          </p>
        </div>

        <button
          onClick={onExportRegistry}
          className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 rounded-lg text-xs font-semibold transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <Download size={14} />
          <span>Exportar Livro (JSON)</span>
        </button>
      </div>

      {/* Busca */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar por protocolo, tipo de documento, aluno ou chave de autenticidade..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
          />
        </div>
        <span className="text-xs text-slate-500 font-mono-code tabular-nums whitespace-nowrap">
          {filtered.length} expedidos
        </span>
      </div>

      {/* Tabela do Livro de Registros */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px] tracking-wider">
                <th className="p-3.5">Nº Protocolo</th>
                <th className="p-3.5">Data Emissão</th>
                <th className="p-3.5">Tipo de Documento</th>
                <th className="p-3.5">Aluno / Interessado</th>
                <th className="p-3.5">Chave Autenticidade</th>
                <th className="p-3.5 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    Nenhum documento registrado no livro correspondente aos critérios de busca.
                  </td>
                </tr>
              ) : (
                filtered.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 font-mono-code font-bold text-blue-950">
                      {rec.protocolo}
                    </td>
                    <td className="p-3.5 font-mono-code text-slate-600">
                      {rec.dataEmissao.split('-').reverse().join('/')}
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold text-slate-900 block">{rec.documentTitle}</span>
                      <span className="text-[10px] text-slate-500 truncate block max-w-xs">{rec.finalidade}</span>
                    </td>
                    <td className="p-3.5 font-medium text-slate-800">
                      {rec.studentName}
                    </td>
                    <td className="p-3.5 font-mono-code text-[11px] text-slate-600">
                      {rec.codigoAutenticidade}
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onOpenRecord(rec)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                          title="Visualizar e reimprimir documento"
                        >
                          <Eye size={13} />
                          <span>Abrir / Imprimir</span>
                        </button>
                        <button
                          onClick={() => onDeleteRecord(rec.id)}
                          className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                          title="Remover assentamento do livro"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
