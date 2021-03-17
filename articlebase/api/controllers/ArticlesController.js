/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: function (req, res) {
    Articles.find({}).exec(function (err, articles) {
      if (err) {
        res.send(500, { error: "DataBase Error" });
      }
      res.view("list", { articles: articles });
    });
  },
  add: function (req, res) {
    res.view("add");
  },
  create: function (req, res) {
    var title = req.body.title;
    var body = req.body.body;

    Articles.create({ title: title, body: body }).exec(function (err) {
      if (err) {
        res.send(500, { error: "Database Error" });
      }

      res.redirect("/articles/list");
    });
  },
  destroy: function (req, res) {
    var id = req.param("id");
    if (!id) return res.send("No id specified.", 500);

    Articles.find(id, function foundArticle(err, article) {
      if (err) return res.send(err, 500);
      if (!article) return res.send("No Article with that idid exists.", 404);

      Articles.destroy(id, function articleDestroyed(err) {
        if (err) return res.send(err, 500);

        return res.redirect("/articles/list");
      });
    });
  },
  edit: function (req, res) {
    Articles.findOne({ id: req.params.id }).exec(function (err, article) {
      if (err) {
        res.send(500, { error: "Database Error" });
      }
      res.view("edit", { article: article });
    });
  },
  update: function (req, res) {
    var title = req.body.title;
    var body = req.body.body;

    Articles.update({ id: req.params.id }, { title: title, body: body }).exec(
      function (err) {
        if (err) {
          res.send(500, { error: "Database Error" });
        }

        res.redirect("/articles/list");
      }
    );
    return false;
  },
};
