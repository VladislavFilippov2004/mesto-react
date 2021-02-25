import React, { useEffect } from 'react';
import { currentUserContext } from '../contexts/CurrentUserContext.js'
import Header from './header.js';
import Main from './main.js';
import Footer from './footer.js';
import api from '../utils/api.js';
import '../index.css';
import PopupWithForm from './popupWithForm.js'
import EditProfilePopup from './editProfilePopup.js'
import EditAvatarPopup from './editAvatarPopup.js'
import AddPlacePopup from './addPlacePopup.js'
import ImagePopup from './imagePopup.js'

function App() {
    const [currentUser, setCurrentUser] = React.useState({})
    const [cards, setCards] = React.useState([]);
    React.useEffect(() => {
        api.getUserInformation()
            .then((userInfo) => {
                setCurrentUser(userInfo)
            })

            .catch((err) => {
                console.log(err);
            })

        api.getInitialCards()
            .then((initialCards) => {
                setCards(initialCards);
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])

    function handleCardLike(card) { // функция постановки и снятия лайка
        const isLiked = card.likes.some(i => i._id === currentUser._id); // переменная, определяющая, есть ли наш id в массиве поставленных лайков
        const likeRequest = !isLiked ? api.putLike(card._id) : api.deleteLike(card._id); // вызов запросов в api в соответствии с состоянием isLiked
        likeRequest.then((newCard) => {
                const newCards = cards.map((c) => c._id === card._id ? newCard : c) // находим карточку, которой поставили лайк и обновляем её
                setCards(newCards); // рендерим новый массив
            })
            .catch((err) => {
                console.log(err)
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
        .then(()=>{
            const newCards = cards.filter((deletedCard) => { return deletedCard._id !== card._id })
            setCards(newCards)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const [isEditProfilePopupOpen, setEditProfilePopup] = React.useState(false);
    function handleEditProfileClick() {
        setEditProfilePopup(true)
    }

    const [isEditAvatarPopupOpen, setEditAvatarPopup] = React.useState(false);
    function handleEditAvatarClick() {
        setEditAvatarPopup(true)
    }

    const [isAddPlacePopupOpen, setAddPlacePopup] = React.useState(false)
    function handleAddPlaceClick() {
        setAddPlacePopup(true)
    }

    const [selectedCard, setSelectedCard] = React.useState(null)
    const [isOpen, setIsOpen] = React.useState(false)
    function handleCardClick(card) {
        setIsOpen(true);
        setSelectedCard(card)
    }

    function handleUpdateUser(data) {
        api.changeUserInformation(data)
        .then((res) =>{
            setCurrentUser(res)
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            closeAllPopups()
        })
    }

    function handleUpdateAvatar(data) {
        api.changeAvatar(data)
        .then((res) => {
            setCurrentUser(res)
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            closeAllPopups()
        })
    }

    function handleAddPlaceSubmit(data) {
        api.addCard(data)
        .then((newCard) =>{
            setCurrentUser(newCard)
            setCards([newCard, ...cards]);
        })
        .catch((err) => {
            console.log(err)
        })
        .finally(() => {
            closeAllPopups()
        })
    }

    function closeAllPopups() {
        setEditAvatarPopup(false)
        setEditProfilePopup(false)
        setAddPlacePopup(false)
        setIsOpen(false)
    }


    return (

        <currentUserContext.Provider value={currentUser}>
            <div className="root">
                <Header></Header>

                <Main
                    cards={cards}
                    setCards={setCards}
                    onCardDelete={handleCardDelete}
                    onCardLike={handleCardLike}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}>
                </Main>

                <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}/>
                <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}></AddPlacePopup>
                <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
                <ImagePopup card={selectedCard} isOpen={isOpen} onClose={closeAllPopups} />
                <Footer></Footer>

            </div>
        </currentUserContext.Provider>
    );
}

export default App;