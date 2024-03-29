const Plan = require('../models/planModel');

const registerPlan = async (req, res) => {
  const { planYear, planDocument } = req.body;

  try {
    let plan_number = 1;
    const planOnDb = await Plan.findOne()
      .sort({ createdAt: -1 })
      .select('plan_number');
    if (planOnDb) {
      plan_number = parseInt(planOnDb.plan_number) + 1;
    }
    const newPlan = new Plan({
      planYear,
      planDocument,
      plan_number,
    });

    await newPlan.save();

    await res.status(201).json({
      plan: newPlan._id,
      status: 'success',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPlan = async (req, res) => {
  try {
    const plan = await Plan.find({});
    res.send({ data: plan, status: 'success' });
  } catch (error) {
    res.send({ data: [], status: 'fail' });
  }
};

const updatePlan = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: 'Data to be updated cannot be empty.' });
  }

  const id = req.body.id;
  Plan.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update subject with the id of ${id}. Maybe order not found.`,
          status: 'fail',
        });
      } else {
        res.send({ data, status: 'success' });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message: 'Error updating subject information',
        status: 'fail',
      });
    });
};

const deletePlan = async (req, res) => {};

module.exports = { registerPlan, getPlan, updatePlan, deletePlan };
