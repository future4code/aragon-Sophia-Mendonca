# Intro-Criptografia

**Sophia Mendonça** - desenvolvedora na *Raia Drogasil RD*), em treinamento pela *Labenu*.
[github](https://github.com/future4code/aragon-Sophia-Mendonca)

### Descrição:
Estudos em POO - Programação Orientada a Objetos, introduzindo autenticação em um sistema de login, assim como criptografia e roles em um sistema de login..

### Funcionalidas

- `ping`
Endpoint de teste.

- `signup`
Endpoint para cadastrar novos usuários, onde sua senha seja armazenada de forma mais segura no formato hash. O token também deve possuir a propriedade “role”.

- `login`
Endpoint para logar usuários já cadastrados no sistema, com a verificação de usuário válido sendo feita pelo algoritmo de hash (comparação entre senha em plaintext e hash armazenado no banco de dados). O token também deve possuir a propriedade “role”.

- `getAllUsers` (or by nickname)
Endpoint que realiza a busca completa de todos os usuários cadastrados (ou por nickname).

- `editUser`
Endpoint de edição de dados de usuário que permite alterar um usuário pelo seu id. A alteração de dados dependerá do tipo de usuário do sistema. Se o usuário logado for do tipo “NORMAL”, este só poderá modificar os seus próprios dados. Caso seja um “ADMIN”, será permitido a modificação de qualquer usuário do sistema.

- `deleteUser`
Endpoint que deleta via id a conta de um usuário cadastrado, permitindo que somente usuários do tipo “ADMIN” possam executar a deleção.

### Tecnologias utilizadas:
- nodeJS
- express
- dotenv
- cors
- knex
- TypeScript
- SQL
- uuid
- bcryptjs

### Programas utilizados:
- VSCode
- Beekeeper Studio