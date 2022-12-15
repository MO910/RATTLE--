import mongoose from "mongoose";
Schema = mongoose.Schema;
const Payments = new Schema(
    {
        const_salary_id: mongoose.ObjectId,
        updated_by: mongoose.ObjectId,
        adjustment: Number,
        date: Date,
        note: String,
    },
    { timestamps: true, collection: "Payments" }
);

export default mongoose.model("Payments", Payments);
