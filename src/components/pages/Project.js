import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import ServiceForm from '../service/ServiceForm'
import Message from '../layout/Message'
import ServiceCard from '../service/ServiceCard'

import {parse, v4 as uuidv4} from 'uuid'

import styles from './Project.module.css'

import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BsToggle2Off } from 'react-icons/bs'

function Project(){

    const {id} = useParams()
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()


    useEffect(() => {
        /*
        Funcionar local
        fetch(`http://localhost:5000/projects/${id}`,
        */
        fetch(`https://my-json-server.typicode.com/wesley-moraes/my-costs/main/db.json/projects/${id}`, 
            {
                method: 'GET',
                headers : {
                    'Content-Type' :  'application/json'
                },    
            }
        ).then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            setServices(data.services)
        })
        .catch((err) => console.log(err))
    }, [id]) //Monitorando o ID, sempre tem que ter uma referencia

    function createService(project){
        setMessage('')

        //last service
        const lastService = project.services[project.services.length  - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //Maxium value validation
        if(newCost > parseFloat(project.budget)){
            setMessage('Orçamento ultrapassado! Verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }

        //add service cost to project total cost
        project.cost = newCost

        //update project
        /**
        
        */
        fetch(`https://my-json-server.typicode.com/wesley-moraes/my-costs/main/db.json/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then(
            (resp) => {
                resp.json()
            }
        )
        .then(
            (data) => {
                //exibir serviços
                //console.log(data)
                setShowServiceForm(false)
            }
        )
        .catch((err) => console.log(err))
    }

    function removeService(id, cost){
        const servicesUpdate = project.services.filter(
            (service) => service.id !== id 
        )

        const projectUpdated = project 

        projectUpdated.services = servicesUpdate
        projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

        /**
        Funcionar local
        fetch(`http://localhost:5000/projects/${projectUpdated.id}`,{
        */

        fetch(`https://my-json-server.typicode.com/wesley-moraes/my-costs/main/db.json/projects/${projectUpdated.id}`,{
            method: "PATCH",
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdate)
            setMessage('Serviço removido com sucesso!')
        })
        .catch(err => console.log(err))
    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm) //Alterna entre true e false
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm) //Alterna entre true e false
    }

    function editPost(project){
        setMessage('')

        //budget validation
        if(project.budget < project.cost){
            setMessage('O orçamento não pode ser menor que o custo do projeto! ')
            setType('error')
            return false
        }

        /**
            fetch(`http://localhost:5000/projects/${id}`, {
        */
        fetch(`https://my-json-server.typicode.com/wesley-moraes/my-costs/main/db.json/projects/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then(
            resp => resp.json()
        )
        .then(
            (data) => {
                setProject(data)
                setShowProjectForm(false)
                //message
                setMessage('Projeto atualizado')
                setType('success')
            }
        )
        .catch(err => console.log(err))
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    {message && <Message type={type} msg={message} />}
                    <Container customClass="column">
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}    
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria: </span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento: </span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado: </span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm 
                                        handleSubmit = {editPost} 
                                        btnText = "Concluir Edição" 
                                        projectData = {project}
                                    />    
                                </div>
                            )}
                        </div>
                        <div className={styles.service_form_contaier}>
                            <h2>Adicone um serviço: </h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adiconar Serviço' : 'Fechar'}    
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnText="Adicionar Serviço"
                                        projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>
                            Serviços
                        </h2>
                        <Container customClass="start">
                            {services.length > 0 &&
                                
                                services.map((service) => (
                                    
                                    <ServiceCard
                                        id={service.id}
                                        name={service.name}
                                        cost={service.cost}
                                        description={service.description}
                                        key={service.id}
                                        handleRemove={removeService}
                                    />
                                ))
                            }
                            {
                                services.length ===0 && <p>Não há serviços cadastrados</p>
                            }
                        </Container>
                    </Container>
                </div>
                ) : (
                   <Loading />
                )
            }
        </>
    )
}

export default Project