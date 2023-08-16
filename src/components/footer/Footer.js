import React from 'react';
import {t} from "i18next";
import './Footer.css';
export const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='footer-flex-col'>
                <div className='footer-banner'>
                    {/*<img src='/images/logos/gaiax_white.svg' height='50px'/>*/}
                    <p>{t('footer_slogan_cap')}</p>
                    <img src='/images/logos/msg_white.svg' height='50px'/>
                </div>
                <div className='footer-content'>
                    <div>
                        <a href='#'>{t('links.imprint')}</a>
                        <a href='#'>{t('links.privacy')}</a>
                        <a href='#'>{t('links.policy')}</a>
                        <a href='#'>{t('links.cookie_settings')}</a>
                        <a href='#'>{t('links.terms_and_conditions')}</a>
                        <a href='#'>{t('links.contact')}</a>
                        <a href='#'>{t('links.help')}</a>
                    </div>
                    <img src='/images/logos/bmwk_eu.webp'></img>
                </div>
            </div>
        </div>
    );
}
