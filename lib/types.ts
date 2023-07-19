export enum Role {
  PARTICIPANT = "PARTICIPANT",
  ADMIN = "ADMIN",
  USER = "USER"
}

export interface User {
  id: string;
  role: Role;
  name?: string;
  email: string;
  image?: string;
}

export interface UploadedFile {
  id: number;
  filename: string;
  path: string;
  uploadedAt: string;
  userId: string;
}