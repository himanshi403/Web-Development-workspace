import {useState,useEffect} from "react";

function JobForm({
    addJob,
    editingJob,
    updateJob

}){
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");

useEffect(()=>{

if(editingJob){

setCompany(editingJob.company);

setRole(editingJob.role);

setStatus(editingJob.status);

}

},[editingJob]);

    return(
        <div className="jobForm">
        <h2>Add new job</h2>
        <input
        type="text"
        placeholder="company"
        value={company}
        onChange={(e)=>setCompany(e.target.value)} />

        <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e)=>setRole(e.target.value)} />

        <select
        value={status}
        onChange={(e)=>setStatus(e.target.value)}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
        </select>

        <button onClick={handleSubmit}>
            {
                editingJob?"UpdateJob":"Add Job"
            }
            
        </button>

        </div>

    
    );

    function handleSubmit(){

    if(company==="" || role===""){

        alert("Fill all fields");

        return;

    }

    const newJob={
        id:Date.now(),
        company,
        role,
        status
    };

if(editingJob){

updateJob({

id:editingJob.id,

company,

role,

status

});

}else{

addJob(newJob);

}


    setCompany("");
    setRole("");
    setStatus("Applied");
}
}
export default JobForm;