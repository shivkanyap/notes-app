const {createStore}=require('redux')
const countReducer=(state={count:0},action)=>{
    switch(action.type)
    {
        case 'INCREMENT':{
            return{
                count:state.count+1
            }
        }
        case 'DECREMENT':{
            return{
                count:state.count-1
            }
        }
        case 'RESET':{
            return{
                count:0
            }
        }
        case 'INCREMENT_BY':{
            return{
                count:state.count+action.payload
            }
        }
        case 'DECREMENT_BY':{
            return{
                count:state.count-action.payload
            }
        }
        
    }
    
}
const store=createStore(countReducer)
store.subscribe(()=>{
    console.log(store.getState())
})
//action creator||action generator

const increment=()=>{
    return{type:'INCREMENT'}
}
const decrement=()=>{
    return{type:'DECREMENT'}
}
const reset=()=>{
    return{type:'RESET'}
}
const increment_by=()=>{
    return{type:'INCREMENT_BY',payload:5}
}
const decrement_by=(value)=>{
    return{type:'DECREMENT_BY',payload:value}
}
store.dispatch(increment())
store.dispatch(increment())
store.dispatch(decrement())
store.dispatch(reset())
store.dispatch(increment_by())
store.dispatch(decrement_by(1))

// console.log(store.subscribe())