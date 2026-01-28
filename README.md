# PokéDex - Desafio Técnico

Este projeto consiste em uma PokéDex interativa desenvolvida para o desafio técnico da **Lumis**. A aplicação permite listar, buscar e navegar pelos Pokémon de forma fluida, seguindo fielmente o design proposto no Figma.


Live Demo: https://thiagosullivan.github.io/lumis-pokedex/


## 🛠️ Tecnologias Utilizadas e Justificativas

Embora o desafio sugerisse o uso de Vanilla JS, optei por uma stack moderna baseada nos requisitos da vaga e nas necessidades de escalabilidade do projeto:

### ⚛️ React & Vite
*   **React:** Foi escolhido para garantir uma interface reativa e componentizada, permitindo que a busca e a paginação ocorram sem o recarregamento da página (single page aplication), conforme solicitado nos requisitos de interatividade.
*   **Vite:** Utilizado como build tool pela sua velocidade de inicialização, proporcionando uma experiência de desenvolvimento superior ao webpack.

### 📘 TypeScript
*   Adotado para trazer segurança ao código através da tipagem estática. Em um projeto que consome uma API externa como a PokéAPI, o TypeScript ajuda a prevenir erros de runtime, também era um requisito da vaga.

### 🎨 SASS (SCSS Modules)
*   Conforme requisitado na descrição da vaga, utilizei o **SASS** para organizar os estilos. O uso de **CSS Modules** garante o escopo das classes, evitando conflitos, enquanto o SASS facilita a gestão de variáveis (como a paleta de cores dos tipos de Pokémon) e a implementação de mixins para breakpoints responsivos.

### 🚀 TanStack Query (React Query)
*   Implementado para gerenciar as requisições HTTP e o estado de cache. 
    *   **Performance:** Evita chamadas repetitivas à API para o mesmo Pokémon.
    *   **UX:** Gerencia estados de *loading* e *error* de forma nativa, garantindo uma navegação instantânea para dados já carregados.

---

## 📋 Funcionalidades Implementadas

1.  **Listagem Dinâmica:** Renderização de cards com ID, nome, tipos e imagem.
2.  **Busca em Tempo Real:** Filtro de Pokémon por nome ou tipo sem recarregar a página.
3.  **Paginação:** Navegação controlada para garantir a performance da aplicação ao lidar com grandes volumes de dados.
4.  **Responsividade Total:** Layout adaptável para Mobile, Tablet e Desktop, utilizando CSS Grid e Flexbox.
5.  **Identidade Visual:** Seguindo o layout disponibilizado no Figma do desafio.

---

## 📷 Imagens

### Home
![Home](https://i.ibb.co/93TXMgS7/pokedex-home.png "Home")

### Página de Detalhes
![Págiona de Detalhes](https://i.ibb.co/27rnmzXh/pokedex-details.png "Págiona de Detalhes")

## 🚀 Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/thiagosullivan/lumis-pokedex
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  **Acesse no navegador:**
    `http://localhost:5173`

---

## 📌 Observações Adicionais

*   **Git Flow:** O desenvolvimento seguiu boas práticas de versionamento com commits semânticos.
*   **Arquitetura:** O código foi organizado em componentes menores e reutilizáveis (Card, Search, Grid, Loading), visando legibilidade e facilidade de teste.

Desenvolvido por **Thiago Sullivan**
