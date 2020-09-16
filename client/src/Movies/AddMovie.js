import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import axios from 'axios'

const initialFormValues = {
    title:'',
    director: '',
    metascore: '',
    star1: '',
    star2: '',
    star3: '',
    id: Math.floor(Math.random()*1000) 
}

const AddMovie = (props) => {

    const [formValues, setFormValues] = useState(initialFormValues)
    const history = useHistory()

    const changeHandler = e => {
        const value = e.target.value
        const name = e.target.name

        setFormValues({
            ...formValues,
            [name]: value,
        });
        
    }

    const handleSubmit = e => {
        e.preventDefault()

        const newMovie = {
            id: formValues.id,
            title: formValues.title,
            director: formValues.director,
            metascore: formValues.metascore,
            stars: [formValues.star1, formValues.star2, formValues.star3]
        }

        axios
        .post(`http://localhost:5000/api/movies/`, newMovie)
        .then( res => {
            console.log('posted', res)
            props.setMovieList([newMovie,...props.newList ])
            history.push(`/`)
        })
        .catch(err => console.log(err))
        
    }

    return (
        <div>
            <form className="movie-card" onSubmit ={handleSubmit}>
                <h3>Title</h3>
                <input
                    type="string"
                    name="title"
                    onChange={changeHandler}
                    value={formValues.title}
                />
                <h3>Director</h3>
                <input
                    type="string"
                    name="director"
                    onChange={changeHandler}
                    value={formValues.director}
                />
                <h3>Metascore</h3>
                <input
                    type="string"
                    name="metascore"
                    onChange={changeHandler}
                    value={formValues.metascore} />
                <h3>Stars</h3>
                <input
                    type="string"
                    name="star1"
                    onChange={changeHandler}
                    value={formValues.star1}
                />

                <input
                    type="string"
                    name="star2"
                    onChange={changeHandler}
                    value={formValues.star2}
                />

                <input
                    type="string"
                    name="star3"
                    onChange={changeHandler}
                    value={formValues.star3}
                />

                <button>Add</button>
            </form>
        </div>
    )
}

export default AddMovie