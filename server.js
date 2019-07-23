import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import Issue from './models/Issue';

const PORT = process.env.PORT || 3000;

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost/MEANstack', { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', () => console.log('DB connected'));

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
      res.status(200).json({ success: 'issue added successfully' });
    })
    .catch(err => {
      res.status(400).send('Issue adding your issue', err);
    });
});

router.route('/issues/update/:id').post((req, res) => {
  Issue.findById(req.params.id, (err, issue) => {
    if (err) {
      res.json(err);
    } else if (!issue) {
      res.status(500).send('issue not found');
    } else {
      res.status(200);
      issue.title = req.body.title;
      issue.respondible = req.body.responsible;
      issue.description = req.body.description;
      issue.severity = req.body.severity;
      issue.status = req.body.status;

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
      res.json(err);
    } else {
      res.status(200);
      res.json(issue, 'successful');
    }
  });
});

app.use('/', router);

app.listen(PORT, () => console.log(`🏃‍  on http://localhost:${PORT}`));
