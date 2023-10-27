import { Component } from "react";
import "./App.css";
import CardList from "./components/card-list/card-list.component";
import Searchbox from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
  }
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {}
        )
      );
  }
  //for optimizing code- to avoid unnecessarily running annonymous function everytime render is called

  onSearchChange = (event) => {
    //the string in the textbox user will enter
    const searchField = event.target.value.toLocaleLowerCase();

    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    //for optimizing code
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <Searchbox
          onChangeHandler={onSearchChange}
          placeholder="search monsters"
          className="search-box"
        />
        <CardList monsters={filteredMonsters} />
        {/* {filteredMonsters.map((monster) => {
          return (
            <div key={monster.id}>
              <h1>{monster.name}</h1>
            </div>
          );
        })} */}
      </div>
    );
  }
}

export default App;
