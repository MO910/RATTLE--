import mongoose from "mongoose";
Schema = mongoose.Schema;
const Groups = new Schema(
    {
        admin_id: mongoose.ObjectId,
        center_id: mongoose.ObjectId,
        teacher_ids: Array,
        title: String,
        working_days: Array,
        description: String,
    },
    { timestamps: true, collection: "Groups" }
);

export default mongoose.model("Groups", Groups);
