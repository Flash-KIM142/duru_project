// 요놈은 북지부 거 데이터
import firebase from "../firebase";
const db = firebase.collection("/Reports");

class ReportsDataService {
    getAll() {
      return db;
    }
  
    create(reports) {
      return db.add(reports);
    }
  
    update(ID, value) {
      return db.doc(ID).update(value);
    }
  
    delete(id) {
      return db.doc(id).delete();
    }
  }
  
  export default new ReportsDataService();