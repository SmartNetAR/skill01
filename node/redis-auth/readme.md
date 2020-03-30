scripts test

Instalar nyc globalmente
  sudo npm i nyc --g


Correr el test con nyc con reporte de cobertura
  nyc npm test

Visualizar reportes almacenados en .nyc_ouput
  nyc report

Generar reporte de cobertura html
  nyc report --reporter=html