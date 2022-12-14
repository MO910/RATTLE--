import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Subgroups = new Schema(
    {
        title: String,
        course_id: mongoose.ObjectId,
        student_ids: Array,
    },
    { timestamps: true, collection: "Subgroups" }
);

export default mongoose.model("Subgroups", Subgroups);
