// ** get input value

const getInputValue = id => {
    const inputValue = document.getElementById(id).value

    document.getElementById(id).value = ``;

    return inputValue
};

// ** buttonHandler addTodo()
// ** Dynamic id 
let id = 0;

const addTodo = ()=>{
    
    id++;
    // ** get the value input

    const inputValue = getInputValue('todo-text');

     // ** Set value to ls
     setLocalStoreValue(inputValue,id)
    // ** Display input value
    // displayInput(inputValue)
    displayLsValueToUi()
   
};

const displayInput = (inputValue)=>{
    // ** Where to display

    const displayContainer = document.getElementById('todo-list');

    const item = document.createElement('li');
    item.innerText = inputValue;

    displayContainer.appendChild(item)
};

// ** Store value to ls

// ** First a dekhbo previous kono value localStorage a ase kina

const getValueFromLs = ()=>{
    const getLocalStoreValue = JSON.parse(localStorage.getItem('todo'));

    let localStoreValueArray = [];

    getLocalStoreValue && (localStoreValueArray = getLocalStoreValue);

    return localStoreValueArray;
};

// ** Set localStorage value to ls

const setLocalStoreValue = (inputValue)=>{

    if(inputValue.length === 0) {
        return;
    }
    // ** get localStorage value
    const storeValue  = getValueFromLs();

    if (storeValue.length === 0) {
        const newValueToLs = [
            {   
                
                title: inputValue,
                completed:false
            }
        ];
        // ** now set the value to ls
        localStorage.setItem('todo',JSON.stringify(newValueToLs))
    } else{
        const newValueToLs = [
            ...storeValue,
            {   
                
                title:inputValue,
                completed: false
            }
        ];
        // ** now set the value to ls
        localStorage.setItem('todo',JSON.stringify(newValueToLs))
    }

    
};

// ** Display localStorage value to ui

const displayLsValueToUi = ()=>{
    // ** Where to display
    const displayContainer = document.getElementById('todo-list');
    displayContainer.innerText = ``;
    const savedValue = getValueFromLs();
    console.log(savedValue)
    savedValue.length === 0 && (displayContainer.innerHTML = "No Data")
    savedValue.forEach((value,index) => {
        const {title,id} = value;
        const item = document.createElement('li');
        item.innerHTML = `${title}
        <button onclick="deleteHandler(${index})" class='bg-slate-500 p-5 ml-96'>Delete</button>
        `
        displayContainer.appendChild(item)
    })
};

displayLsValueToUi();

// ** deleteHandler

const deleteHandler = index=>{
    // ** get todo from ls 

    let savedValues = getValueFromLs();
    
    savedValues.splice(index,1);

    // ** set value to ls

    localStorage.setItem('todo',JSON.stringify(savedValues));

    displayLsValueToUi()

}

// ** clearAll functionality

const clearAll = ()=>{
    // ** clearAll

    localStorage.removeItem('todo')
    
    displayLsValueToUi()


}