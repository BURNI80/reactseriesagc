import axios from 'axios'
import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';
import Global from '../Global/Global'

export default class ModificarPersonaje extends Component {

    // REFERENCIAS A LAS CAJAS DEL FORMULARIO
    selSerie = React.createRef();
    selPer = React.createRef();

    state = {
        series: [],
        statusSeries: false,
        personajes: [],
        statusPersonajes: false,
        verNombreSerie: "",
        verImagenSerie: "",
        verNombrePersonaje: "",
        verImagenPersonaje: "",
        modificado: false,
    }
    serieId = 0;

    componentDidMount = () => {
        this.cargarSeries()
        this.cargarPersonajes()
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

    // CARGA TODOS LOS PERSONAJES
    cargarPersonajes = () => {
        const request = "/api/Personajes"

        axios.get(Global.url + request).then(res => {
            const personajes = res.data;
            // console.log(personajes);
            this.setState({
                personajes: personajes,
                statusPersonajes: true,
            })

        })
    }

    // MUSTRA LA IMAGEN Y EL TITULO DE LA SERIE AL CAMBIAR EL SELECT
    verSerie = () => {
        var serie = this.selSerie.current.value
        for (var i = 0; i < this.state.series.length; i++) {
            if (this.state.series[i].idSerie == serie) {
                this.setState({
                    verNombreSerie: this.state.series[i].nombre,
                    verImagenSerie: this.state.series[i].imagen,
                })

            }
        }
    }

    // MUSTRA LA IMAGEN Y EL TITULO DEL PERSONAJE AL CAMBIAR EL SELECT
    verPersonaje = () => {
        var per = this.selPer.current.value
        for (var i = 0; i < this.state.personajes.length; i++) {
            if (this.state.personajes[i].idPersonaje == per) {
                this.setState({
                    verNombrePersonaje: this.state.personajes[i].nombre,
                    verImagenPersonaje: this.state.personajes[i].imagen,
                })

            }
        }
    }

    // MODIFICA EL PERSONAJE MEDIANTE SU ID Y LA DE LA SERIE
    modificarPersonaje = (e) => {
        e.preventDefault()
        var personaje = parseInt(this.selPer.current.value);
        var serie = parseInt(this.selSerie.current.value);
        const request = "/api/Personajes/"

        axios.put(Global.url + request + personaje + "/" + serie).then(res => {
            this.setState({
                modificado: true,
            });
            this.serieId = serie;
        })
    }

    render() {

        // SI SE HA MODIFICADO UN PERSONAJE, TE REDIRIGE A LOS PERSONAJES DE LA SERIE A LA CUAL SE HA AÑADIDO DICHO PERSONAJE
        if (this.state.modificado === true) {
            return (<Navigate to={"/personajes/" + this.serieId} />)
        }

        return (
            <div className='container'>
                <h1 style={{ "color": "blue" }}>Personajes y series</h1>
                <form onSubmit={this.modificarPersonaje}>
                    <label className='form-label' >Serie:</label>
                    <select className='form-select' name="series" onChange={this.verSerie} ref={this.selSerie} >
                        {
                            // SI HAY SERIES SE MUESTRA EL SELECT
                            (this.state.statusSeries === true) &&
                            (
                                // SE CARGAN LAS SERIES EN EL SELECT
                                this.state.series.map((serie, index) => {
                                    return (<option key={serie.idSerie} value={serie.idSerie} >{serie.nombre}</option>)
                                })
                            )

                        }
                    </select>
                    <label className='form-label' >Personaje:</label>
                    <select className='form-select' name="personajes" ref={this.selPer} onChange={this.verPersonaje}>
                        {
                            // SI HAY PERSONAJES SE MUSTRA EL SELECT
                            (this.state.statusPersonajes) &&
                            (
                                // SE CARGAN LOS PRSONAJES EN EL SELECT
                                this.state.personajes.map((per, index) => {
                                    return (<option key={per.idPersonaje} value={per.idPersonaje} >{per.nombre}</option>)
                                })
                            )

                        }
                    </select>
                    <button className='btn btn-primary' >MODIFICAR</button>
                    <div>
                        {/* DIV MUESTRA LA SERIE SELECCIONADA */}
                        <h3>{this.state.verNombreSerie}</h3>
                        <img src={this.state.verImagenSerie} alt="" height="100px" />
                    </div>
                    <div>
                        {/* DIV MUESTRA EL PERSONAJE SELECCIONADO */}
                        <h3>{this.state.verNombrePersonaje}</h3>
                        <img src={this.state.verImagenPersonaje} alt="" height="100px" />
                    </div>
                </form>

            </div>
        )
    }
}
