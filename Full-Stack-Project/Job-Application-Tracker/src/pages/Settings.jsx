import Layout from "../components/Layout";

function Settings(){
    return(
        <Layout>
        <div className="page">
            <h1>Settings</h1>
             <div className="setting-item">

                    <label>

                        <input type="checkbox"/>

                        Dark Mode

                    </label>

                </div>

                <div className="setting-item">

                    <label>

                        <input type="checkbox"/>

                        Email Notifications

                    </label>

                </div>
                
            <button>Change Password</button>
            <button>Logout</button>
        </div>
        </Layout>
    );
}
export default Settings;