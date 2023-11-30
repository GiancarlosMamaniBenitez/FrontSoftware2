'use client'

import Link from 'next/link';

import TarjetasApi from "../api_fronted/tarjetas";
import React, { useState, useEffect } from "react";
import NavBar from "@/Components/NavBar";
import "./financesIngreso.css"; // Importar el archivo CSS
import CardSelect from "@/Components/CardSelect.jsx";
import TotalIncomes from "@/Components/TotalIncomes.jsx";
import IncomeForm from "@/Components/IncomeForm.jsx";
import OrigenForm from "@/Components/OrigenForm";
import IngresosApi from "../api_fronted/ingresos";
import CategoriasApi from "../api_fronted/categorias";
//Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import EliminarIngreso from "@/Components/EliminarIngreso.jsx"
import MetaApi from '../api_fronted/meta';
import MetaIngreso from '@/Components/MetaIngreso';
import OrigenApi from '../api_fronted/origen';
const Finances = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCard, setSelectedCard] = useState("");
  const [totalIncomeAmount, setTotalIncomeAmount] = useState(0);

  const [selectedOrigen, setSelectedOrigen] = useState("")
  const [selectedOrigenId, setSelectedOrigenId] = useState(0)

  const [newIncome, setNewIncome] = useState(0);
  const [IncomeOrigen, setIncomeOrigen] = useState([]);

  const [newOrigen, setNewOrigen] = useState(""); 
  const [savingsGoal, setSavingsGoal] = useState(null);
  const [savingsGoalFound, setSavingsGoalFound] = useState(false)
  const [SelectedCard2, setSelectedCard2] = useState("")
  const [estadoBoton, setEstadoBoton] = useState("Establecer meta")
  const [listcards, setListCards] = useState([]);
  const [sesion, setSesion] = useState([]);
  const [listIngresos, setListIngresos] = useState([]);
  const [listOrigen, setListOrigen] = useState([]);

  const [listMetas, setListMetas] = useState([]);
  //importar la data de la api
  const LoadData = async () => {
    const result = await TarjetasApi.findAll();
    const result2 = await IngresosApi.findAll();
    const result5 = await OrigenApi.findAll()
    const result6 = await MetaApi.findAll()
    
    setListMetas(result6.data)
    setListOrigen(result5.data)
    console.log("Lista de ingresos actualizada:", result2.data);
    setListCards(result.data)
    setListIngresos(result2.data)
    console.log(listIngresos)

  }



  const notifyInfo = (mensaje) => {
    toast.info( mensaje ,{
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  }

  const notifySuccess = (mensaje) => {
    toast.success(mensaje , {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  const LoadOnlyOrigen = async () => {

    const result3 = await OrigenApi.findAll()
    setListOrigen(result3.data)
    
  }
  /*
  
  */


  const handleEdit = () => {
    setIsEditing(true);
   
  };
  const handleSave = async (ingresoId, monto) => {
    setIsEditing(false);
    
    const dataUpdated = {
        monto: monto
    }
    try {
        
        const response = await IngresosApi.update(ingresoId, dataUpdated)
        LoadData()

        if (response && response.status === 200) {
            const mensaje = "Monto actualizado 🙌"
          notifySuccess(mensaje)
            
        } else {
            // Manejo de errores en caso de que algo salga mal en el backend
            alert('Error al actualizar usuario');
        }
    } catch (error) {
       }

};



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


  useEffect(() => {

    calculateTotalsIncomes();
    getCurrentDate();

  }, [selectedCard, listcards]);
useEffect(() => {
    calculateTotalsIncomes();
  }, [listIngresos]);
  useEffect(() => {
    //console.log("Total de Ingresos actualizado:", totalIncomes);
    //calculateTotals();
    checkSavingsGoal();
  
  }, [totalIncomeAmount]);

  

  const checkSavingsGoal = () => {
    if (selectedCard){
      if (totalIncomeAmount > savingsGoal*0.8 && totalIncomeAmount < savingsGoal) {
        const mensaje = "Continua, estás cerca de tu meta 🙌"
        notifySuccess(mensaje)
        return
      } else if (totalIncomeAmount == savingsGoal){
        const mensaje = "Haz llegado a tu meta de ahorro 🐱‍👤"
        notifySuccess(mensaje)
        return
      }

      LoadData()
    }
    
    
  
};


  const handleSelectedCardChange = (event) => {
    
    const selectedCardData = listcards.find((e) => e.number === event.target.value);
    setSelectedCard(selectedCardData);
    setSelectedCard2(selectedCardData.number);

    if (selectedCardData) {
      const meta = listMetas.find((e) => e.id_usuario === sesion.id)
      if (meta) {
        console.log(" se encuentra")
        setSavingsGoal(meta.monto);
        setSavingsGoalFound(true)
        
        
      }else{
        console.log("no se encuentra el monto")
        
      }
      
      
    }
    LoadData();
    
  };

  const handleSelectedOrigenChange = (event) => {
    const selectedOri = listOrigen.find((e) => e.nombre === event.target.value);
    setSelectedOrigen(selectedOri.nombre);
    setSelectedOrigenId(selectedOri.id);

  }
  const addNewIncome = async () => {
    const IncomeOrigen = selectedOrigenId
    if (newIncome > 0 && selectedCard && IncomeOrigen) {
      const IncomeID = listIngresos.length + 1;
      const currentDate = getCurrentDate();
      const ingresoidmasalto = listIngresos.reduce((tarjetaMax, tarjetaActual) => {
        return tarjetaActual.id_ingresos > (tarjetaMax ? tarjetaMax.id_ingresos : 0) ? tarjetaActual : tarjetaMax;
      }, null);
      const nuevoId = ingresoidmasalto ? ingresoidmasalto.id_ingresos + 1 : 1;

      const income = { 
        id_ingresos: nuevoId, 
        monto: newIncome, 
        fecha_ingresos: currentDate, 
        id_origen: IncomeOrigen, 
        id_tarjeta: selectedCard.id 
      }


      try {
        const response = await IngresosApi.create(income);
        setListIngresos([...listIngresos, response.data]);
        const mensaje = "Se añadió el Ingreso"
        setListIngresos([...listIngresos, response.data]);
        notifySuccess(mensaje)
        LoadData(); // Esperar a que LoadData termine antes de continuar
        
        setNewIncome(0);
        setIncomeOrigen();
        calculateTotalsIncomes()
        
        //calculateTotals(); // Calcular totales después de actualizar los datos
      } catch (error) {
        console.error("Error al agregar Ingreso:", error);
      }
      setNewIncome(0);
      setIncomeOrigen();
      
      calculateTotalsIncomes()
      
    }

  };



  const addNewOrigen = async (event) => {
    event.preventDefault();
    
    const origenNewData = {
      // Aumentamos el ID en 1
      nombre: newOrigen,
      id_usuario: sesion.id,
    };


    try {
      // Realiza la solicitud POST al backend para registrar el nuevo usuario utilizando la función personasApi
      const response = await OrigenApi.create(origenNewData)
      LoadOnlyOrigen()
      // Comprueba el resultado de la solicitud
      if (response && response.status === 200) {
        // Registro exitoso, redirige a la página de inicio de sesión
        const mensaje = "Origen agregado"
        notifySuccess(mensaje)

      } else {
        // Manejo de errores en caso de que algo salga mal en el backend
        alert('Error al registrar usuario( no manda la data)');
      }
    } catch (error) {

    }
    // Limpia el campo de nueva categoría
    setNewOrigen("");

  };




  const calculateTotalsIncomes = () => {


    if (selectedCard && listIngresos.length > 0) {

      const cardIncomes = listIngresos.filter((Income) => Income.id_tarjeta === selectedCard.id);
      console.log("Ingresos filtrados:", cardIncomes);


      const totalIncomeAmount1 = cardIncomes.reduce((total, Income) => total + parseFloat(Income.monto), 0);
      setTotalIncomeAmount(totalIncomeAmount1)

      console.log("TOTAL INGRESOS XD",totalIncomeAmount1);
      console.log("lista actualizada?",listIngresos);
      
    }

  };

  const calculateNewTotalIncomeAmount = (ingresoId, listIngresos) => {
    // Filtrar el gasto específico
    const filteredIngresos = listIngresos.filter((ingreso) => ingreso.id_ingresos !== ingresoId);
  
    // Calcular el nuevo total de gastos
    const newTotalIncomeAmount = filteredIngresos.reduce((total, expense) => total + parseFloat(expense.monto), 0);
  
    return newTotalIncomeAmount;
  };
  
  const updateTotalIncomeAmount = (ingresoId) => {
    // Calcular el nuevo total de gastos después de borrar el gasto con el ID gastoId
    // Puedes usar la lista actualizada de gastos (listGastos) para recalcular el total

    const updatedTotalIncomeAmount = calculateNewTotalIncomeAmount(ingresoId, listIngresos);

    // Actualizar totalExpenseAmount en el estado
    setTotalIncomeAmount(updatedTotalIncomeAmount);
  };

  const updateListIngresos = async () => {
    try {
      const result = await IngresosApi.findAll();
      setListIngresos(result.data);
      console.log(listIngresos)
      calculateTotalsIncomes(); 
    } catch (error) {
      console.error('Error al actualizar la lista de ingresos:', error);
    }
  };


  const handleSavingsGoalChange = (event) => {

    const newMeta = parseFloat(event.target.value);
    setSavingsGoal(newMeta);
    console.log(savingsGoal)

  };

  const handleDelete = async (ingresoId) => {
    // Realiza la eliminación del ingreso en la base de datos
    
        const response = await IngresosApi.remove(ingresoId);
        LoadData()
        if (response && response.status === 200) {
            // Eliminación exitosa
            const mensaje = "Se eliminó el ingreso"
            notifyInfo(mensaje)
        }
        
    
};

  const handleSaveClick = async () => {
    const userId = sesion.id
    if (selectedCard) {
      if (savingsGoalFound === false) {
        try {
          // Actualizar los límites de Ingreso y metas en el objeto de tarjeta seleccionada
      
          const metaData = {
            monto: savingsGoal,
            id_usuario: userId
          }
            console.log("siiiii")
            const response3 = await MetaApi.create(metaData)
            const mensaje = "Se definió la meta"
            notifySuccess(mensaje)  
            
  
        } catch (error) {
          console.error("Error en la solicitud de actualización:", error);
        }
      }else if (savingsGoalFound === true) {
        const metaData = {
          monto: savingsGoal,
          id_usuario: userId
        }
          const meta = listMetas.find((e)=> e.id_usuario === userId)
          const response3 = await MetaApi.update(meta.id, metaData)
          LoadData() 
          const mensaje = "Se actualizó la meta"
          notifySuccess(mensaje)
          setEstadoBoton("Actualizar limite")
      }
      
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  return (
    <div>

      <div className="">
        <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} sesion={sesion} />
        <ToastContainer></ToastContainer>
        <div className={`finances-container${isSidebarOpen ? '-shifted' : ''}`}>
          <div className="">
            <div className="tarjetah1">
              <h1>Tarjetas:</h1>
            </div>
            <div className=''>
              <CardSelect
                selectedCard={SelectedCard2}
                userCards={listcards.filter((e) => e.id_usuario == sesion.id)}
                handleSelectedCardChange={handleSelectedCardChange}
              
                className={"form-select"}
              />
            </div>
            {selectedCard && (
              <div>
                <div className="horizonta2">
                  <div className="finanza">
                    <div className="finanza">
                      <TotalIncomes totalIncomeAmount={totalIncomeAmount}  updateListIngresos={updateListIngresos}/>
                    </div>
                    <div className="finanza">
                      <MetaIngreso
                        Meta={savingsGoal}
                        estadoBoton = {estadoBoton}
                        handleMetaChange={(e) => handleSavingsGoalChange(e)}
                        onSaveClick={handleSaveClick}
                      />
                    </div>
                    <div className="finanza">
                      <OrigenForm
                        newCategory={newOrigen}
                        onNewCategoryChange={(e) => setNewOrigen(e.target.value)}
                        addNewCategory={addNewOrigen}
                      />
                    </div>
                    <div className="finanza">
                      <IncomeForm
                        newIncome={newIncome}
                        selectedCat={selectedOrigen}
                        onNewIncomeChange={(e) => setNewIncome(parseFloat(e.target.value))}
                        IncomeCategory={listOrigen.filter((e) => e.id_usuario == sesion.id)}
                       
                        onIncomeCategoryChange={handleSelectedOrigenChange}
                        addNewIncome={addNewIncome}
                      />
                    </div>
            
                   
                  </div>


                  <div className='finanza'>
                    <EliminarIngreso
                      ListaIngresos={listIngresos}
                      selectedCardId={selectedCard.id}
                      listcards={listcards}
                      listCategorias={listOrigen}
                      totalIncomeAmount={totalIncomeAmount}
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                      handleSave={handleSave}
                      isEditing={isEditing}
                    /></div>


                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default Finances;