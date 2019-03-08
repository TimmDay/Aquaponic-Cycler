import { 
  setSelectedFilter, 
  updateSelectedNodeData, 
  addEntry,
  editEntry,
  updateDbReturn,
  startUpdateDataFromDB,
  startAddEntry,
  startEditEntry
 } from '../../actions/aquaponic';


 test('should setup addEntry action object', () => {
   const entry = { value: '1', name: 'abc', date: 'sun' };
   const action = addEntry(entry);

   expect(action).toEqual({
    type: 'ADD_NEW_ENTRY',
    entry
   })
 })

 test('should setup editEntry action object', () => {
  const entry = { value: '1', name: 'abc', date: 'sun' };
  const action = editEntry(entry);

  expect(action).toEqual({
   type: 'EDIT_NEW_ENTRY',
   entry
  })
})