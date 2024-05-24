import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import './Account.css';

const AccountPaneLoginHistory = (props) => {
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
        </tr>
      )
    }));
  }

  return (
    <div className="account-pane-loginhistory">
      <table className="account-pane-history-table">
        <thead >
          <tr className="account-pane-history-row">
            <th className="account-pane-history-head">{props.t('account.loginHistory.date')}</th>
            <th className="account-pane-history-head">{props.t('account.loginHistory.time')}</th>
          </tr>
        </thead>
        <tbody>
          {printTableRows(history)}
        </tbody>
      </table>
    </div>
  )
}

AccountPaneLoginHistory.propTypes = {
  t: PropTypes.func,
}

export default withTranslation()(AccountPaneLoginHistory);
