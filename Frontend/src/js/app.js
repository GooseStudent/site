import HelpDesk from './HelpDesk';
import TicketService from './TicketService';

const root = document.getElementById('root');

if (!root) {
  console.error('Root element not found');
} else {
  const ticketService = new TicketService();
  const app = new HelpDesk(root, ticketService);
  app.init();
}