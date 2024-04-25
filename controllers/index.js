const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const Records = require('../model/Records');
const _ = require('lodash');

const csvUpload = (req, res) => {
  const fileRows = [];
  fs.createReadStream(path.resolve(req.file.path))
    .pipe(csv.parse({ headers: true }))
    .on('error', (error) => res.status(400).json({ message: `Error parse csv` }))
    .on('data', (row) => {
      const result = _.mapKeys(row, (value, key) => key.toLowerCase());
      fileRows.push(result);
    })
    .on('end', async (rowCount) => {
      await Records.deleteMany();
      Records.insertMany(fileRows)
        .then((r) => res.status(200).json({ message: `Parsed ${rowCount} rows` }))
        .catch((err) => res.status(400).json({ message: `Error parse csv` }));
      fs.unlinkSync(req.file.path);
    });
};

const getData = async (req, res) => {
  const records = await Records.find({});
  res.status(200).json(records);
};

module.exports = {
  csvUpload,
  getData,
};
