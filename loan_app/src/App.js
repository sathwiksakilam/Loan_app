import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserDashboard from './Pages/UserDashBoard';
import VerifierDashBoard from './Pages/VerifierDashBoard';
import AdminDashBoard from './Pages/AdminDashBoard';
import SignIn from './Pages/signIn';
import SignUp from './Pages/signUp';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loan from './Pages/Loan';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/verifierdashboard" element={<VerifierDashBoard />} />
        <Route path="/admindashboard" element={<AdminDashBoard />} />
        <Route path="/loans" element={<Loan></Loan>} ></Route>
        <Route path="/login" element={<SignIn></SignIn>}></Route>
        <Route path='/SignUp' element={<SignUp></SignUp>}></Route>
      </Routes>
    </Router>
  );
}
export default App;
