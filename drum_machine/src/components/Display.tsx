import React from 'react'
import { PropTypes } from '../types/DisplayTypes'

/**
 * @param {object} props Properties the component.
 * @param {string} props.display Text to display inside <p>.
 */
function Display(props: PropTypes) {
    return (
        <div id="display">
            <p>{props.display}</p>
        </div>
    )
}

export default Display
