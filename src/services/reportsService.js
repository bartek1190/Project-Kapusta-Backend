const Transaction = require("../models/transactionModel");

const getIncomeReport = async (userId) => {
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

const getExpenseReport = async (userId) => {
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

module.exports = { getIncomeReport, getExpenseReport };
