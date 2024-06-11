# My Costs

## Aplicação web para gerenciamento de projetos!

### Deploy: [My Costs](https://my-costs-two.vercel.app/)

## Descrição
My Costs é uma aplicação web desenvolvida em React.js que permite o gerenciamento de projetos com funcionalidades completas de CRUD (Create, Read, Update, Delete). Além disso, você pode adicionar descrições detalhadas para os serviços inseridos.

## Instalação
Para instalar e rodar a aplicação localmente, siga os passos abaixo no seu terminal de comandos:

```bash
git clone git@github.com:wesley-moraes/my-costs.git
cd my-costs
npm i
```

Para rodar a aplicação localmente, inicie o servidor React com o comando:

```bash
npm start
```

O seu próprio terminal dirá como acessar geralmente em *http://localhost:3000*


A base de dados está configurada para ser acessada via um Web-Service. Caso deseje rodar a base de dados localmente, altere as rotas para apontarem para o servidor local e execute o json-server:

Para rodar o json-server, execute o comando:

```bash
npm run backend
```

Você pode encontrar esses comandos no arquivo `package.json`.

## Configuração de Rotas

Para alternar as rotas do Web-Service, substitua as URLs nos trechos de código que fazem fetch para os dados. Por exemplo, altere:

```bash
fetch("https://my-costs-db.onrender.com/projects", { ... })
```

Para:
```bash
fetch("http://localhost:5000/projects", { ... })
```

## Hospedagem
A aplicação está hospedada no Vercel e o Web-Service está hospedado no Render para garantir que tudo esteja disponível online.

O repositório da base de dados pode ser [acessado aqui](https://github.com/wesley-moraes/my-costs-db)

## Contato
Para mais informações ou para reportar problemas, entre em contato:

- Email: wesley.moraes@example.com
- GitHub: [wesley-moraes](https://github.com/wesley-moraes/)
- LinkedIn: [Wesley Moraes](https://www.linkedin.com/in/wesley-moraes/)