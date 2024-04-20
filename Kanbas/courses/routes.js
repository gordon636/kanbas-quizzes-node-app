import * as dao from "./dao.js";

export default function CourseRoutes(app) {
    const createCourse = async (req, res) => {
        const course = await dao.createCourse(req.body);
        res.json(course);
    };
    const deleteCourse = async (req, res) => {
        const { id } = req.params;
        if (!id) {
            res.status(404)
                .json({ message: `Unable to delete course with ID ${id}` });
            return;
        }
        const status = await dao.deleteCourse(id);
        res.json(status);
    };
    const findAllCourses = async (req, res) => {
        const courses = await dao.findAllCourses();
        res.json(courses);
    };
    const findCourseById = async (req, res) => {
        const course = await dao.findCourseById(req.params.id);
        res.json(course);
    };
    const updateCourse = async (req, res) => {
        const { id } = req.params;
        if (!id) {
            res.status(404)
                .json({ message: `Unable to update course with ID ${id}` });
            return;
        }
        const status = await dao.updateCourse(id, req.body);
        res.json(status);
    };

    app.post("/api/courses", createCourse);
    app.get("/api/courses", findAllCourses);
    app.get("/api/courses/:id", findCourseById);
    app.put("/api/courses/:id", updateCourse);
    app.delete("/api/courses/:id", deleteCourse);
}


