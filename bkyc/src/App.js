import React, {useEffect} from 'react';
import './App.css';

function App() {
  const [text, setText] = React.useState("nthg");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_PORTAL}/sample`)
      .then(res => res.json())
      .then(res => setText(res.uname))
  })
  return (
    <div className="App">
      <h2>{text}</h2>
      <p>This is cmng from frontend only.. </p>
    </div>
  );
}

export default App;
