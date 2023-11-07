'use client'
'use client';
import TarjetasApi from "../api_fronted/tarjetas";
import React, { useState, useEffect } from "react";
import NavBar from "@/Components/NavBar";
import "./finances.css"; // Importar el archivo CSS
import CardSelect from "@/Components/CardSelect.jsx";
import TotalIncomes from "@/Components/TotalIncomes.jsx";
import TotalExpensesByCategory from "@/Components/TotalExpensesByCategory.jsx";
import RecentExpensesList from "@/Components/RecentExpensesList.jsx";
import RecentIncomesList from "@/Components/RecentIncomesList.jsx";
import SpendingAndSavings from "@/Components/SpendingAndSavings.jsx";
import ExpenseForm from "@/Components/ExpenseForm.jsx";
import IncomeForm from "@/Components/IncomeForm.jsx";
import CategoryForm from "@/Components/CategoryForm.jsx";

const Finances = () => {
  const [selectedCard, setSelectedCard] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("currentUser")) || { cards: [] });
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalExpensesByCategory, setTotalExpensesByCategory] = useState({});
  const [recentIncomes, setRecentIncomes] = useState([]);
  const [newExpense, setNewExpense] = useState(0);
  const [expenseCategory, setExpenseCategory] = useState("");
  const [newIncome, setNewIncome] = useState(0);
  const [newCategory, setNewCategory] = useState("");
  const [spendingLimit, setSpendingLimit] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [warning, setWarning] = useState("");
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [currentIncomesAndExpenses, setCurrentIncomesAndExpenses] = useState({
    incomes: [],
    expenses: [],
  });
  const [listcards, setListCards] = useState([]);
  const [sesion , setSesion] = useState({});
  const LoadData = async() =>{
    const result = await TarjetasApi.findAll();
    setListCards(result.data)
  }
  const handleOnLoad = () => {

    let sesionGuardada = localStorage.getItem("sesion");
    setSesion(JSON.parse(sesionGuardada))
    console.log(sesion.id)
               
} 
  useEffect(() => {

    handleOnLoad();
    LoadData()
    //tarjetaLocal();
        
  }, []);
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getCurrentIncomesAndExpenses = () => {
    if (selectedCard) {
      const card = user.cards.find((card) => card.number === selectedCard);
      if (card) {
        return {
          incomes: card.incomes || [],
          expenses: card.expenses || [],
        };
      }
      return { incomes: [], expenses: [] };
    }
    return { incomes: [], expenses: [] };
  };

  useEffect(() => {
    setCurrentIncomesAndExpenses(getCurrentIncomesAndExpenses());
  }, [selectedCard, user]);

  useEffect(() => {
    calculateTotals();
    checkSpendingLimit();
  }, [currentIncomesAndExpenses]);

  const checkSpendingLimit = () => {
    if (selectedCard && spendingLimit > 0) {
      const currentExpenses = currentIncomesAndExpenses.expenses;
      const totalExpensesAmount = currentExpenses.reduce(
        (total, expense) => total + expense.amount,
        0
      );

      if (totalExpensesAmount > spendingLimit) {
        setWarning("Has superado tu límite de gasto.");
      } else if (totalExpensesAmount >= spendingLimit * 0.8) {
        setWarning("Ten cuidado, estás cerca de llegar a tu límite.");
      } else {
        setWarning("");
      }
    }
  };

  const handleSelectedCardChange = (event) => {
    setSelectedCard(event.target.value);
    const selectedCardData = user.cards.find((card) => card.number === event.target.value);
    if (selectedCardData) {
      setSpendingLimit(selectedCardData.spendingLimit || 0);
      setSavingsGoal(selectedCardData.savingsGoal || 0);
    }
  };

  const addNewExpense = () => {
    if (newExpense > 0 && selectedCard && expenseCategory) {
      const updatedUser = { ...user };
      const updatedUserCards = updatedUser.cards;
      const cardIndex = updatedUserCards.findIndex((card) => card.number === selectedCard);

      if (cardIndex !== -1) {
        const card = updatedUserCards[cardIndex];
        const expenseId = card.expenses.length + 1;
        if (card.spendingLimit && totalExpensesByCategory[expenseCategory]) {
          const categoryExpenses = totalExpensesByCategory[expenseCategory] + newExpense;
          if (categoryExpenses > card.spendingLimit) {
            setWarning("Has superado tu límite de gasto.");
            return;
          }
        }
        card.expenses = [
          ...card.expenses,
          { id: expenseId, amount: newExpense, category: expenseCategory },
        ];

        // Guardar la tarjeta actualizada en la lista de tarjetas del usuario
        updatedUserCards[cardIndex] = card;

        // Actualizar el objeto de usuario actual
        setUser(updatedUser);

        // Guardar el usuario actualizado en el almacenamiento local
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        setCurrentIncomesAndExpenses(getCurrentIncomesAndExpenses());
        setNewExpense(0);
        setExpenseCategory("");
        setWarning("");
      }
    }
  };

  const addNewIncome = () => {
    if (newIncome > 0 && selectedCard) {
      const updatedUser = { ...user };
      const updatedUserCards = updatedUser.cards;
      const cardIndex = updatedUserCards.findIndex((card) => card.number === selectedCard);

      if (cardIndex !== -1) {
        const card = updatedUserCards[cardIndex];
        const incomeId = card.incomes.length + 1;
        card.incomes = [
          ...card.incomes,
          { id: incomeId, amount: newIncome },
        ];

        // Guardar la tarjeta actualizada en la lista de tarjetas del usuario
        updatedUserCards[cardIndex] = card;

        // Actualizar el objeto de usuario actual
        setUser(updatedUser);

        // Guardar el usuario actualizado en el almacenamiento local
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        setCurrentIncomesAndExpenses(getCurrentIncomesAndExpenses());
        setNewIncome(0);
      }
    }
  };
  const addNewCategory = () => {
    if (newCategory && user) {
      // Clona el objeto de usuario para realizar modificaciones
      const updatedUser = { ...user };
  
      // Verifica si el usuario ya tiene una propiedad "categories" en su objeto
      if (!updatedUser.categories) {
        updatedUser.categories = [newCategory];
      } else {
        updatedUser.categories = [...updatedUser.categories, newCategory];
      }
  
      // Actualiza la información del usuario en el estado
      setUser(updatedUser);
  
      // Actualiza el usuario en el almacenamiento local
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  
      // Limpia el campo de nueva categoría
      setNewCategory("");
    }
  };
  

  const calculateTotals = () => {
    const incomes = currentIncomesAndExpenses.incomes;
    const expenses = currentIncomesAndExpenses.expenses;

    const totalIncomeAmount = incomes.reduce((total, income) => total + income.amount, 0);
    setTotalIncomes(totalIncomeAmount);

    const expensesByCategory = {};
    expenses.forEach((expense) => {
      const category = expense.category;
      if (category in expensesByCategory) {
        expensesByCategory[category] += expense.amount;
      } else {
        expensesByCategory[category] = expense.amount;
      }
    });

    setTotalExpensesByCategory(expensesByCategory);

    // Mostrar solo los 3 últimos ingresos y gastos
    const sortedIncomes = incomes.slice().sort((a, b) => b.id - a.id);
    const sortedExpenses = expenses.slice().sort((a, b) => b.id - a.id);

    setRecentIncomes(sortedIncomes.slice(0, 3));
    setRecentExpenses(sortedExpenses.slice(0, 3));
  };

  const handleSpendingLimitChange = (event) => {
    const newLimit = parseFloat(event.target.value);
    setSpendingLimit(newLimit);
    updateCardData({ spendingLimit: newLimit });
  };

  const handleSavingsGoalChange = (event) => {
    const newGoal = parseFloat(event.target.value);
    setSavingsGoal(newGoal);
    updateCardData({ savingsGoal: newGoal });
  };

  const updateCardData = (updatedData) => {
    if (selectedCard) {
      const updatedUser = { ...user };
      const updatedUserCards = updatedUser.cards;
      const cardIndex = updatedUserCards.findIndex((card) => card.number === selectedCard);

      if (cardIndex !== -1) {
        const card = updatedUserCards[cardIndex];
        updatedUserCards[cardIndex] = { ...card, ...updatedData };

        // Guardar la tarjeta actualizada en la lista de tarjetas del usuario
        updatedUserCards[cardIndex] = card;

        // Actualizar el objeto de usuario actual
        setUser(updatedUser);

        // Guardar el usuario actualizado en el almacenamiento local
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      }
    }
  };

  const saveExpenseToLocalStorage = (amount, category) => {
    const currentDate = getCurrentDate();
    const currentMonth = currentDate.slice(0, 7);
    const dailyData = JSON.parse(localStorage.getItem("dailyData")) || {};

    if (!dailyData[currentDate]) {
      dailyData[currentDate] = { expenses: {} };
    }

    if (!dailyData[currentDate].expenses[category]) {
      dailyData[currentDate].expenses[category] = amount;
    } else {
      dailyData[currentDate].expenses[category] += amount;
    }

    localStorage.setItem("dailyData", JSON.stringify(dailyData));

    const monthlyData = JSON.parse(localStorage.getItem("monthlyData")) || {};

    if (!monthlyData[currentMonth]) {
      monthlyData[currentMonth] = { incomes: 0, expenses: {} };
    }

    if (!monthlyData[currentMonth].expenses[category]) {
      monthlyData[currentMonth].expenses[category] = amount;
    } else {
      monthlyData[currentMonth].expenses[category] += amount;
    }

    localStorage.setItem("monthlyData", JSON.stringify(monthlyData));
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="centra">
      <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} sesion={sesion}/>
      <div className={`finances-container${isSidebarOpen ? '-shifted' : ''}`}>
        <div className="horizonta">
          <div ><h1>Tarjetas:</h1></div>
        <div className="card"><CardSelect
          selectedCard={selectedCard}
          userCards={listcards.filter((e) => e.id_usuario == sesion.id)}
          handleSelectedCardChange={handleSelectedCardChange}
          setSpendingLimit={setSpendingLimit}
          setSavingsGoal={setSavingsGoal}
        /></div>
         
          
          </div>

        

        {selectedCard && (
          <div>
            <h1>Finanzas</h1>
            <div className="horizonta2"> 
            
           <div className="finanza"> 
            <IncomeForm
              newIncome={newIncome}
              onNewIncomeChange={(e) => setNewIncome(parseFloat(e.target.value))}
              addNewIncome={addNewIncome}
            /></div> 
            <div className="finanza"> 
            <ExpenseForm
              newExpense={newExpense}
              onNewExpenseChange={(e) => setNewExpense(parseFloat(e.target.value))}
              expenseCategory={expenseCategory}
              hasExceededSpendingLimit={warning !== ""}
              warning={warning}
              onNewCategoryChange={(e) => setNewCategory(e.target.value)}
              addNewExpense={addNewExpense}
            /></div>
             <div className="finanza"> 
            <CategoryForm
              newCategory={newCategory}
              onNewCategoryChange={(e) => setNewCategory(e.target.value)}
              addNewCategory={addNewCategory}
            /></div>
             <div className="finanza"> 
             <SpendingAndSavings
              spendingLimit={spendingLimit}
              savingsGoal={savingsGoal}
              onSpendingLimitChange={(e) => handleSpendingLimitChange(e)}
              onSavingsGoalChange={(e) => handleSavingsGoalChange(e)}
            />
             </div>
             </div>
           
            <TotalIncomes totalIncomes={totalIncomes} />
            <TotalExpensesByCategory totalExpensesByCategory={totalExpensesByCategory} />
            <RecentExpensesList recentExpenses={recentExpenses} />
            <RecentIncomesList recentIncomes={recentIncomes} />
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Finances;
