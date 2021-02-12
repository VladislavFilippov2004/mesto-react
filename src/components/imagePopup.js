import closeIcon from '../images/close_icon.svg'

function ImagePopup(props) {
    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''} popup_photo`}>
                <div className="popup__image-div">
                    <img className="popup__image" src={props.card.link} alt="Увеличенная в размере картинка" onClick={props.onPopup}/>
                    <p className="popup__text"></p>
                    <button className="popup__icon-close" type="reset" onClick={props.onClose}>
                        <img src={closeIcon} alt="Кнопка закрыть" />
                    </button>
                </div>
            </div>
    )
}
export default ImagePopup;