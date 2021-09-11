import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {
  function handleSubmit(evt) {
    evt.preventDefault();

    props.onSetIsLoading(true);

    props.onDeleteCard(props.card);
  }

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      ariaLabel="Удалить карточку"
      buttonText="Да"
      buttonIsLoadingText="Удаление"
      isLoading={props.isLoading}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default DeleteCardPopup;
