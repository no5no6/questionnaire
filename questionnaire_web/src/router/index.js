import Index from '../views/Index';
import SetQuestion from '../views/SetQuestion';
import QuestionList from '../views/QuestionList';
import Statistics from '../views/Statistics';
import Questionnaire from '../views/Questionnaire';
import Success from '../views/Success';
import Error from '../views/Error';
import Close from '../views/Close';

export default [
    {
        path: '/index',
        component: Index
    },
    {
        path: '/',
        component: Index
    },
    {
        path: '/questionList',
        component: QuestionList
    },
    {
        path: '/setQuestion',
        component: SetQuestion
    },
    {
        path: '/statistics',
        component: Statistics
    },
    {
        path: '/questionnaire/:id',
        component: Questionnaire
    },
    {
        path: '/success',
        component: Success
    },
    {
        path: '/error',
        component: Error
    },
    {
        path: '/close',
        component: Close
    }
];
