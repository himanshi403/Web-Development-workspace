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

const totalJobs=document.getElementById("totalJobs");

const appliedJobs=document.getElementById("appliedJobs");

const interviewJobs=document.getElementById("interviewJobs");

const offerJobs=document.getElementById("offerJobs");

const rejectedJobs=document.getElementById("rejectedJobs");

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
        id:Date.now(), //every click gets differ no.
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

        //if there are no added jobs
        if(jobs.length===0){

jobList.innerHTML="<h2>No Applications Yet</h2>";

updateStats();

return;

}
        const status=filter.value;
        const keyword=searchInput.value.toLowerCase();
        
        jobs.filter(function(job,index){
            const companyMatch=job.company.toLowerCase().includes(keyword);
            const statusMatch=status==="All" || job.status===status;
            return companyMatch && statusMatch;
        }).forEach(function(job,index){
            jobList.innerHTML += `<div class="job">
                                  <div class="header">

                                <h3>${job.company}</h3>

                              <span class="status">${job.status}</span>

                               </div>

               <p><strong>Role:</strong> ${job.role}</p>

                                <div class="buttons">

                         <button onclick="editJob(${job.id})">
                                          Edit
                      </button>

                  <button onclick="deleteJob(${job.id})">
                                  Delete
                 </button>

               </div>

            </div>
                `;
        
        })
        
        updateStats();
    }

    function deleteJob(id){
        jobs = jobs.filter(job => job.id !== id);
        localStorage.setItem("jobs", JSON.stringify(jobs));
        displayJobs();
    }
    //to edit anything in particular job card

    function editJob(id){

        const job=jobs.find(function(j){
            return j.id===id;
        });
         companyInput.value = job.company;
    roleInput.value = job.role;
    statusInput.value = job.status;

    deleteJob(id);
}

    const savedJobs=localStorage.getItem("jobs");
    if(savedJobs){
        jobs=JSON.parse(savedJobs);
        displayJobs();
    }

    //to fill the stats

    function updateStats(){
        totalJobs.textContent=jobs.length;

        appliedJobs.textContent=jobs.filter(job=>job.status==="Applied").length;

        interviewJobs.textContent=jobs.filter(job=>job.status==="Interview").length;

        offerJobs.textContent=jobs.filter(job=>job.status==="Offer").length;

        rejectedJobs.textContent=jobs.filter(job=>job.status==="Rejected").length;

    }
    