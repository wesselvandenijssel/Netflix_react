import logo from './logo.svg';
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searchUrl: "" };


    this.handleChange.bind(this);
    this.handleKeyUp.bind(this);
  }

  handleKeyUp(event) {
    if (event.key === 'Enter' && this.state.searchTerm !== "") {
      var searchUrl = "search/multi?query=" + this.state.searchTerm + "&api_key=166624c030b91c943c397020f20525b4";
      this.setState({
        searchUrl: searchUrl });

    }
  }

  handleChange(event) {
    this.setState({
      searchTerm: event.target.value });

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("header", { className: "Header" }, /*#__PURE__*/
      React.createElement(Logo, null), /*#__PURE__*/
      React.createElement(Navigation, null), /*#__PURE__*/
      React.createElement("div", { id: "search", className: "Search" }, /*#__PURE__*/
      React.createElement("input", { onChange: this.handleChange, onKeyUp: this.handleKeyUp, value: this.state.searchTerm, placeholder: "Search for a title..." })), /*#__PURE__*/

      React.createElement(UserProfile, null)), /*#__PURE__*/

      React.createElement(Hero, null), /*#__PURE__*/
      React.createElement(TitleList, { title: "Search Results", url: this.state.searchUrl }), /*#__PURE__*/
      React.createElement(TitleList, { title: "Top TV picks for Jack", url: "discover/tv?sort_by=popularity.desc&page=1" }), /*#__PURE__*/
      React.createElement(TitleList, { title: "Trending now", url: "discover/movie?sort_by=popularity.desc&page=1" }), /*#__PURE__*/
      React.createElement(TitleList, { title: "Most watched in Horror", url: "genre/27/movies?sort_by=popularity.desc&page=1" }), /*#__PURE__*/
      React.createElement(TitleList, { title: "Sci-Fi greats", url: "genre/878/movies?sort_by=popularity.desc&page=1" }), /*#__PURE__*/
      React.createElement(TitleList, { title: "Comedy magic", url: "genre/35/movies?sort_by=popularity.desc&page=1" })));


  }}


class Navigation extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "navigator", className: "Navigation" }, /*#__PURE__*/
      React.createElement("nav", null, /*#__PURE__*/
      React.createElement("ul", null, /*#__PURE__*/
      React.createElement("li", null, "Browse"), /*#__PURE__*/
      React.createElement("li", null, "My List"), /*#__PURE__*/
      React.createElement("li", null, "Top picks"), /*#__PURE__*/
      React.createElement("li", null, "Recent")))));




  }}


class UserProfile extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "UserProfile" }, /*#__PURE__*/
      React.createElement("div", { className: "User" }, /*#__PURE__*/
      React.createElement("div", { className: "name" }, "Wessel van den IJssel"), /*#__PURE__*/
      React.createElement("div", { className: "image" }, /*#__PURE__*/
      React.createElement("img", { src: "https://www.wesselvandenijssel.nl/wp-content/uploads/2021/12/pp.png", alt: "profile" })))));




  }}


class Hero extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "hero", className: "Hero", style: { backgroundImage: 'url(https://images.alphacoders.com/633/633643.jpg)' } }, /*#__PURE__*/
      React.createElement("div", { className: "content" }, /*#__PURE__*/
      React.createElement("img", { className: "logo", src: "http://www.returndates.com/backgrounds/narcos.logo.png", alt: "narcos background" }), /*#__PURE__*/
      React.createElement("h2", null, "Season 2 now available"), /*#__PURE__*/
      React.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque id quam sapiente unde voluptatum alias vero debitis, magnam quis quod."), /*#__PURE__*/
      React.createElement("div", { className: "button-wrapper" }, /*#__PURE__*/
      React.createElement(HeroButton, { primary: true, text: "Watch now" }), /*#__PURE__*/
      React.createElement(HeroButton, { primary: false, text: "+ My list" }))), /*#__PURE__*/


      React.createElement("div", { className: "overlay" })));


  }}


class HeroButton extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("a", { a: true, href: "#", className: "Button", "data-primary": this.props.primary }, this.props.text));

  }}


class TitleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      mounted: false };

  }

  loadContent() {
    var requestUrl = 'https://api.themoviedb.org/3/' + this.props.url + '&api_key=166624c030b91c943c397020f20525b4';
    fetch(requestUrl).then(response => {
      return response.json();
    }).then(data => {
      this.setState({
        data: data });

    }).catch(err => {
      console.log("There has been error");
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.url !== this.props.url && nextProps.url !== '') {
      this.setState({
        url: nextProps.url,
        mounted: true },
      function () {
        this.loadContent();
      });
    }
  }

  componentDidMount() {
    if (this.props.url !== '') {
      this.loadContent();
      this.setState({
        mounted: true });

    }
  }

  render() {
    let titles = '';
    if (this.state.data.results) {
      titles = this.state.data.results.map((title, i) => {
        if (i < 5) {
          var name = '';
          var backDrop = 'http://image.tmdb.org/t/p/original' + title.backdrop_path;
          if (!title.name) {
            name = title.original_title;
          } else {
            name = title.name;
          }

          return /*#__PURE__*/(
            React.createElement(Item, { key: title.id, title: name, score: title.vote_average, overview: title.overview, backdrop: backDrop }));

        } else {
          return /*#__PURE__*/(
            React.createElement("div", { key: title.id }));

        }
      });
    }

    return /*#__PURE__*/(
      React.createElement("div", { ref: "titlecategory", className: "TitleList", "data-loaded": this.state.mounted }, /*#__PURE__*/
      React.createElement("div", { className: "Title" }, /*#__PURE__*/
      React.createElement("h1", null, this.props.title), /*#__PURE__*/
      React.createElement("div", { className: "titles-wrapper" },
      titles))));




  }}


