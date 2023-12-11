// import React, { useState } from "react";

// const SearchBar = ({ data }) => {
//   const [searchTerm, setSearchTerm] = useState("");
  
//   // Filtrar los datos en función del término de búsqueda
//   const filteredData = data.filter((item) => {
//     return item.name.toLowerCase().includes(searchTerm.toLowerCase());
//   });

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Buscar..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <ul>
//         {filteredData.map((item) => (
//           <li key={item.id}>{item.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default SearchBar;
import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    // Llama a la función onSearch pasando el nuevo término de búsqueda
    onSearch(newSearchTerm);
  };

  return (
    <input
      type="text"
      placeholder="Buscar..."
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

export default SearchBar;
