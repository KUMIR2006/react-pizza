import { RootState } from "../store";

export const selectFilter = (state: RootState) => state.filter;
export const selectPizzaData = (state: RootState) => state.pizza;
