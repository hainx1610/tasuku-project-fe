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
  email: string;
  name: string;
  password: string;
  responsibleFor: TTask[];
  memberOf: TProject[];
}

type TLoginObj = Omit<TUser, "name" | "responsibleFor" | "memberOf">;
type TRegisterObj = Omit<TUser, "responsibleFor" | "memberOf">;

interface TAuthState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: null | TUser;
  login?: (obj: TLoginObj, cb: () => void) => Promise<void>;
  logout?: (cb: () => void) => Promise<void>;
  register?: (obj: TRegisterObj, cb: () => void) => Promise<void>;
}

export type { TProject, TTask, TUser, TAuthState, TLoginObj, TRegisterObj };
