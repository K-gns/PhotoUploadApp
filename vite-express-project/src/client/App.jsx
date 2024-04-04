import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import FileUpload from "./components/FileUpload.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <FileUpload></FileUpload>
    </div>
  );
}

export default App;
