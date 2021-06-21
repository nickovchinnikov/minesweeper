type UserPermissions = 'admin' | 'user' | 'manager';

type PermissionsWithoutAdmin = Exclude<UserPermissions, 'admin'>;

interface DepartmentsForPermission {
  depName: string;
  lvl: number;
}

const DepsForPerms: Record<UserPermissions, DepartmentsForPermission> = {
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

type BasicUserWithoutPermissions = Omit<BasicUser, 'permissions'>;

type AdvancedUser = {
  account: number;
};

type FullUser<A = boolean, P = string[]> = BasicUser<A, P> & AdvancedUser;

type BasicUserReadonly = Readonly<BasicUser>;
type BasicUserRequired = Required<BasicUser>;
type BasicUserPartial = Partial<BasicUser>;

type BasicUserReadonlyRequired = Readonly<Required<BasicUser>>;

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

type getFirstReturnType = ReturnType<BasicFunction>;

getFirst<FullUser>(usersArray);

type MathFunc<T = number> = (a: T, b: T) => T;

const mul: MathFunc = (a, b) => a * b;

const add: MathFunc = (a, b) => a + b;
