export default ({ Vue }) => {
  Vue.filter('currency', function(value, currency = 'R$ ') {
    if (!value) return `${currency}0,00`;
    return `${currency}${parseFloat(value).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  });
};
