const pool = require('./pool');

const writePoint = (request, response) => {
    const latLong = request.params.latlng;
    var sql = "INSERT INTO points (coordenadas) VALUES (ST_GeomFromText('POINT(" + latLong + ")'))"
    console.log(latLong);
    pool.query(sql);
  };
  
  const getPoint = (request, response) => {
    pool.query('SELECT ST_AsText(coordenadas) coordenadas FROM points',(error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };

module.exports = {writePoint, getPoint};