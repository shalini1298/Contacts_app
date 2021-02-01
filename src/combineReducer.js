import { combineReducers } from 'redux';
import contacts from './reducer';

export default combineReducers({
    contacts: contacts
});