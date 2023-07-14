// Calcular Saldo
const calculateBalance = (data) => {
    let saldo = 0;
    data.forEach((obj) => {
        saldo += obj.valor;
    });
    return saldo;
};

export default calculateBalance;