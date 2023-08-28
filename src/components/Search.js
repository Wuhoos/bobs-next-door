import React from "react"

function Search({searchStore, onUpdateSearchStore}) {



    return(
        <div className="search-container">
            <input type="text" placeholder="Search names..." value={searchStore} onChange={onUpdateSearchStore} />
        </div>
    );
}

export default Search;