import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './App.css';
import address from './data.json';
import placeIcon from './icons8-marker-64.png';

const list = address;

const cx = classNames.bind(styles);

const isSearched = searchTerm => item =>
  item.FULL_ADDR.includes(searchTerm);

const tabIndex = 0;

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      list,
      searchTerm:'',
      tabIndex,
    };

    this.onSearchChange = this.onSearchChange.bind(this); 
    this.onClickChange = this.onClickChange.bind(this);
    this.onKeyChange = this.onKeyChange.bind(this);
    

  }

  onSearchChange(event){
    this.setState({searchTerm : event.target.value});
  }

  onClickChange(event, item){    
    document.getElementById("inputBox").value = item.FULL_ADDR;
  }

  onKeyChange(event, item){

    event = event || window.event;

    if (event.keyCode == '38') {
        // up arrow
        event.target.previousSibling.focus();
    }
    else if (event.keyCode == '40') {
        // down arrow
        event.target.nextSibling.focus();

    }else if (event.keyCode == '13'){
        document.getElementById("inputBox").value = item.FULL_ADDR;
    }
  
  }
  componentDidUpdate(){
    var section = document.getElementsByClassName("section");
    while(section.firstChild){
      console.log(section.firstChild);
      section.firstChild.focus();
    } 
  }
  

  render() {

    return (

      <div className="App">
        <div className={cx('container')}>
        <form className={cx('flex-form')}>
          <input type="text"
          onChange={this.onSearchChange}
          placeholder="Search your address"
          className={cx('inputBox')}
          id="inputBox"          
          />
        </form>          
                 
          {this.state.list.filter(isSearched(this.state.searchTerm)).map(item => {                          
              if(this.state.searchTerm !== ''){
              
              return(                              

                <div key={item.ID} 
                     onClick={(event)=>this.onClickChange(event, item)}                     
                     tabIndex={this.state.tabIndex}                
                     onKeyDown={(event)=>this.onKeyChange(event, item)}   
                     className="section"                  
                     >
                    <div className={cx('placeBox')} >
                      <img src={placeIcon} className={cx('placeIcon')} alt="placeIcon" />
                      <span className={cx('main_name')}>{item.MAIN_NAME}</span> ,&nbsp;
                      <span className='FULL_ADDR'>{item.FULL_ADDR}</span>
                    </div>
                </div>
                              
              )

              }
          }
          )}         
        
        </div>
      </div>
    );

  }
}

export default App;

