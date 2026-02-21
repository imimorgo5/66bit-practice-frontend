import { Header } from '../../components/Header/Header';
import { FilterPanel } from '../../components/FilterPanel/FilterPanel';
import { SelectedFilters } from '../../components/SelectedFilters/SelectedFilters';
import { EmployeeTable } from '../../components/EmployeeTable/EmployeeTable';
import { useFiltersSync } from '../../hooks/useFiltersSync';
import './EmployeeList.css';

const EmployeeList = () => {
  useFiltersSync();

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content">
        <div className="breadcrumbs">
          <span>Главная</span> &gt; <span>Список сотрудников</span>
        </div>
        <FilterPanel />
        <SelectedFilters />
        <EmployeeTable />
      </main>
    </div>
  );
};

export default EmployeeList;