
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
import IngresosApi from "../api_fronted/ingresos";
import UsuariosApi from "../api_fronted/usuarios";
import GastosApi from "../api_fronted/gastos";
import { List } from "@mui/material";
import Gastos from "../IngresosGastos/Ing_Gas/Gastos";
import CatSelect from "@/Components/CategorySelect";
import CategorySelect from "@/Components/CategorySelect";
import CategoriasApi from "../api_fronted/categorias";
import MetaApi from "../api_fronted/meta";
import LimitgastoApi from "../api_fronted/Limitgasto";
import MetaForm from "@/Components/Meta";
import LimiteForm from "@/Components/LimiteForm";
import TotalExpenses from "@/Components/TotalExpenses";
import EliminarIngreso from "@/Components/EliminarIngreso.jsx"
import EliminarGasto from "@/Components/EliminarGasto.jsx"
const Finances = () => {
  

  const [selectedCard, setSelectedCard] = useState("");
  const [totalIncomeAmount, setTotalIncomeAmount] = useState(0);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);
  
  const [usuariotarjeta,setUsuariotarjeta] = useState([])
  const [usuarioingresos,setUsuarioingresos] = useState([])
  const [usuariogastos,setUsuariogastos] = useState([])
  const [selectedCategorie, setSelectedCategorie] = useState("")
  const [selectedCategorieId, setSelectedCategorieId] = useState(0)
  const [totalIncomes, setTotalIncomes] = useState(0);
  const [totalExpensesByCategory, setTotalExpensesByCategory] = useState({});
  const [recentIncomes, setRecentIncomes] = useState([]);
  const [newExpense, setNewExpense] = useState(0);
  const [expenseCategory, setExpenseCategory] = useState([]);
  const [newIncome, setNewIncome] = useState(0);
  const [newCategory, setNewCategory] = useState("");
  const [newLimit,setNewLimit] = useState(0)
  const [newMeta,setNewMeta] = useState(0)

  
  const [spendingLimit, setSpendingLimit] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(0);
  const [warning, setWarning] = useState("");
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [currentIncomesAndExpenses, setCurrentIncomesAndExpenses] = useState({
    incomes: [],
    expenses: [],
  });
  const [SelectedCard2, setSelectedCard2] = useState("")
  const [usuariocategoria,setUsuariocategoria] = useState([])
  const [listcards, setListCards] = useState([]);
  const [sesion , setSesion] = useState([]);
  const [ListaIngresos,setListaIngresos] = useState([]);
  const [listGastos, setListGastos] = useState([]);
  const [listUsuarios, setListUsuarios] = useState([]);
  const [listCategorias, setListCategorias] = useState([]);
  const[listLimit, setListLimit] = useState([]);
  const[listMeta, setlistMeta] = useState([]);
  //importar la data de la api
  const LoadData = async() =>{
    const result = await TarjetasApi.findAll();
    const result1  = await IngresosApi.findAll();
    const result2 = await GastosApi.findAll();
    const result3 = await UsuariosApi.findAll();
    const result5 = await CategoriasApi.findAll();
    const result6 = await MetaApi.findAll();
    const result7 = await LimitgastoApi.findAll();
    
    setListCards(result.data)
    setListaIngresos(result1.data)
    setListGastos(result2.data)
    setListUsuarios(result3.data)
    setListCategorias(result5.data)
    setlistMeta(result6.data)
    setListLimit(result7.data)
    
  
   
    
    
  }

  const LoadDataId  = async () =>{
    
    const result3 = await UsuariosApi.findOne(sesion.id)
    setUsuariocategoria(result3.data.categories)
    console.log(result3.data.categories)
  }
