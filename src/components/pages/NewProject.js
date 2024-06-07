import { useNavigate } from 'react-router-dom'
import ProjectForm from '../project/ProjectForm'

import styles from './NewProject.module.css'


function NewProject(){

    const history = useNavigate()

    function createPost(project){

        //Initialize cost and services
        project.cost = 0
        project.services = []
        //Ao longo da utilização o custo vai aumentando ou diminuindo, inclusive na questão dos serviços. 
        //Mas a principio temos que iniciar com o valor 0 ou vazio

        /*
        fetch("https://my-json-server.typicode.com/wesley-moraes/my-costs/main/db.json/projects/",{
        
        */
            fetch("http://localhost:5000/projects",{
            method : "POST",
            headers : {
                "Content-type" : "application/json"

            },
            body : JSON.stringify(project),
        }).then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            //redirect
            history('/projects', {
                state: { 
                    message: 'Projeto criado com sucesso!'
                }
            })
        })
        .catch((err) => console.log(err))

    }

    return(
        <div className={styles.newproject_conainer}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar seus serviços</p>

            <ProjectForm handleSubmit = {createPost} btnText="Criar Projeto"/>
        </div>
    )
}

export default NewProject