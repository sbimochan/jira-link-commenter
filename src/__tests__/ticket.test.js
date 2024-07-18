const grabTicket = require("../ticket").grabTicket;
const ticketRegex = require("../ticket").DEFAULT_TICKET_REGEX;

describe("grabTicket", () => {
  it("should return ticket id without colon", () => {
    const title = "ABC-123: New Feature";
    const result = grabTicket(title, ticketRegex);

    expect(result).toBe("ABC-123");
  });

  it("should return ticket id without colon even with long digits", () => {
    const title = "ABC-12345678: New Feature";
    const result = grabTicket(title, ticketRegex);

    expect(result).toBe("ABC-12345678");
  });

  it("should return ticket id without colon even with long digits and long name", () => {
    const title = "ABCDEFGH-12345678: New Feature";
    const result = grabTicket(title, ticketRegex);

    expect(result).toBe("ABCDEFGH-12345678");
  });

  it("should return not return ticket without colon", () => {
    const title = "ABCDEFGH-12345678 New Feature";
    const result = grabTicket(title, ticketRegex);

    expect(result).toBeNull();
  });

  it("should return null if no ticket id is found", () => {
    const title = "No ticket id here";
    const result = grabTicket(title, ticketRegex);

    expect(result).toBeNull();
  });

  it("should return ticket id without colon even if it is in the middle of the title", () => {
    const title = "This is my ticket id ABC-123: in the middle";
    const result = grabTicket(title, ticketRegex);

    expect(result).toBeNull();
  });
});

describe("grabTicket by custom regex", () => {
  it("should return ticket id with colon", () => {
    const title = "XYZ-3412: This title is with colon";
    const result = grabTicket(title, /^[A-Z,a-z]{2,}-\d{1,}:/g);
    const expectedResult = "XYZ-3412:";

    expect(result).toBe(expectedResult);
  });
  it("should return ticket id without colon", () => {
    const title = "XYZ-3412 This title is with colon";
    const result = grabTicket(title, /^[A-Z,a-z]{2,}-\d{1,}/g);
    const expectedResult = "XYZ-3412";

    expect(result).toBe(expectedResult);
  });

  it("should only take the fist hyphened word", () => {
    const title = "XYZ-3412 ABC-3124 This title is with colon";
    const result = grabTicket(title, /^[A-Z,a-z]{2,}-\d{1,}/g);
    const expectedResult = "XYZ-3412";

    expect(result).toBe(expectedResult);
  });
});
