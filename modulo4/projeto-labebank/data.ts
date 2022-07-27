export type Statement = [
    {
      accountValue: number;
      description: string;
      paymentDate: string
    }
  ];
  
  export type User = {
    id: number,
    name: string,
    cpf: string,
    birthDate: string,
    balance: number,
    statement: Statement
  };
  
  export const users: User[] = [
    {
      id: 1,
      name: "Sophia",
      cpf: "111.111.111-11",
      birthDate: "01/01/2001",
      balance: 5000,
      statement: [
        {
          accountValue: 1000,
          description: "Labenu",
          paymentDate: "01/06/2022",
        }
      ]
    },
    {
      id: 2,
      name: "Selma",
      cpf: "222.222.222-22",
      birthDate: "02/02/2002",
      balance: 22200,
      statement: [
        {
          accountValue: 500,
          description: "Spa",
          paymentDate: "02/06/2022",
        }
      ]
    },
  
    {
      id: 3,
      name: "Suzy",
      cpf: "333.333.333-33",
      birthDate: "03/03/2003",
      balance: 3800,
      statement: [
        {
          accountValue: 300,
          description: "conta de energia",
          paymentDate: "03/06/2022",
        }
      ]
    },
  
    {
      id: 4,
      name: "Will",
      cpf: "444.444.444-04",
      birthDate: "04/04/2004",
      balance: 5000,
      statement: [
        {
          accountValue: 250,
          description: "conta internet",
          paymentDate: "05/06/2022",
        }
      ]
    },
  
    {
      id: 5,
      name: "Thiago",
      cpf: "555.555.555-55",
      birthDate: "05/05/2000",
      balance: 2800,
      statement: [
        {
          accountValue: 100,
          description: "Manutenção notebook",
          paymentDate: "03/06/2022",
        }
      ]
    },
  ];
  [11:06, 10/07/2022] Thiago Dev RD: ABAIXO O ARQUIVO COM O CÓDIGO ->    INDEX.TS (ATUALIZADO)
  [11:06, 10/07/2022] Thiago Dev RD: import express, { Request, Response } from "express"
  import cors from "cors"
  import { User, users } from "./data"
  
  const app = express()
  
  app.use(cors())
  
  app.use(express.json())
  
  app.listen(3003, () => {
    console.log("Server running on port 3003.")
  })
  
  //Endpoint - API Testing
  app.get("/test", (req: Request, res: Response) => {
    res.send({
      message: "API working properly."
    })
  })
  
  //Endpoint - Create new user
  app.post("/users", (req: Request, res: Response) => {
    let errorCode: number = 400
  
    try {
      const { name, cpf, birthDate } = req.body
  
      if (!name || !cpf || !birthDate) {
        errorCode = 422
        throw new Error(" Name, CPF and birthdate must be exist.")
      }
  
      if (
        typeof name !== "string" ||
        typeof cpf !== "string" ||
        typeof birthDate !== "string"
      ) {
        errorCode = 422
        throw new Error("Name, email and birthdate must be a string.")
      }
  
      const cpfIndex: number = users.findIndex((user) => user.cpf === cpf)
  
      const date: Date = new Date()
      const actualYear: number = date.getFullYear()
  
      const birthSplitted: any = birthDate.split("/")
      const birthYear: number = birthSplitted[2]
  
      const checkAge: number = actualYear - birthYear
  
      if (cpfIndex < 0) {
        if (checkAge >= 18) {
          if (name.length > 3) {
            const newUser: User = {
              id: Date.now(),
              name: name,
              cpf: cpf,
              birthDate: birthDate,
              balance: 0,
              statement: [
                {
                  accountValue: 0,
                  description: "",
                  paymentDate: "",
                },
              ],
            }
  
            users.push(newUser)
            res.status(200).send({
              message: "User created successfully!",
              users: users,
            })
          }
          errorCode = 422
          throw new Error("Name must be longer than 3 caracters")
        }
        errorCode = 422;
        throw new Error("User must be over 18 years old")
      }
      errorCode = 422
      throw new Error("CPF already exists.")
    } catch (error) {
      res.status(errorCode).send({ message: error.message })
    }
  });
  
  //Endpoint - Get Balance
  
  app.get("/users/:id", (req: Request, res: Response) => {
    let errorCode: number = 400
  
    try {
      const id = Number(req.params.id)
  
      const indexId: number = users.findIndex((user) => user.id === id)
  
      if (indexId < 0) {
        errorCode = 409
        throw new Error("Id doesn't exist")
      }
  
      const result: User[] = users.filter((user) => user.id === id)
  
      const balance: User[] = result.map((item: any) => {
        return item.balance
      })
  
      res.status(200).send({ message: "selected id", users: balance })
    } catch (error) {
      res.status(errorCode).send({ message: error.message })
    }
  })
  
  // Endpoint - Add Balance
  
  app.put("/users/:id", (req: Request, res: Response) => {
    let errorCode: number = 400
  
    try {
      const id = Number(req.params.id)
      const { balance } = req.body
  
      const indexId: number = users.findIndex((user) => user.id === id)
  
      if (indexId < 0) {
        errorCode = 409
        throw new Error("Id doesn't exist")
      }
  
      if (typeof balance !== "number" || balance <= 0) {
        errorCode = 422
        throw new Error(
          "Balance type must be a number and balance amount must be greater than zero."
        );
      }
  
      const result: User[] = users.filter((user) => {
          if(user.id === id){
              user.balance = user.balance + balance
  
              res.status(200).send({
                  message: "Update balance.",
                  users: user
                })
          }
          })
  
    } catch (error) {
      res.status(errorCode).send({ message: error.message })
    }
  })
  
  //Endpoint - Pay bill
  
  app.put("/users/:id/pay", (req: Request, res: Response) => {
    let errorCode: number = 400
    try {
      const id = Number(req.params.id)
  
      const { accountValue, description } = req.body
  
      const indexId: number = users.findIndex((user) => user.id === id)
  
      if (indexId < 0) {
        errorCode = 409;
        throw new Error("Id doesn't exist")
      }
  
      if (!accountValue || !description) {
        errorCode = 422;
        throw new Error(" AccountValue and description must be exist.")
      }
  
      if (
        typeof accountValue !== "number" ||
        typeof description !== "string"
      ) {
        errorCode = 422
        throw new Error(
          " AccountValue type must be a number and description type must be a string."
        )
      }
  
      if (accountValue <= 0 || description.length < 6) {
        errorCode = 422
        throw new Error(
          " AccountValue must be a number greater than zero and description must be longer than 6 caracters"
        )
      }
  
      const date: Date = new Date()
      const actualDate = date.toLocaleDateString()
  
      const newStatement = {
        accountValue: accountValue,
        description: description,
        paymentDate: actualDate
      };
  
      const checkPay: User[] = users.filter((user) => {
        if (user.id === id) {
          if (user.balance > accountValue) {
            user.balance = user.balance - accountValue
            user.statement.push(newStatement)
            res.status(200).send({
              message: "Successfully paid",
              users: user
            })
            return checkPay
          }
          errorCode = 422;
          throw new Error(
            "The account amount cannot be greater than the balance amount."
          )
        }
      })
    } catch (error) {
      res.status(errorCode).send({ message: error.message })
    }
  })