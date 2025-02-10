Login Supabase

Descrição

Este é um projeto de autenticação utilizando Supabase para gerenciamento de usuários. Ele fornece um fluxo completo de login e registro com armazenamento seguro de credenciais, utilização de contexto para controle de sessão e uma interface responsiva criada com React, TailwindCSS e React Router.

Recursos

Cadastro e login de usuários via Supabase Auth

Gerenciamento de sessões com useContext e useEffect

Redirecionamento seguro após login

UI moderna utilizando TailwindCSS

Suporte a logout e persistência de sessão

Tecnologias Utilizadas

React + Vite

Supabase (Auth + Database)

React Router (para navegação)

TailwindCSS (para estilização)

Lucide-react (para ícones)

Como Rodar o Projeto

1. Clone este repositório

git clone https://github.com/rodrigoribeiro027/login_supabase.git
cd login_supabase

2. Instale as dependências

yarn install  # ou npm install

3. Configure o Supabase

Crie um arquivo .env na raiz do projeto e adicione suas credenciais do Supabase:

VITE_SUPABASE_URL=https://SEU_PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_ANON_KEY

4. Inicie o projeto

yarn dev  # ou npm run dev

O projeto estará rodando em http://localhost:5173.

Estrutura do Projeto

/src
  /components
  /contexts
  /pages
  /utils      
  main.tsx 

Contribuição

Sinta-se à vontade para abrir issues ou enviar pull requests!

Desenvolvido por Rodrigo Ribeiro 🚀

