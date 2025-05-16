# README - MVP -SaaS

Deploy : https://www.luisdevfullstack.fun/

## **Desafio**

Você deverá construir um MVP funcional (mínimo produto viável) para uma plataforma SaaS com foco em campanhas personalizadas e geração de landing pages com links exclusivos.

# **Escopo Técnico**

**1. Autenticação e Gestão de Usuário**

- ~~Cadastro/Login com e-mail e login social (Google/Facebook)~~  
- ~~Recuperação de senha~~ 
- Tela de edição de perfil (nome, contato, imagem, etc.)
- Controle de plano com integração ao Mercado Pago

**2. Catálogo Visual de Campanhas**

- ~~Listagem visual com cards dinâmicos (grande, médio, carrossel)~~ 
- Organização por seções: Novas, Destaques, Mais Usadas
- ~~Detalhes de campanha: título, objetivo, público, métricas~~ 
- Prévia de assets (Landing Page, PDF, vídeo, etc.)
- Texto persuasivo + botão “Selecionar campanha”

**3. Geração de Landing Page com Link Exclusivo**

- Criação de link único ao selecionar campanha
- Personalizações automáticas: nome, WhatsApp, logo, textos leves
- Link externo utilizável em campanhas Ads

**4. Editor de Personalização**

- Upload de imagem e logo
- Campos de contato: nome, WhatsApp, e-mail
- Edição leve de textos com pré-visualização ao vivo

**5. Painel de Inteligência**

- Gráficos com análise de campanhas mais efetivas
- Alertas e sugestões de melhoria
- Comparativo visual entre campanhas

**6. Área de Treinamentos**

- Catálogo de vídeos organizados por categoria
- Player com controle de progresso
- Recomendação inteligente baseada no uso

# Itens implementados

## Tecnologias utilizadas
- Next.js (App Router)
- NextAuth.js (versão 4.x)
- Prisma ORM
- PostgreSQL (ou outro banco relacional)
- Providers OAuth: Google, Facebook
- Bcrypt para hash e validação de senha
- Nodemailer (para envio de e-mails, opcional)

## Funcionalidades adicionadas
- Login com e-mail e senha (Credentials Provider)
- Login com Google e Facebook (OAuth Providers)
- Criação e gerenciamento de sessões no banco de dados
- Callbacks customizados para personalizar sessão e sign-in
- Validação de credenciais com hash (bcrypt)
- Páginas customizadas para login
- Pagina de recuperação de senha
- Envio de email lde reset de senha

## Estrutura de arquivos

```bash
/src
 ├─ /app
 │   └─ /api
 │       └─ /auth # C0nfiguracao e rotas api
 │           └─ [...nextauth]/route.ts # Configuração NextAuth
 ├─ /utils
 │   └─ prisma.ts                      # Cliente Prisma
 ├─ /app    #Centralizado as paginas

```

## Configuração do NextAuth
- Adapter: PrismaAdapter para salvar usuários, contas, sessões e tokens no banco.
- Providers: Credentials, Google, Facebook.
- Callbacks: session para preencher dados na sessão, signIn para lógica customizada.
- Secret: variável de ambiente NEXTAUTH_SECRET.

## Fluxo do Login com Credentials
- Usuário preenche e-mail e senha na tela de login.
- A função authorize do CredentialsProvider é chamada para validar as credenciais.
- Busca usuário no banco, valida hash da senha.
- Se válido, retorna objeto do usuário.
- Callback session adiciona o ID do usuário no objeto de sessão retornado ao cliente.
- Cliente pode consumir dados do usuário pela sessão.

## Fluxo do Login com OAuth (Google/Facebook)
- Usuário escolhe login via Google ou Facebook.
- NextAuth redireciona para autenticação OAuth.
- Após sucesso, NextAuth salva usuário e conta no banco.
- Sessão é criada e mantida no banco.

## Variáveis de Ambiente

```env
DATABASE_URL="postgresql://usuario:senha@host:porta/banco"
NEXTAUTH_SECRET="uma-string-secreta"
GOOGLE_CLIENT_ID="id-google"
GOOGLE_CLIENT_SECRET="secret-google"
FACEBOOK_CLIENT_ID="id-facebook"
FACEBOOK_CLIENT_SECRET="secret-facebook"
NEXTAUTH_URL="url aplicacao"
NEXTAUTH_EMAIL="email from para reset senha"
RESEND_API_KEY="api de envio de emails"
```

## Rodando localmente
1 - Instale dependências:

```bash
npm install
# ou
yarn install
```
2 - Configure .env com as variáveis acima.
3 - Rode as migrações do Prisma:
```bash
npx prisma migrate dev
```
4 - Rode o projeto:
```bash
npm run dev
# ou
yarn dev
```
5 - Acesse http://localhost:3000/login