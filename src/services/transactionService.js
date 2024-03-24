const Transaction = require("../models/transactionModel");
const Category = require("../models/categoryModel");
const User = require("../models/userModel");

const addIncomeTransaction = async (transactionData, userId) => {
  if (!transactionData.category) {
    throw new Error("Category is required for income transaction");
  }
  const category = await Category.findOne({ name: "income" }).exec();
  if (!category || !category.items.includes(transactionData.category)) {
    throw new Error("Invalid income category");
  }
  const transaction = new Transaction({
    ...transactionData,
    type: "income",
    user: userId,
  });

  await transaction.save();

  await updateBalance(userId, transactionData.amount, "income");

  return transaction;
};

const addExpensesTransaction = async (transactionData, userId) => {
  if (!transactionData.category) {
    throw new Error("Category is required for expenses transaction");
  }
  const category = await Category.findOne({ name: "expenses" }).exec();
  if (!category || !category.items.includes(transactionData.category)) {
    throw new Error("Invalid expenses category");
  }

  const transaction = new Transaction({
    ...transactionData,
    type: "expenses",
    user: userId,
  });

  await transaction.save();

  await updateBalance(userId, transactionData.amount, "expenses");

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
  if (!transaction) {
    return 400;
  }
  await Transaction.deleteOne({ _id: transactionId });
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
  addIncomeTransaction,
  addExpensesTransaction,
  getIncomeTransactionsByUser,
  getExpensesTransactionsByUser,
  deleteTransaction,
};
