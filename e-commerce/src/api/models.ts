export interface UserResponse {
  email: string;
  name: string;
  avatar: string;
  role: string;
  id: number;
}

export interface UserAuth {
  access_token: string;
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
  count: number;
}
