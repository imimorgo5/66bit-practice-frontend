import { useParams } from 'react-router-dom';

const EmployeeProfile = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Профиль сотрудника {id}</h1>
    </div>
  );
};

export default EmployeeProfile;