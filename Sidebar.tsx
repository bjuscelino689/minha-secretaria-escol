import React, { useState, useMemo } from 'react';
import { DocumentDefinition, DocumentCategory } from '../types';
import { 
  FileText, 
  GraduationCap, 
  Award, 
  Users, 
  Send, 
  FileCheck, 
  Search,
  Check
} from 'lucide-react';

interface SidebarProps {
  catalog: DocumentDefinition[];
  selectedDocId: string;
  onSelectDoc: (doc: DocumentDefinition) => void;
  className?: string;
}

const CATEGORIES: { id: DocumentCategory | 'todos'; label: string; icon: any }[] = [
  { id: 'todos', label: 'Todos os Documentos', icon: FileText },
  { id: 'declaracoes', label: 'Declarações e Atestados', icon: FileText },
  { id: 'academicos', label: 'Históricos e Boletins', icon: GraduationCap },
  { id: 'certificados', label: 'Certificados e Diplomas', icon: Award },
  { id: 'atas', label: 'Atas e Reuniões', icon: Users },
  { id: 'oficios', label: 'Ofícios e Notificações', icon: Send },
  { id: 'termos', label: 'Termos e Requerimentos', icon: FileCheck },
];

export const Sidebar: React.FC<SidebarProps> = ({
  catalog,
  selectedDocId,
  onSelectDoc,
  className = '',
}) => {
  const [activeCategory, setActiveCategory] = useState<DocumentCategory | 'todos'>('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDocs = useMemo(() => {
    return catalog.filter((doc) => {
      const matchCategory = activeCategory === 'todos' || doc.category === activeCategory;
      const matchSearch =
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [catalog, activeCategory, searchTerm]);

  return (
    <aside className={`w-full md:w-80 lg:w-96 bg-white border-r border-slate-200 flex flex-col h-full shrink-0 ${className}`}>
      {/* Barra de Pesquisa */}
      <div className="p-4 border-b border-slate-200">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar modelo escolar (32 disponíveis)..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
            >
              ×
            </button>
          )}
        </div>

        {/* Categorias em pílulas discretas unboxed ou botões compactos */}
        <div className="flex gap-1.5 overflow-x-auto pt-3 pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-md whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lista de Modelos */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2">
        <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Modelos Encontrados</span>
          <span className="font-mono-code tabular-nums text-slate-600">{filteredDocs.length}</span>
        </div>

        {filteredDocs.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500">
            Nenhum modelo escolar encontrado para "{searchTerm}".
          </div>
        ) : (
          filteredDocs.map((doc) => {
            const isSelected = doc.id === selectedDocId;
            return (
              <div
                key={doc.id}
                onClick={() => onSelectDoc(doc)}
                className={`w-full text-left p-3.5 rounded-xl transition-all text-xs cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50/90 border-2 border-blue-900/40 text-blue-950 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <span className="text-[10px] uppercase font-bold text-blue-900 block tracking-wider mb-0.5">
                      {doc.categoryLabel}
                    </span>
                    <h4 className="font-extrabold text-slate-950 text-[13px] leading-snug">
                      {doc.title}
                    </h4>
                  </div>
                  {isSelected && (
                    <div className="px-2 py-0.5 rounded bg-blue-900 text-white font-bold text-[10px] shrink-0 mt-0.5">
                      Selecionado
                    </div>
                  )}
                </div>
                <p className="text-[11.5px] text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
                  {doc.shortDesc}
                </p>
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-blue-900 font-bold text-[11px]">
                  <span>Preencher dados deste documento</span>
                  <span>➔</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};
