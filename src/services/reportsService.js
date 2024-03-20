const Transaction = require("../models/transactionModel");

const getIncomePeriodReport = async (userId) => {
  try {
    const allTransactions = await Transaction.find({
      user: userId,
      type: "income",
    });
    const monthlySum = {};

    allTransactions.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const key = `${year}-${month}`;

      if (monthlySum[key]) {
        monthlySum[key] += item.amount;
      } else {
        monthlySum[key] = item.amount;
      }
    });
    return monthlySum;
  } catch (err) {
    console.log(err.message);
  }
};

const getExpensesPeriodReport = async (userId) => {
  try {
    const allTransactions = await Transaction.find({
      user: userId,
      type: "expenses",
    });
    const monthlySum = {};

    allTransactions.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const key = `${year}-${month}`;

      if (monthlySum[key]) {
        monthlySum[key] += item.amount;
      } else {
        monthlySum[key] = item.amount;
      }
    });
    return monthlySum;
  } catch (err) {
    console.log(err.message);
  }
};
const getExpensesCategoryReport = async (userId) => {
  try {
    const allTransactions = await Transaction.find({
      user: userId,
      type: "expenses",
    });
    const categorySum = {};
    allTransactions.forEach((item) => {
      const category = item.category;

      if (categorySum[category]) {
        categorySum[category] += item.amount;
      } else {
        categorySum[category] = item.amount;
      }
    });
    return categorySum;
  } catch (err) {
    console.log(err.message);
    return {};
  }
};

const getIncomeCategoryReport = async (userId) => {
  try {
    const allTransactions = await Transaction.find({
      user: userId,
      type: "income",
    });
    const categorySum = {};
    allTransactions.forEach((item) => {
      const category = item.category;

      if (categorySum[category]) {
        categorySum[category] += item.amount;
      } else {
        categorySum[category] = item.amount;
      }
    });
    return categorySum;
  } catch (err) {
    console.log(err.message);
    return {};
  }
};

module.exports = {
  getIncomePeriodReport,
  getExpensesPeriodReport,
  getExpensesCategoryReport,
  getIncomeCategoryReport,
};
