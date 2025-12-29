import "./App.css";
import Grid from "./components/Grid/Grid";
import Header from "./components/Header/Header";
import { SystemProvider } from "./context/SystemProvider";

function App() {
  return (
    <SystemProvider>
      <>
        <Header />

        <Grid />
      </>
    </SystemProvider>
  );
}

export default App;
