export enum AppRoutes {
  HOME = "Home",
  UPLOAD = "Upload",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.UPLOAD]: "/upload",
};

export const routes: Record<AppRoutes, { path: string }> = {
  [AppRoutes.HOME]: {
    path: RoutePath.Home,
  },
  [AppRoutes.UPLOAD]: {
    path: RoutePath.Upload,
  },
};