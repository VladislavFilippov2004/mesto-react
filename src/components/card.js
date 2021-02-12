import React from 'react';

function Card (props) {
    function handleClick() {
        props.onCardClick(props.card);
      }  
    return (
        <template className='elements elements__template' id='item-template'>
        <div className="elements__item">
            <img className="elements__image" src={props.card.link} alt='Увеличенная в размере картинка' onClick={handleClick}/>
            <div className="elements__under-picture">
                <h4 className="elements__text">{props.card.name}</h4>
                <button className="elements__like elements__like_white" type="button">
                    <div className="elements__like-counter">{props.card.likes.length}</div>
                </button>
                <button className='elements__trash' type="button"></button>
            </div>
        </div>
    </template>
    )
}
export default Card;
