import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [newPlace, setNewPlace] = React.useState({
    title: '',
    image: '',
  });

  function handleChangeNewPlace(evt) {
    setNewPlace({
      ...newPlace,
      [evt.target.name]: evt.target.value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onSetIsLoading(true);

    props.onAddPlace({
      name: newPlace.title,
      link: newPlace.image,
    });
  }

  React.useEffect(() => {
    setNewPlace({
      title: '',
      image: '',
    });
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      ariaLabel="Создать карточку"
      buttonText="Создать"
      buttonIsLoadingText="Создание"
      isLoading={props.isLoading}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="card-title"
        name="title"
        className="form__item form__item_name_card-title"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={newPlace.title}
        onChange={handleChangeNewPlace}
        required
      />
      <span className="card-title-error form__item-error"></span>
      <input
        type="url"
        id="card-image"
        name="image"
        className="form__item form__item_name_card-image"
        placeholder="Ссылка на картинку"
        value={newPlace.image}
        onChange={handleChangeNewPlace}
        required
      />
      <span className="card-image-error form__item-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