/*
  const AlmacenarCategorias = () => {
   const usuario2 = listUsuarios.find((e) => e.id ===sesion.id)
   let categoria1 = []
   categoria1 = usuario2.categories
   setUsuariocategoria(categoria1)
   console.log(usuariocategoria)
  }
*/
  //almacenar la sesion en la variable sesion
  const handleOnLoad = () => {

    var sesionGuardada = localStorage.getItem("sesion");
    setSesion(JSON.parse(sesionGuardada))
    console.log(sesionGuardada)
               
}

// para que lo renderice apenas carga la pagina 
  useEffect(() => {
    
    handleOnLoad();
    LoadData()
  
    
    
    
    //tarjetaLocal();
        
  }, []);
 
  //  obtener fecha
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  //obtener  sus ingresos y gastos actuales

  const getCurrentIncomesAndExpenses = () => {
    if (selectedCard) {
      const card = listcards.find((e) => e.id === selectedCard);
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
    getCurrentDate();
    console.log(expenseCategory)
    
  }, [selectedCard, listcards]);

  useEffect(() => {
    //calculateTotals();
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
    const selectedCardNumber = event.target.value;
    const selectedCardData = listcards.find((card) => card.number === selectedCardNumber);

    setSelectedCard(selectedCardNumber);
     
    
    if (selectedCardData) {
      setSpendingLimit(selectedCardData.spendingLimit || 0);
      setSavingsGoal(selectedCardData.savingsGoal || 0);
    }
   
    console.log(selectedCardData)
  };
  const handleSelectedCategorieChange = (event) => {
    const selectedCat = listCategorias.find((e) => e.nombre === event.target.value);
    setSelectedCategorie(selectedCat.nombre); 
    setSelectedCategorieId(selectedCat.id);
    
    console.log(selectedCat)
  }
  const addNewExpense = async () => {
    const Usuario = listUsuarios.find((e) => e.id === sesion.id);
    const expenseCategory = selectedCategorieId
    if (newExpense > 0 && selectedCard && expenseCategory) {
      const card = listcards.find((e) => e.number === selectedCard);
        let expenses= []
        expenses = listGastos.filter((e) => e.id_tarjeta == selectedCard.id);
        const expenseID= listGastos.length + 1;
        const currentDate = getCurrentDate();
        console.log(expenseID)


        const spendingLimit = listLimit.filter((e) => e.id_tarjeta == selectedCard.id);
        
        ;
   
        /*const updatedUser = { ...sesion };
      const updatedUserCards = updatedUser.cards;
      
      const cardIndex = updatedUserCards.findIndex((card) => card.number === selectedCard);
     */
      
        if (spendingLimit && totalExpensesByCategory[expenseCategory]) {
          const categoryExpenses = totalExpensesByCategory[expenseCategory] + newExpense;
          if (categoryExpenses > card.spendingLimit) {
            setWarning("Has superado tu límite de gasto.");
            return;
          }
        }
      

        const expense={ id_gastos: expenseID, monto: newExpense ,fecha_gastos:currentDate,id_categoria:expenseCategory , id_tarjeta: card.id}
        /*try {
          // Realiza la solicitud POST al backend para registrar el nuevo usuario utilizando la función personasApi
          const response = await GastosApi.create(expense)
          LoadData()
          // Comprueba el resultado de la solicitud
            if (response && response.status === 200) {
                // Registro exitoso, redirige a la página de inicio de sesión
                alert('Registro exitoso!');
               
            } else {
                // Manejo de errores en caso de que algo salga mal en el backend
                alert('Error al registrar usuario( no manda la data)');
            }
        } catch (error) {
         
        }*/

        try {
          const response = await GastosApi.create(expense);
          await LoadData(); // Esperar a que LoadData termine antes de continuar
          setCurrentIncomesAndExpenses(getCurrentIncomesAndExpenses());
          setNewExpense(0);
          setExpenseCategory();
          setWarning("");
          //calculateTotals(); // Calcular totales después de actualizar los datos
        } catch (error) {
          console.error("Error al agregar gasto:", error);
        }

        console.log(expense)
        setCurrentIncomesAndExpenses(getCurrentIncomesAndExpenses());
        setNewExpense(0);
        setExpenseCategory();
        setWarning("");
        calculateTotalsExpenses
        LoadData();
      }
    
  };
//ya manda ingresos a la base de datos
const addNewIncome = async() => {
  if (newIncome > 0 && selectedCard) {
      
    const card = listcards.find((e) => e.number === selectedCard);
      let incomes= []
      incomes = ListaIngresos.filter((e) => e.id_tarjeta == selectedCard.id);
      const incomeId= ListaIngresos.length + 1;
      const currentDate = getCurrentDate();
      console.log(incomeId)
      const income={ id_ingresos: incomeId, monto: newIncome ,fecha_ingresos:currentDate, id_tarjeta: card.id}
      ;
      console.log("ingreso prueba",income.monto)
      try {
        // Realiza la solicitud POST al backend para registrar el nuevo usuario utilizando la función personasApi
        const response = await IngresosApi.create(income);
        // Comprueba el resultado de la solicitud
          if (response && response.status === 200) {
              // Registro exitoso, redirige a la página de inicio de sesión
              alert('Registro exitoso!');
              router.push('/VerTarjeta');
          } else {
              // Manejo de errores en caso de que algo salga mal en el backend
              alert('Error al registrar usuario( no manda la data)');
          }
      } catch (error) {
       
      }

      setCurrentIncomesAndExpenses(getCurrentIncomesAndExpenses());
      setNewIncome(0);
      
      calculateTotalsIncomes();

      LoadData();
    
  }
};


  const addNewLimit = async() =>{
    if (newLimit > 0 && selectedCard) {
      const card = listcards.find((e) => e.number === selectedCard);

      const antiguolimite = listLimit.find((e) => e.id_tarjeta === card.id);
      const limiteid = listLimit.length + 1;
       // const card = listcards.find((e) => e.id === selectedCard.id);
   //const limitegasto = listLimit.find((e) => e.id_tarjeta === selectedCard.id)
   const limite = {id:limiteid, monto:newLimit,id_tarjeta:card.id  };
   console.log(antiguolimite)
   if(!antiguolimite){
   try {
    // Realiza la solicitud POST al backend para registrar el nuevo usuario utilizando la función personasApi
    const response = await LimitgastoApi.create(limite);
    LoadData()
    // Comprueba el resultado de la solicitud
      if (response && response.status === 200) {
          // Registro exitoso, redirige a la página de inicio de sesión
          alert('Registro exitoso!');
          
      } else {
          // Manejo de errores en caso de que algo salga mal en el backend
          alert('Error al registrar usuario( no manda la data)');
      }
  } catch (error) {
   
  }
   }else{
    try {
      // Realiza la solicitud POST al backend para registrar el nuevo usuario utilizando la función personasApi
      const response = await LimitgastoApi.update(antiguolimite.id,limite);
    
      
      // Comprueba el resultado de la solicitud
        if (response && response.status === 200) {
            // Registro exitoso, redirige a la página de inicio de sesión
            alert('Actualización exitosa!');
           
        } else {
            // Manejo de errores en caso de que algo salga mal en el backend
            alert('Error al actualizar Limite de gastos');
        }
    } catch (error) {
       }
   }
  
  }
}
  const addNewMeta = async() =>{
    if (newMeta > 0 && selectedCard) {
      const card = listcards.find((e) => e.number === selectedCard);
      const antiguaMeta = listMeta.find((e) => e.id_tarjeta === card.id);
      const Metaid = listMeta.length + 1;
       // const card = listcards.find((e) => e.id === selectedCard.id);
   //const limitegasto = listLimit.find((e) => e.id_tarjeta === selectedCard.id)
   const Meta = {id:Metaid, monto:newMeta,id_tarjeta:card.id  };
   console.log(Meta)
   if(!antiguaMeta){
   try {
    // Realiza la solicitud POST al backend para registrar el nuevo usuario utilizando la función personasApi
    const response = await MetaApi.create(Meta);
    LoadData()
    // Comprueba el resultado de la solicitud
      if (response && response.status === 200) {
          // Registro exitoso, redirige a la página de inicio de sesión
          alert('Registro exitoso!');
          
      } else {
          // Manejo de errores en caso de que algo salga mal en el backend
          alert('Error al registrar usuario( no manda la data)');
      }
  } catch (error) {
   
  }
   }else{
    try {
      // Realiza la solicitud POST al backend para registrar el nuevo usuario utilizando la función personasApi
      const response = await MetaApi.update(antiguaMeta.id,Meta);
    
      
      // Comprueba el resultado de la solicitud
        if (response && response.status === 200) {
            // Registro exitoso, redirige a la página de inicio de sesión
            alert('Actualización exitosa!');
           
        } else {
            // Manejo de errores en caso de que algo salga mal en el backend
            alert('Error al actualizar Limite de gastos');
        }
    } catch (error) {
       }
   }
  
  }}
  //esto estaba cambiando (falta que mande a base de datos)
  const addNewCategory = async(event) => {
    event.preventDefault();
    const categoriasUsuario = listCategorias.find((e) => e.id === sesion.id)
    
  
    
   console.log(categoriasUsuario)
    
      const categoriaNewData = {
        // Aumentamos el ID en 1
      nombre: newCategory,
      id_usuario: sesion.id,
     };
      
 
      try {
        // Realiza la solicitud POST al backend para registrar el nuevo usuario utilizando la función personasApi
        const response = await CategoriasApi.create(categoriaNewData)
        LoadData()
        // Comprueba el resultado de la solicitud
          if (response && response.status === 200) {
              // Registro exitoso, redirige a la página de inicio de sesión
              alert('Registro exitoso!');
             
          } else {
              // Manejo de errores en caso de que algo salga mal en el backend
              alert('Error al registrar usuario( no manda la data)');
          }
      } catch (error) {
       
      }
      // Limpia el campo de nueva categoría
      setNewCategory("");
    
  };
  const calculateTotalsIncomes = () => {

    if (selectedCard && ListaIngresos.length > 0) {
      // Filtra los ingresos por id_tarjeta
      //console.log("ID de tarjeta seleccionada:", selectedCard.id);
      //const cardIncomes = ListaIngresos.filter((income) => income.id_tarjeta === selectedCard.id);
      //console.log("Ingresos filtrados:", cardIncomes);
      if (selectedCard && ListaIngresos.length > 0) {
        // Filtra los ingresos por id_tarjeta
        const cardIncomes = ListaIngresos.filter((income) => income.id_tarjeta === selectedCard.id);
        console.log("Ingresos filtrados:", cardIncomes);
        // Suma los montos de todos los ingresos
        const totalIncomeAmount1 = cardIncomes.reduce((total, income) => total + parseFloat(income.monto), 0);
        setTotalIncomeAmount(totalIncomeAmount1)
    
        console.log("Suma de todos los montos de ingresos:", totalIncomeAmount);
      }
  
    }
  };
    const calculateTotalsExpenses=()=>{
      
  
      if (selectedCard && listGastos.length > 0) {
        
        const cardExpenses = listGastos.filter((expense) => expense.id_tarjeta === selectedCard.id);
        console.log("Gastos filtrados:",cardExpenses);
        
        
        const totalExpenseAmount1 = cardExpenses.reduce((total, expense) => total + parseFloat(expense.monto), 0);
        setTotalExpenseAmount(totalExpenseAmount1)
  
        console.log("Suma de todos los montos de gastos:", totalExpenseAmount);
      }
  
    };
  

  /*const calculateTotals = () => {
    const incomes = currentIncomesAndExpenses.incomes;
    const expenses = currentIncomesAndExpenses.expenses;

    const totalIncomeAmount = incomes.reduce((total, income) => total + income.amount, 0);
    setTotalIncomes(totalIncomeAmount);

    const expensesByCategory = {};
    expenses.forEach((expense) => {
      const category = expense.id_categoria;
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
  };*/

  const handleSpendingLimitChange =  (event) => {
    
    const newLimit = parseFloat(event.target.value);
    setSpendingLimit(newLimit);
    
    console.log(spendingLimit)
   // const response = await TarjetasApi.update()
  };

  const handleSavingsGoalChange = (event) => {
    const newGoal = parseFloat(event.target.value);
    setSavingsGoal(newGoal);
    console.log(savingsGoal)
  };
  const handleSaveClick = async () => {
    console.log(selectedCard)
    console.log(spendingLimit)
    if (selectedCard) {
      try {
        // Actualizar los límites de gasto y metas en el objeto de tarjeta seleccionada
        const updatedCard = { ...selectedCard };

        updatedCard.spendingLimit = spendingLimit;
        updatedCard.savingGoal = savingsGoal;
        
        // Realizar la solicitud para guardar los cambios en el servidor
        const response = await TarjetasApi.update(selectedCard.id, updatedCard);
  
        /*if (response.status === 200) {
          // Actualizar los datos en la lista de tarjetas
          const updatedListCards = listcards.map((card) =>
            card.id === selectedCard.id ? updatedCard : card
          );
  
          // Actualizar el estado de las tarjetas
          setListCards(updatedListCards);
  
          // También puedes guardar los cambios en el objeto de usuario local, si es necesario
          // ...
        */
      } catch (error) {
        console.error("Error en la solicitud de actualización:", error);
      }
    }
  };
  

 /* const updateCardData = (updatedData) => {
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
  };*/


  /*
  <div className="finanza"> 
             <SpendingAndSavings
                spendingLimit={spendingLimit}
                savingsGoal={savingsGoal}
                handleSpendingLimitChange={(e) => handleSpendingLimitChange(e)}
                handleSavingsGoalChange={(e) => handleSavingsGoalChange(e)}
                onSaveClick={handleSaveClick}
             />
             

             </div>
  */

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
        <div className="card">
        <CardSelect
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
            /></div><div className="finanza">
            <LimiteForm
             newIncome={newLimit}
             onNewLimitChange={(e) => setNewLimit(parseFloat(e.target.value))}
             addNewLimit={addNewLimit}
           /></div> <div className="finanza">
             <MetaForm
              newIncome={newMeta}
              onNewMetaChange={(e) => setNewMeta(parseFloat(e.target.value))}
              addNewMeta={addNewMeta}
            /></div> 
             <div className="finanza"> 
            <CategoryForm
              newCategory={newCategory}
              onNewCategoryChange={(e) => setNewCategory(e.target.value)}
              addNewCategory={addNewCategory}
            /></div>
            <div className="finanza"> 
            <ExpenseForm
              newExpense={newExpense}
              selectedCat = {selectedCategorie}
              onNewExpenseChange={(e) => setNewExpense(parseFloat(e.target.value))}
              expenseCategory={listCategorias.filter((e) => e.id_usuario == sesion.id)}
              hasExceededSpendingLimit={warning !== ""}
              warning={warning}
              onExpenseCategoryChange={handleSelectedCategorieChange}
              addNewExpense={addNewExpense}/></div>
              
             
             </div>
           
             <TotalIncomes totalIncomeAmount={totalIncomeAmount} />
            <TotalExpenses totalExpenseAmount={totalExpenseAmount} />
            <EliminarIngreso ListaIngresos={[ListaIngresos]} selectedCardId={selectedCard.id} totalIncomeAmount={totalIncomeAmount}/>
            <EliminarGasto ListaGastos={[listGastos]} selectedCardId={selectedCard.id} listcards={listcards} listCategorias={listCategorias}
             totalExpenseAmount={totalExpenseAmount}/>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default Finances;
