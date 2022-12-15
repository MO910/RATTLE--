import mongoose from "mongoose";
Schema = mongoose.Schema;
const Fees = new Schema(
    {
        student_id: mongoose.ObjectId,
        updated_by: mongoose.ObjectId,
        amount: Number,
        date: Date,
        note: String,
    },
    { timestamps: true, collection: "Fees" }
);

export default mongoose.model("Fees", Fees);
