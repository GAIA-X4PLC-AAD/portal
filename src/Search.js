import PropTypes from 'prop-types';
import { Component } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MessageBar from './MessageBar';
import { updateSearchFromHome } from './actions';
import './Search.css';

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
    if (code !== 13) {return;}
    this.searchProcessing ();
  }

  searchProcessing() {
    this.setState({ searchResults: [] });
    this.props.updateSearchFromHome(this.state.searchText);
    this.props.navigate('/services');
  }

  render() {

    const t = this.props.t;

    return (
      <div className='search-flex-col'>
        <div className='search'>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
          <div className='searchBarComponent'>
            <div className='searchInputField'>
              <input
                type="text"
                id="searchElement"
                placeholder={t('home.search_placeholder')}
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
          </button>
        </div>
        <div className='additionalSearchOptions'>
          <button
            className='button-17'
            type="submit"
            onClick={() => this.updateText(' NOT=')}>
            {t('home.not')}
          </button>
          <button
            className='button-17'
            type="submit"
            onClick={() => this.updateText(' Provider=')}>
            {t('home.provider')}
          </button>
          <button
            className='button-17'
            type="submit"
            onClick={() => this.updateText(' Storage=')}>
            {t('home.storage')}
          </button>
          <button
            className='button-17'
            type="submit"
            onClick={() => this.updateText(' Service=')}>
            {t('home.service')}
          </button>
          <button
            className='button-17'
            type="submit"
            onClick={() => this.updateText(' Compute=')}>
            {t('home.compute')}
          </button>
        </div>
        <div className="home-messageBar" >{ this.state.searchResults != null && <MessageBar itemCount={this.state.searchResults.length} />}</div>
      </div>
    )
  }

}
Search.propTypes = {
  updateSearchFromHome: PropTypes.func,
  navigate: PropTypes.func,
  t: PropTypes.func,
}

const Wrap = (props) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  return <Search {...props} navigate={navigate} t={t}/>
}
export default connect (null, { updateSearchFromHome }) (Wrap);
