import React from 'react'
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

class App extends React.Component {
  state = { bgColor: '' }
  userId = nanoid()
  darkenScreen = () => {
    this.setState({ darken: 'rgba(29,29,29, 0.6)' })
  }
  lightenScreen = () => {
    this.setState({ darken: false })
  }
  render() {
    return (
      <Router>
        <div className='app' style={{ position: 'relative' }}>
          <div
            style={{
              backgroundColor: this.state.darken,
              display: this.state.darken ? 'block' : 'none',
              position: 'absolute',
              width: '100%',
              height: '100%',
              zIndex: '0',
            }}
          ></div>
          <LeftBar />

          <Switch>
            <Route exact path='/'>
              <RightBarHome />
            </Route>
            <Route exact path='/voting'>
              <RightBarVoting userId={this.userId} />
            </Route>
            <Route exact path='/breeds'>
              <RightBarBreeds />
            </Route>
            <Route exact path='/breeds/:id'>
              <RightBarSelectedBreed />
            </Route>
            <Route exact path='/gallery'>
              <RightBarGallery userId={this.userId} />
            </Route>
            <Route exact path='/favourites'>
              <Favourites userId={this.userId} />
            </Route>
            <Route exact path='/likes'>
              <Votes userId={this.userId} value={1} />
            </Route>
            <Route exact path='/dislikes'>
              <Votes userId={this.userId} value={0} />
            </Route>
            <Route exact path='/search/:name'>
              <Search />
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
