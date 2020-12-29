import firebase from "../firebase";
const db = firebase.collection("/ReportsSouth");

class ReportsDataService {
    getAll() {
      return db;
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