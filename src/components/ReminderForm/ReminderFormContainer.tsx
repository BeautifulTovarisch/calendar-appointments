import { connect } from 'react-redux';

import ReminderForm from './ReminderForm';

import { addReminder, closeAddReminder } from '../../redux/actions';

const mapDispatchToProps = (dispatch: any) => ({
    onClose: () => dispatch(closeAddReminder()),
    addReminder: reminder => dispatch(addReminder(reminder))
})

export default connect(null, mapDispatchToProps)(ReminderForm);
