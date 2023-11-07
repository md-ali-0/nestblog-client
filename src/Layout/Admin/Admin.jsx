import { useState } from "react";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import Header from "./Header";
import DashboardSidebar from "./Sidebar";

const Admin = () => {
    const [openSide, setOpenSide] = useState(false)

    return (
        <>
            <Header openSide={openSide} setOpenSide={setOpenSide}/>
            <DashboardSidebar openSide={openSide}/>
            <Dashboard/>
        </>
    );
};

export default Admin;
