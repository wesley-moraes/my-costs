import styles from './Home.module.css'
import savings from '../../img/savings.svg'
import LinkButton from '../layout/LInkButton'

function Home(){
    return(
        <section className={styles.home_container}>
            <h1>Bem vindo ao <span>My Costs</span></h1>
            <p>Comece a gerenciar seus projetos agora mesmo</p>
            <LinkButton to="/newproject" text="Criar Projeto" />
            <img src={savings} alt='Purple Costs' />
        </section>
    )
}

export default Home