import Header from './components/Header';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import './css/style.css';

function HomePage(){
    return(
        <div className='grid-container'>
            <Header />
            <Sidebar />
            <Home />
        </div>
    )
}

export default HomePage;