//soccer player collaborator component

import { useState } from "react";
import { BaseColaboradores } from "./BaseColaboradores";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'



const Colaboradores = () => {
  
  const [nombreColaborador, setNombreColaborador] = useState("");
  const [correo, setCorreo] = useState("");
  const [listaColaboradores, setListaColaboradores] = useState(BaseColaboradores);
  const [filtroColaborador, setFiltroColaborador] = useState("");

  const enviarFormulario = (e) => {
    if (nombreColaborador === "" || correo === "") {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Recuerda completar todos los campos!'
        })

      
      document.getElementById("nombre").focus()
      return;
    }

    if (!validarEmail (correo)) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Verifica que el correo lleve @ y su dominio!'
        })
      document.getElementById("correo").focus()
      return
    } 


    e.preventDefault();
    setListaColaboradores([...listaColaboradores, { nombre: nombreColaborador, correo: correo, completada: false },]);
    
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se ha agregado tu jugador exitosamente',
      showConfirmButton: false,
      timer: 2500
    })

    setNombreColaborador("");
    setCorreo("");
  };

  const capturaInput = (e) => {setNombreColaborador(e.target.value);};
  const capturaInput2 = (e) => {setCorreo(e.target.value);};

  function validarEmail(valor) {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)){
     return true
    } else {
      return false
    }
  }

 // Copiamos los colaboradores anteriores
  const modificarColaborador = (colaborador) => {
    const nuevosColaboradores = [...listaColaboradores]; 
    const index = nuevosColaboradores.findIndex((el) => el.nombre === colaborador.nombre);
    // Buscamos los colaboradores a modificar en la lista
    nuevosColaboradores[index].completada = true;
    setListaColaboradores(nuevosColaboradores);
  };

  const eliminarColaborador = (colaborador) => {
    const listaFiltrada = listaColaboradores.filter(
      (el) => el.nombre !== colaborador.nombre
    );
    setListaColaboradores(listaFiltrada);
  };


  return (
    <div className="cuadroColab">
      <form>

        
    <Form>
        <div id="navbar">
          <h1>Buscador de Jugadores</h1>
        <Col xs={5}>
          <Form.Control type="text" placeholder="Búsqueda" className="search" onChange= {(e) => setFiltroColaborador(e.target.value)}/>
        </Col>
        </div>
      <Row>
     
        <Col>
          <Form.Control  id="nombre" name="nombreColaborador" value={nombreColaborador} placeholder="nombre" onChange={capturaInput} />
        </Col>
        <Col>
          <Form.Control id="correo" name="nombreCorreo" type="email" value={correo} placeholder="correo" onChange={capturaInput2} />
        </Col>
      </Row>
    </Form>
     
       
    <div className="btnAdd">
    <Button id="addCol" onClick={enviarFormulario}> Agregar jugador Titular </Button>
    </div>

    <div className="tittle">
      <h4 className="namePlayer"> Nombre Jugador</h4>
      <h4 className="emailPlayer"> Correo Jugador</h4>
      <h4 className="reservPlayer"> Reserva </h4>
      <h4 className="deletePlayer">No Juega </h4>
    </div>

      </form>
      <div className="listColab">
      <ul className="listul">
          
        {listaColaboradores.filter((colaborador) => colaborador.nombre.toLowerCase().includes(filtroColaborador)).map((colaborador) => (
          
          <li className="listli" key={colaborador.nombre} style={colaborador.completada === true? { textDecoration: "line-through" }: {}}>

            <div className="separator">{colaborador.nombre}</div> <div className="separator">{colaborador.correo}</div>

            {colaborador.completada === false ? (
              <Button  id="ball" onClick={() => modificarColaborador(colaborador)}> <img id="imgBall" src="https://www.tiendaeverton.cl/assets/images/soccer/roll-ball.gif"/></Button>) : ("")}
              <Button  id="salir" onClick={() => eliminarColaborador(colaborador)}> <img id="imgSalir" src="https://pbs.twimg.com/media/DWW3YHwV4AA5XxJ.png"/> </Button>
          </li>
        ))}
      </ul>
      </div>

    </div>
  );
};

export default Colaboradores;