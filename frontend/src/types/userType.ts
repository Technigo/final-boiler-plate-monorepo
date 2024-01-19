export type CreateUser = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type FormError = {
  name: { error: boolean; message: string };
  email: { error: boolean; message: string };
  password: { error: boolean; message: string };
  passwordConfirm: { error: boolean; message: string };
};

export type UpdateUserBody = {
  name?: string;
  email?: string;
  newPassword?: string;
};

export type LoginBody = {
  email: string;
  password: string;
};

export type UserRes = {
  id: string;
  accessToken: string;
};

export type CurrentUser = {
  name: string;
  login: boolean;
};

export type User = {
  name?: string;
  email?: string;
  password?: string;
  passwordConfiorm?: string;
  todayGoal?: string;
  weeklyGoal?: string;
  yearlyGoal?: string;
  monthlyGoal?: string;
  generalGoal?: string;
  theme?: string;
  stickers?: Array<Sticker>;
};

export type Sticker = {
  _id?: string;
  title?: string;
  text?: string;
  position?: { x?: number; y?: number };
  colors?: { background?: string; textColor?: string };
  size?: { width?: number; height?: number };
  createdAt?: string;
};
