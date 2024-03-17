const Transaction = require("../models/transactionModel");
const Category = require("../models/categoryModel");
const User = require("../models/userModel");

const addTransaction = async (transactionData, userId) => {
  const categoryExists = await Category.findOne({
    name: transactionData.type,
    items: transactionData.category,
  });
  if (!categoryExists) {
    throw new Error("Invalid category");
  }

  const transaction = new Transaction({
    ...transactionData,
    user: userId,
  });

  await transaction.save();

  await updateBalance(userId, transactionData.amount, transactionData.type);

  return transaction;
};

const getTransactionsByUser = async (userId) => {
  const transactions = await Transaction.find({ user: userId }).populate(
    "category",
    "name"
  );
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

module.exports = { addTransaction, getTransactionsByUser, deleteTransaction };
