const { Event, User } = require("../../models");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find().populate("creator");
      return events.map((e) => {
        return { ...e._doc, date: new Date(e._doc.date).toISOString() };
      });
    } catch (error) {
      throw error;
    }
  },
  createEvent: async (args) => {
    const { eventInput } = args;
    const eventPayload = {
      title: eventInput.title,
      description: eventInput.description,
      price: +eventInput.price,
      date: new Date(),
      creator: "60df1e2f6016015487c11df7",
    };

    try {
      const event = await Event.create({ ...eventPayload });
      const user = await User.findById("60df1e2f6016015487c11df7");
      if (user) {
        user.createdEVents.push(event);
        user.save();
      }
      return { ...event._doc, creator: user };
    } catch (error) {
      throw error;
    }
  },
};
