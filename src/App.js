import './App.css';
import Search from './components/Search'
import NewStoreForm from './components/NewStoreForm';
import StoreList from './components/StoreList';
import { useState, useEffect } from 'react';

function App() {


  const [stores, setStores] = useState([])
  const [searchStore, setSearchStore] = useState("")

  useEffect(() => {
    fetch('http://localhost:8085/stores')
    .then(res => res.json())
    .then(storesList => setStores(storesList))}, [])

  
  const onAddStore = event => {
    event.preventDefault();

    const newStore = {
      "name": event.target.name.value,
      "image": event.target.image.value,
      "season": event.target.season.value,
      "episode": event.target.episode.value,
      "episodeUrl": "https://bobsburgers-api.herokuapp.com/episodes",
      "url": "https://bobsburgers-api.herokuapp.com/storeNextDoor"
    }

    console.log(newStore);

    fetch('http://localhost:8085/stores', {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify(newStore)
    })
    .then(res => res.json())
    .then(newStore => setStores([...stores, newStore]))

  };

  const onUpdateSearchStore = event => setSearchStore(event.target.value)

  const filteredStores = stores.filter(store => {
    if(searchStore === "") return true;
     else {
      // console.log(store.name)
      return store.name.toUpperCase().includes(searchStore.toUpperCase())
    }
  })


  return (
    <div className="main-container">
      <img src="/images/bobsburgers.png" />
      <h1>Neighbor Stores</h1>
      <Search searchStore={searchStore} onUpdateSearchStore={onUpdateSearchStore} />
      <NewStoreForm onAddStore={onAddStore} />
      <StoreList stores={filteredStores} />
    </div>
  );
}

export default App;
