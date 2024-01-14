import React from 'react';
import { Link } from 'react-router-dom';

const NotesList = ({ notes, username, userId }) => {
  return (
    <div>
      {/* <h2>Your Notes:</h2> */}
      <Link to={`/user/${userId}`} className="text-sm font-semibold font-otherNames">
        {/* &nbsp;@{username} */}
      </Link>
      <ul>
        {notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
