import mongoose from "mongoose";
Schema = mongoose.Schema;
const Organizations = new Schema(
    {
        owner_id: mongoose.ObjectId,
        title: String,
        description: String,
    },
    { timestamps: true, collection: "Organizations" }
);

export default mongoose.model("Organizations", Organizations);
