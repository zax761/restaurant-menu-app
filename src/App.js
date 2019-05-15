import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = { categories: [], short_name: null, dishes: [] };

  onClickCategory = short_name => {
    axios
      .get(
        `https://stream-restaurant-menu-svc.herokuapp.com/item?category=${short_name}`
      )
      .then(res => {
        this.setState({
          short_name,
          dishes: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    axios
      .get("https://stream-restaurant-menu-svc.herokuapp.com/category")
      .then(res => {
        this.setState({ categories: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { categories, short_name, dishes } = this.state;
    return (
      <div className="App">
        <h1>Menu Categories</h1>
        <div className="Container">
          <div className="Categories">
            <ul>
              {categories.map(category => (
                <li
                  key={category.id}
                  onClick={() => this.onClickCategory(category.short_name)}
                >{`${category.name} - (${category.short_name})`}</li>
              ))}
            </ul>
          </div>
          <div className="Dishes">
            {!short_name ? null : (
              <table>
                <caption>{`Items in Category: (${short_name})`}</caption>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {dishes.map(dish => (
                    <tr key={dish.id}>
                      <td>{dish.name}</td>
                      <td>{dish.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
