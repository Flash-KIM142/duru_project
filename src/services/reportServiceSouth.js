import firebase from "../firebase";
const db = firebase.collection("ReportsSouth");

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

    fetchMore() {
      let reports = [];
      const reportRef = db.orderBy("date", "desc").get();
      const lastReport = reportRef.docs[reportRef.docs.length-1];
      db.orderBy("date", "desc").limit(2).startAfter(lastReport).get().then((documentSnapshot)=>{
        documentSnapshot.forEach((doc)=>{
          let temp = doc.data();
          let id = doc.id;
          let date = temp.date.toDate();

          reports.push({
            name: temp.name,
            description: temp.description,
            year: date.getFullYear(),
            month: date.getMonth()+1,
            date: date.getDate(),
            id: id,
          })
        })
      })
    }
  }
  
  export default new ReportsDataService();