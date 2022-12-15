import mongoose from "mongoose";
Schema = mongoose.Schema;
const Courses = new Schema(
    {
        group_id: mongoose.ObjectId,
        title: String,
        description: String,
    },
    { timestamps: true, collection: "Courses" }
);

export default mongoose.model("Courses", Courses);
