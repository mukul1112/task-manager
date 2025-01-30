import "./App.css";
import Layout from "./Component/Layout";
import Task from "./Component/Task";

function App() {
  return (
    <Layout header="Task Manager">
      <Task />
    </Layout>
  );
}

export default App;
