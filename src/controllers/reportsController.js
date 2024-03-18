const reportsService = require("../services/reportsService");

const getIncomeReport = async (req, res, next) => {
  try {
    const report = await reportsService.getIncomeReport(req.user.id);
    res.status(200).json({
      status: "success",
      code: 200,
      report,
    });
  } catch (error) {
    next(error);
  }
};

const getExpenseReport = async (req, res, next) => {
  try {
    const report = await reportsService.getExpenseReport(req.user.id);
    res.status(200).json({
      status: "success",
      code: 200,
      report,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getIncomeReport, getExpenseReport };
