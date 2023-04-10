import { useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays }  from '../util/date'
import { fetchExpenses } from '../util/http';

function RecentExpenses() {
    //const expensesCtx = useContext(ExpensesContext);

    const [fetchedExpenses, setFetchExpenses] = useState([]);

    useEffect(() => {
        async function getExpenses() {
            const expenses = await fetchExpenses();
            setFetchExpenses(expenses);
        }    
        getExpenses();
    }, []);

    const recentExpenses = fetchedExpenses.filter((expense)=>{
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today,7);

        return expense.date >= date7DaysAgo && expense.date <= today;
    });

    return (
        <ExpensesOutput 
            expenses={recentExpenses} 
            expensesPeriod="Last 7 Days"
        />
    );
}

export default RecentExpenses;