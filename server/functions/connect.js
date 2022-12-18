module.exports = (mongoose, MONGO_URL) => {
    mongoose.set("strictQuery", true);
    return mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};
