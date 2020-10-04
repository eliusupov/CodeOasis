import axios from 'axios';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
	books: [],
	isBookModalOpen: false,
	bookIdToUpdate: null,
	searchString: '',
};

const setBookModalOpen = (state, action) => {
	return {
		...state,
		isBookModalOpen: !state.isBookModalOpen,
		bookIdToUpdate: action.bookIdToUpdate || null,
	};
};

const setNewBook = (state, action) => {
	const booksCopy = [...state.books];
	booksCopy.push(action.book);
	return {
		...state,
		books: booksCopy,
	};
};

const setAllBooks = (state, action) => {
	return {
		...state,
		books: action.books,
	};
};

const setUpdatedBook = (state, action) => {
	const booksCopy = [...state.books];
	const index = booksCopy.findIndex(book => book._id === action.book._id);
	booksCopy[index] = action.book;
	return {
		...state,
		books: booksCopy,
	};
};

const setDeletedBook = (state, action) => {
	return {
		...state,
		books: state.books.filter(book => book._id !== action.bookId),
	};
};

const setSetSearchForBook = (state, action) => {
	return {
		...state,
		searchString: action.searchString,
	};
};

const booksReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_TOGGLE_BOOK_MODAL:
			return setBookModalOpen(state, action);
		case actionTypes.SET_NEW_BOOK:
			return setNewBook(state, action);
		case actionTypes.SET_GET_BOOKS:
			return setAllBooks(state, action);
		case actionTypes.SET_UPDATED_BOOK:
			return setUpdatedBook(state, action);
		case actionTypes.SET_DELETED_BOOK:
			return setDeletedBook(state, action);
		case actionTypes.SET_SEARCH_FOR_BOOK:
			return setSetSearchForBook(state, action);
		default:
			return state;
	}
};

export default booksReducer;