class Item extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "Item", style: { backgroundImage: 'url(' + this.props.backdrop + ')' } }, /*#__PURE__*/
      React.createElement("div", { className: "overlay" }, /*#__PURE__*/
      React.createElement("div", { className: "title" }, this.props.title), /*#__PURE__*/
      React.createElement("div", { className: "rating" }, this.props.score, " / 10"), /*#__PURE__*/
      React.createElement("div", { className: "plot" }, this.props.overview), /*#__PURE__*/
      React.createElement(ListToggle, null))));



  }}


class ListToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false };

  }

  handleClick() {
    if (this.state.toggled === true) {
      this.setState({
        toggled: false });

    } else {
      this.setState({
        toggled: true });

    }
  }


  render() {
    return /*#__PURE__*/(
      React.createElement("div", { onClick: this.handleClick, "data-toggled": this.state.toggled, className: "ListToggle" }, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("i", { className: "fa fa-fw fa-plus" }), /*#__PURE__*/
      React.createElement("i", { className: "fa fa-fw fa-check" }))));



  }}


class Logo extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "logo", className: "Logo" }, /*#__PURE__*/
      React.createElement("svg", { version: "1.1", width: "300", height: "81.386726", id: "svg3262" }, /*#__PURE__*/
      React.createElement("g", { transform: "translate(-384.28572,-428.81172)", id: "layer1" }, /*#__PURE__*/
      React.createElement("g", { transform: "matrix(2.5445375,0,0,2.5445375,1157.1714,-1457.8678)", id: "g3235" }, /*#__PURE__*/
      React.createElement("path", { d: "m -203.09972,771.41415 c 1.6425,0.15875 3.2825,0.33 4.92,0.5075 l 3.615,-8.92625 3.43625,9.74875 c 1.76375,0.22125 3.525,0.4525 5.2825,0.695 l -6.02375,-17.09625 6.02625,-14.88 -5.10375,0 -0.0525,0.0725 -3.255,8.03875 -2.8575,-8.11125 -5.03875,0 5.2025,14.7625 -6.15125,15.18875 z", id: "path3015", style: { fill: '#b81d24', fillOpacity: 1, fillRule: 'nonzero', stroke: 'none' } }), /*#__PURE__*/
      React.createElement("path", { d: "m -206.91147,771.06478 0,-29.60125 -5.0375,0 0,29.18625 c 1.68125,0.12875 3.36125,0.26875 5.0375,0.415", id: "path3019", style: { fill: '#b81d24', fillOpacity: 1, fillRule: 'nonzero', stroke: 'none' } }), /*#__PURE__*/
      React.createElement("path", { d: "m -244.7486,769.4089 c 1.36,0 2.7175,0.01 4.07375,0.0213 l 0,-10.875 6.05125,0 0,-4.63125 -6.05125,0 0,-7.825 6.96875,0 0,-4.63625 -12.02625,0 0,27.95 c 0.3275,0 0.655,-0.004 0.98375,-0.004", id: "path3023", style: { fill: '#b81d24', fillOpacity: 1, fillRule: 'nonzero', stroke: 'none' } }), /*#__PURE__*/
      React.createElement("path", { d: "m -260.3881,769.69191 c 1.6775,-0.06 3.3575,-0.11 5.04,-0.15125 l 0,-23.44125 4.7075,0 0,-4.63625 -14.45625,0 0,4.63625 4.70875,0 0,23.5925 z", id: "path3035", style: { fill: '#b81d24', fillOpacity: 1, fillRule: 'nonzero', stroke: 'none' } }), /*#__PURE__*/
      React.createElement("path", { d: "m -298.91059,772.81378 0,-17.63625 5.96375,16.92375 c 1.83375,-0.20625 3.67125,-0.4 5.5125,-0.5825 l 0,-30.055 -4.8325,0 0,18.2675 -6.43625,-18.2675 -0.2075,0 -4.8325,0 0,31.98375 0.03,0 c 1.5975,-0.22125 3.19875,-0.43125 4.8025,-0.63375", id: "path3039", style: { fill: '#b81d24', fillOpacity: 1, fillRule: 'nonzero', stroke: 'none' } }), /*#__PURE__*/
      React.createElement("path", { d: "m -269.95297,746.09903 0,-4.63625 -12.0275,0 0,24.9125 0,4.6375 0,0.004 c 3.99125,-0.345 7.99625,-0.63375 12.0175,-0.86875 l 0,-0.004 0,-1.33625 0,-3.3 c -2.325,0.135 -4.645,0.29125 -6.96,0.46375 l 0,-7.415 6.05125,0 0,-4.63375 -6.05125,0 0,-7.82375 6.97,0 z", id: "path3051", style: { fill: '#b81d24', fillOpacity: 1, fillRule: 'nonzero', stroke: 'none' } }), /*#__PURE__*/
      React.createElement("path", { d: "m -223.72272,765.2864 0,-23.82375 -5.05875,0 0,23.605 0,4.63625 0,0.005 c 4.02375,0.1475 8.0325,0.35375 12.0275,0.6125 l 0,-0.006 0,-1.4975 0,-3.13875 c -2.31875,-0.15 -4.64125,-0.28 -6.96875,-0.3925", id: "path3055", style: { fill: '#b81d24', fillOpacity: 1, fillRule: 'nonzero', stroke: 'none' } }))))));





  }}


ReactDOM.render( /*#__PURE__*/
React.createElement(App, null),
document.getElementById('root'));

export default App;
