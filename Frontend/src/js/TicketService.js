export default class TicketService {
  constructor() {
    this.baseUrl = 'https://site-jni4.onrender.com'; 
  }

  list(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${this.baseUrl}/?method=allTickets`);
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          callback(null, data);
        } catch (e) {
          callback(e, null);
        }
      } else {
        callback(new Error(`Ошибка: ${xhr.status}`), null);
      }
    });
    xhr.addEventListener('error', () => {
      callback(new Error('Ошибка сети'), null);
    });
    xhr.send();
  }

  get(id, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${this.baseUrl}/?method=ticketById&id=${id}`);
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          callback(null, data);
        } catch (e) {
          callback(e, null);
        }
      } else {
        callback(new Error(`Ошибка: ${xhr.status}`), null);
      }
    });
    xhr.addEventListener('error', () => {
      callback(new Error('Ошибка сети'), null);
    });
    xhr.send();
  }

  create(data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${this.baseUrl}/?method=createTicket`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          callback(null, response);
        } catch (e) {
          callback(e, null);
        }
      } else {
        callback(new Error(`Ошибка: ${xhr.status}`), null);
      }
    });
    xhr.addEventListener('error', () => {
      callback(new Error('Ошибка сети'), null);
    });
    xhr.send(JSON.stringify(data));
  }

  update(id, data, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${this.baseUrl}/?method=updateById&id=${id}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          callback(null, response);
        } catch (e) {
          callback(e, null);
        }
      } else {
        callback(new Error(`Ошибка: ${xhr.status}`), null);
      }
    });
    xhr.addEventListener('error', () => {
      callback(new Error('Ошибка сети'), null);
    });
    xhr.send(JSON.stringify(data));
  }

  delete(id, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${this.baseUrl}/?method=deleteById&id=${id}`);
    xhr.addEventListener('load', () => {
      if (xhr.status === 204) {
        callback(null, null);
      } else if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          callback(null, data);
        } catch (e) {
          callback(e, null);
        }
      } else {
        callback(new Error(`Ошибка: ${xhr.status}`), null);
      }
    });
    xhr.addEventListener('error', () => {
      callback(new Error('Ошибка сети'), null);
    });
    xhr.send();
  }
}