/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  InstitutionConfig, 
  Student, 
  DocumentDefinition, 
  IssuedDocumentRecord 
} from './types';
import { 
  defaultInstitution, 
  initialStudents, 
  DOCUMENT_CATALOG, 
  initialIssuedRegistry 
} from './data/mockData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DocumentFormEditor } from './components/DocumentFormEditor';
import { DocumentPreviewToolbar } from './components/DocumentPreviewToolbar';
import { DocumentRenderer } from './components/DocumentRenderer';
import { StudentsManager } from './components/StudentsManager';
import { InstitutionSettings } from './components/InstitutionSettings';
import { EmittedRegistry } from './components/EmittedRegistry';
import { AiAssistantModal } from './components/AiAssistantModal';
import { JpegPreviewModal } from './components/JpegPreviewModal';
import { toJpeg } from 'html-to-image';
import { ArrowRight, Printer, ArrowLeft, Eye, FileDown, Image as ImageIcon, Loader2 } from 'lucide-react';

export default function App() {
  // Estado da Instituição (Por padrão: sem brasão; opção exclusiva do Maranhão)
  const [institution, setInstitution] = useState<InstitutionConfig>(() => {
    try {
      const saved = localStorage.getItem('mse_institution');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultInstitution,
          ...parsed,
          // Exclui brasões por padrão conforme solicitado pelo usuário
          mostrarBrasao: parsed.mostrarBrasao === true ? true : false,
          brasaoTipo: 'maranhao',
          brasaoPosicao: parsed.brasaoPosicao || 'esquerda',
        };
      }
      return defaultInstitution;
    } catch {
      return defaultInstitution;
    }
  });

  // Estado dos Estudantes
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem('mse_students');
      return saved ? JSON.parse(saved) : initialStudents;
    } catch {
      return initialStudents;
    }
  });

  // Livro de Registros Emitidos
  const [issuedRegistry, setIssuedRegistry] = useState<IssuedDocumentRecord[]>(() => {
    try {
      const saved = localStorage.getItem('mse_registry');
      return saved ? JSON.parse(saved) : initialIssuedRegistry;
    } catch {
      return initialIssuedRegistry;
    }
  });

  // Navegação Principal de Abas
  const [activeTab, setActiveTab] = useState<'editor' | 'students' | 'institution' | 'registry'>('editor');

  // Fluxo de Etapas do Gerador de Documentos:
  // 'catalog' = escolher modelo (32)
  // 'editor'  = preencher dados (aluno, escola, campos)
  // 'preview' = visualizar folha A4 e imprimir
  const [docStep, setDocStep] = useState<'catalog' | 'editor' | 'preview'>('editor');

  // Documento selecionado no catálogo
  const [selectedDoc, setSelectedDoc] = useState<DocumentDefinition>(DOCUMENT_CATALOG[0]);

  // Aluno atualmente selecionado para o documento (digitável!)
  const [selectedStudent, setSelectedStudent] = useState<Student>(students[0]);

  // Dados do formulário para o documento ativo
  const [formData, setFormData] = useState<Record<string, any>>({
    ...DOCUMENT_CATALOG[0].defaultData,
    dataEmissao: new Date().toISOString().split('T')[0],
  });

  // Protocolo ativo e chave de autenticidade para o documento corrente
  const [currentProtocol, setCurrentProtocol] = useState<string>('MSE-2026/0481');
  const [currentAuthKey, setCurrentAuthKey] = useState<string>('F94B-8812-C034-7719');

  // Controles de Visualização
  const [watermark, setWatermark] = useState<string>('NENHUMA');
  const [mostrarCarimbo, setMostrarCarimbo] = useState<boolean>(true);
  const [mostrarQrCode, setMostrarQrCode] = useState<boolean>(true);
  const [zoom, setZoom] = useState<number>(1);
  const [isSavedInRegistry, setIsSavedInRegistry] = useState<boolean>(false);

  // Modal do Assistente de Redação
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiFieldTarget, setAiFieldTarget] = useState<string>('');
  const [aiPromptContext, setAiPromptContext] = useState<string>('');

  // Estado para Geração e Download de Imagem JPEG
  const [isGeneratingJpeg, setIsGeneratingJpeg] = useState(false);
  const [jpegModalUrl, setJpegModalUrl] = useState<string | null>(null);

  // Persistência em LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('mse_institution', JSON.stringify(institution));
    } catch (e) {
      console.warn(e);
    }
  }, [institution]);

  useEffect(() => {
    try {
      localStorage.setItem('mse_students', JSON.stringify(students));
    } catch (e) {
      console.warn(e);
    }
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem('mse_registry', JSON.stringify(issuedRegistry));
    } catch (e) {
      console.warn(e);
    }
  }, [issuedRegistry]);

  const handleUpdateInstitution = (updated: InstitutionConfig) => {
    setInstitution(updated);
    try {
      localStorage.setItem('mse_institution', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  // Função para gerar número de protocolo sequencial e chave aleatória
  const generateNewProtocolAndKey = useCallback(() => {
    const ano = new Date().getFullYear();
    const num = String(Math.floor(Math.random() * 8999) + 1000);
    const prot = `MSE-${ano}/${num}`;
    
    const chars = 'ABCDEF0123456789';
    let key = '';
    for (let i = 0; i < 16; i++) {
      if (i > 0 && i % 4 === 0) key += '-';
      key += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setCurrentProtocol(prot);
    setCurrentAuthKey(key);
    setIsSavedInRegistry(false);
  }, []);

  // Ao selecionar um modelo no catálogo: atualiza dados e AVANÇA DIRETO PARA O FORMULÁRIO!
  const handleSelectDoc = (doc: DocumentDefinition) => {
    setSelectedDoc(doc);
    setFormData({
      ...doc.defaultData,
      dataEmissao: new Date().toISOString().split('T')[0],
    });
    generateNewProtocolAndKey();
    // Abre imediatamente o formulário de preenchimento para o usuário digitar
    setDocStep('editor');
  };

  // Ao trocar o estudante selecionado na lista
  const handleSelectStudent = (st: Student) => {
    setSelectedStudent(st);
    generateNewProtocolAndKey();
  };

  // Ao digitar ou alterar qualquer dado do estudante (nome, RA, curso, etc.)
  const handleUpdateStudentField = (field: keyof Student, value: any) => {
    setSelectedStudent((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsSavedInRegistry(false);
  };

  // Ao digitar ou alterar qualquer dado da escola (nome da escola, cidade, etc.)
  const handleUpdateInstitutionField = (field: keyof InstitutionConfig, value: any) => {
    setInstitution((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Limpar para digitar um novo estudante do zero
  const handleNewBlankStudent = () => {
    const blankStudent: Student = {
      id: `alu-${Date.now()}`,
      nomeCompleto: '',
      matricula: `2026-${String(Math.floor(Math.random() * 899) + 100)}`,
      ra: '',
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
    };
    setSelectedStudent(blankStudent);
    generateNewProtocolAndKey();
  };

  // Salvar estudante atual no banco de dados permanente
  const handleSaveStudentToDatabase = () => {
    if (!selectedStudent.nomeCompleto) return;
    setStudents((prev) => {
      const exists = prev.some((s) => s.id === selectedStudent.id);
      if (exists) {
        return prev.map((s) => (s.id === selectedStudent.id ? selectedStudent : s));
      }
      return [selectedStudent, ...prev];
    });
  };

  // Ao atualizar campo no formulário
  const handleUpdateFormData = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
    setIsSavedInRegistry(false);
  };

  // Restaurar dados padrão do documento
  const handleResetFormData = () => {
    setFormData({
      ...selectedDoc.defaultData,
      dataEmissao: new Date().toISOString().split('T')[0],
    });
  };

  // Imprimir ou Salvar em PDF
  const handlePrint = () => {
    window.print();
  };

  // Salvar em Imagem JPEG de alta resolução
  const handleSaveJpeg = async () => {
    try {
      setIsGeneratingJpeg(true);

      // Aguarda o carregamento das fontes do navegador se disponível
      if (typeof document !== 'undefined' && 'fonts' in document) {
        try {
          await (document as any).fonts.ready;
        } catch {
          // ignora caso o navegador não suporte
        }
      }

      // Localiza a folha A4 no DOM (seja no preview ou no editor)
      const targetElement = (
        document.querySelector('#doc-preview-container .sheet-a4') ||
        document.querySelector('#doc-editor-container .sheet-a4') ||
        document.querySelector('.sheet-a4')
      ) as HTMLElement | null;

      if (!targetElement) {
        console.warn('Folha do documento não encontrada para conversão em JPEG');
        return;
      }

      // Converte para JPEG com 95% de qualidade e resolução nítida
      // skipFonts: true e fontEmbedCSS: '' impedem o html-to-image de tentar ler
      // cssRules de stylesheets externas (Google Fonts), resolvendo o SecurityError de CORS
      const dataUrl = await toJpeg(targetElement, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        skipFonts: true,
        fontEmbedCSS: '',
      });

      setJpegModalUrl(dataUrl);

      // Dispara o download automático do arquivo .jpg
      const cleanDoc = (selectedDoc.title || 'Documento').replace(/[^a-zA-Z0-9_\u00C0-\u00FF-]/g, '_');
      const cleanName = (selectedStudent.nomeCompleto || 'Aluno').replace(/[^a-zA-Z0-9_\u00C0-\u00FF-]/g, '_');
      const fileName = `${cleanDoc}_${cleanName}.jpg`;

      const link = document.createElement('a');
      link.download = fileName;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Erro ao gerar imagem JPEG:', err);
    } finally {
      setIsGeneratingJpeg(false);
    }
  };

  // Salvar no Livro de Registros
  const handleSaveToRegistry = () => {
    const newRecord: IssuedDocumentRecord = {
      id: `iss-${Date.now()}`,
      protocolo: currentProtocol,
      documentId: selectedDoc.id,
      documentTitle: selectedDoc.title,
      category: selectedDoc.category,
      studentId: selectedStudent.id,
      studentName: selectedStudent.nomeCompleto || 'Aluno Não Informado',
      dataEmissao: formData.dataEmissao || new Date().toISOString().split('T')[0],
      finalidade: formData.finalidade || formData.assunto || selectedDoc.suggestedPurpose,
      codigoAutenticidade: currentAuthKey,
      formData: { ...formData },
    };

    setIssuedRegistry((prev) => [newRecord, ...prev]);
    setIsSavedInRegistry(true);
  };

  // Abrir registro existente para visualização/reimpressão
  const handleOpenRegistryRecord = (record: IssuedDocumentRecord) => {
    const doc = DOCUMENT_CATALOG.find((d) => d.id === record.documentId);
    if (doc) {
      setSelectedDoc(doc);
    }
    const student = students.find((s) => s.id === record.studentId) || students[0];
    setSelectedStudent(student);
    setFormData({ ...record.formData });
    setCurrentProtocol(record.protocolo);
    setCurrentAuthKey(record.codigoAutenticidade);
    setIsSavedInRegistry(true);
    setActiveTab('editor');
    setDocStep('preview');
  };

  // Deletar do livro
  const handleDeleteRegistryRecord = (id: string) => {
    setIssuedRegistry((prev) => prev.filter((r) => r.id !== id));
  };

  // Exportar livro em JSON
  const handleExportRegistry = () => {
    const blob = new Blob([JSON.stringify(issuedRegistry, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Livro_Registros_Secretaria_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Copiar conteúdo textual simplificado
  const handleCopyContent = () => {
    const text = `
INSTITUIÇÃO: ${institution.nomeEscola}
DOCUMENTO: ${selectedDoc.title}
ALUNO: ${selectedStudent.nomeCompleto} (RA: ${selectedStudent.ra})
PROTOCOLO: ${currentProtocol} | AUTENTICAÇÃO: ${currentAuthKey}
EMISSÃO: ${formData.dataEmissao || new Date().toISOString().split('T')[0]}
FINALIDADE: ${formData.finalidade || formData.assunto || 'Uso institucional'}
    `.trim();
    navigator.clipboard.writeText(text);
  };

  // Abrir assistente de redação
  const handleOpenAiHelper = (fieldKey: string, promptContext: string) => {
    setAiFieldTarget(fieldKey);
    setAiPromptContext(promptContext);
    setAiModalOpen(true);
  };

  const handleApplyAiText = (text: string) => {
    if (aiFieldTarget) {
      handleUpdateFormData(aiFieldTarget, text);
    }
  };

  // Selecionar aluno vindo da aba Alunos
  const handleSelectStudentForDoc = (st: Student) => {
    setSelectedStudent(st);
    setActiveTab('editor');
    setDocStep('editor');
    generateNewProtocolAndKey();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Bar da Secretaria */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'editor') setDocStep('editor');
        }}
        onPrint={handlePrint}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {activeTab === 'editor' && (
          <div className="flex-1 flex flex-col h-[calc(100vh-60px)]">
            {/* SUB-BARRA DE ETAPAS CLARAS: 1. MODELOS -> 2. PREENCHER -> 3. DOCUMENTO PRONTO */}
            <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 no-print shadow-2xs z-20">
              <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold">
                {/* Passo 1 */}
                <button
                  type="button"
                  onClick={() => setDocStep('catalog')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                    docStep === 'catalog'
                      ? 'bg-blue-900 text-white shadow-2xs font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>1. Escolher Modelo</span>
                  <span className="font-mono-code text-[10px] opacity-80">(32 disponíveis)</span>
                </button>

                <span className="text-slate-300">➔</span>

                {/* Passo 2 */}
                <button
                  type="button"
                  onClick={() => setDocStep('editor')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                    docStep === 'editor'
                      ? 'bg-blue-900 text-white shadow-2xs font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>2. Preencher Dados</span>
                  <span className="max-w-[150px] truncate text-[11px] opacity-90 hidden sm:inline">
                    ({selectedDoc.title})
                  </span>
                </button>

                <span className="text-slate-300">➔</span>

                {/* Passo 3 */}
                <button
                  type="button"
                  onClick={() => setDocStep('preview')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                    docStep === 'preview'
                      ? 'bg-blue-900 text-white shadow-2xs font-bold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>3. Documento Pronto (A4)</span>
                </button>
              </div>

              {/* Botão de ação rápida à direita */}
              <div className="flex items-center gap-2">
                {docStep === 'catalog' && (
                  <span className="text-xs text-slate-500 hidden md:inline">
                    Clique em qualquer modelo para abrir o formulário
                  </span>
                )}
                {docStep === 'editor' && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSaveJpeg}
                      disabled={isGeneratingJpeg}
                      className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer disabled:opacity-70"
                      title="Salvar e baixar diretamente em imagem JPEG"
                    >
                      {isGeneratingJpeg ? <Loader2 size={13} className="animate-spin" /> : <ImageIcon size={13} />}
                      <span>{isGeneratingJpeg ? 'Gerando...' : 'Salvar em JPEG'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer"
                      title="Salvar diretamente em PDF"
                    >
                      <FileDown size={13} />
                      <span>Salvar em PDF</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDocStep('preview')}
                      className="px-3.5 py-1.5 bg-blue-900 text-white font-extrabold rounded-lg hover:bg-blue-800 text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Eye size={13} />
                      <span>Ver em A4</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                )}
                {docStep === 'preview' && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setDocStep('editor')}
                      className="px-3 py-1.5 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft size={13} />
                      <span>Voltar para Editar</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveJpeg}
                      disabled={isGeneratingJpeg}
                      className="px-3.5 py-1.5 bg-emerald-800 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer disabled:opacity-70"
                      title="Salvar documento em JPEG"
                    >
                      {isGeneratingJpeg ? <Loader2 size={13} className="animate-spin" /> : <ImageIcon size={13} />}
                      <span>{isGeneratingJpeg ? 'Gerando...' : 'Salvar em JPEG'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handlePrint}
                      className="px-3.5 py-1.5 bg-blue-900 text-white font-extrabold rounded-lg hover:bg-blue-800 text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
                      title="Imprimir ou Salvar em PDF"
                    >
                      <FileDown size={13} />
                      <span>Salvar em PDF</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* VISUALIZAÇÃO CONFORME A ETAPA ATIVA */}
            <div className="flex-1 overflow-hidden flex flex-col">
              {/* ETAPA 1: CATÁLOGO DE MODELOS */}
              {docStep === 'catalog' && (
                <div className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6">
                  <div className="max-w-6xl mx-auto">
                    <Sidebar
                      catalog={DOCUMENT_CATALOG}
                      selectedDocId={selectedDoc.id}
                      onSelectDoc={handleSelectDoc}
                      className="w-full border-0 shadow-xs rounded-xl"
                    />
                  </div>
                </div>
              )}

              {/* ETAPA 2: FORMULÁRIO DE PREENCHIMENTO */}
              {docStep === 'editor' && (
                <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
                  {/* Formulário com digitação de Nome do Aluno e Nome da Escola */}
                  <div className="w-full lg:w-[480px] xl:w-[540px] shrink-0 bg-white border-r border-slate-200 overflow-y-auto h-full">
                    <DocumentFormEditor
                      docDef={selectedDoc}
                      student={selectedStudent}
                      studentsList={students}
                      onSelectStudent={handleSelectStudent}
                      onUpdateStudentField={handleUpdateStudentField}
                      onNewBlankStudent={handleNewBlankStudent}
                      onSaveStudentToDatabase={handleSaveStudentToDatabase}
                      formData={formData}
                      onUpdateFormData={handleUpdateFormData}
                      onResetFormData={handleResetFormData}
                      institution={institution}
                      onUpdateInstitutionField={handleUpdateInstitutionField}
                      onOpenAiHelper={handleOpenAiHelper}
                      onGenerateDocument={() => setDocStep('preview')}
                      onBackToCatalog={() => setDocStep('catalog')}
                      onSaveJpeg={handleSaveJpeg}
                      isGeneratingJpeg={isGeneratingJpeg}
                      onPrint={handlePrint}
                      watermark={watermark}
                      onSelectWatermark={setWatermark}
                    />
                  </div>

                  {/* Pré-visualização ao lado em telas maiores (desktop) */}
                  <div className="hidden lg:flex flex-1 flex-col overflow-hidden bg-slate-200/70">
                    <DocumentPreviewToolbar
                      onPrint={handlePrint}
                      onSaveJpeg={handleSaveJpeg}
                      isGeneratingJpeg={isGeneratingJpeg}
                      onSaveToRegistry={handleSaveToRegistry}
                      watermark={watermark}
                      onSelectWatermark={setWatermark}
                      studentName={selectedStudent.nomeCompleto}
                      schoolName={institution.nomeEscola}
                      mostrarBrasao={institution.mostrarBrasao}
                      brasaoPosicao={institution.brasaoPosicao || 'esquerda'}
                      onChangeBrasaoPosicao={(pos) =>
                        setInstitution((prev) => ({ ...prev, brasaoPosicao: pos }))
                      }
                      onToggleBrasao={() =>
                        setInstitution((prev) => ({ ...prev, mostrarBrasao: !prev.mostrarBrasao }))
                      }
                      mostrarCarimbo={mostrarCarimbo}
                      onToggleCarimbo={() => setMostrarCarimbo(!mostrarCarimbo)}
                      mostrarQrCode={mostrarQrCode}
                      onToggleQrCode={() => setMostrarQrCode(!mostrarQrCode)}
                      zoom={zoom}
                      onZoomChange={setZoom}
                      protocolo={currentProtocol}
                      onCopyContent={handleCopyContent}
                      isRegistered={isSavedInRegistry}
                    />
                    <div className="flex-1 overflow-auto p-4 flex justify-center items-start">
                      <div
                        id="doc-editor-container"
                        style={{
                          transform: `scale(${zoom * 0.95})`,
                          transformOrigin: 'top center',
                          transition: 'transform 0.15s ease-out',
                        }}
                        className="printable-document my-auto shadow-lg"
                      >
                        <DocumentRenderer
                          docDef={selectedDoc}
                          institution={{
                            ...institution,
                            mostrarCarimbo,
                            mostrarQrCode,
                          }}
                          student={selectedStudent}
                          formData={formData}
                          protocolo={currentProtocol}
                          codigoAutenticidade={currentAuthKey}
                          watermark={watermark}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ETAPA 3: VISUALIZADOR FINAL A4 E IMPRESSÃO */}
              {docStep === 'preview' && (
                <div className="flex-1 flex flex-col overflow-hidden bg-slate-200/80">
                  <DocumentPreviewToolbar
                    onPrint={handlePrint}
                    onSaveJpeg={handleSaveJpeg}
                    isGeneratingJpeg={isGeneratingJpeg}
                    onSaveToRegistry={handleSaveToRegistry}
                    watermark={watermark}
                    onSelectWatermark={setWatermark}
                    studentName={selectedStudent.nomeCompleto}
                    schoolName={institution.nomeEscola}
                    mostrarBrasao={institution.mostrarBrasao}
                    brasaoPosicao={institution.brasaoPosicao || 'esquerda'}
                    onChangeBrasaoPosicao={(pos) =>
                      setInstitution((prev) => ({ ...prev, brasaoPosicao: pos }))
                    }
                    onToggleBrasao={() =>
                      setInstitution((prev) => ({ ...prev, mostrarBrasao: !prev.mostrarBrasao }))
                    }
                    mostrarCarimbo={mostrarCarimbo}
                    onToggleCarimbo={() => setMostrarCarimbo(!mostrarCarimbo)}
                    mostrarQrCode={mostrarQrCode}
                    onToggleQrCode={() => setMostrarQrCode(!mostrarQrCode)}
                    zoom={zoom}
                    onZoomChange={setZoom}
                    protocolo={currentProtocol}
                    onCopyContent={handleCopyContent}
                    isRegistered={isSavedInRegistry}
                  />

                  <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start">
                    <div
                      id="doc-preview-container"
                      style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: 'top center',
                        transition: 'transform 0.15s ease-out',
                      }}
                      className="printable-document my-auto"
                    >
                      <DocumentRenderer
                        docDef={selectedDoc}
                        institution={{
                          ...institution,
                          mostrarCarimbo,
                          mostrarQrCode,
                        }}
                        student={selectedStudent}
                        formData={formData}
                        protocolo={currentProtocol}
                        codigoAutenticidade={currentAuthKey}
                        watermark={watermark}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Aba de Gerenciamento de Alunos */}
        {activeTab === 'students' && (
          <div className="flex-1 overflow-y-auto bg-slate-50">
            <StudentsManager
              students={students}
              onAddStudent={(newSt) => setStudents((prev) => [newSt, ...prev])}
              onUpdateStudent={(upd) =>
                setStudents((prev) => prev.map((s) => (s.id === upd.id ? upd : s)))
              }
              onDeleteStudent={(id) =>
                setStudents((prev) => prev.filter((s) => s.id !== id))
              }
              onSelectStudentForDoc={handleSelectStudentForDoc}
            />
          </div>
        )}

        {/* Aba do Livro de Registros */}
        {activeTab === 'registry' && (
          <div className="flex-1 overflow-y-auto bg-slate-50">
            <EmittedRegistry
              records={issuedRegistry}
              onOpenRecord={handleOpenRegistryRecord}
              onDeleteRecord={handleDeleteRegistryRecord}
              onExportRegistry={handleExportRegistry}
            />
          </div>
        )}

        {/* Aba de Configurações da Escola */}
        {activeTab === 'institution' && (
          <div className="flex-1 overflow-y-auto bg-slate-50">
            <InstitutionSettings
              institution={institution}
              onUpdateInstitution={handleUpdateInstitution}
            />
          </div>
        )}
      </main>

      {/* Modal de Assistente de Redação Oficial */}
      <AiAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        fieldKey={aiFieldTarget}
        contextPrompt={aiPromptContext}
        onApplyText={handleApplyAiText}
      />

      {/* Modal de Pré-visualização e Download de Imagem JPEG */}
      <JpegPreviewModal
        isOpen={Boolean(jpegModalUrl)}
        onClose={() => setJpegModalUrl(null)}
        imageUrl={jpegModalUrl || ''}
        documentTitle={selectedDoc.title}
        studentName={selectedStudent.nomeCompleto}
      />
    </div>
  );
}
