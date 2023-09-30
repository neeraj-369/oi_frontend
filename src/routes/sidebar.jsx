import { Link, Outlet, } from "react-router-dom";

export default function SideLayout() {
    return (
        <>
            <div id="sidebar" >
                <div id="OneImmlogo">
                    <img src="src\assets\icon.jpg" alt="One Immersive" width="100px" />
                </div>
                <h1>Scalable XR Pixel Streaming</h1>
                <nav>
                    <ul>
                        
                        <li>
                            <Link to={'/'}>Application</Link>
                        </li>
                        <li>
                            <Link to={"/appversions"}>Versions</Link>
                        </li>
                        <li>
                            <Link to={"/version"}>Instances</Link>
                        </li>
                        <li>
                            <Link to={"/reset"}>Reset</Link>
                        </li>
                        {/* <li>
                            <Link to={"/billing"}>Billing</Link>
                        </li>
                        <li>
                            <Link to={"/profile"}>Profile</Link>
                        </li> */}
                        {/* <li>
                            <Link to={"/logout"}>Log out</Link>
                        </li> */}
                    </ul>
                </nav>
            </div>
            <div id="details">
                <Outlet />
            </div>
        </>
    )
}
