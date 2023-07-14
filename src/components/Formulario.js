import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { handleFormSubmit } from '../adapters/transferRequest';


function Formulario({ onFormSubmit }) {

  // Constantes
  const [dataInicial, setDataInicial] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);
  const [nomeOperador, setNomeOperador] = useState('');

  // HTML do Formulário
  return (
    <Form onSubmit={event => handleFormSubmit(event, nomeOperador, dataInicial, dataFinal, onFormSubmit)} style={{ width: '100%' }}>

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



