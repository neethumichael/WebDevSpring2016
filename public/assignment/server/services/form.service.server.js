module.exports = function(app, formModel, userModel) {
    app.get("/api/assignment/user/:userId/form",findAllForms);
    app.get("/api/assignment/form/:formId",findById);
    app.delete("/api/assignment/form/:formId",Delete);
    app.post("/api/assignment/user/:userId/form",Create);
    app.put("/api/assignment/form/:formId",Update);

    function Delete(req,res) {
        var formId = req.params.formId;;
        formModel.Delete(formId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function Update(req,res) {
        var formId = req.params.formId;
        var form = req.body;
        formModel.Update(formId,form)
            .then(
                function (doc) {
                    console.log("doc "+doc);
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllForms(req,res) {
        var userId = req.params.userId;
        formModel.FindAll(userId)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findById(req, res) {
        var formId = req.params.formId;
        formModel.findById(formId)
            .then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function Create(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        formModel.Create(userId,form)
            .then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }
}
