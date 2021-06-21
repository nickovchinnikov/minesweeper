export type UserPermissions = 'admin' | 'user' | 'manager';

export type PermissionsWithoutAdmin = Exclude<UserPermissions, 'admin'>;

interface DepartmentsForPermission {
  depName: string;
  lvl: number;
}

export const DepsForPerms: Record<UserPermissions, DepartmentsForPermission> = {
  admin: {
    depName: 'security',
    lvl: 10,
  },
  user: {
    depName: 'sales',
    lvl: 5,
  },
  manager: {
    depName: 'sales',
    lvl: 10,
  },
};

type TuplePermissinons = [UserPermissions, UserPermissions];

type BasicUser<A = boolean, P = TuplePermissinons> = {
  name: string;
  surname: string;
  age: number;
  isAdmin: A;
  permissions?: P;
};

export type BasicUserWithoutPermissions = Omit<BasicUser, 'permissions'>;

type AdvancedUser = {
  account: number;
};

type FullUser<A = boolean, P = string[]> = BasicUser<A, P> & AdvancedUser;

export type BasicUserReadonly = Readonly<BasicUser>;
export type BasicUserRequired = Required<BasicUser>;
export type BasicUserPartial = Partial<BasicUser>;

export type BasicUserReadonlyRequired = Readonly<Required<BasicUser>>;

const user: FullUser<boolean> = {
  name: 'Nick',
  surname: 'Ovchinnikov',
  age: 30,
  isAdmin: true,
  account: 100,
  permissions: ['admin', 'user'],
};

user.name = 'Test';

const usersArray: FullUser[] = [user, user];

function getFirst<T>(arr: T[]): T {
  return arr[0];
}

type BasicFunction = () => FullUser[];

export type getFirstReturnType = ReturnType<BasicFunction>;

getFirst<FullUser>(usersArray);

type MathFunc<T = number> = (a: T, b: T) => T;

export const mul: MathFunc = (a, b) => a * b;

export const add: MathFunc = (a, b) => a + b;
