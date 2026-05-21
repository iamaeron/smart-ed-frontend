export type Log = {
  id: string;
  log_name: string;
  user: User;
  description: string;
  datetime: string;
};

type User = {
  name: string;
  role: string;
  school: string;
};
