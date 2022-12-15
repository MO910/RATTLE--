import mongoose from "mongoose";
Schema = mongoose.Schema;
const Rules = new Schema(
    {
        title: String,
        permissions: String, // encoded like [parent, student, etc]
    },
    { timestamps: true, collection: "Rules" }
);

export default mongoose.model("Rules", Rules);
