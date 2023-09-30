import * as React from 'react'
import { Outlet } from 'react-router-dom';

function Appversions() {
    return (
        <div id="version">
            <h1>Versions</h1>
            <div id='details-version'><Outlet /></div>
        </div>
    )
}

export default Appversions;