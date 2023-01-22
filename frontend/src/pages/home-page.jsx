import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Icon } from 'monday-ui-react-core';
import { MoveArrowRight } from 'monday-ui-react-core/icons';

import logo from '../assets/img/logo.png'
import hero from '../assets/img/home-page-hero.jpg'

import { loadBoards } from '../store/board.actions'

export function HomePage() {
    const baseImgUrl = `https://i.pinimg.com/236x/`
    const logoImgUrls = ['a5/57/4a/a5574a2d7a158993b62d844a7500e8a9', 'c7/6b/fc/c76bfc66677d34cb2c0cca5644372b86', 'f8/82/d1/f882d1f7cd6b351ba225b2b758103109', '11/ed/46/11ed4612dfffa5e87dd5159bb0c58cf1', '4f/28/85/4f2885b60d604d07e7392f65e9a1dce4', 'ee/e1/0f/eee10f79d31d14797555188723dae124', '44/fa/33/44fa335b8d59303e196d06dde6434ef0', '63/d2/9e/63d29ead9c56d2a6bb0e3eff5bb7e3eb', 'f2/91/49/f29149ddb0616e30aa2f704fb27379ab']

    function scrollTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        loadBoards()
    }, []);

    return (
        <section className='home-page'>

            <header className="home-page-top-header"
                onClick={scrollTop}>
                <img className="header-logo" src={logo} alt="logo" />monday<span>.com</span>
            </header>

            <div className='home-page-hero'>
                <h1 className='home-page-hero-header'><span className='header-top-txt'>A platform built for a</span><span className='header-lower-txt'>new way of working</span></h1>
                <h3 className='home-page-hero-sub-header' >What would you like <span className='home-page-sub-header-span'>to manage</span> with sprint4.com Work OS?</h3>
            </div>

            <span className="elementToFadeInAndOut" style={{ fontSize: '18px', position: 'absolute', top: '4em', right: '11em' }}>✦</span>
            <span className="SecondElementToFadeInAndOut" style={{ fontSize: '12px', position: 'absolute', top: '6em', right: '14em' }}>✦</span>
            <span className="elementToFadeInAndOut" style={{ fontSize: '18px', position: 'absolute', top: '6.5em', right: '4em' }}>✦</span>
            <span className="SecondElementToFadeInAndOut" style={{ fontSize: '12px', position: 'absolute', top: '3.6em', right: '1em' }}>✦</span>
            <span className="elementToFadeInAndOut" style={{ fontSize: '18px', position: 'absolute', top: '4.2em', left: '2.5em' }}>✦</span>
            <span className="SecondElementToFadeInAndOut" style={{ fontSize: '12px', position: 'absolute', top: '6em', left: '1.4em' }}>✦</span>

            <span className="elementToFadeInAndOut" style={{ fontSize: '16px', position: 'absolute', top: '14em', right: '11em' }}>✦</span>
            <span className="SecondElementToFadeInAndOut" style={{ fontSize: '8px', position: 'absolute', top: '16em', right: '14em' }}>✦</span>
            <span className="elementToFadeInAndOut" style={{ fontSize: '16px', position: 'absolute', top: '16.5em', right: '4em' }}>✦</span>
            <span className="SecondElementToFadeInAndOut" style={{ fontSize: '18px', position: 'absolute', top: '13.6em', right: '1em' }}>✦</span>
            <span className="elementToFadeInAndOut" style={{ fontSize: '16px', position: 'absolute', top: '14.2em', left: '3.8' }}>✦</span>
            <span className="SecondElementToFadeInAndOut" style={{ fontSize: '18px', position: 'absolute', top: '16em', left: '4em' }}>✦</span>


            <div className='home-page-link'>
                <Link className='btn-get-started' to='/board'>Get Started <div className='btn-get-started-arrow-container'><span className='btn-get-started-arrow'>
                    <Icon iconType={Icon.type.SVG} icon={MoveArrowRight} iconSize={16} />
                </span></div> </Link>
                <div className='home-page-promo'><span className='home-page-promo1'>No credit needed</span>✦<span className='home-page-promo2'>Unlimited time on Free plan</span></div>
            </div>

            <div className='home-page-bottom-container'>
                <img className='home-page-image' src={hero} alt="" />



                <h3>Trusted by 152,000+ customers worldwide</h3>
                {/* <div className='home-page-companies-logo'>
                    {logoImgUrls.map(url => <div className='logo-box' key={url}><img className='home-page-company-logo' src={`${baseImgUrl + url}.jpg`} alt="" /></div>)}
                </div> */}
                <h2>The Work OS that lets you
                    shape workflows, <span className='home-page-span-bold'>your way</span></h2>
                <p className='home-page-p'>Boost your team’s alignment, efficiency, and productivity by customizing any workflow to fit your needs.
                </p>

            </div>
        </section >
    )
}