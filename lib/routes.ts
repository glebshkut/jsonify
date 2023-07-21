import { IconType } from "react-icons";
import { Role } from "./types";
import { AiOutlineHome } from "react-icons/ai";
import { BsUpload } from "react-icons/bs";
import { IoDocumentsOutline } from "react-icons/io5";

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

export const routes: Record<AppRoutes, { path: string, icon: IconType, role?: keyof typeof Role }> = {
  [AppRoutes.HOME]: {
    path: RoutePath.Home,
    icon: AiOutlineHome,
  },
  [AppRoutes.UPLOAD]: {
    path: RoutePath.Upload,
    role: Role.ADMIN,
    icon: BsUpload,
  },
  [AppRoutes.DOCUMENTS]: {
    path: RoutePath.Documents,
    icon: IoDocumentsOutline,
  },
};