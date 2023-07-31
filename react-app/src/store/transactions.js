const GET_TRANSACTIONS = 'transactions/GET_TRANSACTIONS'
const ADD_TRANSACTION = 'transactions/ADD_TRANSACTION'
const DELETE_TRANSACTION = 'transactions/DELETE_TRANSACTION'
const CLEAR_TRANSACTIONS = 'transactions/CLEAR_TRANSACTIONS'

export const clearTransactions = () => {
    return {
        type: CLEAR_TRANSACTIONS
    }
}
export const getTransactions = (transactions) => {
    return {
        type: GET_TRANSACTIONS,
        payload: transactions
    }
}
export const addTransaction = (transaction) => {
    return {
        type: ADD_TRANSACTION,
        payload: transaction
    }
}
export const deleteTransaction = (transaction) => {
    return {
      type: DELETE_TRANSACTION,
      payload: transaction,
    };
};
export const getEveryTransaction = () => async (dispatch) => {
  const response = await fetch(`/api/transactions/`);
  if(response.ok) {
      const details = await response.json();

      await dispatch(getTransactions(details));
      return details;
  }
}
export const getAllTransactions = () => async (dispatch) => {
    const response = await fetch(`/api/transactions/current`);
    if(response.ok) {
        const details = await response.json();

        await dispatch(getTransactions(details));
        return details;
    }
}
export const getTransactionById = (id) => async (dispatch) => {
    const response = await fetch(`api/transactions/${id}`);
    if(response.ok) {
        const details = await response.json();
        await dispatch(addTransaction(details));
        return details;
    }
}
export const deleteTransactionThunk = (transaction) => async (dispatch) => {
    const response = await fetch(`/api/transactions/${transaction.id}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });
    if (response.ok) {
      const details = await response.json();

      dispatch(deleteTransaction(transaction));
    }
};
export const createTransactionThunk = (transaction) => async (dispatch) => {

    const response = await fetch(`/api/transactions/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });
    if (response.ok) {
      const details = await response.json();
      dispatch(addTransaction(details));
      return details;
    }
  };
  export const updateTransactionThunk = (transaction, id) => async (dispatch) => {
    const response = await fetch(`/api/transactions/${id}/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    });
    if (response.ok) {
      const details = await response.json();
      dispatch(addTransaction(details));
      return details;
    }
  };

  export default function transactionsReducer(state = {}, action) {
    let newState = {};
    switch(action.type){
        case GET_TRANSACTIONS:
            newState = {...state};
            action.payload.transactions.forEach(transaction => {
                newState[transaction.id] = transaction;
            })
            return newState;
        case ADD_TRANSACTION:
            newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_TRANSACTION:
            newState = {...state};
            delete newState[action.payload.id];
            return newState
        case CLEAR_TRANSACTIONS:
          newState = {}
          return newState
        default:
            return state;
    }
  }
