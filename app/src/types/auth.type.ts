export interface User {
  id: number;
  email: string;
  username: string;
  phone: string;
  status: string;
  walletAddress: string;
  roles: Role[];
}

export interface Role {
  id: number;
  role: string;
}
