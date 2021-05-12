//crear error personalizado

function error(message, sCode) {
  let error = new Error(message);

  if (sCode) {
    error.statusCode = sCode;
  }
  return error;
}

module.exports = error;
