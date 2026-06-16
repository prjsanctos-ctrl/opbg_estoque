# SDI Controle de Estoque

Sistema de controle de estoque de peças eletrônicas desenvolvido com HTML, CSS, JavaScript e Supabase.

## 🚀 Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript
- **Framework**: Bootstrap 5
- **Banco de Dados**: Supabase (PostgreSQL)
- **Autenticação**: Supabase Auth
- **Deploy**: Vercel + GitHub

## 📋 Funcionalidades

- ✅ Controle de estoque de peças
- ✅ Solicitações de peças
- ✅ Entrada e saída de produtos
- ✅ Autocomplete para busca de peças
- ✅ Impressão de etiquetas (80mm x 50mm)
- ✅ Relatórios (Excel e PDF)
- ✅ Auditoria do sistema
- ✅ Backup de dados
- ✅ Devolução de peças BAD
- ✅ Aceite de peças

## 🔑 Credenciais

| Usuário | Senha | Tipo |
|---------|-------|------|
| admin@sdi.com | admin123 | Administrador |
| joao@sdi.com | 123456 | Usuário |

## 🗄️ Banco de Dados

O sistema utiliza Supabase como banco de dados. As tabelas são:

- `usuarios` - Usuários do sistema
- `produtos` - Peças em estoque
- `solicitacoes` - Solicitações de peças
- `entradas` - Entradas de produtos
- `saidas` - Saídas de produtos
- `operacoes` - Operações da empresa
- `auditoria` - Log de atividades
- `foraEstoque` - Peças removidas
- `backups` - Histórico de backups
- `configuracoes` - Configurações do sistema

## 📦 Deploy

### Supabase
1. Crie uma conta em https://supabase.com/
2. Crie um novo projeto
3. Execute o SQL de criação das tabelas
4. Copie as credenciais (URL e ANON_KEY)

### Vercel
1. Faça login em https://vercel.com/
2. Conecte seu repositório GitHub
3. Clique em "Deploy"

### GitHub
1. Crie um repositório
2. Faça upload dos arquivos
3. Conecte ao Vercel

## 📝 Configuração

1. Edite o arquivo `supabase-config.js`
2. Substitua `SUPABASE_URL` e `SUPABASE_ANON_KEY`
3. Faça deploy

## 🖥️ Desenvolvimento Local

Para rodar localmente:

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/sdi-estoque.git

# Abra o arquivo
open index.html