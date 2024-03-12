import React from 'react';
import {t} from "i18next";
import './Footer.css';
export const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='footer-flex-col'>
                <div className='footer-content'>
                    <a href='#'>{t('links.imprint')}</a>
                    <a href='#'>{t('links.privacy')}</a>
                    <a href='#'>{t('links.policy')}</a>
                    <a href='#'>{t('links.cookie_settings')}</a>
                    <a href='#'>{t('links.terms_and_conditions')}</a>
                    <a href='#'>{t('links.contact')}</a>
                    <a href='#'>{t('links.help')}</a>
                    <img src='/images/logos/bmwk_eu.webp' alt={t('footer_bmwk_eu')} />
                </div>
            </div>
        </div>
    );
}
