import moment from 'moment';
import calculateBalance from '../utils/calculateBalance';


// Get por meio dos filtros
export const handleFormSubmit = (event, nomeOperador, dataInicial, dataFinal, onFormSubmit) => {
    event.preventDefault();

    let url = 'http://localhost:8080/api/transferencia?';

    if (nomeOperador) {
        url += `nomeOperador=${nomeOperador}&`;
    }

    if (dataInicial) {
        const formattedDataInicial = moment(dataInicial).format('YYYY-MM-DD') + 'T00:00:00';
        url += `dataInicial=${formattedDataInicial}&`;
    }

    if (dataFinal) {
        const formattedDataFinal = moment(dataFinal).format('YYYY-MM-DD') + 'T23:59:59';
        url += `dataFinal=${formattedDataFinal}&`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            onFormSubmit(data);
        })
        .catch(error => console.error("Erro ao obter os dados das transferências", error));
};


// Get inicial
export const fetchInitialData = (setTransferencias, setSaldoTotal) => {
    fetch("http://localhost:8080/api/transferencia")
        .then(response => response.json())
        .then(data => {
            setTransferencias(data);
            setSaldoTotal(calculateBalance(data));
        })
        .catch(error => console.error("Erro ao obter os dados das transferências", error));
};
