# Projeto Labook (18/08/2022)

## Autora: Sophia Mendonça
Desenvolvedora (*Raia Drogasil RD*, em treinamento pela *Labenu*), youtuber ([*Mundo Autista*](https://www.youtube.com/c/MundoAutista)) e mestre em Comunicação, Territorialidades e Vulnerabilidades (UFMG)
[Linkedin](https://www.linkedin.com/in/sophia-mendon%C3%A7a-b88550212/)

### Descrição
**Labook** é uma rede social com o objetivo de promover a conexão e interação entre seus mais diversos usuários. As pessoas poderão criar e curtir publicações.

### Documentação
[API | Postman](https://documenter.getpostman.com/view/20786743/VUqmxKt5)
[Deploy | Heroku](https://app-sophia-labook.herokuapp.com/)

### Funcionalidades

- `Endpoint 0 - Ping (Teste da API)`
Esta requisição é utilizada para testar o funcionamento da API.

- `Endpoint 1 - Signup (Cadastro de usuário)`
Esta requisição tem como objetivo cadastrar novos usuários.

- `Endpoint 2 - Login (Login de usuário)`
Essa requisição é responsável pelo login de usuários já cadastrados.

- `Endpoint 3 - New Post (Criação de novo post)`
Esta requisição cria um post que não pode ser acessado sem um token.

- `Endpoint 4 - Get All Posts (Retorna todos os posts)`
Esta requisição retorna todos os posts.

- `Endpoint 5 - Delete Post (Deletar post)`
Esta requisição é responsável por deletar um post.

- `Endpoint 6 - Like Post (Curtir post)`
Esta requisição é responsável por dar like em um post.

- `Endpoint 7 - Deslike Post (Descurtir post)`
Esta requisição é responsável por remover o like de um post.


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

### Programas utilizados
- VSCode e extensão REST Client
- Beekeeper Studio
- Postman API Platform
- Heroku: Cloud Application Platform