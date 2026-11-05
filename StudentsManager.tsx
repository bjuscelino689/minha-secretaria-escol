import React, { useState } from 'react';
import { Student } from '../types';
import { Plus, Search, Edit3, Trash2, FileText, X, Check } from 'lucide-react';

interface StudentsManagerProps {
  students: Student[];
  onAddStudent: (newStudent: Student) => void;
  onUpdateStudent: (updated: Student) => void;
  onDeleteStudent: (id: string) => void;
  onSelectStudentForDoc: (student: Student) => void;
}

export const StudentsManager: React.FC<StudentsManagerProps> = ({
  students,
  onAddStudent,
  onUpdateStudent,
  onDeleteStudent,
  onSelectStudentForDoc,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Formulário padrão para novo aluno
  const [form, setForm] = useState<Partial<Student>>({
    nomeCompleto: '',
    matricula: `2026-${String(Math.floor(Math.random() * 900) + 100)}`,
    ra: '118.000.000-0 SP',
    dataNascimento: '2008-01-01',
    naturalidade: 'São Paulo - SP',
    nacionalidade: 'Brasileira',
    rg: '',
    cpf: '',
    nomeMae: '',
    nomePai: '',
    responsavelLegal: '',
    telefoneResponsavel: '',
    endereco: '',
    curso: 'Ensino Médio Regular',
    anoSerie: '1ª Série',
    turma: 'Turma A',
    turno: 'Matutino',
    anoLetivo: 2026,
    situacaoMatricula: 'Ativo',
  });

  const filtered = students.filter(
    (s) =>
      s.nomeCompleto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.ra.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.cpf.includes(searchTerm) ||
      s.curso.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenEdit = (student: Student) => {
    setEditingStudent(student);
    setForm(student);
    setIsCreating(false);
  };

  const handleOpenCreate = () => {
    setEditingStudent(null);
    setForm({
      nomeCompleto: '',
      matricula: `2026-${String(Math.floor(Math.random() * 900) + 100)}`,
      ra: '118.000.000-0 SP',
      dataNascimento: '2008-01-01',
      naturalidade: 'São Paulo - SP',
      nacionalidade: 'Brasileira',
      rg: '',
      cpf: '',
      nomeMae: '',
      nomePai: '',
      responsavelLegal: '',
      telefoneResponsavel: '',
      endereco: '',
      curso: 'Ensino Médio Regular',
      anoSerie: '1ª Série',
      turma: 'Turma A',
      turno: 'Matutino',
      anoLetivo: 2026,
      situacaoMatricula: 'Ativo',
    });
    setIsCreating(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nomeCompleto) return;

    if (isCreating) {
      const { id: _ignore, ...formData } = form;
      const newSt: Student = {
        ...(formData as any),
        id: `alu-${Date.now()}`,
      };
      onAddStudent(newSt);
      setIsCreating(false);
    } else if (editingStudent) {
      const updated: Student = {
        ...editingStudent,
        ...(form as any),
        id: editingStudent.id,
      };
      onUpdateStudent(updated);
      setEditingStudent(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Topo: Título e Botão de Adicionar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-950">
            Cadastro de Estudantes da Secretaria
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Gerencie prontuários e gere qualquer documento oficial em 1 clique para o estudante selecionado.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg text-xs font-semibold hover:bg-blue-800 transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
        >
          <Plus size={15} />
          <span>Cadastrar Novo Aluno</span>
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
            placeholder="Pesquisar por nome, RA, CPF ou curso..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
          />
        </div>
        <span className="text-xs text-slate-500 font-mono-code tabular-nums whitespace-nowrap">
          {filtered.length} alunos
        </span>
      </div>

      {/* Tabela de Alunos */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px] tracking-wider">
                <th className="p-3.5">Nome Completo do Aluno</th>
                <th className="p-3.5">RA / Matrícula</th>
                <th className="p-3.5">Curso / Série / Turno</th>
                <th className="p-3.5">Responsável / Telefone</th>
                <th className="p-3.5 text-center">Situação</th>
                <th className="p-3.5 text-right">Ações da Secretaria</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5">
                    <span className="font-bold text-slate-900 block">{s.nomeCompleto}</span>
                    <span className="text-[11px] text-slate-500 font-mono-code">CPF: {s.cpf} · RG: {s.rg}</span>
                  </td>
                  <td className="p-3.5 font-mono-code text-[11px]">
                    <span className="font-semibold text-slate-900 block">{s.ra}</span>
                    <span className="text-slate-500 text-[10px]">Matr: {s.matricula}</span>
                  </td>
                  <td className="p-3.5">
                    <span className="font-medium text-slate-800 block">{s.curso}</span>
                    <span className="text-slate-500 text-[11px]">{s.anoSerie} ({s.turma}) · {s.turno}</span>
                  </td>
                  <td className="p-3.5">
                    <span className="text-slate-800 block">{s.nomeMae || s.responsavelLegal}</span>
                    <span className="text-slate-500 text-[11px] font-mono-code">{s.telefoneResponsavel}</span>
                  </td>
                  <td className="p-3.5 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                      s.situacaoMatricula === 'Ativo'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : s.situacaoMatricula === 'Concluído'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {s.situacaoMatricula}
                    </span>
                  </td>
                  <td className="p-3.5 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onSelectStudentForDoc(s)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                        title="Gerar documento para este aluno"
                      >
                        <FileText size={13} />
                        <span>Gerar Doc</span>
                      </button>
                      <button
                        onClick={() => handleOpenEdit(s)}
                        className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                        title="Editar cadastro"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => onDeleteStudent(s.id)}
                        className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                        title="Excluir cadastro"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Cadastro / Edição */}
      {(isCreating || editingStudent) && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-950">
                {isCreating ? 'Novo Cadastro de Estudante' : 'Editar Dados do Estudante'}
              </h3>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingStudent(null);
                }}
                className="p-1 text-slate-400 hover:text-slate-700 rounded"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-700 block mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    value={form.nomeCompleto || ''}
                    onChange={(e) => setForm({ ...form, nomeCompleto: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">RA (Registro do Aluno) *</label>
                  <input
                    type="text"
                    required
                    value={form.ra || ''}
                    onChange={(e) => setForm({ ...form, ra: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono-code text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nº Matrícula Escolar</label>
                  <input
                    type="text"
                    value={form.matricula || ''}
                    onChange={(e) => setForm({ ...form, matricula: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono-code text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">CPF</label>
                  <input
                    type="text"
                    value={form.cpf || ''}
                    onChange={(e) => setForm({ ...form, cpf: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono-code text-slate-900"
                    placeholder="000.000.000-00"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">RG</label>
                  <input
                    type="text"
                    value={form.rg || ''}
                    onChange={(e) => setForm({ ...form, rg: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono-code text-slate-900"
                    placeholder="00.000.000-0 SSP/SP"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Data de Nascimento</label>
                  <input
                    type="date"
                    value={form.dataNascimento || ''}
                    onChange={(e) => setForm({ ...form, dataNascimento: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg font-mono-code text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Naturalidade / UF</label>
                  <input
                    type="text"
                    value={form.naturalidade || ''}
                    onChange={(e) => setForm({ ...form, naturalidade: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nome da Mãe</label>
                  <input
                    type="text"
                    value={form.nomeMae || ''}
                    onChange={(e) => setForm({ ...form, nomeMae: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Nome do Pai</label>
                  <input
                    type="text"
                    value={form.nomePai || ''}
                    onChange={(e) => setForm({ ...form, nomePai: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="font-semibold text-slate-700 block mb-1">Endereço Residencial Completo</label>
                  <input
                    type="text"
                    value={form.endereco || ''}
                    onChange={(e) => setForm({ ...form, endereco: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Curso / Nível</label>
                  <select
                    value={form.curso}
                    onChange={(e) => setForm({ ...form, curso: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  >
                    <option value="Ensino Médio Regular">Ensino Médio Regular</option>
                    <option value="Ensino Médio Integrado com TI">Ensino Médio Integrado com TI</option>
                    <option value="Ensino Fundamental II">Ensino Fundamental II</option>
                    <option value="Ensino Fundamental I">Ensino Fundamental I</option>
                    <option value="EJA - Educação de Jovens e Adultos">EJA - Educação de Jovens e Adultos</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Série / Ano</label>
                  <input
                    type="text"
                    value={form.anoSerie || ''}
                    onChange={(e) => setForm({ ...form, anoSerie: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                    placeholder="Ex: 3ª Série ou 8º Ano"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Turma</label>
                  <input
                    type="text"
                    value={form.turma || ''}
                    onChange={(e) => setForm({ ...form, turma: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                    placeholder="Ex: Turma A"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Turno</label>
                  <select
                    value={form.turno}
                    onChange={(e) => setForm({ ...form, turno: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900"
                  >
                    <option value="Matutino">Matutino</option>
                    <option value="Vespertino">Vespertino</option>
                    <option value="Noturno">Noturno</option>
                    <option value="Integral">Integral</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingStudent(null);
                  }}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-900 text-white rounded-lg font-bold hover:bg-blue-800 transition-colors flex items-center gap-1.5"
                >
                  <Check size={14} />
                  <span>Salvar Estudante</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
