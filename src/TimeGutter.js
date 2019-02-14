import cn from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import * as TimeSlotUtils from './utils/TimeSlots'
import TimeSlotGroup from './TimeSlotGroup'

export default class TimeGutter extends Component {
  constructor(...args) {
    super(...args)

    const { min, max, timeslots, step } = this.props
    this.slotMetrics = TimeSlotUtils.getSlotMetrics({
      min,
      max,
      timeslots,
      step,
    })
  }

  componentWillReceiveProps(nextProps) {
    const { min, max, timeslots, step } = nextProps
    this.slotMetrics = this.slotMetrics.update({ min, max, timeslots, step })
  }

  renderSlot = (value, idx) => {
    if (idx !== 0) return null
    const { localizer, getNow } = this.props
    const isNow = this.slotMetrics.dateIsInGroup(getNow(), idx)
    const label = localizer.format(value, 'timeGutterFormat')
    return <span className={cn('rbc-label', isNow && 'rbc-now')}>{label}</span>
  }

  renderApp = (value, idx) => {
    const { getNow } = this.props
    const isNow = this.slotMetrics.dateIsInGroup(getNow(), idx)
    return <span className={cn('rbc-label', isNow && 'rbc-now')}>{value}</span>
  }

  render() {
    const { resource, components, applications } = this.props
    return (
      <div className="rbc-time-gutter rbc-time-column">
        {/* {this.slotMetrics.groups.map((grp, idx) => {
          return (
            <TimeSlotGroup
              key={idx}
              group={grp}
              resource={resource}
              components={components}
              renderSlot={this.renderSlot}
              applications={applications}
              renderApp={this.renderApp}
            />
          )
        })} */}
        {// applications.map(d => <div className="rbc-timeslot-group">{d}</div>)
        applications.map((grp, idx) => (
          <TimeSlotGroup
            key={idx}
            group={grp}
            resource={resource}
            components={components}
            renderSlot={this.renderSlot}
            applications={applications}
            renderApp={this.renderApp}
          />
        ))}
      </div>
    )
  }
}

TimeGutter.propTypes = {
  min: PropTypes.instanceOf(Date).isRequired,
  max: PropTypes.instanceOf(Date).isRequired,
  timeslots: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  getNow: PropTypes.func.isRequired,
  components: PropTypes.object.isRequired,

  localizer: PropTypes.object.isRequired,
  resource: PropTypes.string,
}
