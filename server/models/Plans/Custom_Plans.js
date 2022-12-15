import mongoose from "mongoose";
Schema = mongoose.Schema;
const Custom_Plans = new Schema(
    {
        plan_id: mongoose.ObjectId,
        from: String,
        to: String,

        date: Date,
        note: String,
    },
    { timestamps: true, collection: "Custom_Plans" }
);

export default mongoose.model("Custom_Plans", Custom_Plans);
