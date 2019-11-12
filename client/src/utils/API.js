import axios from "axios";

export default {
  // Gets all users. 
  //Not currently using
  getUser: function() {
    return axios.get("/api/user");
  },
  // Gets the user with the given id
  getUserId: function(id) {
    return axios.get("/api/user/" + id);
  },
  getUser: function(userData){
      return axios.post("/api/user/login", userData)
  },
  // Deletes the user with the given id. 
  //Not currently using
  deleteUser: function(id) {
    return axios.delete("/api/user/" + id);
  },
  // Saves a user to the database
  saveUser: function(userData) {
    return axios.post("/api/user", userData);
  },
  //get equippedCards from user id in url
  getEquippedCards: function(id){
    return axios.get("/api/user/getEquippedCards/" + id);
  },
  //get inventory cards from user id in url
  getInventoryCards: function(id){
    return axios.get("/api/user/getInventoryCards/" + id)
  },
  //add new card to equippedCards if there are slot available
  updateEquippedCard: function(data){
    return axios.post("/api/user/updateEquippedCard", data)
  },
  //un-equip a card and add to inventory
  unEquipCard: function(data){
    return axios.post("/api/user/unEquipCard", data)
  }
};


