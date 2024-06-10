import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import './ProviderLoginHistory.css';

const ProviderLoginHistory = (props) => {

  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_EDGE_API_URI + '/account/provider/history').then((response) => {
      console.log(response.data);
      setHistory(response.data.history);
    }, (error) => {
      alert('ko');
    });
  }, []);

  const printTableRows = (rows) => {
    console.log(rows);
    return (rows.map((row, i) => {
      return (
        <tr key={row.id} className="provider-history-row">
          <td className="provider-history-cell"> {row.date}</td>
          <td className="provider-history-cell"> {row.time}</td>
          <td className="provider-history-cell"> {row.name}</td>
        </tr>
      )
    }));

  }

  return (
    <div className="provider-history-container">
      <table className="provider-history-table">
        <thead >
          <tr className="provider-history-row">
            <th className="provider-history-head">{props.t('account.loginHistory.date')}</th>
            <th className="provider-history-head">{props.t('account.loginHistory.time')}</th>
            <th className="provider-history-head">{props.t('account.loginHistory.name')}</th>
          </tr>
        </thead>
        <tbody>
          {printTableRows(history)}
        </tbody>

      </table>
    </div>
  );

}

ProviderLoginHistory.propTypes = {
  t: PropTypes.func,
}

export default withTranslation()(ProviderLoginHistory);
