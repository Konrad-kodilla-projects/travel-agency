import { connect } from 'react-redux';
import OrderForm from './OrderForm';
import {getOrderOptions, setOrderOption, getTripByID} from '../../../redux/orderRedux';

const mapStateToProps = (state, props) => ({
  options: getOrderOptions(state),
  trip: getTripByID(state, props.id),
});

const mapDispatchToProps = dispatch => ({
  setOrderOption: option => dispatch(setOrderOption(option)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);