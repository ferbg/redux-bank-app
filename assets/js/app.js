(function () {

  const { createStore, combineReducers } = Redux;

  let store;

  const initialState = {
    balance : 0,
  };

  document.addEventListener("DOMContentLoaded", (event) => {
    initApp();
  });

  const reducerBalance = (state = [], action) => {
    return state;
  }

  const rootReducer = combineReducers({
    balance: reducerBalance
  });

  function initApp() {

    store = createStore(
      rootReducer,
      initialState,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    );


    document.getElementById('withdraw-button').addEventListener( 'click', (event) => {
      event.preventDefault();
    } );

    document.getElementById('deposit-button').addEventListener( 'click', (event) => {
      event.preventDefault();
    } );

    store.subscribe(handleChange);
    render();
  }

  function handleChange() {
    render();
  }

  function render() {
    const state = store.getState();

    let balance = state.balance;

    renderBalance( balance );

  }

  function renderBalance(balance) {
    document.getElementById('balance-tag').innerHTML = balance + "$";
  }

})();