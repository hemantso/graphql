import React from 'react'
import {
  useQuery,
  gql,
} from '@apollo/client';

const getBookQuery = gql`
  {
    books {
      name
      id
    }
  }
`

const BookList = () => {
  const { loading, error, data } = useQuery(getBookQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  
  return (
    <div>
      <ul id="book-list">

      </ul>
    </div>
  )
}

export default BookList