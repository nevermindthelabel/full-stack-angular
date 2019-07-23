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

app.use('/', router);

app.listen(PORT, () => console.log(`🏃‍  on http://localhost:${PORT}`));
