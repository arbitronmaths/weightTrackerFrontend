import Weight from "../components/weight"
import Login from "../components/login"
import Signup from "../components/signup"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const NotFound = () => (
  <div style={{ padding: '20px', color: 'red' }}>
    <h2>404 - Page Not Found</h2>
    <p>The page you’re looking for doesn’t exist.</p>
  </div>
);
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/weight" element={<Weight />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
