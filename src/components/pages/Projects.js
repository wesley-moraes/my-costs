import Message from "../layout/Message"
import Container from '../layout/Container'
import Loading from "../layout/Loading"

import { useLocation } from "react-router-dom"

import styles from './Projects.module.css'
import LinkButton from "../layout/LInkButton"
import ProjectCard from "../project/ProjectCard"
import { useState, useEffect } from "react"

function Projects(){

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('') //

    const location = useLocation()
    let message = ''
    if(location.state) {
        message = location.state.message
    }

    useEffect(() => {
        /*
        
        fetch("https://my-json-server.typicode.com/wesley-moraes/my-costs/main/db.json/projects/", {
        */
        fetch('https://my-costs-db.onrender.com/projects', {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'

            },

        }).then(resp => resp.json())
        .then(data => {
            setProjects(data)
            console.log(data)
            setRemoveLoading(true) //Parar de exibir o Loading depois que carregar os projetos
        })
        .catch(err => console.log(err))
    }, [])

    function removeProject(id){
        setProjectMessage('')

        fetch(`https://my-costs-db.onrender.com/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            },

        }).then(resp => resp.json())
        //.then(data => {
        .then(() => {
            setProjects(projects.filter(
                (project) => project.id !== id
            )) //Para excluir do front, porque já excluiu do back
            setProjectMessage('Projeto removido com sucesso!')
            
        })
        .catch(err => console.log(err))
    }

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            
            {message && 
                <Message type="success" msg={message} />
            }
            {projectMessage && 
                <Message type="success" msg={projectMessage} />
            }
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map(
                        (project) => 
                            <ProjectCard 
                                id = { project.id }
                                name = { project.name } 
                                budget = { project.budget }
                                category = {project?.category?.name}
                                key = { project.id }
                                handleRemove={removeProject}
                            />
                    )
                }

                {
                    !removeLoading && <Loading /> //
                }
                {
                    removeLoading && projects.length === 0 && ( //Quando o Remove Loadin Estiver como True e tiver zero projetos
                        <p>Não há projetos cadastrados!</p>
                    )
                }
            </Container>
        </div>
    )
}

export default Projects