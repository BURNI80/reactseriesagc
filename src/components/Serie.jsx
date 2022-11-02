import axios from 'axios'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Global from '../Global/Global'

export default class Serie extends Component {

    state = {
        datosSerie: [],
        statusDatos: false,
    }

    componentDidMount = () => {
        this.cargarDatos()
    }

    // SI EL VALOR DEL DROPDOWN CAMBIA SE TIENE QUE ACTAULIZAR EL COMPONENTE
    componentDidUpdate = (oldProps) => {
        if(oldProps.id !== this.props.id){
            this.cargarDatos()
        }
    }

    // CARGA LOS DATOS DE LA SERIE
    cargarDatos = () => {
        const request = "/api/Series/"
        axios.get(Global.url + request + this.props.id).then(res => {
            const datos = res.data
            // console.log(datos);

            this.setState({
                datosSerie:datos,
                statusDatos:true,
            })
        })
    }


    render() {
        return (
            <div className='container'>
                {
                    // MUESTRA LOS DATOS DE LA SERIE SI HA PODIDO CARGARLA
                    (this.state.statusDatos === true) &&
                    (<div>
                        <div className="card" style={{"width":"400px"}}>
                            <img src={this.state.datosSerie.imagen} className="card-img-top" alt="..." height="200px"></img>
                            <div className="card-body">
                                <h5 className="card-title">{this.state.datosSerie.nombre}</h5>
                                <p className="card-text">{this.state.datosSerie.puntuacion}</p>
                                <NavLink className="btn btn-info" to={"/personajes/"+this.props.id} >Personajes</NavLink>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        )
    }
}
