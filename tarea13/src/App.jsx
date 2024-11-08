
import './App.css';
import CardContainer from './components/CardContainer';

const App = () => {
  return (
    <div className="App">
      <h1>Demostración de CardContainer</h1>
      <CardContainer>
        <div>Contenido 1</div>
        <div>Contenido 2</div>
        <div>Contenido 3</div>
      </CardContainer>
    </div>
  );
};

export default App;
