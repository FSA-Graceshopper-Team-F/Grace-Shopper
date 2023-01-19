import React from 'react';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='footerText'>
                <h1>Sign up for our newsletter</h1>
                <div className='footerTextContent'>
                <p>Be the first to know about our special offers, new product launches and events.</p>
                <a href="/login">Log in</a> or <a href="/signup">Sign up</a>
                </div>
            </div>
            <div className='footerText'>
                <h1>Recommended Categories</h1>
                <div className='footerTextContent'>
                <li><a href="/products">All products</a> </li>
                <li><a href="/categories/sports">Sports</a> </li>
                <li><a href="/categories/clothes">Clothes</a> </li>
                <li><a href="/categories/food">Food</a> </li>
                </div>
            </div>
            <div className='footerText'>
                <h1>Recommended Websites</h1>
                <div className='footerTextContent'>
                <li><a href="/products">Best Buy</a> </li>
                <li><a href="/categories/sports">Etsy</a> </li>
                <li><a href="/categories/clothes">The Home Depot</a> </li>
                <li><a href="/categories/food">Apple</a> </li>
                </div>
            </div>
       
        </div>

    )
}

export default Footer;