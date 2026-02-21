import { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchEmployees, resetEmployeesList } from '../../store/employeesSlice';
import { formatDate, formatPhone } from '../../utils/formatters';
import './EmployeeTable.css';

export const EmployeeTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, status, hasMore, error } = useSelector((state) => state.employees);
  const filters = useSelector((state) => state.filters);
  const observer = useRef();
  const pageRef = useRef(1);

  useEffect(() => {
    const initFetch = () => {
      pageRef.current = 1;
      dispatch(resetEmployeesList());
      dispatch(fetchEmployees({ ...filters, Page: 1, Count: 20 }));
    };
    initFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetEmployeesList());
    };
  }, [dispatch]);

  const loadMore = useCallback(() => {
    if (status === 'loading' || !hasMore) return;
    pageRef.current += 1;
    dispatch(fetchEmployees({ ...filters, Page: pageRef.current, Count: 20 }));
  }, [status, hasMore, filters, dispatch]);

  const lastElementRef = useCallback(
    (node) => {
      if (status === 'loading') return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      }, { threshold: 1.0 });

      if (node) observer.current.observe(node);
    },
    [status, hasMore, loadMore]
  );

  useEffect(() => {
    if (list.length === 0) {
      pageRef.current = 1;
    }
  }, [list.length]);

  useEffect(() => {
    if (list.length === 0 && status === 'idle') {
      pageRef.current = 1;
      dispatch(fetchEmployees({ ...filters, Page: 1, Count: 20 }));
    }
  }, [dispatch, filters, list.length, status]);

  if (error) {
    return <div className="table-message error">Ошибка загрузки: {error}</div>;
  }

  if (status === 'loading' && list.length === 0) {
    return <div className="table-message">Загрузка...</div>;
  }

  if (status === 'succeeded' && list.length === 0) {
    return <div className="table-message">Сотрудники не найдены</div>;
  }

  return (
    <div className="table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Должность</th>
            <th>Телефон</th>
            <th>Дата рождения</th>
          </tr>
        </thead>
        <tbody>
          {list.map((employee, index) => {
            const isLast = list.length === index + 1;
            return (
              <tr
                key={employee.id}
                ref={isLast ? lastElementRef : null}
                onClick={() => navigate(`/employee/${employee.id}`)}
              >
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>{formatPhone(employee.phone)}</td>
                <td>{formatDate(employee.birthdate)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {status === 'loading' && <div className="table-message">Загрузка...</div>}
    </div>
  );
};