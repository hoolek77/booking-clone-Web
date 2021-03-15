import React from "react";
import { isAdmin } from "../../../utils";

export class AdminView extends React.Component {
    constructor(props) {
        super(props)

        this._init()
    }

    _init() {
        if(!isAdmin()) return window.location.href = '/'
    }

    render() {
        return (
            <div id="AdminView">Admin View tEST</div>
        )
    }
}