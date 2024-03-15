const Transaction = require("../models/transactionModel");
const Category = require("../models/categoryModel");

const addTransaction = async (transactionData, userId) => {
  // Weryfikacja czy podana kategoria istnieje w bazie danych
  const categoryExists = await Category.findOne({
    "items.id": transactionData.category,
    name: transactionData.type === "income" ? "income" : "expenses", // Zakładając, że 'type' to 'income' lub 'expense'
  });

  if (!categoryExists) {
    throw new Error("Invalid category");
  }

  // Utworzenie i zapisanie nowej transakcji
  const transaction = new Transaction({
    ...transactionData,
    user: userId, // Dodanie identyfikatora użytkownika do transakcji
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
