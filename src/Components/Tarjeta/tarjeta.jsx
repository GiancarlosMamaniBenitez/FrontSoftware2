import TarjetasApi from "@/app/api_fronted/tarjetas";

const Can = ({ nomEst, especialidad, fecha, curso, onDelete, cita }) => {

    const [isDeleted, setIsDeleted] = useState(false);
    const [TarjetasOriginal, setTarjetasOriginal] = useState([]);
  
    const handleDelete = () => {
      setIsDeleted(true);
      onDelete();
    };
  
    if (isDeleted) {
      return null; // No se muestra el card si está marcado como eliminado
    }
    
  
    const handleOnLoad = async () => {
      const result = await TarjetasApi.findAll();
      setTarjetasOriginal(result.data);
    }
  
    useEffect(()=>{
      handleOnLoad();
    },[])
  
    return (
      <Card className="carta" style={{ width: '20rem' }}>
        <Card.Header className="profesor">
          <Card.Img className="foto" src="https://lh3.googleusercontent.com/a/AAcHTtceq_PyTlIHE_JS-KNtUQYjtwW6rLP4CLczKxrjuQ=s83-c-mo" />
          <div>
            <h5>{nomEst}</h5>
            <span>{especialidad}</span>
          </div>
        </Card.Header>
        <Card.Img variant="top" src="https://cdn.discordapp.com/attachments/1065834267084595203/1110727600571174982/profesor-emerito-2000x1200.jpg" />
        <Card.Body>
          <Card.Title>{fecha}</Card.Title>
          <Card.Text>
            <p>{curso}</p>
            <Card.Link href={cita.enlaceSesion}>Enlace Zoom</Card.Link>
            <br />
          </Card.Text>
          <div className="calificacion">
            <Button variant="outline-secondary" className="boton" onClick={handleDelete}>
              Cancelar
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  };
  
  export default Can;