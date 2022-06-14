import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import MessageBar from './MessageBar';
import './Search.css';
import { updateSearchFromHome } from './actions';
import PropTypes from 'prop-types';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchResults: null,
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
        this.searchProcessing ();
    }

    searchProcessing() {
        this.setState({searchResults: []});
        this.props.updateSearchFromHome(this.state.searchText);
        this.props.navigate("/services");
    }

    render() {
        return(
        <div className='search-flex-col'>
            <div className='search'>
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
                        <i className='fa fa-search' onClick={()=> this.searchProcessing()}></i>
                    </div>

                </div>
            </div>
            <div className='advancedSearch'>
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
            <div className="home-messageBar" >{ this.state.searchResults != null && <MessageBar itemCount={this.state.searchResults.length} />}</div>
        </div>
        );
    }

}
Search.propTypes = {
    updateSearchFromHome: PropTypes.func,
    navigate: PropTypes.func
}

const Wrap = (props) => {
    const navigate = useNavigate();
    return <Search {...props} navigate={navigate}/>
}
export default connect (null, {updateSearchFromHome}) (Wrap);
