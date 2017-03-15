import React from 'react';

export default class GLPage extends React.Component {

  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.props.getCount(this.props.params.firstItem, this.props.params.secondItem);
  }

  handleClick(e) {
    const vote = e.target.id === this.props.params.firstItem ? this.props.params.firstItem : this.props.params.secondItem;
    const opponent = e.target.id !== this.props.params.firstItem ? this.props.params.firstItem : this.props.params.secondItem;
    this.props.addToCount(vote, opponent);
  }

  render () {
    return (
      <div className='GLPage'>
        <div>
          <button onClick={this.handleClick} id={this.props.params.firstItem}>{this.props.params.firstItem}</button>
          <button onClick={this.handleClick} id={this.props.params.secondItem}>{this.props.params.secondItem}</button>
        </div>
        <div>
          <span>Votes (1): {this.props.itemCounts[this.props.params.firstItem] || 0}</span>
          <span>Votes (2): {this.props.itemCounts[this.props.params.secondItem] || 0}</span>
        </div>
      </div>
    );
  }

}
