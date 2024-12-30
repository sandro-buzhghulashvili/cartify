import { cookies } from 'next/headers';
import axios from 'axios';

const cookiesStore = cookies();

export const getAllProducts = async (filters: { [key: string]: string }) => {
  try {
    const res = await axios.get('http://localhost:5000/products/get-products', {
      params: filters,
      headers: {
        Authorization: cookiesStore.get('token')?.value,
      },
    });

    return res.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
};
