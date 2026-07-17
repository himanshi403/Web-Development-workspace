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

const searchInput =
document.getElementById("search");

const filter =
document.getElementById("filter");

let jobs=[];
searchInput.addEventListener("input",displayJobs);

filter.addEventListener("change",displayJobs);
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

    localStorage.setItem("jobs", JSON.stringify(jobs));

    displayJobs();

    //clear form
    companyInput.value="";
    roleInput.value="";
    statusInput.value="Applied";
}

    //display funcn
    function displayJobs(){
        jobList.innerHTML="";
        const status=filter.value;
        const keyword=searchInput.value.toLowerCase();
        
        jobs.filter(function(job,index){
            const companyMatch=job.company.toLowerCase().includes(keyword);
            const statusMatch=status==="All" || job.status===status;
            return companyMatch && statusMatch;
        }).forEach(function(job,index){
            jobList.innerHTML+=`
            <div class="job">
            <h3>${job.company}</h3>
            <p>Role:${job.role}</p>
            <p>Status:${job.status}</p>
            <button onclick="deleteJob(${index})">Delete</button>
            </div>
            `;
        
        })
    }

    function deleteJob(index){
        jobs.splice(index,1);
        localStorage.setItem("jobs", JSON.stringify(jobs));
        displayJobs();
    }

    const savedJobs=localStorage.getItem("jobs");
    if(savedJobs){
        jobs=JSON.parse(savedJobs);
        displayJobs();
    }
    