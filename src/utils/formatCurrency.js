// Formatar Valor
const formatCurrency = value => {
    const formattedValue = parseFloat(value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    if (value < 0) {
        return `R$ -${formattedValue.replace('-R$', '').trim()}`;
    } else {
        return formattedValue;
    }
};

export default formatCurrency;