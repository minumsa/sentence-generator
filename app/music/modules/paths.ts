import { isAdminPage } from "./utils";

const isAdmin = (pathName: string) => isAdminPage(pathName);

export const toPostPath = (pathName: string, albumId: string) =>
  isAdmin(pathName) ? `/music/admin/post/${albumId}` : `/music/post/${albumId}`;

export const artistPath = (pathName: string, artistId: string) =>
  isAdmin(pathName) ? `/music/admin/artist/${artistId}/1` : `/music/artist/${artistId}/1`;

export const tagPath = (pathName: string, tagKey: string) =>
  isAdmin(pathName) ? `/music/admin/search/tag/${tagKey}/1` : `/music/search/tag/${tagKey}/1`;

export const categoryPath = (pathName: string, category: string) =>
  isAdmin(pathName) ? `music/admin/${category}/1` : `music/${category}/1`;

export const toSearchPath = (pathName: string) =>
  isAdmin(pathName) ? `music/admin/search` : `music/search`;
