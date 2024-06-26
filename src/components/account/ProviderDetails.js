import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './ProviderAccount.css';

const ProviderDetails = (props) => {

  const [provider, setProvider] = useState(null);

  useEffect (()=>{
    axios.get(process.env.REACT_APP_EDGE_API_URI + '/account/provider').then(   (response) => {
      setProvider(response.data);
    },(error)=> {
      console.error(error);
    });
  },[]);

  const showPersonalInformation = (person) => {
    return `${person && person.name ? person.name : ''} ${person && person.surname ? person.surname : ''}`;
  }

  return (
    <div className="provider-account-details_info layout">
      <div className="provider-account-details_info-item">
        <div className="provider-account-section1__flex3 layout">
          <div className="provider-account-section1__image14 layout">
            <img src={provider && provider.avatarImageLink ? provider.avatarImageLink : ''}
              alt="User avatar image." height={143} width={143}/>
          </div>
          <div className="provider-account-section1__block7 layout">
            <div className="provider-account-section1__block8 layout">
              <div className="provider-account-section1__text-body layout">
                <Link to="/account/provider/edit">
                  {props.t('account.details.editAccount')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="provider-account-details_info-spacer"></div>
      <div className="provider-account-details_info-item1">
        <div className="provider-account-section1__flex4 layout">
          <h2 className="provider-account-details-title1 layout">
            {props.t('account.details.basicData')}
          </h2>
          <div className="provider-account-section1__block layout">
            <div className="provider-account-section1__small-text-body layout">
              {props.t('account.details.email')}
            </div>
            <div className="provider-account-section1__cover-block layout">
              <h5 className="provider-account-section1__highlights71 layout">
                {provider && provider.email ? provider.email : ''}
              </h5>
            </div>
          </div>
          <div className="provider-account-section1__block layout">
            <div className="provider-account-section1__small-text-body layout">
              {props.t('account.details.companyName')}
            </div>
            <div className="provider-account-section1__cover-block layout">
              <h5 className="provider-account-section1__highlights71 layout">
                {provider && provider.companyName ? provider.companyName : ''}
              </h5>
            </div>
          </div>
          <div className="provider-account-section1__block layout">
            <div className="provider-account-section1__small-text-body layout">
              {props.t('account.details.comercialRegister')}
            </div>
            <div className="provider-account-section1__cover-block layout">
              <h5 className="provider-account-section1__highlights71 layout">
                {provider && provider.commercialRegister ? provider.commercialRegister : ''}
              </h5>
            </div>
          </div>

          <div className="provider-account-section1__block layout">
            <div className="provider-account-section1__small-text-body layout">
              {props.t('account.details.website')}
            </div>
            <div className="provider-account-section1__cover-block layout">
              <h5 className="provider-account-section1__highlights71 layout">
                {provider && provider.webAddress ? provider.webAddress : ''}
              </h5>
            </div>
          </div>
          <div className="provider-account-section1__block layout">
            <div className="provider-account-section1__small-text-body layout">
              {props.t('account.details.individualContact')}
            </div>
            <div className="provider-account-section1__cover-block layout">
              <h5 className="provider-account-section1__highlights71 layout">
                {showPersonalInformation(provider && provider.individualContact ? provider.individualContact : null)}
              </h5>
            </div>
          </div>
          <div className="provider-account-section1__block layout">
            <div className="provider-account-section1__small-text-body layout">
              {props.t('account.details.registeredAddress')}
            </div>
            <div className="provider-account-section1__cover-block layout">
              <h5 className="provider-account-section1__highlights71 layout">
                {provider && provider.registeredAddress ? provider.registeredAddress : ''}
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div className="provider-account-details_info-spacer1"></div>
      <div className="provider-account-details_info-item2">
        <div className="provider-account-section1__flex5 layout">
          <h2 className="provider-account-details-title1 layout">
            {props.t('account.details.details')}
          </h2>
          <div className="provider-account-section1__block layout">
            <div className="provider-account-section1__small-text-body layout">
              {props.t('account.details.certifications')}
            </div>
            <div className="provider-account-section1__cover-block layout">
              <h5 className="provider-account-section1__highlights71 layout">
                {provider && provider.certification ? provider.certification : ''}
              </h5>
            </div>
          </div>
          <div className="provider-account-section1__block layout">
            <div className="provider-account-section1__small-text-body layout">
              {props.t('account.details.alias')}
            </div>
            <div className="provider-account-section1__cover-block layout">
              <h5 className="provider-account-section1__highlights71 layout">
                {provider && provider.alias ? provider.alias : ''}
              </h5>
            </div>
          </div>
          <div className="provider-account-section1__block layout">
            <div className="provider-account-section1__small-text-body layout">
              {props.t('account.details.localAttestation')}
            </div>
            <div className="provider-account-section1__cover-block layout">
              <h5 className="provider-account-section1__highlights71 layout">
                {provider && provider.localAttestation ? provider.localAttestation : ''}
              </h5>
            </div>
          </div>
          <div className="provider-account-section1__block layout">
            <div className="provider-account-section1__small-text-body layout">
              {props.t('account.details.transparencyRegister')}
            </div>
            <div className="provider-account-section1__cover-block layout">
              <h5 className="provider-account-section1__highlights71 layout">
                {provider && provider.transparencyRegister ? provider.transparencyRegister : ''}
              </h5>
            </div>
          </div>
          <div className="provider-account-section1__block layout">
            <div className="provider-account-section1__small-text-body layout">
              {props.t('account.details.dunsNumber')}
            </div>
            <div className="provider-account-section1__cover-block layout">
              <h5 className="provider-account-section1__highlights71 layout">
                {provider && provider.dunsNumber ? provider.dunsNumber : ''}
              </h5>
            </div>
          </div>
          <div className="provider-account-section1__block layout">
            <div className="provider-account-section1__small-text-body layout">
              {props.t('account.details.legalEntityIdentifier')}
            </div>
            <div className="provider-account-section1__cover-block layout">
              <h5 className="provider-account-section1__highlights71 layout">
                {provider && provider.legalEntityIdentifier ? provider.legalEntityIdentifier : ''}
              </h5>
            </div>
          </div>
          <div className="provider-account-section1__block layout">
            <div className="provider-account-section1__small-text-body layout">
              {props.t('account.details.dataProviderOfficer')}
            </div>
            <div className="provider-account-section1__cover-block layout">
              <h5 className="provider-account-section1__highlights71 layout">
                {showPersonalInformation(provider && provider.dataProviderOfficer ? provider.dataProviderOfficer : null)}
              </h5>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

ProviderDetails.propTypes = {
  t: PropTypes.func,
}

export default withTranslation() (ProviderDetails);
