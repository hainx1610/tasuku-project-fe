interface TProject {
  _id: string;
  name: string;
  description: string;
  includeTasks: string[];
}

interface TTask {
  _id: string;
  name: string;
  description: string;
}

interface TUser {
  _id: string;
  email: string;
  name: string;
  password: string;
  responsibleFor: TTask[];
  memberOf: TProject[];
  role: string;
}

type TLoginObj = Omit<TUser, "name" | "responsibleFor" | "memberOf" | "role">;
type TRegisterObj = Omit<TUser, "responsibleFor" | "memberOf" | "role">;

interface TAuthState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: null | TUser;
  login?: (obj: TLoginObj, cb: () => void) => Promise<void>;
  logout?: (cb: () => void) => Promise<void>;
  register?: (obj: TRegisterObj, cb: () => void) => Promise<void>;
}

interface TTaskState {
  isLoading: boolean;
  error: null;
}

export type {
  TProject,
  TTask,
  TUser,
  TAuthState,
  TLoginObj,
  TRegisterObj,
  TTaskState,
};
