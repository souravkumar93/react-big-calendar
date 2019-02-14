import React from 'react'
import BigCalendar from 'react-big-calendar'
import events from '../events'
import ExampleControlSlot from '../ExampleControlSlot'

const propTypes = {}

class Selectable extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = { events }
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
    if (title)
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title,
          },
        ],
      })
  }

  render() {
    const { localizer } = this.props
    const allViews = ['week', 'agenda']
    return (
      <BigCalendar
        selectable
        localizer={localizer}
        events={this.state.events}
        defaultView={BigCalendar.Views.WEEK}
        views={allViews}
        scrollToTime={new Date()}
        defaultDate={new Date()}
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={this.handleSelect}
      />
    )
  }
}

Selectable.propTypes = propTypes

export default Selectable
