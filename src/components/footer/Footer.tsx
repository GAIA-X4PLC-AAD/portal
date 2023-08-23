import React from 'react';
import {t} from "i18next";
import './Footer.css';
import {SparksText} from "../sparksText/SparksText";
export const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='footer-flex-col'>
                <div className='footer-banner'>
                    <SparksText />
                    {/*<img src='/images/logos/gaiax_white.svg' height='50px'/>*/}
                    <div className='footer-msg'>
                        <p>{t('footer_slogan_cap')}</p>
                        <img src='/images/logos/msg_white.svg' height='50px' alt={t('footer_msg')} />
                    </div>
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
                    <img src='/images/logos/bmwk_eu.webp' alt={t('footer_bmwk_eu')} />
                </div>
            </div>
        </div>
    );
}
