import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './App.css';
import address from './data.json';
import placeIcon from './icons8-marker-64.png';

const list = address;

const cx = classNames.bind(styles);

const isSearched = searchTerm => item =>
  item.FULL_ADDR.includes(searchTerm);

let isNotDisplay = true;

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      list,
      searchTerm:'',
    };

    this.onSearchChange = this.onSearchChange.bind(this); 
    this.onFillSearchTerm = this.onFillSearchTerm.bind(this);
  }

  onSearchChange(event){
    this.setState({searchTerm : event.target.value});
  }

  onFillSearchTerm = (e, data) => {   
    console.log(e);
    console.log(data); 
    console.log(e.FULL_ADDR);
    document.getElementsByClassName('inputBox').value = e.FULL_ADDR;
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
          />
        </form>          

          {this.state.list.filter(isSearched(this.state.searchTerm)).map(item => {                          
              if(this.state.searchTerm !== ''){

              return(                              
              
                <div key={item.ID} 
                     className={cx('flex',{notDisplay: isNotDisplay})} 
                     onClick={this.onFillSearchTerm.bind(null, item)}>
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

