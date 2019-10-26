import React from 'react';
import './SearchBar.css';
import search_icon from './search-icon.png';
import delete_icon from './delete-icon.png';
import SearchSuggestion from './SearchSuggestion/SearchSuggestion';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.search_bar_refs = React.createRef();
    }


    // events handle
    handleTitleChange(e) {
        // this.props.search(this.state.title,'multi');
        this.setState({title: e.target.value}, () => {
            if (this.state.title === '') {
                document.getElementById('delete').style.display = 'none';
                // document.getElementById('suggestion-search').style.display = 'none';
            }
            else {
                document.getElementById('delete').style.display = 'inline';
                // document.getElementById('suggestion-search').style.display = 'block';
            }
        }); 
    }

    handleDelete(e) {
        this.setState({title: ''});
        this.search_bar_refs.current.value = '';
        e.target.style.display = 'none';
    }

    handleSearch(e) {
        if (e.key === 'Enter') {
            this.props.search(this.state.title);
            e.preventDefault();
        }
    }

    // when scrolling, search-bar suggestions disappear
    handleScroll(e) {
        
    }

    render() {
        return (
            <div id="search-bar">
                <div id="search-input">
                    <div id="search-icon">
                        <img src={search_icon} alt="search_icon"/>
                    </div>
                    <input placeholder="Search for a movie, tv show, person..." type="text" onChange={this.handleTitleChange} 
                    onKeyPress={this.handleSearch} onClick={this.handleClick} ref={this.search_bar_refs}/>
                    <img src={delete_icon} id="delete" style={{display: 'none'}} 
                        onClick={this.handleDelete} alt="delete-button"/>
                </div>
                {/* <div id="suggestion-search">
                    {this.props.results ? 
                        this.props.results.map(result => {
                            return <SearchSuggestion title={result.title} media_type={result.media_type}/>
                        }) : ''
                    }
                </div> */}
            </div>
        )
    }
}

export default SearchBar;