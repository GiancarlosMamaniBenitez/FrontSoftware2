import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';





function TabBar() {
  return (
    <Tabs
      defaultActiveKey="profile"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="DatosdeUsuario" title="Datos de Usuario">
      
        

      </Tab>
      <Tab eventKey="Universidad" title="Universidad">
        

      </Tab>
      <Tab eventKey="Presentación" title="Presentación">
     

      </Tab>
      
    </Tabs>
  );
}

export default TabBar;