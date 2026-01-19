import Progress from './Progress.js';

export default function request(url, options) {
  if (!options) options = {};
  let req;
  let progress = options.progress || new Progress();
  let isCancelled = false;
  let timeoutId = null;
  
  if (progress.on) {
    progress.onCancel(cancelDownload);
  }

  return new Promise(download);

  function cancelDownload() {
    isCancelled = true;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (req) {
      req.abort();
    }
  }

  function download(resolve, reject) {
    req = new XMLHttpRequest();

    if (typeof progress.notify === 'function') {
      req.addEventListener('progress', updateProgress, false);
    }

    req.addEventListener('load', transferComplete, false);
    req.addEventListener('error', transferFailed, false);
    req.addEventListener('abort', transferCanceled, false);

    req.open(options.method || 'GET', url);
    if (options.responseType) {
      req.responseType = options.responseType;
    }

    if (options.headers) {
      Object.keys(options.headers).forEach(key => {
        req.setRequestHeader(key, options.headers[key]);
      });
    }

    // Configurar timeout se especificado
    if (options.timeout) {
      timeoutId = setTimeout(() => {
        if (req.readyState !== 4) {
          req.abort();
          reject({
            timeout: true,
            message: `Timeout após ${options.timeout}ms ao chamar ${url}`
          });
        }
      }, options.timeout);
    }

    if (options.method === 'POST') {
      req.send(options.body);
    } else {
      req.send(null);
    }

    function updateProgress(e) {
      if (e.lengthComputable) {
        progress.notify({
          loaded: e.loaded,
          total: e.total,
          percent: e.loaded / e.total,
          lengthComputable: true
        });
      } else {
        progress.notify({
          loaded: e.loaded,
          lengthComputable: false
        });
      }
    }

    function transferComplete() {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      progress.offCancel(cancelDownload);

      if (progress.isCancelled) return;

      if (req.status !== 200) {
        reject({
          statusError: req.status,
          message: `Status ${req.status} ao chamar ${url}`
        });
        return;
      }
      
      var response = req.response;

      if (options.responseType === 'json' && typeof response === 'string') {
        // IE
        try {
          response = JSON.parse(response);
        } catch (e) {
          reject({
            parseError: true,
            message: `Erro ao fazer parse do JSON de ${url}`
          });
          return;
        }
      }

      setTimeout(() => resolve(response), 0);
    }

    function transferFailed() {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      reject({
        networkError: true,
        message: `Falha de rede ao baixar ${url}`
      });
    }

    function transferCanceled() {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      reject({
        cancelled: true,
        message: `Download cancelado de ${url}`
      });
    }
  }
}