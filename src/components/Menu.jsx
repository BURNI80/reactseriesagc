import axios from 'axios'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import img from '../assets/images/9371.png'
import Global from '../Global/Global'

export default class Menu extends Component {

    state = {
        series: [],
        statusSeries: false
    }

    componentDidMount = () => {
        this.cargarSeries()
    }

    // CARGA LAS SERIES DISPONIBLES
    cargarSeries = () => {
        const request = "/api/Series"
        axios.get(Global.url + request).then(res => {
            const series = res.data;
            // console.log(series);

            this.setState({
                series: series,
                statusSeries: true,
            })
        })
    }


    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <img src={img} alt="" height="50px" />
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/" >Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/nuevopersonaje" >Nuevo Personaje</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/modificarpersonaje" >Modificar Personaje</NavLink>
                                </li>
                                {
                                    // MUESTRA EL DROPDOWN SI HA PODIDO CARGAR LAS SERIES
                                    (this.state.statusSeries === true) &&
                                    (<li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Series
                                        </a>
                                        <ul className="dropdown-menu">
                                            {
                                                // AÑADE LAS SERIES AL DROPDOWN
                                                this.state.series.map((serie, index) => {
                                                    return (<li key={serie.idSerie}><NavLink className="dropdown-item" to={"/serie/"+serie.idSerie} >{serie.nombre}</NavLink></li>)
                                                })
                                            }
                                        </ul>
                                    </li>)
                                }
                            </ul>
                        </div>
                    </div>
                </nav></div>
        )
    }
}
