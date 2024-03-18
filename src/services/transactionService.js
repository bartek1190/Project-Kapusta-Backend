const Transaction = require("../models/transactionModel");
const Category = require("../models/categoryModel");
const User = require("../models/userModel");

const addTransaction = async (transactionData, userId) => {
  // Sprawdzanie, czy przekazany typ transakcji odpowiada jednej z kategorii
  if (!["income", "expenses"].includes(transactionData.type)) {
    throw new Error("Invalid transaction type");
  }

  // Utworzenie nowej transakcji, zakładając że pole 'type' odpowiada kategorii
  const transaction = new Transaction({
    ...transactionData,
    user: userId,
  });

  await transaction.save();

  // Opcjonalnie: aktualizacja bilansu użytkownika
  await updateBalance(userId, transactionData.amount, transactionData.type);

  return transaction;
};

const getIncomeTransactionsByUser = async (userId) => {
  const transactions = await Transaction.find({
    user: userId,
    type: "income",
  }).populate("category", "name");
  return transactions;
};
const getExpensesTransactionsByUser = async (userId) => {
  const transactions = await Transaction.find({
    user: userId,
    type: "expenses",
  }).populate("category", "name");
  return transactions;
};

const deleteTransaction = async (transactionId, userId) => {
  const transaction = await Transaction.findOne({ _id: transactionId });
  await Transaction.findOneAndDelete({ _id: transactionId });
  await updateBalance(
    userId,
    parseFloat(-transaction.amount),
    transaction.type
  );
};

const updateBalance = async (userId, amount, type) => {
  const user = await User.findOne({ _id: userId });
  const previousUserBalance = user.balance;
  let currentUserBalance;
  if (type === "income") {
    currentUserBalance = parseFloat(previousUserBalance) + parseFloat(amount);
  } else {
    currentUserBalance = parseFloat(previousUserBalance) - parseFloat(amount);
  }
  await User.findOneAndUpdate(
    { _id: userId },
    { $set: { balance: currentUserBalance } }
  );
};

module.exports = {
  addTransaction,
  getIncomeTransactionsByUser,
  getExpensesTransactionsByUser,
  deleteTransaction,
};
