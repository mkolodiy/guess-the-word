import { CssBaseline, IconButton, Typography } from '@material-ui/core';
import { Autorenew, Translate } from '@material-ui/icons';
import { useState } from 'react';
import './App.css';

const words = [
  {
    translation: 'das Ende',
    word: 'la fine',
  },
  {
    translation: 'die Waschmaschine',
    word: 'la lavatrice',
  },
  {
    translation: 'das Motorad',
    word: 'la moto',
  },
];

const getRandomItem = () => words[Math.floor(Math.random() * words.length)];

function App() {
  const [showWord, setShowWord] = useState(false);
  const [item, setItem] = useState(getRandomItem());

  const getNextItem = () => {
    setShowWord(false);
    setItem(getRandomItem());
  };

  return (
    <>
      <CssBaseline />
      <div className="container">
        <div className="top-area">
          <Typography variant="h4" component="div">
            {item.translation}
          </Typography>
          <div className="translate-button">
            <IconButton onClick={() => setShowWord(true)}>
              <Translate />
            </IconButton>
          </div>
          <Typography variant="h4" component="div">
            {showWord && item.word}
          </Typography>
        </div>
        <div className="bottom-area">
          <IconButton onClick={getNextItem}>
            <Autorenew />
          </IconButton>
        </div>
      </div>
    </>
  );
}

export default App;
