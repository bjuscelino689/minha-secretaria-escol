export type DocumentCategory = 
  | 'declaracoes'
  | 'academicos'
  | 'certificados'
  | 'atas'
  | 'oficios'
  | 'termos';

export interface InstitutionConfig {
  nomeEscola: string;
  orgaoSuperior: string;
  subOrgao: string;
  codigoInep: string;
  cnpj: string;
  atoCriacao: string;
  endereco: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
  telefone: string;
  email: string;
  diretorNome: string;
  diretorCargo: string;
  secretarioNome: string;
  secretarioCargo: string;
  brasaoTipo: 'maranhao' | 'custom' | 'brasil' | 'educacao' | 'estadual' | 'monograma';
  brasaoPosicao?: 'esquerda' | 'centro' | 'direita';
  customLogoUrl?: string;
  mostrarBrasao: boolean;
  mostrarCarimbo: boolean;
  mostrarQrCode: boolean;
}

export interface Student {
  id: string;
  nomeCompleto: string;
  matricula: string;
  ra: string;
  dataNascimento: string;
  naturalidade: string;
  nacionalidade: string;
  rg: string;
  cpf: string;
  nomeMae: string;
  nomePai: string;
  responsavelLegal: string;
  telefoneResponsavel: string;
  endereco: string;
  curso: string;
  anoSerie: string;
  turma: string;
  turno: string;
  anoLetivo: number;
  situacaoMatricula: 'Ativo' | 'Transferido' | 'Concluído' | 'Trancado' | 'Evadido';
}

export interface DocumentDefinition {
  id: string;
  title: string;
  shortDesc: string;
  category: DocumentCategory;
  categoryLabel: string;
  suggestedPurpose: string;
  iconName: string;
  defaultData: Record<string, any>;
}

export interface IssuedDocumentRecord {
  id: string;
  protocolo: string;
  documentId: string;
  documentTitle: string;
  category: DocumentCategory;
  studentId?: string;
  studentName: string;
  dataEmissao: string;
  finalidade: string;
  codigoAutenticidade: string;
  formData: Record<string, any>;
}
