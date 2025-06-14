import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import CharacterList from './components/character/characterList.jsx'
import CharacterDetails from './components/cardCharacter/characterDetails.jsx';
import NotFound from './components/notFound/notFound.jsx';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
