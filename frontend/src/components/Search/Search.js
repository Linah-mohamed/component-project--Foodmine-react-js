import React , { useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import classes from './Search.module.css'
export default function Search() {
    const [term, SetTerm]=useState('');
    const navigate=useNavigate();
    const {searchTerm} = useParams();

    useEffect(()=>{
      SetTerm(searchTerm ?? '');
    }, [searchTerm]);

    const search=async () => {
        term? navigate('/search/'+term) : navigate('/');    }

  return (
    <div className={classes.container}>
        <input type='text' 
        placeholder='Search Food Mine!' 
        onChange={e=>SetTerm(e.target.value)}
        onKeyUp={e=> e.key === 'Enter' && search()}
        value={term}
/>
<button onClick={search}>Search</button>
        </div>
  );
}
