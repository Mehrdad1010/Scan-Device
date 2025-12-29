import "./App.css";
import Grid from "./components/Grid/Grid";
import Header from "./components/Header/Header";
import {useSystemInfo } from "./context/SystemProvider";

function App() {
  const { loading, error } = useSystemInfo();

  if (loading) {
    return <div className="loader">Loading system info...</div>;
  }

  if (error) {
    return <div className="error">Failed to load system info</div>;
  }
  return (
   
      <>
        <Header />

        <Grid />
      </>

  );
}

export default App;
