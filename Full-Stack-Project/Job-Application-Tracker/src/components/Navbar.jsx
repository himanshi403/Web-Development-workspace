function Navbar({

search,

setSearch

}){

return(

<div>

<h1>

Job Tracker

</h1>

<input

type="text"

placeholder="Search Company"

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>

</div>

);

}

export default Navbar;