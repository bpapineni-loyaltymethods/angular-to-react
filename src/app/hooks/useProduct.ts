import { useCallback, useState } from 'react';
import api from '../utils/api';
import { useAlert } from './useAlert';

export const useProduct = () => {
  const { errorAlert } = useAlert();
  const [productsCache, setProductsCache] = useState<Record<string, any>>({});

  const getProducts = useCallback(async () => {
    if (!productsCache['allProducts']) {
      try {
        const response = await api.get('/api/v1/products');
        setProductsCache(prev => ({ ...prev, allProducts: response.data }));
        return response.data;
      } catch (error: any) {
        setProductsCache(prev => ({ ...prev, allProducts: null }));
        errorAlert(error.message);
        throw error;
      }
    }
    return productsCache['allProducts'];
  }, [productsCache, errorAlert]);

  const getOtherProducts = useCallback(async (category: string, subcategory?: string) => {
    const cacheKey = `${category}_${subcategory}`;
    
    if (!productsCache[cacheKey]) {
      try {
        const params: any = { category };
        if (subcategory) {
          params.subcategory = subcategory;
        }

        const response = await api.get('/api/v1/otherProducts', { params });
        setProductsCache(prev => ({ ...prev, [cacheKey]: response.data }));
        return response.data;
      } catch (error: any) {
        setProductsCache(prev => ({ ...prev, [cacheKey]: null }));
        errorAlert(error.message);
        throw error;
      }
    }
    return productsCache[cacheKey];
  }, [productsCache, errorAlert]);

  const clearCache = useCallback(() => {
    setProductsCache({});
  }, []);

  return {
    getProducts,
    getOtherProducts,
    clearCache
  };
};