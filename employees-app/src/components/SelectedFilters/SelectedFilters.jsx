import { useDispatch, useSelector } from 'react-redux';
import { removeFilterItem } from '../../store/filtersSlice';
import { fetchEmployees, resetEmployeesList } from '../../store/employeesSlice';
import { CloseIcon } from '../Icons/Icons';
import { ALL_OPTIONS_MAP } from '../../constants/filters';
import './SelectedFilters.css';

export const SelectedFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const selectedList = [
    ...filters.Position.map(val => ({ type: 'Position', value: val })),
    ...filters.Gender.map(val => ({ type: 'Gender', value: val })),
    ...filters.Stack.map(val => ({ type: 'Stack', value: val }))
  ];

  const handleSearch = () => {
    dispatch(resetEmployeesList());
    dispatch(fetchEmployees({ ...filters, Page: 1, Count: 20 }));
  };

  if (selectedList.length === 0) {
    return (
      <div className="selected-filters-wrapper empty">
        <button className="search-btn" onClick={handleSearch}>Найти</button>
      </div>
    );
  }

  return (
    <div className="selected-filters-wrapper">
      <div className="selected-filters-content">
        <span className="selected-filters-title">Выбранные фильтры:</span>
        <div className="selected-filters-list">
          {selectedList.map((item) => (
            <div 
              key={`${item.type}-${item.value}`} 
              className="selected-filter-tag"
              onClick={() => dispatch(removeFilterItem({ filterName: item.type, value: item.value }))}
            >
              <span>{ALL_OPTIONS_MAP[item.value] || item.value}</span>
              <CloseIcon />
            </div>
          ))}
        </div>
      </div>
      <button className="search-btn" onClick={handleSearch}>Найти</button>
    </div>
  );
};
