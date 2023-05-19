import countryToCurrency from "country-to-currency";
import currencyCodes from "currency-codes";

export function convertCurrency({
  amount,
  destinationCode,
  homeCode,
  rate_list,
}) {
  const homeCurrency = countryCurrencyCode(homeCode);
  const destCurrency = countryCurrencyCode(destinationCode);
  const home_rate = rate_list[homeCurrency];
  const dest_rate = rate_list[destCurrency];
  const result = (amount / dest_rate) * home_rate;
  const res = setCurrencyDecimal(result, homeCurrency);
  return isNaN(res) ? setCurrencyDecimal(0.00000, homeCurrency) : res;
}

export function countryCurrencyCode(countryCode) {
  const code = countryToCurrency[countryCode];
  return code === undefined ? "CAD" : code;
}

export function setCurrencyDecimal(amount, currencyCode){
  const decimalPoint = currencyCodes.code(currencyCode).digits;
  return parseFloat(amount).toFixed(decimalPoint);
}

export function getCurrencyDecimal(currencyCode){
  return currencyCodes.code(currencyCode).digits;
}
