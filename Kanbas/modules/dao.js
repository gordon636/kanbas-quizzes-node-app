import mongoose from "mongoose";
import model from "./model.js";

export const createModule = (module) => {
    module._id = new mongoose.Types.ObjectId()._id;
    return model.create(module);
}
export const findModulesByCourse = (courseId) => model.find({ course: courseId });
export const deleteModule = (moduleId) => model.deleteOne({ _id: moduleId });
export const updateModule = (moduleId, module) => model.updateOne({ _id: moduleId }, { $set: module });
