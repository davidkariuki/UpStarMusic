import _ from "lodash"
import React, { Component } from "react"
import { Link } from "react-router"
import { connect } from "react-redux"
import Paginator from "./Paginator"
import * as actions from "../../actions"

class ArtistIndex extends Component {
  onChange(id) {
    if (_.contains(this.props.selection, id)) {
      this.props.deselectArtist(id)
    } else {
      this.props.selectArtist(id)
    }
  }

  renderList(artist) {
    const { id } = artist
    const classes = `collection-item avatar ${artist.retired && "retired"}`

    return (
      <li className={classes} key={id}>
        <div>
          <input
            id={id}
            type="checkbox"
            checked={_.contains(this.props.selection, id)}
            onChange={() => this.onChange(id)}
          />
          <label htmlFor={id} />
        </div>
        <img src={artist.image} className="circle" />
        <div>
          <span className="title">
            <strong>{artist.name}</strong>
          </span>
          <p>
            <b>{artist.age}</b> years old
            <br />
            {artist.albums ? artist.albums.length : 0} albums released
            <br />
            {artist.yearsActive ? artist.yearsActive : 0} years active
          </p>
        </div>
        <Link to={`artists/${artist.id}`} className="secondary-content">
          <i className="material-icons">play_arrow</i>
        </Link>
      </li>
    )
  }

  renderPaginator() {
    if (this.props.artists.all.length) {
      return <Paginator />
    }
  }

  renderEmptyCollection() {
    if (this.props.artists.all.length) {
      return
    }

    return (
      <div className="center-align">
        <h5>No records found!</h5>
        <div>Try searching again</div>
      </div>
    )
  }

  renderRetire() {
    if (this.props.selection.length) {
      return (
        <div>
          <button
            className="btn"
            onClick={() => this.props.setRetired(this.props.selection)}
          >
            Retire
          </button>
          <button
            className="btn"
            onClick={() => this.props.setNotRetired(this.props.selection)}
          >
            Unretire
          </button>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderRetire()}
        <ul className="collection">
          {this.props.artists.all.map(this.renderList.bind(this))}
          {this.renderEmptyCollection()}
        </ul>

        {this.renderPaginator()}
      </div>
    )
  }
}

const mapStateToProps = ({ artists, selection }) => ({ artists, selection })

export default connect(mapStateToProps, actions)(ArtistIndex)
