export interface WorkDay {
  _id: string;
  isOpen: boolean;
  from: string;
  to: string;
}

export interface Friend {
  _id: string;
  title: string;
  url: string;
  addressUrl: string;
  imageUrl: string;
  workDays: WorkDay[] | null;
  phone: string | null;
  email: string | null;
  address: string | null;
}
