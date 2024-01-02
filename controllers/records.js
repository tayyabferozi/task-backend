const Record = require("../models/record");

exports.getAllRecords = async (req, res) => {
  try {
    const records = await Record.find();

    res.json({ success: true, records });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "Something went wrong! Please try again later",
    });
  }
};

exports.getSingleRecord = async (req, res) => {
  const { id } = req.params;

  try {
    const record = await Record.findById(id);

    if (!record)
      return res.status(404).json({ success: false, msg: "Record not found" });

    res.json({ success: true, record });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "Something went wrong! Please try again later",
    });
  }
};

exports.updateRecord = async (req, res) => {
  const { id } = req.params;

  const { name, sectors } = req.body;

  try {
    const record = await Record.findById(id);

    if (!record)
      return res.status(404).json({ success: false, msg: "Record not found" });

    record.name = name;
    record.sectors = sectors;

    const updatedRecord = await record.save();

    res.json({
      success: true,
      msg: "Record updated successfully!",
      record: updatedRecord,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "Something went wrong! Please try again later",
    });
  }
};

exports.addRecord = async (req, res) => {
  const { name, sectors } = req.body;

  try {
    const newRecord = await Record.create({
      name,
      sectors,
    });

    res.json({
      success: true,
      msg: "Record added successfully!",
      record: newRecord,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "Something went wrong! Please try again later",
    });
  }
};
