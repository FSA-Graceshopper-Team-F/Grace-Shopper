import React from 'react';

const Footer = () => {
    return (
        <div class="row">
            <div class="col">
                <h1>Sign up for our newsletter</h1>
                <p>Be the first to know about our special offers, new product launches and events.</p>
                <a href="/login">Log in</a> or <a href="/signup">Sign up</a>
            </div>
            <div class="col">
                <h3>Shop</h3>
                <li><a href="/products">All products</a> </li>
                <li><a href="/categories/sports">Sports</a> </li>
                <li><a href="/categories/clothes">Clothes</a> </li>
                <li><a href="/categories/food">Food</a> </li>
            </div>
        </div>

    )
}

export default Footer;