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
  password?: string;
  responsibleFor: TTask[];
  memberOf: TProject[];
}

interface TAuthState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: null | TUser;
  login?: (obj: TUser, cb: () => void) => Promise<void>;
  logout?: (cb: () => void) => Promise<void>;
  register?: (obj: TUser, cb: () => void) => Promise<void>;
}

export type { TProject, TTask, TUser, TAuthState };
