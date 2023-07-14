import React, { useState } from 'react';
// Formatar a Data
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import '../assets/css/Tabela.css';
import formatCurrency from '../utils/formatCurrency';
import formatType from '../utils/formatType'
import calculateBalance from '../utils/calculateBalance';

function Tabela({ vetor, saldoTotal }) {

  // Paginação
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const pageCount = Math.ceil(vetor.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = vetor.slice(offset, offset + itemsPerPage);
  const handlePageClick = data => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };
  const goToFirstPage = () => {
    setCurrentPage(0);
  };
  const goToLastPage = () => {
    setCurrentPage(pageCount - 1);
  };


  // HTML Tabela
  return (
    <div>
      <div className="d-flex justify-content-between" style={{ margin: "10px", marginTop: "30px" }}>
        <span className="card" style={{ padding: "10px", backgroundColor: '#98FB98' }}>Saldo Total: {formatCurrency(saldoTotal)}</span>
        <span className="card" style={{ padding: "10px", backgroundColor: '#98FB98' }}>Saldo no Período: {formatCurrency(calculateBalance(vetor))}</span>
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
              <td>{formatType(obj.tipo, obj.valor)}</td>
              <td>{obj.nomeOperadorTransacao}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination justify-content-center align-items-center">
        <span style={{ cursor: "pointer", paddingRight: "5px", paddingBottom: "15px" }} onClick={goToFirstPage}>{'<<'}</span>
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
        <span style={{ cursor: "pointer", paddingLeft: "5px", paddingBottom: "15px" }} onClick={goToLastPage}>{'>>'}</span>
      </div>
    </div>
  );
}

export default Tabela;