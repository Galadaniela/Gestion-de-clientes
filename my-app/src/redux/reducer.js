// rootReducer.js
import { combineReducers } from "redux";
import { GET_CLIENTES,DELETE_CLIENTES,CREAT_CLIENTE,UPDATE_CLIENTES ,POST_CLIENTE,SEARCH_BY_NAME} from "./actions.js";

const initialState = {
  clientes: [], // Inicializar como un array vacío
  allClientes: [], // Inicializar como un array vacío si es necesario
};

const infoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLIENTES:
      return {
        ...state,
        clientes: action.payload,
        allClientes: action.payload, // Ajustar si es necesario
      };
      case UPDATE_CLIENTES:
      return {
        ...state,
        clientes: state.clientes.map((cliente) =>
          cliente.id === action.payload.id ? action.payload : cliente
        ),
      }
      case DELETE_CLIENTES:
        
      return {
        ...state,
        clientes: state.clientes.filter((cliente) => cliente.id !== action.payload),
      };
      
      case POST_CLIENTE:
      return {
        ...state,
        clientes: [...state.clientes, action.payload],
      };
    //  case SEARCH_BY_NAME:
    //   return{
    //     ...state,
    //     clientes: action.payload
    //   }
    case SEARCH_BY_NAME:
      const searchTerm = action.payload;
      const filteredData = state.clientes.filter(
        (cliente) =>
          cliente.name.toLowerCase().includes(searchTerm) // Otra condición de búsqueda
      );
      return {
        ...state,
        filteredData,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  info: infoReducer,
});

export default rootReducer;
