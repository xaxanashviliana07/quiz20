import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logo from './assets/images/logo.png'
import Loupe from './assets/images/loupe.png'
import Books from './assets/images/books.jpg'


function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [bookCovers, setBookCovers] = useState([]);
  
  const handleChange = (e) => {
    setQuery(e.target.value);
  };


  useEffect(() => {
    async function fetchBookCovers() {
      try {
        const response = await axios.get(
          'https://www.googleapis.com/books/v1/volumes?q=bestsellers'
        );

        const covers = response.data.items.map((book) => ({
          id: book.id,
          title: book.volumeInfo.title,
          cover: book.volumeInfo.imageLinks.thumbnail,
        }));

        setBookCovers(covers);
      } catch (error) {
        console.error('Error fetching popular book covers:', error);
      }
    }

    fetchBookCovers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`
      );
      setBooks(response.data.items);
    } catch (error) {
      console.error('Error', error);
    }
  };


  return (
    <div>
      <div className='header'>
        <figure>
          <img className='logo' src={Logo}/>
        </figure>
        <div className='navbar'>
          <a href=''>Home</a>
          <a href='news'>News</a>
          <a href='contact'>Contact</a>
          <a href='about'>About</a>
          <a href='blog'>Blog</a>
        </div>
        <form className='input-field' onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Enter a book title, genre, author, or keyword"
          />
          <button className='search' type="submit"><img src={Loupe}/></button>
        </form>
      </div>
      <div>
        <div className='bg-img-text'>
          <h1>Book Guide</h1>
          <h2>Online Book Store</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            A quaerat at, aliquam ratione maiores laudantium ipsam tenetur unde fugiat ea.</p>
          <button>Learn More</button>
        </div>
        <img className='image' src={Books}/>
      </div>
      <div>
        <div className="book-covers">
          <h1>Book bestsellers</h1>
          <div className="container">
            {bookCovers.map((book) => (
              <div key={book.id} className="book-cover">
                <img src={book.cover} alt={book.title} />
                <p>{book.title}</p>
              </div>
          ))}
        </div>
    </div>
      </div>
      
      <div className='search-books'>
        {books.map((book) => (
          <div  className='book-card' key={book.id}>
            <img className='book-image' src={book.volumeInfo.imageLinks
                  ? book.volumeInfo.imageLinks.thumbnail
                  : 'https://via.placeholder.com/150'
                } alt="Book Cover"/>
            <div className='book-info'>
              <h2>{book.volumeInfo.title}</h2>
              <p>Authors:{' '}
                {book.volumeInfo.authors
                  ? book.volumeInfo.authors.join(', ')
                  : 'Unknown'}</p>
              <p>Description:{' '}
                {book.volumeInfo.description
                  ? book.volumeInfo.description
                  : 'No description available'}</p>
              <div className='more'>
                <p>More info:{' '}<button className='more-btn'><a href={`https://books.google.com/books?id=${book.id}`} target="_blank" rel="noopener noreferrer">Google Books</a></button></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;