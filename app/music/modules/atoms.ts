import { atom } from "jotai";
import { AlbumInfo, CriteriaType, MethodType } from "./types";

export const methodAtom = atom<MethodType>("발매일");
export const criteriaAtom = atom<CriteriaType>("내림차순");
export const scrollCountAtom = atom<number>(1);
export const perPageCountAtom = atom<number>(40);
export const scrollPositionAtom = atom<number>(0);
export const currentTotalScrollCountAtom = atom<number>(0);
export const albumDataAtom = atom<AlbumInfo[]>([]);
export const CurrentTagKeyAtom = atom<string>("");
