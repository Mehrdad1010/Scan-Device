import "./App.css";
import Grid from "./components/Grid/Grid";
import Header from "./components/Header/Header";
import { useSystemInfo } from "./context/SystemProvider";
import Loader from "./components/Loader/Loader";


function App() {
  const { loading, error } = useSystemInfo();

  if (loading) {
    return <Loader />;
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
