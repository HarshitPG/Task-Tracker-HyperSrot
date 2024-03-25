import "./App.css";
import Navbar from "./component/NavBar/Navbar";
import FilterButtons from "./component/filterButtons/FilterButtons";
import AddModal from "./component/modal/AddModal";
import Todos from "./component/todos/Todos";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className=" p-4 rounded border-2 border-white">
        <AddModal />
        <FilterButtons />
        <Todos />
      </div>
    </div>
  );
}

export default App;
