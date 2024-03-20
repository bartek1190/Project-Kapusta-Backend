const reportsService = require("../services/reportsService");

const getIncomePeriodReport = async (req, res, next) => {
  try {
    const report = await reportsService.getIncomePeriodReport(req.user.id);
    res.status(200).json({
      status: "success",
      code: 200,
      report,
    });
  } catch (error) {
    next(error);
  }
};

const getExpensesPeriodReport = async (req, res, next) => {
  try {
    const report = await reportsService.getExpensesPeriodReport(req.user.id);
    res.status(200).json({
      status: "success",
      code: 200,
      report,
    });
  } catch (error) {
    next(error);
  }
};

const getIncomeCategoryReport = async (req, res, next) => {
  try {
    const report = await reportsService.getIncomeCategoryReport(req.user.id);
    res.status(200).json({
      status: "success",
      code: 200,
      report,
    });
  } catch (error) {
    next(error);
  }
};

const getExpensesCategoryReport = async (req, res, next) => {
  try {
    const report = await reportsService.getExpensesCategoryReport(req.user.id);
    res.status(200).json({
      status: "success",
      code: 200,
      report,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getIncomePeriodReport,
  getExpensesPeriodReport,
  getExpensesCategoryReport,
  getIncomeCategoryReport,
};
