import './App.css';
import Tabela from './components/Tabela';
import Formulario from './components/Formulario';
import Nav from './components/Nav';
import Footer from './components/Footer'
import { useEffect, useState } from 'react';


function App() {

  // Constantes
  const [transferencias, setTransferencias] = useState([]);
  const [saldoTotal, setSaldoTotal] = useState(0);

  // Requisição Inicial
  useEffect(() => {
    fetch("http://localhost:8080/api/transferencia")
      .then(response => response.json())
      .then(data => {
        setTransferencias(data);
        setSaldoTotal(calcularSaldoTotal(data));
      })
      .catch(error => console.error("Erro ao obter os dados das transferências", error));
  }, []);

  // Cálculo do Saldo Total
  const calcularSaldoTotal = data => {
    let saldo = 0;
    data.forEach(obj => {
      saldo += obj.valor;
    });
    return saldo;
  };

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
