import React from 'react';
import { Student, DocumentDefinition, InstitutionConfig } from '../types';
import { 
  User, 
  School, 
  Sparkles, 
  RefreshCw, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  ArrowLeft,
  Eye,
  FileDown,
  Image as ImageIcon,
  Loader2,
  Stamp,
  AlignLeft,
  AlignCenter,
  AlignRight,
  X
} from 'lucide-react';

interface DocumentFormEditorProps {
  docDef: DocumentDefinition;
  student: Student;
  studentsList: Student[];
  onSelectStudent: (student: Student) => void;
  onUpdateStudentField: (field: keyof Student, value: any) => void;
  onNewBlankStudent: () => void;
  onSaveStudentToDatabase?: () => void;
  formData: Record<string, any>;
  onUpdateFormData: (key: string, value: any) => void;
  onResetFormData: () => void;
  institution: InstitutionConfig;
  onUpdateInstitutionField: (field: keyof InstitutionConfig, value: any) => void;
  onOpenAiHelper: (fieldKey: string, promptContext: string) => void;
  onGenerateDocument: () => void;
  onBackToCatalog: () => void;
  onSaveJpeg?: () => void;
  isGeneratingJpeg?: boolean;
  onPrint?: () => void;
  watermark?: string;
  onSelectWatermark?: (val: string) => void;
}

