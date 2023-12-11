import React  ,{ useState }from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { postClientes } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./form.css"

const Form = () =>{
    const dispatch = useDispatch()
    const history = useHistory()
   

    const[input,setInput] = useState({
        fecha: new Date(),
        name: "",
        provincia:"",
        localidad:"",
        direccion:"",
        calle:0,
        monto:0,
        deuda:0,
        canal:"",
        telefono:0
    })
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
        // setErrors(validate({
        //     ...input,
        //     [e.target.name]:e.target.value
        //   }))
          } 
    
  
    // useEffect(() => {
    //     dispatch(getClientes())
    // },[dispatch])
    // console.log(errors)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:3001/clientes")
        const data = await response.json();
        const existeCliente = data.find(
            (cliente) => 
            cliente.name.toLowerCase() === input.name.toLowerCase() && cliente.provincia.toLowerCase()
        );
        if(existeCliente){
            alert("El cliente ya existe")
        }else{
        dispatch(postClientes(input))
        alert("Nuevo Cliente")
        setInput({
            fecha: new Date(),
        name: "",
        provincia:"",
        localidad:"",
        direccion:"",
        calle:0,
        monto:0,
        deuda:0,
        canal:"",
        telefono:0
       })
       const formattedPath = `/${input.provincia.toLowerCase()}`;
       history.push(formattedPath);
}
      //  if(input.provincia === "corrientes" || "Corrientes"){
      //  history.push("/corrientes");
      // } else if (input.provincia === "Chaco" || "chaco"){
      //       history.push("/Chaco");
      // }else if (input.provincia === "Interior" || "interior"){
      //       history.push("/Interior")
      // }
       }
    return ( 
        <>
        
        <div className="signupFrm">
       <div className="btn-back">
       <Link to="/"><button  className="btn-link">
        VOLVER
            </button></Link>
            </div> 
        

          <h1>Cliente</h1>
          <form onSubmit={(e) => handleSubmit(e)} className="input-container">
          {/* <form onSubmit={(e) => handleSubmit(e)}> */}
          <div >
          <label htmlFor="fecha"  >Fecha: </label>
                <input type="date" className="input-group" value={input.fecha} name="fecha"
                 onChange={(e) =>handleChange(e)} 
                 
                />
          </div>
          <div>
          <label htmlFor="name"  >Nombre: </label>
                <input type="text"  className="input-group" placeholder="nombre" value={input.name} name="name"
                 onChange={(e) =>handleChange(e)} 
                 
                />
          </div>
          <div>
          <label htmlFor="provincia"  >Provincia: </label>
                <input type="text" className="input-group" placeholder="Provincia" value={input.provincia} name="provincia"
                 onChange={(e) =>handleChange(e)} 
                />
          </div>
          <div>
          <label htmlFor="localidad"  >Localidad: </label>
                <input type="text" className="input-group" placeholder="Localidad" value={input.localidad} name="localidad"
                 onChange={(e) =>handleChange(e)} 
                />
          </div>
          <div>
          <label htmlFor="direccion"  >Direccion: </label>
                <input type="text" className="input-group" placeholder="Direccion" value={input.direccion} name="direccion"
                 onChange={(e) =>handleChange(e)} 
                />
          </div>
          <div>
          <label htmlFor="calle"  >Calle: </label>
                <input type="number" className="input-group"  placeholder="calle" value={input.calle} name="calle"
                onChange={(e) =>handleChange(e)} 
                 />
          </div>
          <div>
          <label htmlFor="monto"  >Monto: </label>
                <input type="number" className="input-group" placeholder="Monto" value={input.monto} name="monto"
                 onChange={(e) =>handleChange(e)} 
                />
          </div>
          <div>
          <label htmlFor="deuda"  >Deuda: </label>
                <input type="number" className="input-group" placeholder="Deuda" value={input.deuda} name="deuda"
                onChange={(e) =>handleChange(e)} 
                 />
          </div>
          <div>
          <label htmlFor="canal"  >Canal: </label>
                <input type="text" className="input-group"  placeholder="Canal" value={input.canal} name="canal"
                 onChange={(e) =>handleChange(e)} 
                 
                />
          </div>
          <div>
          <label htmlFor="telefono"  >Telefono: </label>
                <input type="tel"  className="input-group" placeholder="Telefono" value={input.telefono} name="telefono"
                onChange={(e) =>handleChange(e)} 
                 />
          </div>
          <button className="btn-form" type="submit">Ingresar Cliente</button>
          </form>
        </div>
        </>
    )

}

export default Form;