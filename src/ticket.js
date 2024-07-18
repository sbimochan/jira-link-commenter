const DEFAULT_TICKET_REGEX = /^[A-Z,a-z]{2,}-\d{1,}(?=:)/g;

/**
 * Searches with first Ticket id like ABC-123 only. No colon.
 *
 * @param {string} title
 */
function grabTicket(title, ticketRegex) {
  const ticketId = title.match(ticketRegex)?.[0];
  if (!ticketId) {
    return null;
  }

  return ticketId;
}

module.exports = { grabTicket, DEFAULT_TICKET_REGEX };
