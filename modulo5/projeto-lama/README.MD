# Projeto Labook (19/08/2022)

## Autora: Sophia Mendonça
Desenvolvedora (*Raia Drogasil RD*, em treinamento pela *Labenu*), youtuber ([*Mundo Autista*](https://www.youtube.com/c/MundoAutista)) e mestre em Comunicação, Territorialidades e Vulnerabilidades (UFMG)
[Linkedin](https://www.linkedin.com/in/sophia-mendon%C3%A7a-b88550212/)

### Descrição
O **Labenu Music Awards (LAMA)** é um show anual de músicas. Ele conta com a participação de bandas super famosas nacionais e internacionais. O evento acontece sempre durante uma semana inteira, com início na manhã de segunda e desfecho na noite de domingo. Assim, a demanda é organizar e centralizar as informações dos shows em um servidor, que então disponibiliza os dados para o website no front-end já criado. Além de controlar os eventos no que se refere a bandas e datas de shows, a aplicação gerencia os ingressos de cada espetáculo. Isso, de modo a respeitar o limite máximo de ingressos por show, já que a arena tem capacidade máxima de 5000 pessoas.

### Documentação
[API | Postman](https://documenter.getpostman.com/view/20786743/VUqptdGU)
[Deploy | Heroku](https://app-sophia-lama.herokuapp.com/)

### Funcionalidades

- `Endpoint 0 - Ping
ENDPOINT DE TESTE DA API.

- `Endpoint 1 - Signup`
ENDPOINT PARA CADASTRO DE NOVOS USUÁRIOS. ELE RECEBE O NAME, EMAIL E PASSWORD DO NOVO INSCRITO.´

- `Endpoint 2 - Login`
ENDPOINT PARA LOGAR USUÁRIOS CADASTRADOS. ELE RECEBE O EMAIL E O PASSWORD DA PESSOA.

- `Endpoint 3 - Create show`
ENDPOINT PROTEGIDO RESPONSÁVEL PELA CRIAÇÃO DE SHOWS. SOMENTE ADMINS PODEM UTILIZÁ-LO.

- `Endpoint 4 - Get Shows`
ENDPOINT PROTEGIDO CAPAZ DE RETORNAR TODOS OS SHOWS.

- `Endpoint 5 - Buy ticket`
ENDPOINT PROTEGIDO RESPONSÁVEL POR RESERVAR UM INGRESSO.

- `Endpoint 6 - Delete tickey`
ENDPOINT PROTEGIDO CAPAZ DE DELETAR A RESERVA DE UM INGRESSO, EM QUE SOMENTE ADMINS PODEM REMOVER TICKETS DE OUTROS USUÁRIOS.

### Tecnologias utilizadas
- nodeJS
- express
- dotenv
- cors
- knex
- TypeScript
- SQL
- uuid
- bcryptjs
- jsonwebtoken
- jester

### Programas utilizados
- VSCode e extensão REST Client
- Beekeeper Studio
- Postman API Platform
- Heroku: Cloud Application Platform