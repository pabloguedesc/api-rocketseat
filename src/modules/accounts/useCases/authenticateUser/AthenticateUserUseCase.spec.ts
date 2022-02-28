import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "6782312823",
      name: "Jojo Star",
      email: "jojo@gmail.com",
      password: "jojo@123",
    };

    await createUserUseCase.execute(user);
    const authentication = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(authentication).toHaveProperty("token");
  });

  it("Should not be able to authenticate an nonexistent user ", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@gmail.com",
        password: "511313131",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        name: "UserTest test",
        email: "user.email.test@gmaail.com",
        password: "12345",
        driver_license: "4544564",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "passwordTest",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
