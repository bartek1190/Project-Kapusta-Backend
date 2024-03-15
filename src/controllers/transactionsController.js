const transactionsService = require("../services/transactionService");

const addTransaction = async (req, res, next) => {
  try {
    const transaction = await transactionsService.addTransaction(
      req.body,
      req.user.id
    );
    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

const getTransactionsByUser = async (req, res, next) => {
  try {
    const transactions = await transactionsService.getTransactionsByUser(
      req.user.id
    );
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

module.exports = { addTransaction, getTransactionsByUser };