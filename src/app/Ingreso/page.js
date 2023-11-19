'use client'
import TarjetasApi from "../api_fronted/tarjetas";
import React, { useState, useEffect } from "react";
import NavBar from "@/Components/NavBar";
import "./financesIngreso.css"; // Importar el archivo CSS
import CardSelect from "@/Components/CardSelect.jsx";
import TotalIncomes from "@/Components/TotalIncomes.jsx";
import IncomeForm from "@/Components/IncomeForm.jsx";
import IngresosApi from "../api_fronted/ingresos";
import UsuariosApi from "../api_fronted/usuarios";
import GastosApi from "../api_fronted/gastos";
import CategoriasApi from "../api_fronted/categorias";
import EliminarIngreso from "@/Components/EliminarIngreso.jsx"

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
  //importar la data de la api
  const LoadData = async() =>{
    const result = await TarjetasApi.findAll();
    const result1  = await IngresosApi.findAll();
    const result2 = await GastosApi.findAll();
    const result3 = await UsuariosApi.findAll();
    const result5 = await CategoriasApi.findAll()
    setListCategorias(result5.data)
    
    setListCards(result.data)
    setListaIngresos(result1.data)
    setListGastos(result2.data)
    setListUsuarios(result3.data)
    


  }


  

  const LoadDataId  = async () =>{
    
    const result3 = await UsuariosApi.findOne(sesion.id)
    setUsuariocategoria(result3.data.categories)
    console.log(result3.data.categories)
  }

  //almacenar la sesion en la variable sesion
  const handleOnLoad = () => {

    var sesionGuardada = localStorage.getItem("sesion");
    setSesion(JSON.parse(sesionGuardada))
    console.log(sesionGuardada.id)
               
}

// para que lo renderice apenas carga la pagina 
  useEffect(() => {
    
    handleOnLoad();
    LoadData()

        
  }, []);
 
  //  obtener fecha
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };




  const getCurrentIncomesAndExpenses = () => {
    if (selectedCard) {
      const card = listcards.find((e) => e.id === selectedCard);
      if (card) {
        return {
          incomes: card.incomes || [],
          expenses: card.expenses || [],
        };
      }
    }
    return { incomes: [], expenses: [] };
  };
  

  useEffect(() => {
    console.log("Lista de Ingresos cargada:", ListaIngresos);
    console.log("Lista de Gastos cargada:",listGastos);
    setCurrentIncomesAndExpenses(getCurrentIncomesAndExpenses());
    calculateTotalsIncomes();
    calculateTotalsExpenses();
    getCurrentDate();
    console.log(expenseCategory)
    
  }, [selectedCard, listcards]);

  useEffect(() => {
    //console.log("Total de Ingresos actualizado:", totalIncomes);
    //calculateTotals();
    
  
  }, [currentIncomesAndExpenses]);



  
  const handleSelectedCardChange = (event) => {  
    const selectedCardData = listcards.find((e) => e.number === event.target.value);
    setSelectedCard(selectedCardData); 
    setSelectedCard2(selectedCardData.number); 
    
    if (selectedCardData) {
      setSpendingLimit(selectedCardData.spendingLimit || 0);
      setSavingsGoal(selectedCardData.savingsGoal || 0);
    }
   
    console.log(selectedCardData)
    LoadData();
  };


  
//ya manda ingresos a la base de datos
  const addNewIncome = async() => {
    if (newIncome > 0 && selectedCard) {
        console.log(selectedCard.id)
        const card = listcards.find((e) => e.id === selectedCard.id);
        let incomes= []
        incomes = ListaIngresos.filter((e) => e.id_tarjeta == selectedCard.id);
        const incomeId= ListaIngresos.length + 1;
        const currentDate = getCurrentDate();
        console.log(incomeId)
        const income={ id_ingresos: incomeId, monto: newIncome ,fecha_ingresos:currentDate, id_tarjeta: selectedCard.id}
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

  //esto estaba cambiando (falta que mande a base de datos)
  
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
  
        
      } catch (error) {
        console.error("Error en la solicitud de actualización:", error);
      }
    }
  };
  

 

  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  
  
  return (
    <div className="centra">
    <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} sesion={sesion}/>
    <div className={`finances-container${isSidebarOpen ? '-shifted' : ''}`}>
      <div className="horizonta">
        <div>
          <h1>Tarjetas:</h1>
        </div>
        <div className="card">
          <CardSelect
            selectedCard={SelectedCard2}
            userCards={listcards.filter((e) => e.id_usuario == sesion.id)}
            handleSelectedCardChange={handleSelectedCardChange}
            setSpendingLimit={setSpendingLimit}
            setSavingsGoal={setSavingsGoal}
          />
        </div></div><div>
        {selectedCard && (
          <div>
            <h1>Finanzas</h1>
            <div className="horizonta2"> 
              <div className="finanza"> 
                <IncomeForm
                  newIncome={newIncome}
                  onNewIncomeChange={(e) => setNewIncome(parseFloat(e.target.value))}
                  addNewIncome={addNewIncome}
                />
              </div> 
              <div className="finanza"> 
                {/* Contenido de la segunda parte de las finanzas */}
              </div>
            </div>
            <b></b>
            <TotalIncomes totalIncomeAmount={totalIncomeAmount} />
            <EliminarIngreso ListaIngresos={[ListaIngresos]} selectedCardId={selectedCard.id} totalIncomeAmount={totalIncomeAmount}/>
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default Finances;
