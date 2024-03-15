const Transaction = require("../models/transactionModel");

const getIncomeReport = async (userId) => {
  const transactions = await Transaction.find({ user: userId, type: "income" });
  // Logic to generate income report
  return transactions;
};

const getExpenseReport = async (userId) => {
  const transactions = await Transaction.find({
    user: userId,
    type: "expense",
  });
  // Logic to generate expense report
  return transactions;
};

module.exports = { getIncomeReport, getExpenseReport };
