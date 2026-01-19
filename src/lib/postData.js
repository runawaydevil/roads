import request from './request.js';
import Progress from './Progress.js';

let backends = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.openstreetmap.fr/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter'
]

export default function postData(data, progress) {
  progress = progress || new Progress();
  const postData = {
    method: 'POST',
    responseType: 'json',
    progress,
    timeout: 120000, // 2 minutos de timeout
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: 'data=' + encodeURIComponent(data),
  };

  let serverIndex = 0;
  let retryCount = 0;
  const maxRetries = 2;

  return fetchFrom(backends[serverIndex]);

  function fetchFrom(overpassUrl) {
    return request(overpassUrl, postData, 'POST')
      .catch(handleError);
  }

  function handleError(err) {
    if (err.cancelled) throw err;

    console.warn(`Erro ao acessar ${backends[serverIndex]}:`, err.message || err);

    // Se foi erro de timeout ou 504, tentar retry no mesmo servidor
    if ((err.statusError === 504 || err.timeout) && retryCount < maxRetries) {
      retryCount++;
      console.log(`Tentativa ${retryCount} de ${maxRetries} no mesmo servidor...`);
      
      progress.notify({
        loaded: -1,
        message: `Tentando novamente (${retryCount}/${maxRetries})...`
      });
      
      // Aguardar um pouco antes de tentar novamente
      return new Promise(resolve => setTimeout(resolve, 2000))
        .then(() => fetchFrom(backends[serverIndex]));
    }

    // Se esgotou retries ou foi outro erro, tentar próximo servidor
    if (serverIndex >= backends.length - 1) {
      // Não há mais servidores para tentar
      throw new Error('Todos os servidores do OpenStreetMap estão ocupados. Por favor, tente novamente em alguns minutos.');
    } 

    if (err.statusError || err.timeout) {
      progress.notify({
        loaded: -1,
        message: 'Tentando servidor alternativo...'
      });
    }

    serverIndex += 1;
    retryCount = 0; // Reset retry count para o novo servidor
    console.log(`Tentando servidor alternativo: ${backends[serverIndex]}`);
    return fetchFrom(backends[serverIndex])
  }
}