import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Outlet } from "react-router-dom";
import Link from '@mui/material/Link';

function Dashboard() {
    const Breadcrumbs = [
        <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/material-ui/getting-started/installation/"
    >
      Dashboard
    </Link>,
    ]
return (
    <div id="dashboard">
        <h1>Coreweave Reset</h1>
        <div id="Dashboard-details"><Outlet /></div>
    </div>
)
}

export default Dashboard;