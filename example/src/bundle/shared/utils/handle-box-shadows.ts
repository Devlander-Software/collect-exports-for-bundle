import { BoxShadowHandler } from "../types/base-theme-types";

export const boxShadowOne: BoxShadowHandler = (color: string) => {
  return `0px -1px 10px ${color}`;
};

