import { useEffect, useState } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

import styles from './ProjectForm.module.css'

function ProjectForm({handleSubmit, btnText, projectData}){

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {}) //Para edição! Ou eu crio algo novo ou já tenho e quero editar

    useEffect(()=> {
        
        fetch("https://my-costs-db.onrender.com/categories",{
        

        /* 
            fetch("https://my-json-server.typicode.com/wesley-moraes/my-costs/main/db.json/categories/",{
        */
        
        method: "GET",
        headers: {
            "Content-Type" : "application/json"
        }
        }).then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        //console.log(project)
        handleSubmit(project) //Executo o método que foi enviado pela props, e passo o projeto cadastrado no formulário
    }

    function handleChange(e){
        setProject({...project, [e.target.name] : e.target.value})
        //console.log(project)
    } //Método reutilizavel em qualquer input que eu tenha! Independente do input que eu tenha, eu executo ele

    function handleCategory(e){
        setProject({...project, category:{
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,   
            }
        })
        //console.log(project)
    }
    return(
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text" 
                text="Nome do projeto" 
                name="name" 
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />
            <Input
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o orçamento total"
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
            />
            <Select
                name="category_id"
                text="selecione a categoria"
                options = {categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            
            />
            <SubmitButton text={btnText}/>
            
        </form>
    )
}

export default ProjectForm