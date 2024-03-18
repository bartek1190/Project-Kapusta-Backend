const transactionsService = require("../services/transactionService");
const { validateTransaction } = require("../validators/transactionValidator");
const Transaction = require("../models/transactionModel");

const addIncomeTransaction = async (req, res, next) => {
  try {
    await validateTransaction(req.body);
    const transaction = await transactionsService.addIncomeTransaction(
      req.body,
      req.user.id
    );
    res.status(201).json(transaction);
  } catch (error) {
    if (error.isJoi === true) {
      return res.status(400).json({
        status: "failure",
        code: 400,
        message:
          "Bad request, validation errors: " +
          error.details.map((detail) => detail.message).join(", "),
      });
    } else if (error.name === "UnauthorizedError") {
      return res.status(401).json({
        status: "failure",
        code: 401,
        message: "Unauthorized, token missing or invalid.",
      });
    }
    next(error);
  }
};

const addExpensesTransaction = async (req, res, next) => {
  try {
    await validateTransaction(req.body);
    const transaction = await transactionsService.addExpensesTransaction(
      req.body,
      req.user.id
    );
    res.status(201).json(transaction);
  } catch (error) {
    if (error.isJoi === true) {
      return res.status(400).json({
        status: "failure",
        code: 400,
        message:
          "Bad request, validation errors: " +
          error.details.map((detail) => detail.message).join(", "),
      });
    } else if (error.name === "UnauthorizedError") {
      return res.status(401).json({
        status: "failure",
        code: 401,
        message: "Unauthorized, token missing or invalid.",
      });
    }
    next(error);
  }
};

const getIncomeTransactionsByUser = async (req, res, next) => {
  try {
    const transactions = await transactionsService.getIncomeTransactionsByUser(
      req.user.id
    );
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

const getExpensesTransactionsByUser = async (req, res, next) => {
  try {
    const transactions =
      await transactionsService.getExpensesTransactionsByUser(req.user.id);
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    const transactionId = req.params.id;
    const userId = req.user.id;

    const transaction = await Transaction.findOne({
      _id: transactionId,
      user: userId,
    });
    if (!transaction) {
      return res.status(400).json({
        status: "failure",
        code: 400,
        message:
          "Bad request, invalid transaction ID or transaction does not belong to the user.",
      });
    }

    await Transaction.deleteOne({ _id: transactionId });
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Transaction successfully deleted.",
    });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({
        status: "failure",
        code: 400,
        message: "Bad request, invalid transaction ID format.",
      });
    }
    console.error(error);
    next(error);
  }
};

module.exports = {
  deleteTransaction,
};

module.exports = {
  addIncomeTransaction,
  addExpensesTransaction,
  getIncomeTransactionsByUser,
  getExpensesTransactionsByUser,
  deleteTransaction,
};
