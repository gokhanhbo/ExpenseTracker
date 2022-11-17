import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2022-11-12')
    },
    {
        id: 'e2',
        description: 'A pair of t-short',
        amount: 89.29,
        date: new Date('2022-10-15')
    },
    {
        id: 'e3',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2022-12-21')
    },
    {
        id: 'e4',
        description: 'Lego',
        amount: 78.999,
        date: new Date('2022-02-09')
    },
    {
        id: 'e5',
        description: 'Book',
        amount: 23.99,
        date: new Date('2022-01-09')
    },
    {
        id: 'e6',
        description: 'Lego',
        amount: 78.99,
        date: new Date('2022-02-09')
    },
    {
        id: 'e7',
        description: 'Lego',
        amount: 78.99,
        date: new Date('2022-02-09')
    },
    {
        id: 'e8',
        description: 'Lego',
        amount: 78.99,
        date: new Date('2022-02-09')
    },
    {
        id: 'e9',
        description: 'Lego',
        amount: 78.99,
        date: new Date('2022-02-09')
    },
    {
        id: 'e10',
        description: 'Lego',
        amount: 78.99,
        date: new Date('2022-02-09')
    },
    {
        id: 'e11',
        description: 'Lego',
        amount: 178.99,
        date: new Date('2022-02-09')
    },
];

export const ExpensesContext= createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: ({id}) => {},
    updateExpense: (id, {description, amount, date}) => {},

});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state]
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex( (expense) => expense.id === action.payload.id );
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = { ...updatableExpense, ...action.payload.data};
            const updatedExpenses = [ ...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload )
        default:
            return state;
    }
}

function ExpensesContextProvider({children}) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });
    }

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id})
    }

    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload:{id:id, data: expenseData}})
    }


    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };


    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;