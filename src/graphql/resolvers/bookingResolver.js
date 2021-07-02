const { Booking } = require("../../models");

module.exports = {
  bookings: async function () {
    try {
      const bookings = await Booking.find().populate("user").populate("event");
      const e = bookings.map((b) => {
        return { ...b._doc };
      });
      console.log("e", e);
      return bookings;
    } catch (error) {
      throw error;
    }
  },

  bookEvent: async function ({ event }) {
    try {
      const user = "60df1e2f6016015487c11df7";
      const booking = await Booking.create({ user, event });
      return booking;
    } catch (error) {
      throw error;
    }
  },

  cancelBooking: async function ({ bookingId }) {
    try {
      const event = await Booking.findById(bookingId).populate("event");
      await Booking.deleteOne({ _id: bookingId });
      return event.event;
    } catch (error) {
      throw error;
    }
  },
};
