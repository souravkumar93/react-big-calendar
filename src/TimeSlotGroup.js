import cn from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import BackgroundWrapper from './BackgroundWrapper'

export default class TimeSlotGroup extends Component {
  render() {
    const {
      renderSlot,
      renderApp,
      resource,
      group,
      getters,
      applications,
      components: { timeSlotWrapper: Wrapper = BackgroundWrapper } = {},
    } = this.props
    return (
      <div className="rbc-timeslot-group">
        {renderApp && renderApp(group, 0)}
      </div>
    )
  }
}

TimeSlotGroup.propTypes = {
  renderSlot: PropTypes.func,
  group: PropTypes.array.isRequired,
  resource: PropTypes.any,
  components: PropTypes.object,
  getters: PropTypes.object,
}

TimeSlotGroup.defaultProps = {
  applications: [],
}
