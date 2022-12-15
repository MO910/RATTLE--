import mongoose from "mongoose";
Schema = mongoose.Schema;
const Const_Salaries = new Schema(
    {
        staff_member_id: mongoose.ObjectId,
        amount: Number,
        note: String,
    },
    { timestamps: true, collection: "Const_Salaries" }
);

export default mongoose.model("Const_Salaries", Const_Salaries);
