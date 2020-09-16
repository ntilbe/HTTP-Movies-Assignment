import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import MovieList from './MovieList'

const initialFormValues = {
    title:'',
    director: '',
    metascore: 0,
    star1: '',
    star2: '',
    star3: ''
}

const UpdateMovie = (props) => {

    const [formValues, setFormValues] = useState(initialFormValues)
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then ( res => {
                console.log(res.data)
                setFormValues({
                    id: parseInt(res.data.id),
                    title: res.data.title,
                    director: res.data.director,
                    metascore: parseInt(res.data.metascore),
                    star1: res.data.stars[0],
                    star2: res.data.stars[1],
                    star3: res.data.stars[2]
                })
                console.log(formValues)
            })
            .catch(err => {
                console.log(err)
            })
    }, [id])

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
        const updatedMovie = {
            id: formValues.id,
            title: formValues.title,
            director: formValues.director,
            metascore: formValues.metascore,
            stars: [formValues.star1, formValues.star2, formValues.star3]
        }
        console.log(updatedMovie)
        axios
            .put(`http://localhost:5000/api/movies/${id}`, updatedMovie)
            .then( res => {
                const newList = props.movies.filter((mov) => {
                    console.log(id)
                    console.log(mov.id)
                    return updatedMovie.id !== mov.id
                })
                props.setMovieList([updatedMovie,...newList ])
                history.push(`/movies/${id}`)
                
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <form className="movie-card" onSubmit ={handleSubmit}>
                <h2></h2>
                <h3>Director</h3>
                <input
                    type="string"
                    name="director"
                    onChange={changeHandler}
                    value={formValues.director}
                />
                <h3>Metascore</h3>
                <input
                    type="number"
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

                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie