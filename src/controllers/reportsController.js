const reportsService = require("../services/reportsService");

const getIncomeReport = async (req, res, next) => {
  try {
    const report = await reportsService.getIncomeReport(req.user.id);
    console.log(report);
    res.json(report);
  } catch (error) {
    next(error);
  }
};

const getExpenseReport = async (req, res, next) => {
  try {
    const report = await reportsService.getExpenseReport(req.user.id);
    res.json(report);
  } catch (error) {
    next(error);
  }
};

module.exports = { getIncomeReport, getExpenseReport };
