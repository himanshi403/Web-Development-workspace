function Navbar({

    search,
    setSearch,

    sortBy,
    setSortBy,

    statusFilter,
    setStatusFilter

}) {

    return (

        <div className="navbar-controls">

            <input
                type="text"
                placeholder="Search Company"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />


            <select
                value={sortBy}
                onChange={(e) =>
                    setSortBy(e.target.value)
                }
            >

                <option value="newest">
                    Newest
                </option>

                <option value="oldest">
                    Oldest
                </option>

                <option value="company">
                    Company A-Z
                </option>

            </select>


            <select
                value={statusFilter}
                onChange={(e) =>
                    setStatusFilter(e.target.value)
                }
            >

                <option value="All">
                    All Status
                </option>

                <option value="Applied">
                    Applied
                </option>

                <option value="Interview">
                    Interview
                </option>

                <option value="Offer">
                    Offer
                </option>

                <option value="Rejected">
                    Rejected
                </option>

            </select>

        </div>

    );

}

export default Navbar;