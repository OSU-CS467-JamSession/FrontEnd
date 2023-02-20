
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { BrowserRouter, Routes, 
  Route, Redirect,  useNavigate} from "react-router-dom";
import Dashboard from './components/Dashboard';

const theme = createTheme();

function App() {
  // const navigate = useNavigate();
  return (
    <><ThemeProvider theme={theme}>
      <div className="App">
        <SignIn />
      </div>
    </ThemeProvider>

      </>
  );
}

export default App;


{/* <BrowserRouter>
<Routes>
 <Route path="/" element={<Auctions />} />
 <Route path="/register" element={<Register />} />
 <Route path="/login" element={<Login />} />
</Routes>
</BrowserRouter> */}



// function App() {
//   const navigate = useNavigate();
//   return (
//     <ThemeProvider theme={theme}>
//     <div className="App">
//       <SignIn/> 
//     </div>
//     </ThemeProvider>
//   );
// }