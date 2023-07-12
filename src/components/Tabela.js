import React, { useState } from 'react';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import './Tabela.css';


function Tabela({ vetor, saldoTotal }) {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;
  
    const calcularSaldoNoPeriodo = () => {
      let saldo = 0;
      vetor.forEach(obj => {
        saldo += obj.valor;
      });
      return saldo;
    };
  
    const saldoNoPeriodo = calcularSaldoNoPeriodo();
  
    // Cálculo do número total de páginas
    const pageCount = Math.ceil(vetor.length / itemsPerPage);
  
    // Cálculo dos itens a serem exibidos na página atual
    const offset = currentPage * itemsPerPage;
    const currentItems = vetor.slice(offset, offset + itemsPerPage);
  
    // Atualizar a página atual
    const handlePageClick = data => {
      const selectedPage = data.selected;
      setCurrentPage(selectedPage);
    };
  
    return (
      <div>
        <div className="d-flex justify-content-between" style={{ margin: "10px", marginTop: "30px" }}>
          <span className="card" style={{ padding: "10px", backgroundColor: '#98FB98' }}>Saldo Total: {formatCurrency(saldoTotal)}</span>
          <span className="card" style={{ padding: "10px", backgroundColor: '#98FB98' }}>Saldo no Período: {formatCurrency(saldoNoPeriodo)}</span>
        </div>
  
        <table className="table table-striped table-bordered" style={{ marginTop: "30px", marginBottom: "30px" }}>
          <thead>
            <tr>
              <th>Dados</th>
              <th>Valentia</th>
              <th>Tipo</th>
              <th>Nome Operador Transacionado</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((obj, indice) => (
              <tr key={indice}>
                <td>{moment(obj.dataTransferencia).format('DD/MM/YYYY')}</td>
                <td>{formatCurrency(obj.valor)}</td>
                <td>{formatTipo(obj.tipo, obj.valor)}</td>
                <td>{obj.nomeOperadorTransacao}</td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <div className="pagination justify-content-center">
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    );
}

function formatCurrency(value) {
  const formattedValue = parseFloat(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  if (value < 0) {
    return `R$ -${formattedValue.replace('-R$', '').trim()}`;
  } else {
    return formattedValue;
  }
}

function formatTipo(tipo, valor) {
  if (tipo === 'DEPOSITO') {
    return 'Depósito';
  } else if (tipo === 'SAQUE') {
    return 'Saque';
  } else if (tipo === 'TRANSFERENCIA') {
    if (valor > 0) {
      return 'Transferência Entrada';
    } else {
      return 'Transferência Saída';
    }
  } else {
    return tipo;
  }
}

export default Tabela;
