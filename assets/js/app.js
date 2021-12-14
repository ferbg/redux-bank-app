(function () {

  const { createStore, combineReducers } = Redux;

  let store;

  let notifications = [
    {
      id : 1,
      read : false,
      text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      id : 2,
      read : false,
      text : 'Nullam non tristique arcu, quis scelerisque felis.'
    },
    {
      id : 3,
      read : false,
      text : 'Mauris arcu nisi, dictum sed quam et, vehicula sagittis libero.'
    },
    {
      id : 4,
      read : true,
      text : 'Praesent feugiat mauris eu metus tincidunt volutpat. Nunc non dictum tellus.'
    }
  ]

  const initialState = {
    balance : 0,
    notifications: notifications
  };

  document.addEventListener("DOMContentLoaded", (event) => {
    initApp();
  });

  const reducerBalance = (state = [], action) => {
    switch (action.type) {
      case 'deposit':
        return state + action.payload;
      case 'withdraw':
        return state - action.payload;
      default:
        return state;
    }
  }

  const reducerNotifications = (state = [], action) => {
    switch (action.type) {
      case 'add_notification':
        return [...state, action.payload];
      case 'read_notification':
        const id = action.payload;
        const notifications = [...state];
        notifications.forEach( item => {
          if ( item.id === id ) {
            item.read = true;
          }
        } );
        return notifications;
      default:
        return state;
    }
  }

  const rootReducer = combineReducers({
    balance: reducerBalance,
    notifications: reducerNotifications
  });

  const deposit = (quantity) => {
    return {
      type    : 'deposit',
      payload : quantity
    }
  }

  const withdraw = (quantity) => {
    return {
      type    : 'withdraw',
      payload : quantity
    }
  }

  const addNotification = (text) => {
    return {
      type    : 'add_notification',
      payload : {
        id   : Math.floor(Math.random() * 1000),
        text : text,
        read : false,
      }
    }
  }

  const readNotification = (id) => {
    return {
      type: 'read_notification',
      payload: id
    }
  }

  function initApp() {

    store = createStore(
      rootReducer,
      initialState,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    );

    document.getElementById('withdraw-button').addEventListener( 'click', (event) => {
      store.dispatch(withdraw(10));
      event.preventDefault();
    } );

    document.getElementById('deposit-button').addEventListener( 'click', (event) => {
      store.dispatch(deposit(10));
      event.preventDefault();
    } );

    store.subscribe(handleChange);

    render();

    setTimeout( () => {
      store.dispatch(addNotification("lipsum content!!"));
    }, 5000 );
  }


  function handleChange() {
    render();
  }

  function render() {
    const state = store.getState();

    renderBalance(state.balance);
    renderNotifications(state.notifications)
  }

  function renderBalance(balance) {
    document.getElementById('balance-tag').innerHTML = balance + "$";
  }

  function renderNotifications(notifications) {
    const $container = document.getElementById('notifications-list');
    $container.innerHTML = '';

    let notificationsHtml = '';
    notifications.forEach(notification => {
      notificationsHtml += renderNotification(notification);
    });
    $container.innerHTML = notificationsHtml;

    const buttons = $container.querySelectorAll('.destroy');
    buttons.forEach( button => {
      button.addEventListener( 'click', (event) => {
        const id = parseInt( button.parentNode.dataset.id, 10 );
        store.dispatch( readNotification(id) );
        event.preventDefault();
      } );
    } );
  }

  function renderNotification(notification) {
    return `
    <li data-id="${notification.id}">
      <label class="checkbox">
        <span class="icon has-text-${notification.read ? 'success': 'info'}">
          <i class="bi ${notification.read ? 'bi-check-lg': 'bi-exclamation-circle-fill'}"></i>
        </span>
        ${notification.text}
      </label>
      ${notification.read ? '' : '<button class="destroy button is-light"><span class="icon"><i class="bi bi-envelope-open"></i></span></button>'}
    </li>`;
  }

})();
