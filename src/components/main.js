import React, { useEffect } from 'react';
import pen from '../images/pen.svg'
import editButton from '../images/button-edit.svg'
import addButton from '../images/add-button.svg'
import api from '../utils/api.js';
import Card from './card.js'


function Main(props) { 
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    useEffect(() => {
        api.getUserInformation() 
        .then((userInfo) => {
            setUserName(userInfo.name)
            setUserDescription(userInfo.about)
            setUserAvatar(userInfo.avatar)
        })
        api.getInitialCards()
        .then((initialCards)=> {
            console.log(initialCards)
            setCards(initialCards);
        })
    }, [])

    return (
        <main>
            <div className="profile">
                <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})` }} onClick={props.onEditAvatar}>
                    <div className='profile__box'>
                        <img className="profile__pen" src={pen} />
                    </div>
                </div>
                <div className="profile__info">
                    <div className="profile__text">
                        <div className="profile__top-line">
                            <h1 className="profile__name">{userName}</h1>
                            <button className="profile__edit-button" type="button">
                                <img src={editButton} onClick={props.onEditProfile} alt="Кнопка редактирования" />
                            </button>
                        </div>
                        <p className="profile__job">{userDescription}</p>
                    </div>
                </div>
                <button className="profile__button-add" type="button" onClick={props.onAddPlace}>
                    <img src={addButton} className="profile__button-add-image" alt="Кнопка Добавить" />
                </button>
            </div> 
        
        <section className='elements'>
        {cards.map((item) =><Card key={item._id} card={item} onCardClick={props.onCardClick}/>)}
        </section>
        </main>
    )
}


export default Main;