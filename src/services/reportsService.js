const Transaction = require("../models/transactionModel");

const getIncomeReport = async (userId) => {
  try {
    const incomeReport = await Transaction.aggregate([
      { $match: { user: userId, type: "income" } },
      {
        $group: {
          _id: "$category", // Grupowanie według kategorii
          totalAmount: { $sum: "$amount" }, // Sumowanie kwot
          count: { $sum: 1 }, // Liczenie ilości transakcji
        },
      },
      { $sort: { totalAmount: -1 } }, // Sortowanie od największej sumy
    ]);
    return incomeReport;
  } catch (error) {
    throw new Error(
      "Błąd podczas agregacji raportu przychodów: " + error.message
    );
  }
};

const getExpenseReport = async (userId) => {
  try {
    const expenseReport = await Transaction.aggregate([
      { $match: { user: userId, type: "expense" } },
      {
        $group: {
          _id: "$category", // Grupowanie według kategorii
          totalAmount: { $sum: "$amount" }, // Sumowanie kwot
          count: { $sum: 1 }, // Liczenie ilości transakcji
        },
      },
      { $sort: { totalAmount: -1 } }, // Sortowanie od największej sumy
    ]);
    return expenseReport;
  } catch (error) {
    throw new Error(
      "Błąd podczas agregacji raportu wydatków: " + error.message
    );
  }
};

module.exports = { getIncomeReport, getExpenseReport };
