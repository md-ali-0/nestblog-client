import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import DashboardSidebar from "./Sidebar";

const DashboardLayout = () => {
    const [openSide, setOpenSide] = useState(false)

    return (
        <>
            <Header openSide={openSide} setOpenSide={setOpenSide}/>
            <DashboardSidebar openSide={openSide}/>
            <Outlet/>
        </>
    );
};

export default DashboardLayout;
