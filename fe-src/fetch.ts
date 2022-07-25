//aca voy a hacer una funcion que va a servirle al state, es para recibir parametros,
//hacer el fetch y devolver la respuesta
const API_BASE = process.env.API_BASE;

export const fetchMachine = async (params: {
  url: string;
  method: string;
  body: object;
}) => {
  const fetchParams = await fetch(params.url, {
    method: params.method,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params.body),
  });
  const response = fetchParams.json();
  return response;
};