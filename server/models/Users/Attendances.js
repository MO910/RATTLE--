import mongoose from "mongoose";
Schema = mongoose.Schema;
const Attendances = new Schema(
    {
        user_id: mongoose.ObjectId,
        updated_by: mongoose.ObjectId,
        attendance_status: String,
        date: Date,
        note: String,
    },
    { timestamps: true, collection: "Attendances" }
);

export default mongoose.model("Attendances", Attendances);
