export type Company = {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
};

export type CompanyDto = {
  id: number;
  name: string;
  addresses: { street: string; city: string; country: string }[];
  phone: string;
  email: string;
  website: string;
};
