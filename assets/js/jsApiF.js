
const update = document.getElementById("refreshButton"); //boton llama a la funcion

update.addEventListener("click", () => {
    getUsersList();
});



const saveLocalStorage = (key, value) => {
    const timeLimit = Date.now() + 1000;
    const dataNow = { value, timeLimit};
    localStorage.setItem(key, JSON.stringify(dataNow)   );
};




const urlApiUsers = "https://reqres.in/api/users?delay=3";

const getUsersList = async () => {
    try{
        const response = await fetch(urlApiUsers);
        const responseJson = await response.json();
        getTableUsers(responseJson.data);
        saveLocalStorage("userData", responseJson.data);
        
    } catch(error){
        console.warn(error);
    }
};



function getTableUsers (responseData){
    const tableBody = document.querySelector(".table-bordered tbody");
    
    responseData.forEach(user => {
      const row = document.createElement("tr");
      
      const idCell = document.createElement("td");
      idCell.textContent = user.id;
      row.appendChild(idCell);
      
      const firstNameCell = document.createElement("td");
      firstNameCell.textContent = user.first_name;
      row.appendChild(firstNameCell);
      
      const lastNameCell = document.createElement("td");
      lastNameCell.textContent = user.last_name;
      row.appendChild(lastNameCell);
  
      const emailCell = document.createElement("td");
      emailCell.textContent = user.email;
      row.appendChild(emailCell);
  
      const imageCell = document.createElement("td");
      imageCell.className = "image-cell";
      
      const image = document.createElement("img");
      image.src = user.avatar;
      image.className = "circular";
      imageCell.appendChild(image);
      row.appendChild(imageCell);
      
      tableBody.appendChild(row);
    });
  }
  


  getUsersList();


