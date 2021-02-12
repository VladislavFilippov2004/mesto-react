import  React from 'react';
import closeIcon from '../images/close_icon.svg'

function PopupWithForm (props) {
    return(
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''} popup_type_${props.name}`} >
            <form className="popup__form popup__form_user-info" method="GET" name={props.name}>
            <h3 className="popup__title">{props.title}</h3>
            {props.children}
            <button className="popup__icon-close" type="reset" onClick={props.onClose}>
                    <img src={closeIcon} alt="Кнопка закрыть" />
                </button>
            </form>
    </div>
    )
}
export default PopupWithForm;

