import { useState } from 'react';
import PropTypes from 'prop-types';
import './CardContainer.css'; // Estilos del contenedor

const CardContainer = ({ children }) => {
  const [layout, setLayout] = useState('row'); // Valor por defecto

  const handleLayoutChange = (event) => {
    setLayout(event.target.value);
  };

  return (
    <div className={`card-container ${layout}`}>
      <select value={layout} onChange={handleLayoutChange}>
        <option value="row">Fila</option>
        <option value="column">Columna</option>
      </select>

      <div className="content">
        {children}
      </div>
    </div>
  );
};

CardContainer.propTypes = {
  children: PropTypes.node.isRequired,  // 'children' debe ser un nodo React y es obligatorio
};

export default CardContainer;
