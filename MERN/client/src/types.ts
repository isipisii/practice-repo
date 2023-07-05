export interface INote {
  _id: string;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface INoteInput {
  title: string;
  text?: string;
}


export interface IUser {
  username: string
  email: string
}

export interface ISignUpCredentials {
  username: string
  email: string
  password: string
}

export interface ILoginCredentials {
  username: string
  password: string
}