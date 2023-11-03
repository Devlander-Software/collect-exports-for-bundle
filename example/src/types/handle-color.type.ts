import { ThemeInterface } from "./theme.type"

export interface HandleColorInterface {
    (color: string): string
}

export type HandleColorType<T> = {
   (theme: T,
   color: string): string
}

export type HandleColorReturnType = HandleColorType<ThemeInterface>