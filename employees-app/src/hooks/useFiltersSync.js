import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

export const useFiltersSync = () => {
  const filters = useSelector((state) => state.filters);
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.Name) params.set('Name', filters.Name);
    if (filters.Gender.length) params.set('Gender', filters.Gender.join(','));
    if (filters.Position.length) params.set('Position', filters.Position.join(','));
    if (filters.Stack.length) params.set('Stack', filters.Stack.join(','));

    setSearchParams(params, { replace: true });
    
    localStorage.setItem('filters', JSON.stringify(filters));
  }, [filters, setSearchParams]);
};