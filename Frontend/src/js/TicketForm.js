import plusIcon from '../img/free-icon-plus-4315609.png';
import pencilIcon from '../img/free-icon-pencil-8528693.png';

export default class TicketForm {
  render(ticket, onSubmit) {
    const isEdit = !!ticket;
    const titleIcon = isEdit 
      ? `<img src="${pencilIcon}" alt="Редактировать" class="icon-header"> Редактировать тикет`
      : `<img src="${plusIcon}" alt="Создать" class="icon-header"> Создать тикет`;
    const name = isEdit ? ticket.name : '';
    const description = isEdit ? ticket.description : '';

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h2>${titleIcon}</h2>
        </div>
        <form class="ticket-form">
          <div class="form-group">
            <label for="ticketName">Название</label>
            <input type="text" id="ticketName" value="${this.escapeHtml(name)}" required />
          </div>
          <div class="form-group">
            <label for="ticketDescription">Описание</label>
            <textarea id="ticketDescription" rows="4">${this.escapeHtml(description)}</textarea>
          </div>
          <div class="modal-buttons">
            <button type="submit" class="btn-save">Сохранить</button>
            <button type="button" class="btn-cancel">Отмена</button>
          </div>
        </form>
      </div>
    `;

    const form = modal.querySelector('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
        name: document.getElementById('ticketName').value,
        description: document.getElementById('ticketDescription').value,
        status: false,
      };
      onSubmit(data);
    });

    modal.querySelector('.btn-cancel').addEventListener('click', () => {
      modal.remove();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    return modal;
  }

  escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}