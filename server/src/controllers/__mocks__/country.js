// country stub
async function getCountriesController(req, res) {
  const countries = [
    {
      country_code: 'KR',
      country_id: 1,
      currency: '￦',
      name: 'Republic of Korea',
    },
    {
      country_code: 'CA',
      country_id: 2,
      currency: '$',
      name: 'Canada',
    },
    {
      country_code: 'ID',
      country_id: 3,
      currency: 'Rp',
      name: 'Indonesia',
    },
  ];
  return res.status(200).json({ countries });
}

module.exports = {
  getCountriesController,
};
