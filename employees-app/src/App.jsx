import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmployeeList from './pages/EmployeeList/EmployeeList';
import EmployeeProfile from './pages/EmployeeProfile/EmployeeProfile';
import NotFound from './pages/NotFound/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/employee/:id" element={<EmployeeProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;