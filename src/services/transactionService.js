const Transaction = require("../models/transactionModel");
const Category = require("../models/categoryModel");

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

  // Aktualizacja salda użytkownika po dodaniu transakcji może być obsłużona tutaj lub w osobnej funkcji

  return transaction;
};

const getTransactionsByUser = async (userId) => {
  const transactions = await Transaction.find({ user: userId }).populate(
    "category",
    "name"
  );
  return transactions;
};

// Przykładowa implementacja aktualizacji salda użytkownika (opcjonalnie)
const updateBalance = async (userId, amount, type) => {
  // Logika aktualizacji salda użytkownika
  // Ta część wymaga dodatkowej implementacji
};

module.exports = { addTransaction, getTransactionsByUser };
