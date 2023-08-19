import styles from './Project.module.css'

import { useParams } from 'react-router-dom'

function Project(){

    const {id} = useParams()
    

    return (
        <div>
            <p>Projeto {id}</p>
        </div>
    )
}

export default Project