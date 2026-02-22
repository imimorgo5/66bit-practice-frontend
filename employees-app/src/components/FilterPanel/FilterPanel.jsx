import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilterArray, setNameSearch } from '../../store/filtersSlice';
import { FilterDropdown } from '../FilterDropdown/FilterDropdown';
import { GENDER_OPTIONS, POSITION_OPTIONS, STACK_OPTIONS } from '../../constants/filters';
import './FilterPanel.css';

export const FilterPanel = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters.draft);
  const [activeDropdown, setActiveDropdown] = useState(null);

  return (
    <div className="filter-panel-container">
      <h1 className="filter-panel-title">Список сотрудников</h1>
      
      <div className="filter-panel-dropdowns">
        <FilterDropdown
          title="Должность"
          options={POSITION_OPTIONS}
          selectedValues={filters.Position}
          isOpen={activeDropdown === 'Должность'}
          onToggle={setActiveDropdown}
          onOptionChange={(val) => dispatch(updateFilterArray({ filterName: 'Position', value: val }))}
          align="left" 
        />
        <FilterDropdown
          title="Пол"
          options={GENDER_OPTIONS}
          selectedValues={filters.Gender}
          isOpen={activeDropdown === 'Пол'}
          onToggle={setActiveDropdown}
          onOptionChange={(val) => dispatch(updateFilterArray({ filterName: 'Gender', value: val }))}
          align="center"
        />
        <FilterDropdown
          title="Стек технологий"
          options={STACK_OPTIONS}
          selectedValues={filters.Stack}
          isOpen={activeDropdown === 'Стек технологий'}
          onToggle={setActiveDropdown}
          onOptionChange={(val) => dispatch(updateFilterArray({ filterName: 'Stack', value: val }))}
          align="right"
        />
      </div>

      <div className="filter-panel-search">
        <input
          type="text"
          placeholder="Поиск"
          value={filters.Name}
          onChange={(e) => dispatch(setNameSearch(e.target.value))}
          className="search-input"
        />
      </div>
    </div>
  );
};