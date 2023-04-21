export type user = {
  uID: number;
  uName: string;
  uPassword: string;
  uEmail: string;
  uPhone: string;
  uStatus?: number;
};

export type login = {
  id: number;
  token: string;
};
