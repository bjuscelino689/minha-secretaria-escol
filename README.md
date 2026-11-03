# Minha Secretaria Escolar 🎓

Sistema completo para geração, personalização e emissão de todos os 32 documentos oficiais utilizados em uma secretaria escolar brasileira (declarações, históricos, boletins, certificados com moldura solene, atas, ofícios e carteirinhas de estudante).

---

## 🚀 Como Colocar no GitHub e na Vercel (Passo a Passo)

### 1. Criar o Repositório no GitHub
1. Acesse sua conta no [GitHub](https://github.com) e clique no botão **New** (Novo repositório).
2. Dê o nome de `minha-secretaria-escolar`.
3. Escolha **Public** (Público) ou **Private** (Privado) e clique em **Create repository**.

### 2. Enviar os Arquivos para o GitHub
No seu computador ou terminal na pasta do projeto:
```bash
git init
git add .
git commit -m "feat: Minha Secretaria Escolar - Versao Completa"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/minha-secretaria-escolar.git
git push -u origin main
```

*(Ou você pode baixar o arquivo compactado ZIP do projeto e fazer o upload direto pela interface web do GitHub em "Upload files")*.

---

### 3. Publicar na Vercel (Grátis e Online 24h)
1. Acesse [vercel.com](https://vercel.com) e faça login (pode entrar diretamente com sua conta do GitHub).
2. Clique no botão **"Add New..."** -> **"Project"**.
3. Selecione o repositório `minha-secretaria-escolar` que acabou de criar no GitHub e clique em **Import**.
4. A Vercel detectará automaticamente as configurações do Vite (`Framework Preset: Vite`, `Build Command: npm run build`, `Output Directory: dist`).
5. Clique em **Deploy**.

Em menos de 1 minuto, a Vercel gerará um link próprio permanente (ex: `https://minha-secretaria-escolar.vercel.app`), que ficará no ar **24 horas por dia**, acessível de qualquer celular, tablet ou computador sem precisar deixar seu computador ligado!

---

## 🛠️ Tecnologias Utilizadas
- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** com estilos de impressão A4 (`@media print`)
- **Lucide React** (Ícones institucionais)
