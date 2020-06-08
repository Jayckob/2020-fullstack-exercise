const enumList = [];
var currentDirection = false;
var currentSort = 0;
var currentPage = 1;
const postsPerPage = 5;
var totalNumberOfPosts = 0;
const paginate = function (pageNumber) {
    if (pageNumber > 0 && pageNumber <= Math.ceil(totalNumberOfPosts / postsPerPage)) { currentPage = pageNumber; }
};
const numberOfEmployeesFilterMin = [1, 11, 50];
const numberOfEmployeesFilterMax = [10, 50];
var numberOfEmployeesFilterIndex = 0;

const filterByEmployeeNumber = function (data) {

    if (numberOfEmployeesFilterIndex-1 == -1) {
        return data;
    }
    const min = numberOfEmployeesFilterMin[numberOfEmployeesFilterIndex-1];
    
    filterdata = data.filter(x => x.num_employees >= min);
    if (numberOfEmployeesFilterIndex-1 < numberOfEmployeesFilterMax.length) {
        const max = numberOfEmployeesFilterMax[numberOfEmployeesFilterIndex-1];
        filterdata = filterdata.filter(x => x.num_employees <= max);
    }

    return filterdata;
};

function compareName(a, b) {
    const namea = a.name;
    const nameb = b.name;

    let comparison = 0;

    if (namea > nameb) {
        comparison = 1;
    } else if (namea < nameb) {
        comparison = -1;
    }
    return comparison;
}

function compareNumberOfEmployees(a, b) {
    const num_employeesa = a.num_employees;
    const num_employeesb = b.num_employees;

    let comparison = 0;

    if (num_employeesa > num_employeesb) {
        comparison = 1;
    } else if (num_employeesa < num_employeesb) {
        comparison = -1;
    }
    return comparison;
}

function compareTags(a, b) {
    const ntagsa = a.tags.length;
    const tagsb = b.tags.length;

    let comparison = 0;

    if (ntagsa < tagsb) {
        comparison = -1;
    } else if (ntagsa > tagsb) {
        comparison = 1;
    }
    return comparison;
}


const sortData = function (data) {
    filterdata = data;
    if (currentSort == 1) {
        filterdata.sort(compareName);
        if (!currentDirection) {
            filterdata.reverse();
        }
        return filterdata;
    }

    if (currentSort == 2) {
        filterdata.sort(compareNumberOfEmployees); 
        if (!currentDirection) {
            filterdata.reverse();
        }
        return filterdata;
    }

    if (currentSort == 3) {

        filterdata.sort(compareTags);
        if (!currentDirection) {
            filterdata.reverse();
        }
        return filterdata;
    }
    return filterdata;
}

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];
    totalNumberOfPosts = totalPosts;

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <nav>
                <ul className='pagination'>
                    <li className='page-item'>
                        <a onClick={() => paginate(currentPage-1)} href='#' className='page-link'>
                            Prev
                        </a>
                    </li>
                    {pageNumbers.map(number => (
                        <li className='page-item'>
                            <a onClick={() => paginate(number)} href='#' className={"page-link " + ((number == currentPage) && 'pselected')}>
                            {number}
                        </a>
                    </li>
                    ))}
                    <li className='page-item'>
                        <a onClick={() => paginate(currentPage+1)} href='#' className='page-link'>
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { active: false }
    }

    render() {
        return (
            <a
                onClick={() => {
                    this.setState(prevState => {
                        let newState = !prevState.active;
                        this.props.handleClick(newState, this.props.value);
                        return { active: newState }
                    })
                }}
                className={!this.state.active ? '' : 'selected'}
                >
                {this.props.value}</a>
        )
    }
}

class Comment extends React.Component {
    rawMarkup() {
        const md = new Remarkable();
        const rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    }
    render() {
        var tags = this.props.datum.tags.map(tag => /*<td className="tag-items">{*/tag + " " /*}</td>*/);
        var row = this.props.datum;
        return (
            <tr>
                <td>{row.name}</td>
                <td>{row.num_employees}</td>
                <td> {tags} </td>
            </tr>
        );
    }
}

