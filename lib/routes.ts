import { Role } from "./types";

export enum AppRoutes {
  HOME = "Home",
  UPLOAD = "Upload",
  DOCUMENTS = "Documents",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.UPLOAD]: "/upload",
  [AppRoutes.DOCUMENTS]: "/documents",
};

export const routes: Record<AppRoutes, { path: string, role?: keyof typeof Role }> = {
  [AppRoutes.HOME]: {
    path: RoutePath.Home,
  },
  [AppRoutes.UPLOAD]: {
    path: RoutePath.Upload,
    role: Role.ADMIN,
  },
  [AppRoutes.DOCUMENTS]: {
    path: RoutePath.Documents,
  },
};