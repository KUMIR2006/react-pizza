import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, PizzaApiResponse, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, order, category, currentPage } = params;
    const { data } = await axios.get<PizzaApiResponse>(
      `https://ff28541722520873.mokky.dev/items?&page=${currentPage}&limit=4&${category}&sortBy=${
        order == 'desc' ? '' : '-'
      }${sortBy}`,
    );

    return data.items;
  },
);
