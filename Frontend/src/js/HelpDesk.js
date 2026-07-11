import TicketView from './TicketView';
import TicketForm from './TicketForm';
import addIcon from '../img/free-icon-plus-4315609.png';

export default class HelpDesk {
  constructor(container, ticketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.container = container;
    this.ticketService = ticketService;
    this.ticketView = new TicketView();
    this.ticketForm = new TicketForm();
    this.tickets = [];
  }

  init() {
    this.render();
    this.loadTickets();
  }

  render() {
    this.container.innerHTML = `
      <div class="helpdesk-container">
        <h1>📋 HelpDesk</h1>
        <button id="addTicketBtn" class="btn-add">
          <img src="${addIcon}" alt="Добавить" class="icon-btn"> Добавить тикет
        </button>
        <div id="ticketsList" class="tickets-list">
          <p class="loading">Загрузка...</p>
        </div>
      </div>
    `;

    document.getElementById('addTicketBtn').addEventListener('click', () => {
      this.showCreateForm();
    });
  }

  loadTickets() {
    const list = document.getElementById('ticketsList');
    list.innerHTML = '<p class="loading">Загрузка...</p>';

    this.ticketService.list((error, data) => {
      if (error) {
        list.innerHTML = `<p class="error">Ошибка: ${error.message}</p>`;
        return;
      }
      this.tickets = data || [];
      this.renderTickets();
    });
  }

  renderTickets() {
    const list = document.getElementById('ticketsList');
    list.innerHTML = this.ticketView.renderList(this.tickets);

    list.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.closest('.ticket-item').dataset.id;
        this.deleteTicket(id);
      });
    });

    list.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.closest('.ticket-item').dataset.id;
        this.showEditForm(id);
      });
    });

    list.querySelectorAll('.ticket-item .ticket-name').forEach(el => {
      el.addEventListener('click', (e) => {
        const id = e.target.closest('.ticket-item').dataset.id;
        this.showTicketDetails(id);
      });
    });
  }

  showCreateForm() {
    const modal = this.ticketForm.render(null, (data) => {
      this.ticketService.create(data, (error, response) => {
        if (error) {
          alert(`Ошибка: ${error.message}`);
          return;
        }
        modal.remove();
        this.loadTickets();
      });
    });
    document.body.append(modal);
  }

  showEditForm(id) {
    this.ticketService.get(id, (error, ticket) => {
      if (error) {
        alert(`Ошибка: ${error.message}`);
        return;
      }
      const modal = this.ticketForm.render(ticket, (data) => {
        this.ticketService.update(id, data, (error, response) => {
          if (error) {
            alert(`Ошибка: ${error.message}`);
            return;
          }
          modal.remove();
          this.loadTickets();
        });
      });
      document.body.append(modal);
    });
  }

  showTicketDetails(id) {
  this.ticketService.get(id, (error, ticket) => {
    if (error) {
      alert(`Ошибка: ${error.message}`);
      return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h2>${this.ticketView.escapeHtml(ticket.name)}</h2>
        </div>
        <div class="modal-body">
          <p style="font-size: 16px; line-height: 1.6;">
            ${this.ticketView.escapeHtml(ticket.description || 'Нет описания')}
          </p>
          <p style="color: #999; font-size: 14px; margin-top: 15px;">
            Создан: ${new Date(ticket.created).toLocaleString()}
          </p>
          <p style="color: ${ticket.status ? '#4CAF50' : '#FF9800'}; font-size: 14px; margin-top: 5px;">
            ${ticket.status ? 'Выполнен' : 'В ожидании'}
          </p>
        </div>
        <div class="modal-buttons">
          <button type="button" class="btn-cancel">Закрыть</button>
        </div>
      </div>
    `;

    modal.querySelector('.btn-cancel').addEventListener('click', () => {
      modal.remove();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    document.body.append(modal);
  });
}

  deleteTicket(id) {
    if (!confirm('Удалить этот тикет?')) return;

    this.ticketService.delete(id, (error, response) => {
      if (error) {
        alert(`Ошибка: ${error.message}`);
        return;
      }
      this.loadTickets();
    });
  }
}