// ==============================================================
// 📦 ACCIONES DE REDUX (SUZ CRM)
// ==============================================================
// Utiliza API_URL desde utils/config para apuntar dinámicamente al backend.

import axios from "axios";
import { API_URL } from "../utils/config";

export const GET_CLIENTES = "GET_CLIENTES";
export const DELETE_CLIENTES = "DELETE_CLIENTES";
export const CREAT_CLIENTE = "CREAT_CLIENTE";
export const UPDATE_CLIENTES = "UPDATE_CLIENTES";
export const POST_CLIENTE = "POST_CLIENTE";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";

// 1. Obtener todos los clientes
export const getClientes = () => {
  return async function (dispatch) {
    try {
      const clientDatos = await axios.get(`${API_URL}/clientes`);
      const clientes = clientDatos.data;
      dispatch({ type: GET_CLIENTES, payload: clientes });
    } catch (error) {
      console.error("❌ Error al traer clientes en Redux:", error);
    }
  };
};

// 2. Eliminar cliente por ID
export const deleteClientesid = (id) => ({
  type: DELETE_CLIENTES,
  payload: id,
});

export const deleteClientes = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${API_URL}/clientes/${id}`);
      dispatch(deleteClientesid(id));
    } catch (error) {
      console.error("❌ Error al eliminar cliente:", error);
    }
  };
};

// 3. Crear nuevo cliente
export const postClientes = (payload) => {
  return async function (dispatch) {
    try {
      const creatCliente = await axios.post(`${API_URL}/clientes`, payload);
      dispatch({ type: POST_CLIENTE, payload: creatCliente.data });
      return creatCliente;
    } catch (error) {
      console.error("❌ Error al crear el cliente:", error);
    }
  };
};

// 4. Actualizar cliente (modificación de datos o saldar deuda)
export const updateClientesid = (clientes) => ({
  type: UPDATE_CLIENTES,
  payload: clientes,
});

export const updateClientes = (clientes) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${API_URL}/clientes/${clientes.id}`, clientes);
      dispatch(updateClientesid(response.data));
    } catch (error) {
      console.error("❌ Error al actualizar cliente:", error);
    }
  };
};

// 5. Buscar cliente por nombre
export const searchByName = (name) => {
  return async function (dispatch) {
    try {
      const searchName = await axios.get(`${API_URL}/clientes?name=${name}`);
      const data = searchName.data;
      dispatch({
        type: SEARCH_BY_NAME,
        payload: data,
      });
    } catch (error) {
      console.error("❌ Error al buscar por nombre:", error);
    }
  };
};
