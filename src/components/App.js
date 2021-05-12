import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { nanoid } from 'nanoid'
import './App.css'
import RightBarHome from './RightBarHome'
import LeftBar from './LeftBar'
import RightBarVoting from './RightBarVoting'
import RightBarBreeds from './RightBarBreeds'
import RightBarGallery from './RightBarGallery'
import RightBarSelectedBreed from './RightBarSelectedBreed'
import Favourites from './Favourites'
import Votes from './Votes'
import Search from './Search'
const App = () => {
  const userId = nanoid()
  return (
    <Router>
      <div className='app'>
        <LeftBar />
        <Switch>
          <Route exact path='/'>
            <RightBarHome />
          </Route>
          <Route exact path='/voting'>
            <RightBarVoting userId={userId} />
          </Route>
          <Route exact path='/breeds'>
            <RightBarBreeds />
          </Route>
          <Route exact path='/breeds/:id'>
            <RightBarSelectedBreed />
          </Route>
          <Route exact path='/gallery'>
            <RightBarGallery userId={userId} />
          </Route>
          <Route exact path='/favourites'>
            <Favourites userId={userId} />
          </Route>
          <Route exact path='/likes'>
            <Votes userId={userId} value={1} />
          </Route>
          <Route exact path='/dislikes'>
            <Votes userId={userId} value={0} />
          </Route>
          <Route exact path='/search/:name'>
            <Search />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
