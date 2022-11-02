import axios from 'axios'
import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';
import Global from '../Global/Global'

export default class NuevoPersonaje extends Component {

    // REFERENCIAS A LAS CAJAS DEL FORMULARIO
    nombreForm = React.createRef();
    imagenForm = React.createRef();
    selectForm = React.createRef();

    state = {
        series: [],
        statusPOST:false,
    }
    numeroSerie = 0;

    componentDidMount = () => {
        this.cargarSeries()
    }

    // CARGA LAS SERIES
    cargarSeries = () => {
        const request = "/api/Series"
        axios.get(Global.url + request).then(res => {
            const series = res.data;
            // console.log(series);

            this.setState({
                series: series,
            })
        })
    }

    // CREA EL NUEVO PERSONAJE
    insertarPersonaje = (e) => {
        e.preventDefault();
        var nombre = this.nombreForm.current.value
        var imagen = this.imagenForm.current.value
        var serie = parseInt(this.selectForm.current.value)

        // DATOS DEL PERSONAJE CREADO
        var datos= {
            idPersonaje:110,
            nombre:nombre,
            imagen:imagen,
            idSerie:serie,
          }

        // MANDA EL PERSONAJE A LA API
          const request = "/api/Personajes"
          axios.post(Global.url+request,datos).then(res => {
            this.setState({
                statusPOST:true,
            })
            this.numeroSerie = serie;
          })
    }


    render() {

        // SI EL PERSONAJE YA SE A INSERTADO EN LA API TE REDIRIGE A LOS PERSONAJES DE ESA SERIE
        if(this.state.statusPOST === true){
            return(<Navigate to={"/personajes/"+this.numeroSerie} />)
        }
            
        
        return (
            <div className='container'>
                <h1 style={{ "color": "blue" }} >NUEVO PERSONAJE</h1>
                <form onSubmit={this.insertarPersonaje}>
                    <label className='form-label'>Nombre:</label>
                    <input type="text" className="form-control" ref={this.nombreForm} />
                    <label className='form-label'>Imagen:</label>
                    <input type="text" className="form-control" ref={this.imagenForm} />
                    <label className='form-label'>Serie:</label>
                    <select className='form-select' name="series" ref={this.selectForm} >
                        {
                            // MUESTRA LAS SERIES DISPONIBLES
                            this.state.series.map((serie,index) => {
                                return(<option key={serie.idSerie} value={serie.idSerie} >{serie.nombre}</option>)
                            })
                        }
                    </select>
                    <button className='btn btn-primary'>Insertar Personaje</button>
                </form>
            </div>
        )
    }
}
