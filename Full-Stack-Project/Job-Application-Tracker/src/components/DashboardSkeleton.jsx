import Sidebar from "./Sidebar";

function DashboardSkeleton() {

    return (

        <div className="dashboard-layout">

            <div className="sidebar skeleton-sidebar">

                <div className="skeleton logo"></div>

                <div className="skeleton nav"></div>
                <div className="skeleton nav"></div>
                <div className="skeleton nav"></div>
                <div className="skeleton nav"></div>
                <div className="skeleton nav"></div>

            </div>

            <div className="dashboard-content">

                <div className="dashboard-skeleton">

                    <div className="skeleton hero"></div>

                    <div className="skeleton toolbar"></div>

                    <div className="skeleton list"></div>

                    <div className="skeleton list"></div>

                    <div className="skeleton list"></div>

                </div>

            </div>

        </div>

    );

}

export default DashboardSkeleton;