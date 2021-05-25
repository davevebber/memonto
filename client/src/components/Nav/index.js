import React, { useEffect } from 'react';
import { capitalizeFirstLetter } from '../../utils/helpers';

function Nav(props) {
    const {
        subjects = [],
        setCurrentSubject,
        SubjectSelected,
        currentSubject,
        setSubjectSelected,
    } = props;

    return (
        <header className='flex-row px-1'>
            <h2>
                <a href='/'> Your Notes</a>
            </h2>
            <nav>
                <ul className='flex-row'>
                    <li>
                        <a href='Notebook'>
                            Notebook
                      </a>
                    </li>
                    {/* <li className={`mx-2 ${SubjectSelected && 'navActive'}`}>
            <span onClick={() => setSubjectSelected(true)}></span>
          </li> */}
          {subjects.map((subject) => (
            <li
              className={`mx-1 ${
                currentSubject.name === subject.name && !SubjectSelected && 'navActive'
                }`}
              key={subject.name}
            >
              <span
                onClick={() => {
                  setCurrentSubject();
                  setSubjectSelected(false);
                }}
              >
                {capitalizeFirstLetter(subject.name)}
              </span>
            </li>
          ))}
                </ul>
            </nav>
        </header>
    );
}

export default Nav;