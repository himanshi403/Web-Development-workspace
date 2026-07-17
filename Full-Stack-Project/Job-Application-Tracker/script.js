const companyInput =
document.getElementById("company");

const roleInput =
document.getElementById("role");

const statusInput =
document.getElementById("status");

const addBtn =
document.getElementById("addBtn");

const jobList =
document.getElementById("jobList");


let jobs=[];
addBtn.addEventListener(
    "click",
    addJob);

function addJob(){
        const company=companyInput.value;
        const role=roleInput.value;
        const status=statusInput.value;

        if(company==="" || role===""){
            alert("Please fill in all fields");
            return;
        }

       
    

    const job={
        company,
        role,
        status
    };
    jobs.push(job);

    displayJobs();

    //clear form
    companyInput.value="";
    roleInput.value="";
    statusInput.value="Applied";
}

    //display funcn
    function displayJobs(){
        jobList.innerHTML="";
        
        jobs.forEach(function(job){
            jobList.innerHTML+=`
            <div class="job">
            <h3>${job.company}</h3>
            <p>Role:${job.role}</p>
            <p>Status:${job.status}</p>
            </div>
            `;
        
        })
    }
    
    