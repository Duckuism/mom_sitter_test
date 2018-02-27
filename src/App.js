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
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    
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
        if(event.target.previousSibling == document.querySelector("form")){
          document.querySelector("input").focus();
        }else{
          event.target.previousSibling.focus();
        }

    }
    else if (event.keyCode == '40') {
        // down arrow
        if(event.target.nextSibling == null){
          document.querySelector(".section").focus();
        }else{
          event.target.nextSibling.focus();  
        }
        
    }else if (event.keyCode == '13'){
        document.getElementById("inputBox").value = item.FULL_ADDR;
    }
  
  }


  onEnterInsert(event){
    event = event || window.event;
    if(event.keyCode == '13'){
      var section = document.querySelector(".section");
      var content = document.querySelector(".FULL_ADDR").textContent;
      if(section != null){
        section.focus();
        document.getElementById("inputBox").value = content;
      }      
    }

  }

  onFocus(event){
    console.log("focus");
    console.log(document.querySelector("div"));
    document.querySelector(".section_container").style.display="inline";
    
  }

  onBlur(event){
    console.log("blur");
    console.log(document.querySelector("div"));
    document.querySelector(".section_container").style.display="none";
    
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
          onKeyDown={this.onEnterInsert}
          onFocus={this.onFocus}
          onBlur={this.onBlur}          
          />
        </form>          
        <div className="section_container">
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
      </div>
    );

  }
}

export default App;

