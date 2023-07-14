// Formatar Tipo
const formatType = (tipo, valor) => {
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
};

export default formatType;