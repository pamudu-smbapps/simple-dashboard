export interface JwtPayload {
  userId: string;
  email: string;
}

// Express Request extension
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export interface UserAttributes {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
}

export type UserCreationAttributes = Omit<UserAttributes, "id" | "createdAt">;

export interface TodoAttributes {
  id: string;
  userId: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TodoCreationAttributes = Omit<
  TodoAttributes,
  "id" | "completed" | "createdAt" | "updatedAt"
>;

export type TodoUpdateAttributes = Partial<
  Pick<TodoAttributes, "title" | "description" | "completed">
>;
