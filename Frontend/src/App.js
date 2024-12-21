import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import StartQuiz from './components/StartQuiz';
import QuizResults from './components/QuizResults'
import MainQuiz from './components/MainQuiz';
import Chart from './components/Chart';
import Recomend from './components/Recomend';
import QuizList from './components/QuizList';
import Performance from './components/Performance';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/startquiz" element={<StartQuiz />} />
          <Route path="/quizresults" element={<QuizResults />} />
          <Route path="/mainquiz" element={<MainQuiz />} />
          <Route path="/recomend" element={<Recomend />} />
          <Route path="/quizlist" element={<QuizList />} />
          <Route path="/performance" element={<Performance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
