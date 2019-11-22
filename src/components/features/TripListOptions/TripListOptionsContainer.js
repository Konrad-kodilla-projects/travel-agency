import { connect } from 'react-redux';
import TripListOptions from './TripListOptions';
import { getAllTags } from '../../../redux/tagsRedux';
import {
  getAllFilters,
  changeSearchPhrase,
  changeDuration,
  addTags,
  removeTags,
} from '../../../redux/filtersRedux';

const mapStateToProps = state => ({
  tags: getAllTags(state),
  filters: getAllFilters(state),
});

const mapDispatchToProps = dispatch => ({
  changeSearchPhrase: phrase => dispatch(changeSearchPhrase(phrase)),
  changeDuration: (type, value) => dispatch(changeDuration({type, value})),
  addTags: tag => dispatch(addTags(tag)),
  removeTags: tag => dispatch(removeTags(tag)),

  // TODO - add more dispatchers for other filters
});

export default connect(mapStateToProps, mapDispatchToProps)(TripListOptions);
