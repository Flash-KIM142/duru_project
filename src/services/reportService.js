// 요놈은 북지부 거 데이터
import firebase from "../firebase";
const db = firebase.collection("Reports");
// let latestDoc = null;
// const ref = db.orderBy("date", "desc").startAfter(latestDoc || 0).limit(3);
// const post = ref.get();
// latestDoc = post.docs[post.docs.length-1];

class ReportsDataService {
    getAll() {
      return db.orderBy("date", "desc");
    }

    // getNextReports() {
    //   const ref = db.orderBy("date", "desc").startAfter(latestDoc || 0).limit(3);
    //   const post = ref.get();
    //   latestDoc = post.docs[post.docs.length-1];
    //   return ref;
    // }
  
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