export const DocumentFormEditor: React.FC<DocumentFormEditorProps> = ({
  docDef,
  student,
  studentsList,
  onSelectStudent,
  onUpdateStudentField,
  onNewBlankStudent,
  onSaveStudentToDatabase,
  formData,
  onUpdateFormData,
  onResetFormData,
  institution,
  onUpdateInstitutionField,
  onOpenAiHelper,
  onGenerateDocument,
  onBackToCatalog,
  onSaveJpeg,
  isGeneratingJpeg = false,
  onPrint,
  watermark = 'NENHUMA',
  onSelectWatermark,
}) => {
  return (
    <div className="bg-white p-5 sm:p-6 space-y-6 overflow-y-auto text-xs">
      {/* Barra de Navegação Rápida no Topo do Formulário */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <button
            type="button"
            onClick={onBackToCatalog}
            className="inline-flex items-center gap-1.5 text-slate-500 hover:text-blue-900 font-semibold mb-1 text-[11px] cursor-pointer"
          >
            <ArrowLeft size={13} />
            <span>Escolher outro modelo oficial</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-blue-100 text-blue-900 font-bold rounded text-[10px] uppercase">
              {docDef.categoryLabel}
            </span>
            <h2 className="text-base font-extrabold text-slate-950">
              {docDef.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onResetFormData}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
            title="Restaurar valores padrão deste modelo"
          >
            <RefreshCw size={14} />
          </button>
          <button
            type="button"
            onClick={onGenerateDocument}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <Eye size={14} />
            <span>Gerar / Ver em A4</span>
          </button>
        </div>
      </div>

      {/* BLOCO 1: DADOS DO ALUNO (TOTALMENTE DIGITÁVEIS) */}
      <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-blue-950 font-extrabold uppercase text-xs flex items-center gap-1.5">
            <User size={15} className="text-blue-900" />
            <span>1. Dados do Aluno(a) (Digite o nome que quiser)</span>
          </label>
          <button
            type="button"
            onClick={onNewBlankStudent}
            className="text-[10px] font-bold text-blue-900 hover:text-blue-700 bg-white border border-blue-300 px-2.5 py-1 rounded shadow-2xs cursor-pointer transition-colors"
            title="Limpar campos e digitar um novo aluno"
          >
            + Digitar Novo Aluno
          </button>
        </div>

        {/* NOME COMPLETO DO ALUNO */}
        <div>
          <label className="font-extrabold text-slate-900 block text-xs mb-1">
            Nome Completo do Aluno(a) *
          </label>
          <input
            type="text"
            required
            value={student.nomeCompleto}
            onChange={(e) => onUpdateStudentField('nomeCompleto', e.target.value)}
            placeholder="Digite o nome completo do estudante aqui..."
            className="w-full p-2.5 bg-white border-2 border-blue-900/40 rounded-lg text-xs font-bold text-slate-950 focus:outline-none focus:border-blue-900 focus:ring-2 focus:ring-blue-900/20 shadow-xs"
          />
        </div>

        {/* Seletor rápido de alunos cadastrados */}
        <div>
          <label className="text-[10.5px] font-medium text-slate-600 block mb-1">
            Ou selecione da sua lista de alunos cadastrados:
          </label>
          <select
            value={student.id}
            onChange={(e) => {
              const found = studentsList.find((s) => s.id === e.target.value);
              if (found) onSelectStudent(found);
            }}
            className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-900 cursor-pointer"
          >
            {studentsList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nomeCompleto} · {s.anoSerie} ({s.turma}) · RA: {s.ra}
              </option>
            ))}
          </select>
        </div>

        {/* Demais campos do aluno */}
        <div className="pt-2 border-t border-blue-200/80 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          <div>
            <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">RA (Registro do Aluno)</label>
            <input
              type="text"
              value={student.ra}
              onChange={(e) => onUpdateStudentField('ra', e.target.value)}
              className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs font-mono-code text-slate-900"
              placeholder="Ex: 114.892.341-X SP"
            />
          </div>

          <div>
            <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">CPF do Aluno</label>
            <input
              type="text"
              value={student.cpf}
              onChange={(e) => onUpdateStudentField('cpf', e.target.value)}
              className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs font-mono-code text-slate-900"
              placeholder="000.000.000-00"
            />
          </div>

          <div>
            <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">RG do Aluno</label>
            <input
              type="text"
              value={student.rg}
              onChange={(e) => onUpdateStudentField('rg', e.target.value)}
              className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs font-mono-code text-slate-900"
              placeholder="00.000.000-0"
            />
          </div>

          <div>
            <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">Data de Nascimento</label>
            <input
              type="date"
              value={student.dataNascimento}
              onChange={(e) => onUpdateStudentField('dataNascimento', e.target.value)}
              className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs font-mono-code text-slate-900"
            />
          </div>

          <div>
            <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">Série / Ano</label>
            <input
              type="text"
              value={student.anoSerie}
              onChange={(e) => onUpdateStudentField('anoSerie', e.target.value)}
              className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900"
              placeholder="Ex: 3ª Série ou 8º Ano"
            />
          </div>

          <div>
            <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">Turno</label>
            <select
              value={student.turno}
              onChange={(e) => onUpdateStudentField('turno', e.target.value)}
              className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900"
            >
              <option value="Matutino">Matutino</option>
              <option value="Vespertino">Vespertino</option>
              <option value="Noturno">Noturno</option>
              <option value="Integral">Integral</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">Filiação (Nome da Mãe / Resp. Legal)</label>
            <input
              type="text"
              value={student.nomeMae}
              onChange={(e) => onUpdateStudentField('nomeMae', e.target.value)}
              className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900"
              placeholder="Nome da mãe ou responsável legal..."
            />
          </div>

          <div>
            <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">Curso / Nível</label>
            <input
              type="text"
              value={student.curso}
              onChange={(e) => onUpdateStudentField('curso', e.target.value)}
              className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900"
            />
          </div>
        </div>

        {onSaveStudentToDatabase && (
          <div className="pt-1 flex justify-end">
            <button
              type="button"
              onClick={onSaveStudentToDatabase}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-900 text-white rounded text-[10.5px] font-semibold hover:bg-blue-800 transition-colors shadow-2xs cursor-pointer"
            >
              <CheckCircle2 size={12} />
              <span>Salvar este Aluno no Cadastro Permanente</span>
            </button>
          </div>
        )}
      </div>

      {/* BLOCO 2: DADOS DA ESCOLA (NOME DA ESCOLA DIGITÁVEL DIRETO AQUI) */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        <label className="text-slate-900 font-extrabold uppercase text-xs flex items-center gap-1.5">
          <School size={15} className="text-blue-900" />
          <span>2. Dados da Escola no Cabeçalho do Documento</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="sm:col-span-2">
            <label className="font-bold text-slate-900 block text-xs mb-1">
              Nome da Escola / Estabelecimento de Ensino *
            </label>
            <input
              type="text"
              value={institution.nomeEscola}
              onChange={(e) => onUpdateInstitutionField('nomeEscola', e.target.value)}
              placeholder="Ex: ESCOLA ESTADUAL PROFESSORA CORA CORALINA"
              className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-950 uppercase focus:outline-none focus:border-blue-900"
            />
          </div>

          <div>
            <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">Cidade e Estado (UF)</label>
            <div className="grid grid-cols-3 gap-1">
              <input
                type="text"
                value={institution.cidade}
                onChange={(e) => onUpdateInstitutionField('cidade', e.target.value)}
                placeholder="Cidade"
                className="col-span-2 p-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900"
              />
              <input
                type="text"
                maxLength={2}
                value={institution.uf}
                onChange={(e) => onUpdateInstitutionField('uf', e.target.value.toUpperCase())}
                placeholder="UF"
                className="p-1.5 bg-white border border-slate-300 rounded text-xs uppercase font-mono-code text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">Código INEP / MEC</label>
            <input
              type="text"
              value={institution.codigoInep}
              onChange={(e) => onUpdateInstitutionField('codigoInep', e.target.value)}
              className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs font-mono-code text-slate-900"
            />
          </div>

          <div>
            <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">Diretor(a) que Assina</label>
            <input
              type="text"
              value={institution.diretorNome}
              onChange={(e) => onUpdateInstitutionField('diretorNome', e.target.value)}
              className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900"
            />
          </div>

          <div>
            <label className="text-[10px] font-semibold text-slate-600 block mb-0.5">Secretário(a) que Assina</label>
            <input
              type="text"
              value={institution.secretarioNome}
              onChange={(e) => onUpdateInstitutionField('secretarioNome', e.target.value)}
              className="w-full p-1.5 bg-white border border-slate-300 rounded text-xs text-slate-900"
            />
          </div>
        </div>

        {/* OPÇÃO DE BRASÃO: SEM BRASÃO POR PADRÃO, OPÇÃO EXCLUSIVA SEDUC-MA */}
        <div className="pt-2 border-t border-slate-200 space-y-2">
          <label className="flex items-center gap-2.5 p-2.5 bg-white border border-slate-200 rounded-lg cursor-pointer hover:bg-blue-50/40 transition-colors">
            <input
              type="checkbox"
              checked={Boolean(institution.mostrarBrasao)}
              onChange={(e) => onUpdateInstitutionField('mostrarBrasao', e.target.checked)}
              className="w-4 h-4 text-blue-900 rounded border-slate-300 focus:ring-blue-900 cursor-pointer"
            />
            <div className="flex-1">
              <span className="font-bold text-slate-900 block text-xs">
                Adicionar Brasão da Secretaria de Educação do Maranhão (SEDUC - MA)
              </span>
              <span className="text-[10.5px] text-slate-500 block">
                {institution.mostrarBrasao 
                  ? '✓ Brasão Oficial SEDUC-MA ativado no cabeçalho deste documento (1 único brasão)' 
                  : 'Sem brasão por padrão. Marque aqui para incluir o Brasão Oficial da Secretaria de Educação do Maranhão.'}
              </span>
            </div>
          </label>

          {/* Opção para escolher a posição do brasão */}
          {institution.mostrarBrasao && (
            <div className="p-2.5 bg-blue-50/60 border border-blue-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-blue-950">
                Posição do Brasão no Documento:
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onUpdateInstitutionField('brasaoPosicao', 'esquerda')}
                  className={`px-2.5 py-1 text-xs rounded border flex items-center gap-1 font-semibold transition-all cursor-pointer ${
                    (institution.brasaoPosicao || 'esquerda') === 'esquerda'
                      ? 'bg-blue-900 text-white border-blue-900 shadow-2xs font-bold'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <AlignLeft size={12} />
                  <span>Esquerda (Padrão)</span>
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateInstitutionField('brasaoPosicao', 'centro')}
                  className={`px-2.5 py-1 text-xs rounded border flex items-center gap-1 font-semibold transition-all cursor-pointer ${
                    institution.brasaoPosicao === 'centro'
                      ? 'bg-blue-900 text-white border-blue-900 shadow-2xs font-bold'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <AlignCenter size={12} />
                  <span>Centro</span>
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateInstitutionField('brasaoPosicao', 'direita')}
                  className={`px-2.5 py-1 text-xs rounded border flex items-center gap-1 font-semibold transition-all cursor-pointer ${
                    institution.brasaoPosicao === 'direita'
                      ? 'bg-blue-900 text-white border-blue-900 shadow-2xs font-bold'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <AlignRight size={12} />
                  <span>Direita</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BLOCO 3: CAMPOS ESPECÍFICOS DESTE DOCUMENTO */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
        <label className="text-slate-900 font-extrabold uppercase text-xs flex items-center gap-1.5">
          <FileText size={15} className="text-blue-900" />
          <span>3. Informações Específicas: {docDef.title}</span>
        </label>

        {/* Campos Específicos para o Diário de Classe do Professor */}
        {docDef.id === 'diario-classe' && (
          <div className="space-y-4 p-3.5 bg-white border border-blue-200 rounded-xl">
            <div className="flex items-center justify-between pb-2 border-b border-blue-100">
              <span className="font-extrabold text-blue-950 text-xs uppercase flex items-center gap-1.5">
                <span>📘 Dados da Cátedra, Professor(a) e Entrega na Secretaria</span>
              </span>
              <span className="text-[10px] bg-blue-100 text-blue-900 font-bold px-2 py-0.5 rounded">
                Obrigatório por Lei
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Componente Curricular / Disciplina *</label>
                <input
                  type="text"
                  value={formData.disciplina || ''}
                  onChange={(e) => onUpdateFormData('disciplina', e.target.value)}
                  placeholder="Ex: Língua Portuguesa, Matemática, História..."
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 font-bold"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Bimestre / Período Letivo *</label>
                <select
                  value={formData.bimestre || '1º Bimestre'}
                  onChange={(e) => onUpdateFormData('bimestre', e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 font-bold cursor-pointer"
                >
                  <option value="1º Bimestre">1º Bimestre</option>
                  <option value="2º Bimestre">2º Bimestre</option>
                  <option value="3º Bimestre">3º Bimestre</option>
                  <option value="4º Bimestre">4º Bimestre</option>
                  <option value="1º Semestre">1º Semestre</option>
                  <option value="2º Semestre">2º Semestre</option>
                  <option value="Recuperação Final">Recuperação Final</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nome Completo do Professor(a) Regente *</label>
                <input
                  type="text"
                  value={formData.professorNome || ''}
                  onChange={(e) => onUpdateFormData('professorNome', e.target.value)}
                  placeholder="Nome do docente responsável pela turma"
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 font-semibold"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Matrícula Funcional do Professor *</label>
                <input
                  type="text"
                  value={formData.professorMatricula || ''}
                  onChange={(e) => onUpdateFormData('professorMatricula', e.target.value)}
                  placeholder="Ex: SEDUC-MA 394.102-1"
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs font-mono-code text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Carga Horária</label>
                  <input
                    type="text"
                    value={formData.cargaHorariaPrevista || '80 h/a'}
                    onChange={(e) => onUpdateFormData('cargaHorariaPrevista', e.target.value)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs font-mono-code"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Aulas Dadas</label>
                  <input
                    type="number"
                    value={formData.aulasMinistradas || 40}
                    onChange={(e) => onUpdateFormData('aulasMinistradas', Number(e.target.value))}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs font-mono-code"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Data de Entrega na Secretaria Escolar *</label>
                <input
                  type="date"
                  value={formData.dataEntregaSecretaria || new Date().toISOString().split('T')[0]}
                  onChange={(e) => onUpdateFormData('dataEntregaSecretaria', e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs font-mono-code text-slate-900"
                />
              </div>
            </div>

            {/* Declaração e Visto da Secretaria */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <div>
                <label className="text-[10px] font-bold text-slate-800 block mb-0.5">
                  Declaração de Fidedignidade do Professor
                </label>
                <textarea
                  rows={2}
                  value={formData.declaracaoDocente || ''}
                  onChange={(e) => onUpdateFormData('declaracaoDocente', e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-800"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-800 block mb-0.5">
                  Termo de Recebimento e Conferência da Secretaria Escolar
                </label>
                <textarea
                  rows={2}
                  value={formData.termoSecretaria || ''}
                  onChange={(e) => onUpdateFormData('termoSecretaria', e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded text-[11px] text-slate-800"
                />
              </div>
            </div>
          </div>
        )}

        {/* Campos de Assiduidade para Frequência Escolar */}
        {formData.periodoReferencia !== undefined && (
          <div className="space-y-3 p-3 bg-white border border-slate-200 rounded-lg">
            <span className="font-bold text-slate-900 block text-xs">Dados de Assiduidade e Frequência</span>
            <div>
              <span className="text-[10px] text-slate-600 font-medium block mb-1">Período de Referência</span>
              <input
                type="text"
                value={formData.periodoReferencia || ''}
                onChange={(e) => onUpdateFormData('periodoReferencia', e.target.value)}
                placeholder="Ex: 1º Semestre do Ano Letivo de 2026"
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-[10px] text-slate-600 font-medium block mb-1">Total de Aulas</span>
                <input
                  type="number"
                  value={formData.totalAulasDadas || 400}
                  onChange={(e) => onUpdateFormData('totalAulasDadas', Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs font-mono-code text-slate-900"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-600 font-medium block mb-1">Presenças Efetivas</span>
                <input
                  type="number"
                  value={formData.totalPresencas || 382}
                  onChange={(e) => onUpdateFormData('totalPresencas', Number(e.target.value))}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs font-mono-code text-slate-900"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-600 font-medium block mb-1">Índice %</span>
                <input
                  type="text"
                  value={formData.percentualFrequencia || '95,5%'}
                  onChange={(e) => onUpdateFormData('percentualFrequencia', e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs font-mono-code text-slate-900 font-bold"
                />
              </div>
            </div>
          </div>
        )}

        {/* Finalidade */}
        {formData.finalidade !== undefined && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-800">Finalidade / Motivo da Solicitação</span>
              <button
                type="button"
                onClick={() =>
                  onOpenAiHelper(
                    'finalidade',
                    `Redija formalmente a finalidade para uma declaração de ${docDef.title} do estudante ${student.nomeCompleto}.`
                  )
                }
                className="inline-flex items-center gap-1 text-[10px] text-blue-900 hover:text-blue-700 font-semibold cursor-pointer"
              >
                <Sparkles size={11} />
                <span>Sugestão Oficial</span>
              </button>
            </div>
            <textarea
              rows={3}
              value={formData.finalidade || ''}
              onChange={(e) => onUpdateFormData('finalidade', e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-900"
              placeholder="Ex: Comprovação para passe livre / Bolsa Família / Emprego..."
            />
          </div>
        )}

        {/* Observações */}
        {formData.observacoes !== undefined && (
          <div className="space-y-1">
            <span className="font-semibold text-slate-800 block">Observações do Documento</span>
            <textarea
              rows={2}
              value={formData.observacoes || ''}
              onChange={(e) => onUpdateFormData('observacoes', e.target.value)}
              className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900"
            />
          </div>
        )}

        {/* Campos de Histórico e Registro */}
        {formData.numeroLivro !== undefined && (
          <div className="space-y-2 p-3 bg-white border border-slate-200 rounded-lg">
            <span className="font-bold text-slate-900 block text-xs">Registro no Livro de Arquivo</span>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-[10px] text-slate-600 block mb-1">Livro Nº</span>
                <input
                  type="text"
                  value={formData.numeroLivro || ''}
                  onChange={(e) => onUpdateFormData('numeroLivro', e.target.value)}
                  className="w-full p-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-mono-code"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-600 block mb-1">Folha Nº</span>
                <input
                  type="text"
                  value={formData.numeroFolha || ''}
                  onChange={(e) => onUpdateFormData('numeroFolha', e.target.value)}
                  className="w-full p-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-mono-code"
                />
              </div>
              <div>
                <span className="text-[10px] text-slate-600 block mb-1">Registro Nº</span>
                <input
                  type="text"
                  value={formData.numeroRegistro || ''}
                  onChange={(e) => onUpdateFormData('numeroRegistro', e.target.value)}
                  className="w-full p-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-mono-code"
                />
              </div>
            </div>
          </div>
        )}

        {/* Data de Emissão */}
        <div>
          <span className="font-semibold text-slate-800 flex items-center gap-1 mb-1">
            <Calendar size={12} className="text-slate-500" />
            <span>Data de Emissão</span>
          </span>
          <input
            type="date"
            value={formData.dataEmissao || new Date().toISOString().split('T')[0]}
            onChange={(e) => onUpdateFormData('dataEmissao', e.target.value)}
            className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs font-mono-code text-slate-900"
          />
        </div>
      </div>

      {/* SEÇÃO DE MARCA D'ÁGUA COM DIGITAÇÃO DE NOMES */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 text-blue-900 rounded-lg">
              <Stamp size={16} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-xs">
                Marca d'Água do Documento (Fundo da Folha)
              </h3>
              <p className="text-[10px] text-slate-500">
                Digite qualquer nome, aluno ou texto para estampar no fundo do documento
              </p>
            </div>
          </div>

          {watermark && watermark !== 'NENHUMA' && watermark.trim() !== '' && onSelectWatermark && (
            <button
              type="button"
              onClick={() => onSelectWatermark('NENHUMA')}
              className="text-[11px] font-semibold text-red-600 hover:text-red-700 hover:underline cursor-pointer"
            >
              Remover
            </button>
          )}
        </div>

        {/* Campo de Digitação de Nome para a Marca d'Água */}
        <div className="space-y-1.5">
          <div className="relative flex items-center">
            <input
              type="text"
              value={watermark === 'NENHUMA' ? '' : watermark}
              onChange={(e) => onSelectWatermark && onSelectWatermark(e.target.value)}
              placeholder="Digite aqui o nome para a marca d'água (ex: nome do aluno, escola, 2ª VIA...)"
              className="w-full px-3 py-2 text-xs font-semibold bg-white border border-slate-300 rounded-lg text-slate-950 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-blue-900 pr-8 shadow-2xs"
            />
            {watermark && watermark !== 'NENHUMA' && watermark.trim() !== '' && onSelectWatermark && (
              <button
                type="button"
                onClick={() => onSelectWatermark('NENHUMA')}
                className="absolute right-2 text-slate-400 hover:text-red-600 p-0.5 cursor-pointer rounded"
                title="Limpar marca d'água"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Atalhos rápidos de preenchimento */}
          {onSelectWatermark && (
            <div className="space-y-1 pt-1">
              <span className="text-[10px] font-semibold text-slate-500 block">
                Atalhos rápidos para preencher:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {student.nomeCompleto && (
                  <button
                    type="button"
                    onClick={() => onSelectWatermark(student.nomeCompleto.toUpperCase())}
                    className="px-2 py-1 bg-white hover:bg-blue-50 text-blue-900 border border-blue-200 hover:border-blue-400 rounded-md text-[10.5px] font-semibold transition-all shadow-2xs cursor-pointer"
                    title={`Inserir nome do aluno: ${student.nomeCompleto}`}
                  >
                    👤 Nome do Aluno
                  </button>
                )}
                {institution.nomeEscola && (
                  <button
                    type="button"
                    onClick={() => onSelectWatermark(institution.nomeEscola.toUpperCase())}
                    className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 hover:border-slate-400 rounded-md text-[10.5px] font-semibold transition-all shadow-2xs cursor-pointer"
                    title={`Inserir nome da escola: ${institution.nomeEscola}`}
                  >
                    🏫 Nome da Escola
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onSelectWatermark('2ª VIA')}
                  className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-md text-[10.5px] font-medium transition-all shadow-2xs cursor-pointer"
                >
                  2ª VIA
                </button>
                <button
                  type="button"
                  onClick={() => onSelectWatermark('CÓPIA AUTÊNTICA')}
                  className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-md text-[10.5px] font-medium transition-all shadow-2xs cursor-pointer"
                >
                  CÓPIA
                </button>
                <button
                  type="button"
                  onClick={() => onSelectWatermark('DOCUMENTO OFICIAL')}
                  className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-md text-[10.5px] font-medium transition-all shadow-2xs cursor-pointer"
                >
                  OFICIAL
                </button>
                <button
                  type="button"
                  onClick={() => onSelectWatermark('CONFIDENCIAL')}
                  className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-md text-[10.5px] font-medium transition-all shadow-2xs cursor-pointer"
                >
                  CONFIDENCIAL
                </button>
                <button
                  type="button"
                  onClick={() => onSelectWatermark('NENHUMA')}
                  className="px-2 py-1 bg-white hover:bg-red-50 text-slate-600 hover:text-red-700 border border-slate-300 rounded-md text-[10.5px] transition-all shadow-2xs cursor-pointer"
                >
                  Nenhuma
                </button>
              </div>
            </div>
          )}

          {/* Status Atual da Marca d'Água */}
          <div className="mt-2 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">Status no documento:</span>
            {watermark && watermark !== 'NENHUMA' && watermark.trim() !== '' ? (
              <span className="font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Ativa: "{watermark}"
              </span>
            ) : (
              <span className="text-slate-400 italic">
                Nenhuma marca d'água (fundo limpo)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* BOTÃO PRINCIPAL DE GERAÇÃO DO DOCUMENTO */}
      <div className="pt-2 space-y-2.5">
        <button
          type="button"
          onClick={onGenerateDocument}
          className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
        >
          <Eye size={18} />
          <span>GERAR E VISUALIZAR DOCUMENTO PRONTO (A4)</span>
          <ArrowRight size={18} />
        </button>

        {/* OPÇÕES DIRETAS DE SALVAR: JPEG E PDF */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200">
          <button
            type="button"
            onClick={onSaveJpeg}
            disabled={isGeneratingJpeg}
            className="py-2.5 px-3 bg-emerald-800 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-70"
            title="Salvar diretamente em imagem JPEG de alta resolução"
          >
            {isGeneratingJpeg ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <ImageIcon size={15} />
            )}
            <span>{isGeneratingJpeg ? 'Gerando...' : 'Salvar em JPEG'}</span>
          </button>

          <button
            type="button"
            onClick={onPrint}
            className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            title="Imprimir ou Salvar diretamente em formato PDF"
          >
            <FileDown size={15} />
            <span>Salvar em PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
