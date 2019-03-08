import db from '../firebase/firebase';


export const setSelectedFilter = wqm => ({
  type: 'SET_SELECTED_FILTER',
  wqm
});

//when node clicked
export const updateSelectedNodeData = (obj={}) => {
  const {name='', value='', date='', id=''} = obj
  return {
    type: 'UPDATE_SELECTED_NODE_DATA',
    nodeData: obj
  }
};



export const startAddEntry = (obj) => {
  const { value='', name='', date='' } = obj;
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    if (value) {
      db
        .collection('users')
        .doc(uid)
        .collection('aquaponic')
        .add(obj)
        .then(() => {
          // dispatch(addEntry(obj));
          dispatch(startSetCycleData());
        });
    }
  }
};
export const addEntry = (entry) => ({
  type: 'ADD_NEW_ENTRY',
  entry
});

export const startEditEntry = (obj) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    if (obj.id) {
      db.collection('users')
        .doc(uid)
        .collection('aquaponic')
        .doc(obj.id)
        .update({name: obj.name, date: obj.date, value: obj.value})
        .then(() => {
          // dispatch(editEntry(obj));
          dispatch(startSetCycleData()); //TODO:?
        });
    }
  }
};
export const editEntry = (entry) => ({
  type: 'EDIT_NEW_ENTRY',
  entry
});

// DB LISTENER. realtime firestore
export const startSetCycleData = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return db
    .collection('users')
    .doc(uid)
    .collection('aquaponic')
    .onSnapshot(response => {
      console.log(response); //TODO:
      
      let data = [];
      response.docChanges().forEach(change => {
        const doc = { ...change.doc.data(), id: change.doc.id };
        switch (change.type) {
          case 'added':
            data.push(doc);
            break;
          case 'modified':
            const index = data.findIndex(item => item.id === doc.id);
            data[index] = doc;
            break;
          case 'removed':
            data = data.filter(item => item.id !== doc.id);
            break;
          default:
            break;
        }
      });
      dispatch(setCycleData(data));
    });
  };
};
export const setCycleData = data => ({
  type: 'UPDATE_DB_RETURN',
  data
});