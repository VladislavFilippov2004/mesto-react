import React from 'react'
import PopupWithForm from './popupWithForm.js'

function AddPlacePopup(props) {
    const [place, setPlace] = React.useState();
    const [link, setLink] = React.useState();

    function handlePlace(e) {
        setPlace(e.target.value)
    }

    function handleLink(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name: place,
            link,
        })
    }

    return(
        <PopupWithForm onSubmit={handleSubmit} name="new-place" title="Новое место" buttonText="Создать" isOpen={props.isOpen} onClose={props.onClose}>
            <fieldset className="popup__info">
                        <input onChange={handlePlace} type="text" className="popup__input popup__input_place " id="place-input" name='name' placeholder="Название места" minLength="2" required />
                        <span className='span-error place-input-error popup__span-error'></span>
                        <input onChange={handleLink} type="url" className="popup__input popup__input_link" id="link-input" name='link' placeholder="Ссылка на картинку" required />
                        <span className='span-error link-input-error popup__span-error'></span>
                    </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup;