const router = require('express').Router();
const Issue = require('../models/Issue');


router.route('/issues').get((req, res) => {
  Issue.find((err, issues) => {
    if (err) {
      console.error(err);
    } else {
      res.json(issues);
    }
  });
});

router.route('/issues/:id').get((req, res) => {
  Issue.findById(req.params.id, (err, issue) => {
    if (err) {
      console.error(err);
    } else {
      res.json(issue);
    }
  });
});

router.route('/issues/add').post((req, res) => {
  const issue = new Issue(req.body);
  issue
    .save()
    .then(issue => {
      console.log(issue);
      console.log(req.body);
      res.status(200).json({ success: 'issue added successfully' });
    })
    .catch(err => {
      res.status(400).send('Issue adding your issue');
      console.error(err);
    });
});

router.route('/issues/update/:id').put((req, res) => {
  Issue.findById(req.params.id, (err, issue) => {
    if (err) {
      res.json(err);
    } else if (!issue) {
      res.status(500).send('issue not found');
    } else {
      res.status(200);

      const { title, responsible, description, severity, status } = req.body;

      issue.title = title;
      issue.respondible = responsible;
      issue.description = description;
      issue.severity = severity;
      issue.status = status;

      issue
        .save()
        .then(() => res.json('Updated'))
        .catch(() => {
          res.staus(400).send('unable to process request');
        });
    }
  });
});

router.route('/issues/delete/:id').delete((req, res) => {
  Issue.findByIdAndRemove({ _id: req.params.id }, (err, issue) => {
    if (err) {
      console.error(err);
    } else {
      res.status(204).send(`${issue.title} removed successfully`);
    }
  });
});

module.exports = router;
