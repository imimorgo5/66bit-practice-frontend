import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

export const useFiltersSync = () => {
  const appliedFilters = useSelector((state) => state.filters.applied);
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams();
    
    if (appliedFilters.Name) params.set('Name', appliedFilters.Name);
    if (appliedFilters.Gender.length) params.set('Gender', appliedFilters.Gender.join(','));
    if (appliedFilters.Position.length) params.set('Position', appliedFilters.Position.join(','));
    if (appliedFilters.Stack.length) params.set('Stack', appliedFilters.Stack.join(','));

    setSearchParams(params, { replace: true });
    
    localStorage.setItem('filters', JSON.stringify(appliedFilters));
  }, [appliedFilters, setSearchParams]);
};