const Category = require("../models/categoryModel");

const getIncomeCategories = async () => {
  try {
    const categories = await Category.findOne({
      name: "income",
    });
    return categories;
  } catch (err) {
    console.log(err.message);
  }
};

const getExpensesCategories = async () => {
  try {
    const categories = await Category.findOne({
      name: "expenses",
    });
    return categories;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getIncomeCategories,
  getExpensesCategories,
};
