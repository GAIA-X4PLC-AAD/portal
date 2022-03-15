import React, {Component} from 'react';
import './Search.css';

class Search extends Component {
    
    constructor() {
        super();
        this.state = {
            searchText: '',
        };
    }

    onChange(e) {
        this.setState({
            searchText: e.target.value
        });
    }

    updateText(text) {
        this.setState({
            searchText: `${this.state.searchText} ${text}`
        });
    }

    onKeyPressed(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code !== 13) return;
        alert("Starting search");
    }

    searchProcessing() {
        alert("Under construction");
    }

    render() {
        return(
            <div>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <div className='searchBarComponent'>
                    <div className='searchInputField'>     
                        <input 
                            type="text" 
                            id="searchElement"
                            placeholder="Search..." 
                            onKeyDown={(e) => this.onKeyPressed(e)}
                            value={this.state.searchText}
                            onChange={(e) => this.onChange(e)}
                        />
                        <i class='fa fa-search'></i>
                    </div>
                        <button 
                            className='button-16'
                            type="submit" 
                            onClick={() => this.searchProcessing()}>
                                Advanced
                        </button>
                </div>
                        
                <div className='additionalSearchOptions'>
                        <button 
                            className='button-17'
                            type="submit" 
                            onClick={() => this.updateText(" NOT=")}>
                                NOT
                        </button>
                        <button 
                            className='button-17'
                            type="submit" 
                            onClick={() => this.updateText(" Provider=")}>
                                Provider
                        </button>
                        <button 
                            className='button-17'
                            type="submit" 
                            onClick={() => this.updateText(" Storage=")}>
                                Storage
                        </button>
                        <button 
                            className='button-17'
                            type="submit" 
                            onClick={() => this.updateText(" Service=")}>
                                Service
                        </button>
                        <button 
                            className='button-17'
                            type="submit" 
                            onClick={() => this.updateText(" Compute=")}>
                                Compute
                        </button>
                </div>
            </div>
        );
    }

}

export default Search;