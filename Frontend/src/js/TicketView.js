import checkIcon from '../img/free-icon-check-1055183.png';
import hourglassIcon from '../img/free-icon-hourglass-483610.png';
import pencilIcon from '../img/free-icon-pencil-8528693.png';
import trashIcon from '../img/free-icon-trash-10715607.png';

export default class TicketView {
  renderTicket(ticket) {
    const status = ticket.status
      ? `<img src="${checkIcon}" alt="Выполнен" class="icon-status">`
      : `<img src="${hourglassIcon}" alt="В ожидании" class="icon-status">`;
    
    const created = new Date(ticket.created).toLocaleString();
    
    return `
      <div class="ticket-item" data-id="${ticket.id}">
        <span class="ticket-status">${status}</span>
        <span class="ticket-name">${this.escapeHtml(ticket.name)}</span>
        <span class="ticket-date">${created}</span>
        <button class="btn-edit">
          <img src="${pencilIcon}" alt="Редактировать" class="icon-btn">
        </button>
        <button class="btn-delete">
          <img src="${trashIcon}" alt="Удалить" class="icon-btn">
        </button>
      </div>
    `;
  }

  renderList(tickets) {
    if (!tickets || tickets.length === 0) {
      return '<p class="empty">Нет тикетов.</p>';
    }
    return tickets.map(t => this.renderTicket(t)).join('');
  }

  escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}