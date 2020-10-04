import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as actions from './actions';

const setBookModalOpen = bookIdToUpdate => ({ type: actionTypes.SET_TOGGLE_BOOK_MODAL, bookIdToUpdate });
const setNewBook = book => ({ type: actionTypes.SET_NEW_BOOK, book });
const setGetBooks = books => ({ type: actionTypes.SET_GET_BOOKS, books });
const setUpdatedBook = book => ({ type: actionTypes.SET_UPDATED_BOOK, book });
const setDeletedBook = bookId => ({ type: actionTypes.SET_DELETED_BOOK, bookId });
const setSearchForBook = searchString => ({ type: actionTypes.SET_SEARCH_FOR_BOOK, searchString });

export const getAllBooks = () => async dispatch => {
	try {
		const response = await axios.get('http://localhost:3000/book');
		const { data } = response;
		const { books } = data;
		dispatch(setGetBooks(books));
	} catch (err) {
		console.log(err);
	}
};

export const toggleBookModal = bookIdToUpdate => async dispatch => {
	dispatch(setBookModalOpen(bookIdToUpdate));
};

export const addNewBook = ({ title, author, publisher, image }) => async dispatch => {
	try {
		const response = await axios.put('http://localhost:3000/book/create', { title, author, publisher, image });
		const { data } = response;
		const { book } = data;
		dispatch(setNewBook(book));
		dispatch(actions.toggleBookModal());
	} catch (err) {
		console.log(err);
	}
};

export const updateBook = ({ id, title, author, publisher, image }) => async dispatch => {
	try {
		const response = await axios.put('http://localhost:3000/book/update', { id, title, author, publisher, image });
		const { data } = response;
		const { book } = data;
		dispatch(setUpdatedBook(book));
		dispatch(actions.toggleBookModal());
	} catch (err) {
		console.log(err);
	}
};

export const deleteBook = id => async dispatch => {
	try {
		const response = await axios.delete(`http://localhost:3000/book/delete/${id}`);
		const { data } = response;
		const { id: _id } = data;
		dispatch(setDeletedBook(_id));
	} catch (err) {
		console.log(err);
	}
};

export const searchForBook = searchString => async dispatch => {
	dispatch(setSearchForBook(searchString));
};
