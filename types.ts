export enum Screen {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  FINANCIALS = 'FINANCIALS',
  MEMBERSHIP_CARD = 'MEMBERSHIP_CARD',
  ECOSYSTEM = 'ECOSYSTEM',
  DIRECTORY = 'DIRECTORY'
}

export interface User {
  name: string;
  email: string;
  id: string;
  role: string;
  level: string;
  photo: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  time: string;
  image: string;
}

export interface ClubEvent {
  id: string;
  title: string;
  date: string;
  month: string;
  location: string;
  type: 'general' | 'charity' | 'special';
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  time: string;
  status: 'SUCCESS' | 'UNPAID' | 'PENDING';
  type: 'dues' | 'levy' | 'fund' | 'fine';
}

export interface Member {
  id: string;
  name: string;
  role: string;
  level: string;
  photo: string;
  status: 'active' | 'inactive';
}

export interface ClubDocument {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'xls' | 'folder';
  size: string;
  date: string;
  sharedBy: string;
}