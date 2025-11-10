const DEFAULT_TICKET_REGEX = /^[A-Z,a-z]{2,}-\d{1,}(?=:)/g;

/**
 * Searches with first Ticket id like ABC-123 only. No colon.
 *
 * @param {string} title
 */
function grabTicket(title, ticketRegex) {
  const matches = title.match(ticketRegex);
  if (!matches || matches.length === 0) {
    return null;
  }

  // Get the longest match to ensure we match the complete ticket number
  // This prevents partial matches like ABC-12 from ABC-128
  const ticketId = matches.reduce((longest, current) => {
    return current.length > longest.length ? current : longest;
  }, matches[0]);

  return ticketId;
}

module.exports = { grabTicket, DEFAULT_TICKET_REGEX };
