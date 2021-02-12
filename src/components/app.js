import React, { useEffect } from 'react';
import Header from './header.js';
import Main from './main.js';
import Footer from './footer.js';
import api from '../utils/api.js';
import '../index.css';
import PopupWithForm from './popupWithForm.js'
import ImagePopup from './imagePopup.js'

function App(props) {
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
        console.log('ll')
        setIsOpen(true);
        setSelectedCard(card)
    }

    function closeAllPopups() {
        setEditAvatarPopup(false)
        setEditProfilePopup(false)
        setAddPlacePopup(false)
        setIsOpen(false)      
    }
    

    return (

        <div className="root">
            <Header></Header>

            <Main  
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}>
            </Main>

            <PopupWithForm name="new-avatar" title="Обновить аватар"  isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                <fieldset className="popup__info">
                    <input type="url" className="popup__input popup__input_link" id="link" name='link'
                        placeholder="Ссылка на картинку" required />
                    <span className='span-error link-error popup__span-error'></span>
                </fieldset>
                <button type="submit" className="popup__button-save popup__button-save_form" name="make-form-btn">
                    Сохранить
                </button>
            </PopupWithForm>

            <PopupWithForm name="confrim" title="Вы уверены?" >
                <button type="submit" className="popup__button-save" name="submit-form-btn">
                    Да
                </button>
            </PopupWithForm>

            <PopupWithForm name="new-place" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
                <fieldset className="popup__info">
                    <input type="text" className="popup__input popup__input_place " id="place-input" name='name' placeholder="Название места" minLength="2" required />
                    <span className='span-error place-input-error popup__span-error'></span>
                    <input type="url" className="popup__input popup__input_link" id="link-input" name='link' placeholder="Ссылка на картинку" required />
                    <span className='span-error link-input-error popup__span-error'></span>
                </fieldset>
                <button type="submit" className="popup__button-save popup__button-save_form" name="make-form-btn">
                    Создать
                </button>
            </PopupWithForm>

            <PopupWithForm name="user-info" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
                <fieldset className="popup__info">

                    <input type="text" className="popup__input popup__input_name" id="name-input" name="input-user-name" minLength="2" required />
                    <span className='span-error name-input-error  popup__span-error'></span>
                    <input type="text" className="popup__input popup__input_job " id="job-input" name='input-user-job' minLength="2" required />
                    <span className='span-error job-input-error popup__span-error'></span>

                </fieldset>
                
                <button type="submit" className="popup__button-save" name="submit-form-btn" >
                    Сохранить
                </button>
            </PopupWithForm>
            <ImagePopup card={selectedCard} isOpen={isOpen} onClose={closeAllPopups}/>      
            <Footer></Footer>
        </div>
    );
}

export default App;
