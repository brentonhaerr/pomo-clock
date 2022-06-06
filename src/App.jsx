import Controls from "./components/controls";
import Display from "./components/display";
import ClockContextProvider from "./contexts/ClockContext";

function App() {
  return (
    <div className="App">
      <ClockContextProvider>
        <Controls />
        <Display />
      </ClockContextProvider>
    </div>
  );
}

export default App;
