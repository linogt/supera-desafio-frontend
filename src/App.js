import './App.css';
import Tabela from './components/Tabela';
import Formulario from './components/Formulario';
import Nav from './components/Nav';
import Footer from './components/Footer'
import { useEffect, useState } from 'react';
import { fetchInitialData } from './adapters/transferRequest';


function App() {

  // Constantes
  const [transferencias, setTransferencias] = useState([]);
  const [saldoTotal, setSaldoTotal] = useState(0);

  // Requisição Inicial
  useEffect(() => {
    fetchInitialData(setTransferencias, setSaldoTotal);
  }, []);

  // HTML do App
  return (
    <div className="App">
      <Nav />
      <Formulario onFormSubmit={setTransferencias} />
      <Tabela vetor={transferencias} saldoTotal={saldoTotal} />
      <Footer />
    </div>
  );
}

export default App;