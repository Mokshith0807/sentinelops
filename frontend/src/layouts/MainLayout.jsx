import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function MainLayout({ title, subtitle, children }) {
    return (
        <div className="d-flex soc-layout">
            <Sidebar />
            <div className="soc-main">
                <Topbar title={title} subtitle={subtitle} />
                <div className="container-fluid px-4 pb-5 soc-fade">{children}</div>
            </div>
        </div>
    );
}

export default MainLayout;
