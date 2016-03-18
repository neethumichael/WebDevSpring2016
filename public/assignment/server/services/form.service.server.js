module.exports = function(app, formModel, userModel) {
    app.get("/api/assignment/user/:userId/form",findAllForms);
    app.get("/api/assignment/form/:formId",findById);
    app.delete("/api/assignment/form/:formId",Delete);
    app.post("/api/assignment/user/:userId/form",Create);
    app.put("/api/assignment/form/:formId",Update);

    function Delete(req,res) {
        var formId = req.params.formId;;
        var forms = formModel.Delete(formId);
        res.json(forms);
    }

    function Update(req,res) {
        var formId = req.params.formId;
        var form = req.body;
        form = formModel.Update(formId,form);
        res.json(form);
    }

    function findAllForms(req,res) {
        var userId = req.params.userId;
        var forms =  formModel.FindAll(userId);
        res.json(forms);
    }

    function findById(req, res) {
        var formId = req.params.formId;
        var form = formModel.findById(formId);
        res.json(form);
    }

    function Create(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        form = formModel.Create(userId,form);
        res.json(form);
    }
}
