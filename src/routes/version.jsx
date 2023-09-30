import * as React from 'react'
import { Outlet } from 'react-router-dom';

function Versions() {
    return (
        <div id="version">
            <h1>Instances</h1>
            <div id='details-version'><Outlet /></div>
        </div>
    )
}

export default Versions;