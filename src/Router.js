import React, { Component } from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import Home from './components/Home'
import Menu from './components/Menu'
import ModificarPersonaje from './components/ModificarPersonaje'
import NuevoPersonaje from './components/NuevoPersonaje'
import Personajes from './components/Personajes'
import Serie from './components/Serie'

export default class Router extends Component {
    render() {

        // LEE LOS PARAMETROS PASADOS POR URL Y SE LO MANDA COMO PROPS A LOS COMPONENTES
        function ParSerie(){
            var {id} = useParams();
            return(<Serie id={id}/>);
        }
        function ParPersonajes(){
            var {idSerie} = useParams();
            return(<Personajes idSerie={idSerie}/>);
        }
        return (
            <BrowserRouter>
            <Menu />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/serie/:id" element={<ParSerie />} />
                    <Route path="/personajes/:idSerie" element={<ParPersonajes />} />
                    <Route path="/nuevopersonaje" element={<NuevoPersonaje />} />
                    <Route path="/modificarpersonaje" element={<ModificarPersonaje />} />
                    <Route path="*" element={<Home />} />
                </Routes>
            </BrowserRouter>
        )
    }
}
