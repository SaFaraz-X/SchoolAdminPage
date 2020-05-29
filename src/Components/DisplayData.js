import React from 'react';

function DisplayData(props){
    const elements = props.elements;
    const listData = elements.map(item =>{
        return <div key={item.id}>
            <p> 
                {item.name}
                {item.age}
                {item.grade}
                {item.gender}
            </p>

        </div>
    })
          return (
              <div> {listData} </div>
          )
}


{/* <section className='display-item'>
<div className="wrapper">
  <ul>
    {this.state.elements.map((item) => {
      return (
        <li key={item.id}>
          <h3>{item.name}</h3>
          <p>brought by: {item.age}</p>
        </li>
      )
    })}
  </ul>
</div>
</section>     */}

export default DisplayData;

