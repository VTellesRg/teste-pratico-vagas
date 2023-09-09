# TESTE VAGA SHOPPER REACT NODE FULL STACK JR

## Instruções do Projeto

- Neste repositório se encontra os arquivos de front end em react do desafio proposto pela Shopper, primeiramente para acessar os documentos do back-end [clique aqui](https://github.com/VTellesRg/teste-vagas-backend)
- Como proposto não foi realizado deploy das aplicações, para rodar o projeto é necessário clonar o repositório e seguir os passos abaixo:
1. certifique-se de que possui o node instalado em sua máquina (versão 16.4 ou superior)
2. abra o terminal na pasta do projeto navegue pelo terminal para diretório src/app e execute o comando `npm install ` para instalar as dependências do projeto
3. após a instalação das dependências execute o comando  `npm start` para iniciar a página no endereço `http://localhost:3000/`

4. antes de acessar a página é necessário iniciar o servidor back-end, para isso siga os passos do repositório do back-end [clique aqui](https://github.com/VTellesRg/teste-vagas-backend)

5. após iniciar o servidor back-end a página estará disponível para receber a planilha de dados, para isso clique no botão "Selecionar arquivo" e selecione a planilha que deseja enviar, após clique no botão "VALIDAR" e aguarde a validação então, em seguida, será exibida uma tabela na tela com os dados da planilha e os possíveis erros, que quando existentes recebem a respectiva descrição em uma coluna a parte, quando não existentes a coluna fica com todas as células preenchidas com "OK" e o botão "ATUALIZAR" sera disponibilizado como solicitado no desafio.

## Breve descrição do projeto
- O projeto consiste em uma api (consumida pela página presente nesse repositório) que recebe uma planilha de atualização de preços de produtos, a api lê o arquivo e realiza as validações solicitadas pela Shopper, após a validação a api retorna para a tabela de front-end as informações necessárias para atualizar os preços dos produtos, caso todas as validações sejam atendidas a api permite a atualização dos preços no banco de dados, caso contrário a api retorna as mensagens de erro para o front-end e o usuário precisa reenviar o arquivo com os dados corrigidos de acordo com os parametros do desafio.