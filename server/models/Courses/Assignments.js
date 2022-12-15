import mongoose from "mongoose";
Schema = mongoose.Schema;
const Assignments = new Schema(
    {
        subgroup_id: mongoose.ObjectId,
        note: String,
    },
    { timestamps: true, collection: "Assignments" }
);

export default mongoose.model("Assignments", Assignments);
