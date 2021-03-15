import React from "react";
import { isHotelOwner } from "../../../utils";

export class HotelOwnerView extends React.Component {
    constructor(props) {
        super(props)

        this._init()
    }

    _init() {
        if(!isHotelOwner()) return window.location.href = '/'
    }

    render() {
        return (
            <div id="HotelOwnerView">
                Hotel Owner View
            </div>
        )
    }
}