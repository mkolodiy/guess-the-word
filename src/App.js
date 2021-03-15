import {
  CssBaseline,
  IconButton,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { Autorenew, Translate, CloudUpload } from '@material-ui/icons';
import { useState, useRef, useEffect } from 'react';
import Papa from 'papaparse';
import './App.css';

// const words = [
//   {
//     translation: 'das Ende',
//     word: 'la fine',
//   },
//   {
//     translation: 'die Waschmaschine',
//     word: 'la lavatrice',
//   },
//   {
//     translation: 'das Motorad',
//     word: 'la moto',
//   },
// ];

const transform = (data) => {
  return data.map((item) => ({
    word: item[0],
    translation: item[1],
  }));
};

const parseFile = (file, cb) => {
  console.log(file);
  Papa.parse(file, {
    delimiter: '\t',
    complete: ({ data }) => cb(transform(data)),
  });
};

const getRandomItem = (items) => {
  if (!items) {
    return null;
  }

  return items[Math.floor(Math.random() * items.length)];
};

function App() {
  const [showWord, setShowWord] = useState(false);
  const [items, setItems] = useState();
  const [item, setItem] = useState();

  const inputRef = useRef(null);

  useEffect(() => {
    setItem(getRandomItem(items));
  }, [items]);

  const onChange = (e) => {
    const file = e.target.files[0];

    if (!file.name.includes('.tsv')) {
      return;
    }

    parseFile(file, setItems);
  };

  const onClick = (e) => {
    e?.preventDefault();
    inputRef?.current?.click();
  };

  const getNextItem = () => {
    setShowWord(false);
    setItem(getRandomItem(items));
  };

  if (!items) {
    return (
      <>
        <CssBaseline />
        <div className="upload">
          <input type="file" onChange={onChange} ref={inputRef} />
          <IconButton onClick={onClick} type="file">
            <CloudUpload />
          </IconButton>
        </div>
      </>
    );
  }

  console.log(item);

  if (!item) {
    return (
      <>
        <CssBaseline />
        <div className="upload">
          <CircularProgress />
        </div>
      </>
    );
  }

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
