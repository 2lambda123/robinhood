import React from 'react';
import { connect } from 'react-redux';
import { fetchStock } from '../../actions/stock';

class StockPage extends React.Component {
  constructor(props) {
    super(props);
    this.symbol = this.symbol.bind(this);
  }

  componentDidMount() {
    if (this.props.stock === undefined) {
      this.props.fetchStock(this.symbol());
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.stock === null) {
      this.props.history.push("/");
    } else if (this.props.stock === undefined) {
      prevProps.fetchStock(this.symbol());
    }
  }

  symbol() {
    return this.props.match.params.symbol.toUpperCase();
  }

  render () {
    if (!this.props.stock) return '';
    return (
      <h1>{this.props.stock.symbol}</h1>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  stock: state.stocks[ownProps.match.params.symbol.toUpperCase()]
});

export default connect(mapStateToProps, { fetchStock })(StockPage);
