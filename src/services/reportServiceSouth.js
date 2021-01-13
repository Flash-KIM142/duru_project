import firebase from "../firebase";
const db = firebase.collection("ReportsSouth");
var first = db.orderBy("date","desc").limit(2);

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

    fetchMore(){
      return first.get().then((documentSnapshots)=>{
        // Get the last visible document
        var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];

        // construct a new query starting at this document
        // get the next 2 reports
        var next = db.orderBy("date","desc").startAfter(lastVisible.date).limit(2);
      })
    }
  }
  
  export default new ReportsDataService();