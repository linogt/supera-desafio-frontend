import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

function Formulario({ onFormSubmit }) {

  // Constantes
  const [dataInicial, setDataInicial] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);
  const [nomeOperador, setNomeOperador] = useState('');

  // Requisição a partir dos Filtros
  const handleFormSubmit = (event) => {
    event.preventDefault();

    let url = 'http://localhost:8080/api/transferencia?';

    if (nomeOperador) {
      url += `nomeOperador=${nomeOperador}&`;
    }

    if (dataInicial) {
      const formattedDataInicial = moment(dataInicial).format('YYYY-MM-DD');
      url += `dataInicial=${formattedDataInicial}&`;
    }

    if (dataFinal) {
      const formattedDataFinal = moment(dataFinal).format('YYYY-MM-DD');
      url += `dataFinal=${formattedDataFinal}&`;
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        onFormSubmit(data);
      })
      .catch(error => console.error("Erro ao obter os dados das transferências", error));
  };

  // HTML do Formulário
  return (
    <Form onSubmit={handleFormSubmit} style={{ width: '100%' }}>

      <div className="card" style={{ margin: "10px", padding: '10px', paddingTop: "30px", paddingBottom: "20px" }}>
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-between" style={{ width: '60%' }}>
            <Form.Group controlId="dataInicial">
              <DatePicker
                selected={dataInicial}
                onChange={(date) => setDataInicial(date)}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                placeholderText="Selecione a Data Inicial"
              />
            </Form.Group>
            <Form.Group controlId="dataFinal">
              <DatePicker
                selected={dataFinal}
                onChange={(date) => setDataFinal(date)}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                placeholderText="Selecione a Data Final"
              />
            </Form.Group>
            <Form.Group controlId="nomeOperador">
              <Form.Control
                type="text"
                placeholder="Nome Operador Transacionado"
                value={nomeOperador}
                onChange={(event) => setNomeOperador(event.target.value)}
                style={{ width: '250px' }}
              />
            </Form.Group>
          </div>
          <Button style={{ marginRight: "5px" }} variant="primary" type="submit">Pesquisar</Button>
        </div>
      </div>
    </Form>

  );
}

export default Formulario;



