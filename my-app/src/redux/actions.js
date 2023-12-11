// actions.js
import axios from "axios";
export const GET_CLIENTES = "GET_CLIENTES";
export const DELETE_CLIENTES = "DELETE_CLIENTES";
export const CREAT_CLIENTE = "CREAT_CLIENTE";
export const UPDATE_CLIENTES = "UPDATE_CLIENTES";
export const POST_CLIENTE = "POST_CLIENTE";
export const SEARCH_BY_NAME =  "SEARCH_BY_NAME"

export const getClientes = () => {
  return async function (dispatch) {
 const clientDatos = await axios.get("http://localhost:3001/clientes");
    // const clientDatos = await axios.get("https://gestionclientes.vercel.app/","https://gestionclientes.vercel.app/Corrientes");
    
    const clientes = clientDatos.data;
    dispatch({ type: GET_CLIENTES, payload: clientes });
  };
}
export const deleteClientesid = (id) => ({
  type: DELETE_CLIENTES,
  payload: id,
});
export const deleteClientes = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:3001/clientes/${id}`);
      dispatch(deleteClientesid(id));
    } catch (error) {
      // Manejar el error en caso de que falle la solicitud
      console.error("Error al eliminar cliente:", error);
    }
  };
};

// export const postClientes = (payload) => {
//   return async function (dispatch){
//     const creatCliente = await axios.post("http://localhost:3001/clientes",payload)
//     return creatCliente
//   }
// }
export const postClientes = (payload) => {
  return async function (dispatch) {
    try {
      const creatCliente = await axios.post("http://localhost:3001/clientes", payload);
      dispatch({ type: POST_CLIENTE, payload: creatCliente.data });
      return creatCliente;
    } catch (error) {
      // Manejar el error en caso de que falle la solicitud
      console.error("Error al crear el cliente:", error);
    }
  };
};
export const updateClientesid = (clientes) => ({
  type: UPDATE_CLIENTES,
  payload: clientes,
});
export const updateClientes = (clientes) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`http://localhost:3001/clientes/${clientes.id}`, clientes);
      dispatch(updateClientesid(response.data));
    } catch (error) {
      // Manejar el error en caso de que falle la solicitud
      console.error("Error al actualizar la tarea:", error);
    }
  };
};
export const searchByName = (name) => {
  return async function (dispatch){
    const searchName = await axios.get(`http://localhost:3001/clientes?=`+ name)
    const data = searchName.data;
    dispatch({
      type:SEARCH_BY_NAME,
      payload: data
    })
  }
}