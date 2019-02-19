const express = require('express');
const renderVM = require('./vm');

const app = express();

app.use('/', (req, res) => {
  res.send(renderVM({
    type: req.query.type || 'cjs',
  }));
});

app.listen(process.env.PORT, () => {
  console.info(`Fake server is running on port ${process.env.PORT}`);
});
