
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';


const theme = createTheme();


function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <SignIn/> 
    </div>
    </ThemeProvider>
  );
}

export default App;
