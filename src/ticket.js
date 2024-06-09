const DEFAULT_TICKET_REGEX = /^[A-Z,a-z]{2,}-\d{1,}:/g;

/**
 * Searches with first Ticket like structure with colon and later removes it.
 *
 * @param {string} title
 */
function grabTicket(title, ticketRegex) {
  const ticketIdWithColon = title.match(ticketRegex)?.[0];
  if (!ticketIdWithColon) {
    return null;
  }

  return ticketIdWithColon.slice(0, -1);
}

module.exports = { grabTicket, DEFAULT_TICKET_REGEX }
