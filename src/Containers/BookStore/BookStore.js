import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../store/actions/actions';

import BookCard from '../../Components/BookStore/BookCard/BookCard';
import BookModal from '../../Components/BookStore/BookModal/BookModal';
import MainNavBar from '../../Components/MainComponents/MainNavBar/MainNavBar';

import classes from './BookStore.module.scss';

const bookStore = props => {
	const { history } = props;
	const dispatch = useDispatch();
	const cart = useSelector(state => state.userReducer.cart);
	const token = useSelector(state => state.userReducer.token);
	const books = useSelector(state => state.booksReducer.books);
	const isAdmin = useSelector(state => state.userReducer.isAdmin);
	const searchString = useSelector(state => state.booksReducer.searchString);
	const bookIdToUpdate = useSelector(state => state.booksReducer.bookIdToUpdate);
	const isBookModalOpen = useSelector(state => state.booksReducer.isBookModalOpen);
	const { getAllBooks, toggleBookModal, deleteBook, userGetCart, userAddToCart } = actions;

	useEffect(() => {
		if (token) {
			dispatch(getAllBooks());
			dispatch(userGetCart());
		}
	}, [token]);

	console.log(cart);

	return (
		<div className={classes.bookStore}>
			<MainNavBar history={history} />
			<BookModal
				isBookModalOpen={isBookModalOpen}
				bookToUpdate={bookIdToUpdate ? books.find(book => book._id === bookIdToUpdate) || {} : {}}
			/>
			<div className={classes.inner}>
				<div className={classes.innerContent}>
					{books
						.filter(
							book =>
								!cart.find(cartBook => cartBook._id === book._id) &&
								(book.author.toLowerCase().includes(searchString) ||
									book.publisher.toLowerCase().includes(searchString) ||
									book.title.toLowerCase().includes(searchString)),
						)
						.map(book => (
							<BookCard
								book={book}
								key={book._id}
								isAdmin={isAdmin}
								addToCart={bookId => dispatch(userAddToCart(bookId))}
								deleteBook={bookIdToDelete => dispatch(deleteBook(bookIdToDelete))}
								toggleBookModal={bookIdToUpdate => dispatch(toggleBookModal(bookIdToUpdate))}
							/>
						))}
				</div>
			</div>
		</div>
	);
};

export default bookStore;
