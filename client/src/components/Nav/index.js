import React, { useEffect } from 'react';
import { capitalizeFirstLetter } from '../../utils/helpers';
import {Link} from 'react-router-dom'
import './nav.css';

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
            <h1 className='logo'>
                <Link to ='/'>Memonto</Link>
            </h1>
            <nav>
                <ul className='nav-item'>
                    <li>
                        <Link to ='/notebook'>
                            Notebooks
                        </Link>
                    </li>
                    <li>
                        <Link to ='/login'>
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link to ='/signup'>
                            Sign-up
                        </Link>
                    </li>
                    {/* <li className={`mx-2 ${SubjectSelected && 'navActive'}`}>
            <span onClick={() => setSubjectSelected(true)}></span>
          </li> */}
                    {subjects.map((subject) => (
                        <li
                            className={`mx-1 ${currentSubject.name === subject.name && !SubjectSelected && 'navActive'
                                }`}
                            key={subject.name}
                        >
                            <span
                                onClick={() => {
                                    setCurrentSubject(subject);
                                    setSubjectSelected(false);
                                }}
                            >
                                {/* {capitalizeFirstLetter(subject.name)} */}
                            </span>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

export default Nav;