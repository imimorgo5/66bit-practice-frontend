import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeeById, clearCurrentEmployee } from '../../store/employeesSlice';
import { Header } from '../../components/Header/Header';
import { formatDate, formatPhone } from '../../utils/formatters';
import './EmployeeProfile.css';

const EmployeeProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentEmployee, profileStatus, profileError } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployeeById(id));
    return () => {
      dispatch(clearCurrentEmployee());
    };
  }, [dispatch, id]);

  if (profileStatus === 'loading') {
    return (
      <div className="page-wrapper">
        <Header />
        <main className="main-content">Загрузка...</main>
      </div>
    );
  }

  if (profileError || !currentEmployee) {
    return (
      <div className="page-wrapper">
        <Header />
        <main className="main-content">
          <div className="error-message">
            Сотрудник не найден или произошла ошибка.
            <Link to="/">Вернуться к списку</Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Header />
      <main className="main-content">
        <div className="breadcrumbs">
          <span>Главная</span> &gt; <Link to="/">Список сотрудников</Link> &gt; <span>{currentEmployee.name}</span>
        </div>

        <div className="profile-header-card">
          <div className="profile-photo">
            {currentEmployee.photo ? (
              <img src={currentEmployee.photo} alt={currentEmployee.name} />
            ) : (
              <div className="photo-placeholder" />
            )}
          </div>
          <div className="profile-title-info">
            <h2>{currentEmployee.name}</h2>
            <p className="profile-position">{currentEmployee.position}</p>
            <div className="profile-stack desktop-only">
              {currentEmployee.stack?.map((tech) => (
                <span key={tech} className="tech-badge">{tech}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="profile-stack mobile-only">
          {currentEmployee.stack?.map((tech) => (
            <span key={tech} className="tech-badge">{tech}</span>
          ))}
        </div>

        <div className="profile-details">
          <h3>Основная информация</h3>
          <div className="details-grid">
            <div className="details-row">
              <span className="details-label">Контактный телефон</span>
              <span className="details-value">{formatPhone(currentEmployee.phone)}</span>
            </div>
            <div className="details-row">
              <span className="details-label">Дата рождения</span>
              <span className="details-value">{formatDate(currentEmployee.birthdate)}</span>
            </div>
            <div className="details-row">
              <span className="details-label">Дата устройства</span>
              <span className="details-value">{formatDate(currentEmployee.dateOfEmployment)}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeProfile;