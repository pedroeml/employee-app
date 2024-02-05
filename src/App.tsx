import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import EmployeeList from './components/employee-list';
import EmployeeDetails from './components/employee-details';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Navigate to="employees" replace />} />
            <Route path='employees' element={<EmployeeList />} />
            <Route path='employee/:id' element={<EmployeeDetails />} />
            <Route path="*" element={<Navigate to="employees" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
