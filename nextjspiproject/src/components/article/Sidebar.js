export default function Sidebar(props) {

    const handleSubmit = (e) => {
        e.preventDefault()
        props.handleSearch(props.query)
    }

    return (
        <div className="sidebar">
            <div id="search-1" className="widget widget_search">
                <h4 className="widget-title">Search</h4>
                <form onSubmit={handleSubmit} className="relative">
                    <input type="search" value={props.query} onChange={(e) => props.setQuery(e.target.value)} className="form-control" placeholder="Search..." name="s"></input>
                    <button type="submit" className="search_btn"><i className="fa fa-search"></i></button>
                </form>
            </div>
            <div id="categories-2" className="widget widget_categories">
                <h4 className="widget-title">Categories</h4>
                <ul>
                    {props.categories.map((element, index) => {
                        return (
                            <li key={index} className="cat-item cat-item-16">
                                <a key={element._id} href="#">{element.title}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}