class CommentList extends React.Component {
    render() {

        const itemsFilteredForTags = this.props.data.filter(
            x => {
                if (this.props.searchTerm.length == 0) { return x }
                else {
                    return this.props.searchTerm.every(z => x.tags.includes(z))
                }
            })

        var itemsFilteredForNumberOfEmployees = filterByEmployeeNumber(itemsFilteredForTags);

        var commentNodesFiltereds = sortData(itemsFilteredForNumberOfEmployees);

        const commentNodesFiltered = commentNodesFiltereds.slice((this.props.pageNumber - 1) * postsPerPage, this.props.pageNumber * postsPerPage);


        const commentNodes = commentNodesFiltered.map(comment => (
            <Comment datum={comment}/>
        ));
        return (
            <div>
                <table>
                    <tbody>
                <tr>
                        <th onClick={() =>
                        {
                            if (currentSort != 1)
                            {
                                currentDirection = false;
                            } else {
                                currentDirection = !currentDirection;
                            }
                            currentSort = 1;
                        }}>Name {currentSort == 1 ? !currentDirection ? "desc":"asc" : ""}
                        </th>
                        <th onClick={() =>
                        {
                            if (currentSort != 2) {
                                currentDirection = false;
                            } else {
                                currentDirection = !currentDirection;
                            }
                            currentSort = 2;
                        }}>Number of Employees {currentSort == 2 ? !currentDirection ? "desc" : "asc" : ""}
                        </th>
                        <th onClick={() =>
                        {
                            if (currentSort != 3) {
                                currentDirection = false;
                            } else {
                                currentDirection = !currentDirection;
                            }
                            currentSort = 3;
                        }}>Tags {currentSort == 3 ? !currentDirection ? "desc" : "asc" : ""}
                        </th>
                </tr>
                        {commentNodes}
                        </tbody>
            </table>
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={itemsFilteredForNumberOfEmployees.length}
                    paginate={paginate}
            />
        </div>);
    }
}


class CommentBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            showList: false,
            showEmployeeNumberList: false,
            value: []
        };

        this.handleItemClick = this.handleItemClick.bind(this)
    }

    loadCommentsFromServer() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', this.props.url, true);
        xhr.onload = () => {
            const data = JSON.parse(xhr.responseText);
            this.setState({ data: data });
        };

        xhr.send();
    }
    componentDidMount() {
        this.loadCommentsFromServer();
        window.setInterval(
            () => this.loadCommentsFromServer(),
            this.props.pollInterval,
        );

        document.addEventListener('mousedown', (e) => {
            if (!this.node.contains(e.target)) {
                this.setState({ showList: false })
            }
        })
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown');
    }

    renderValue() {
        let { value } = this.state;
        if (!value.length) return "Select Tags..."
        else return value.join(', ')
    }

    toggleList() {
        this.setState(prevState => ({ showList: !prevState.showList }))
    }

    toggleEmployeeNumberList() {
        this.setState(prevState => ({ showEmployeeNumberList: !prevState.showEmployeeNumberList }))
    }

    handleItemClick(active, val) {
        currentPage = 1;
        let { value } = this.state;

        if (active) value = [...value, val]
        else value = value.filter(e => e != val);

        this.setState({ value })
    }

    render() {
        this.state.data.map(y => y.tags.map(x => { if (!enumList.includes(x)) { enumList.push(x) } }));

        return (
            <div>
                <p>Filter By Number Of Employees: </p>
                <select id="mySelect" onChange={(e) => {
                    numberOfEmployeesFilterIndex = e.target.value;
                    currentPage = 1;
                }}>
                    <option value="0">All</option>
                    <option value="1">1-10</option>
                    <option value="2">11-50</option>
                    <option value="3">50+</option>
                </select>
                <div
                    ref={node => this.node = node}
                    className="select">

                    <p>Filter By Tags: </p>
                    <button onClick={this.toggleList.bind(this)}>
                        <span className="select_value">
                            {this.renderValue()}
                        </span>
                    </button>
                    <div className={"select_list " + (!this.state.showList && 'hide')}>
                        {enumList.map(x => (<ListItem handleClick={this.handleItemClick} value={x} />))}
                    </div>
                </div>

                <div className="commentBox">
                    <h3>Customers</h3>
                    <CommentList data={this.state.data} searchTerm={this.state.value} pageNumber={currentPage} />
                </div>

            </div>
        );
    }
}

ReactDOM.render(
    <CommentBox
        url="/customers"
        pollInterval={200}
    />,
    document.getElementById('content'),
);


