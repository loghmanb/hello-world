import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import City from './City';
import Weather from './Weather';

class App extends Component {
    render(){
        return (
            <div data-test="app-component" className="container-fluid">
                <div className="row">
                    <div className="col-12 text-center mt-3">
                        <h1>Weather Box</h1>
                    </div>
                    <div className="col-12">
                        <City />
                    </div>
                    <div className="col-12">
                        <Weather />
                    </div>
                </div>
            </div>
        )
    }
}

export default App;