import type { UserAttributes, UserCreationAttributes } from "../types/index.js";
import { generateId } from "../utils/helpers.js";

const users = new Array<User>();

export class User {
  public id: string;
  public email: string;
  public password: string;
  public name: string;
  public createdAt: Date;

  constructor(attributes: UserAttributes) {
    this.id = attributes.id;
    this.email = attributes.email;
    this.password = attributes.password;
    this.name = attributes.name;
    this.createdAt = attributes.createdAt;
  }

  toJSON(): Omit<UserAttributes, "password"> {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      createdAt: this.createdAt,
    };
  }

  static findByEmail(email: string): User | null {
    return users.find((u) => u.email === email) ?? null;
  }

  static findById(id: string): User | null {
    return users.find((u) => u.id === id) ?? null;
  }

  static create(data: UserCreationAttributes): User {
    const user = new User({
      id: generateId(),
      email: data.email,
      password: data.password,
      name: data.name,
      createdAt: new Date(),
    });
    users.push(user);
    return user;
  }
}
