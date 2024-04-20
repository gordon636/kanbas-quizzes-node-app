import * as dao from "./dao.js";

function ModuleRoutes(app) {
    const createModule = async (req, res) => {
        const { cid } = req.params;
        const module = {
            ...req.body,
            course: cid,
        };
        const newModule = await dao.createModule(module);
        res.json(newModule);
    };
    const deleteModule = async (req, res) => {
        const status = await dao.deleteModule(req.params.mid);
        res.json(status);
    };
    const findModulesByCourse = async (req, res) => {
        const { cid } = req.params;
        const modules = await dao.findModulesByCourse(cid);
        res.send(modules);
    };
    const updateModule = async (req, res) => {
        const { mid } = req.params;
        if (mid === undefined) {
            res.status(404).json({ message: `Unable to update module with ID ${mid}` });
            return;
        }
        const status = await dao.updateModule(mid, req.body);
        res.json(status);
    };

    app.post("/api/courses/:cid/modules", createModule);
    app.get("/api/courses/:cid/modules", findModulesByCourse);
    app.put("/api/modules/:mid", updateModule);
    app.delete("/api/modules/:mid", deleteModule);
}
export default ModuleRoutes;