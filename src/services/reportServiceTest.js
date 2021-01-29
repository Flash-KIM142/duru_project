import firebase from "../firebase";
const db = firebase.collection("Test");

class ReportsDataService {
    getAll() {
      return db.orderBy("date","desc");
    }
  
    create(reports) {
      return db.add(reports);
    }
  
    update(id, value) {
      return db.doc(id).update(value);
    }
  
    delete(id) {
      return db.doc(id).delete();
    }
  }
  
  export default new ReportsDataService();