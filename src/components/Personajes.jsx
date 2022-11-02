import axios from 'axios'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Global from '../Global/Global'

export default class Personajes extends Component {

    state = {
        personajes:[],
        statusPersonajes:false,
    }

    componentDidMount = () => {
        this.cargarPersonajes()
    }

    // CARGA LOS PERSONAJES DE UNA SERIE CONCRETA
    cargarPersonajes = () => {
        const request = "/api/Series/PersonajesSerie/"
        axios.get(Global.url+request+this.props.idSerie).then(res => {
            const personajes = res.data;
            this.setState({
                personajes:personajes,
                statusPersonajes:true,
            })

        })
    }

    render() {
        return (
            <div className='container'>
                <NavLink className="btn btn-danger" to={"/serie/" + this.props.idSerie} >VOLVER</NavLink>
                {/* MUESTRA LA TABLA DE PERSONAJES IS LOS RECIBE DESDE LA API */}
                {
                    (this.state.statusPersonajes === true)&&
                        (
                            <table className="table table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">Personaje</th>
                                        <th scope="col">Imagen</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.personajes.map((personaje,index) => {
                                            return(<tr key={personaje.idPersonaje}><td>{personaje.nombre}</td><td><img src={personaje.imagen} alt="" height="150px" /></td></tr>)
                                        })
                                    }
                                </tbody>
                            </table>
                        )
                }
            </div>
        )
    }
}
