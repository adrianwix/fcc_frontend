import React from 'react'
import './App.scss'
import DrumPad from './components/DrumPad'
import Controls from './components/Controls'
import config from './config'
import { DrumMachineInterface, State } from './types/DrumMachineTypes'
import { KeyConfig } from './types/DrumPadTypes'

class DrumMachine extends React.Component<any, State>
    implements DrumMachineInterface {
    state = {
        config: config,
        display: '',
        volume: 0.5,
        power: true,
    }

    /**
     *
     * @param {string} text String representing the display value
     */
    changeDisplay = (text: string) => {
        this.setState({
            display: text,
        })
    }

    /**
     *
     * @param {number} number Number representing the volume of the app
     */
    changeVolume = (volume: number) => {
        this.setState({
            volume: volume,
        })
    }

    /**
     *
     * @param {boolean} number Change power state of the app ON/OF
     */
    changePower = () => {
        const power = this.state.power ? false : true
        const state = this.state.power ? 'Off' : 'On'
        this.changeDisplay(state)
        this.setState({
            power: power,
        })
    }

    renderDrumPad = (props: KeyConfig, index: number): JSX.Element => {
        return (
            <DrumPad
                key={index}
                id={props.id}
                padKey={props.padKey}
                padKeyCode={props.padKeyCode}
                src={props.src}
                changeDisplay={this.changeDisplay}
                volume={this.state.volume}
                power={this.state.power}
            />
        )
    }

    render() {
        return (
            <main>
                <div id="drum-machine">
                    <Controls
                        display={this.state.display}
                        changeDisplay={this.changeDisplay}
                        volume={this.state.volume}
                        changeVolume={this.changeVolume}
                        power={this.state.power}
                        changePower={this.changePower}
                    />
                    <div id="pad">
                        {this.state.config.map(
                            (key: KeyConfig, index: number) => {
                                return this.renderDrumPad(key, index)
                            }
                        )}
                    </div>
                </div>
            </main>
        )
    }
}

export default DrumMachine
