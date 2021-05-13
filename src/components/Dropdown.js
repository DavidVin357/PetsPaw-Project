import React from 'react'
import dropdown from '../images/dropdown-12.svg'
import './Dropdown.css'
class Dropdown extends React.Component {
  state = {
    selectedValue: '',
  }
  onInputChange = (event) => {
    this.setState({ selectedValue: event.target.value })
    this.props.onChange(event.target.value)
  }
  // backgroundColor, textColor label(?), firstText(?), option([{id, value, name}]), onChange,
  componentDidMount() {}
  render() {
    return (
      <div className='dropdown'>
        <label htmlFor='select' className='label'>
          {this.props.label ? this.props.label : ''}
        </label>
        <label
          style={{ backgroundColor: this.props.backgroundColor }}
          className='container'
        >
          <select
            value={this.state.selectedValue}
            onChange={this.onInputChange}
            style={{ color: this.props.textColor }}
          >
            {this.props.firstText ? (
              <option
                value={this.props.firstText}
                label={this.props.firstText}
              ></option>
            ) : (
              ''
            )}
            {this.props.options.map((option) => (
              <option value={option.value} key={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <img src={dropdown} />
        </label>
      </div>
    )
  }
}

export default Dropdown
