import React, { createContext, useState } from 'react'

const commonContex = createContext();


export default function Contex({ children }) {


    var cardData = localStorage.getItem('cardItem');
    var cardData = JSON.parse(cardData);
    const [cardItem, setCardItem] = useState(cardData ? cardData : []);


    var wishListData = localStorage.getItem('wishitem');
    var wishListData = JSON.parse(wishListData);
 
    const [wishList, setWishList] = useState(wishListData ?? []);

    var userLogin = localStorage.getItem('user_uid')
    const [isLogin, setIsLogin] = useState(userLogin)

    const data = { cardItem, setCardItem, wishList, setWishList, isLogin, setIsLogin }
    return (
        <>
            <commonContex.Provider value={data}>
                {children}
            </commonContex.Provider>
        </>
    )
}
export { commonContex }
